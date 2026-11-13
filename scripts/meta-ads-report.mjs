// Prints Meta ad results per ad (spend, link clicks, landing-page views) for a date range.
// Read-only: it only sends GET requests to Meta's reporting API (Insights), with a key that holds `ads_read` only.
//
// Usage: npm run report:meta-ads -- --since 2026-10-29 --until 2026-11-12 [--campaign <text>]
//   (runs `node --env-file-if-exists=.env.local scripts/meta-ads-report.mjs …`)
//
// Needs in .env.local: META_ADS_ACCESS_TOKEN (the reporting key) and META_AD_ACCOUNT_ID (with or without `act_`).
// Ad set ID is the site's `utm_term`; ad name is its `utm_content`.
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const GRAPH_URL = 'https://graph.facebook.com/v27.0';
const FIELDS = [
  'campaign_id',
  'campaign_name',
  'adset_id',
  'adset_name',
  'ad_id',
  'ad_name',
  'spend',
  'inline_link_clicks',
  'actions',
  'account_currency',
];
const PAGE_SIZE = 100;
const DATE = /^\d{4}-\d{2}-\d{2}$/;

const USAGE = `Prints Meta ad results per ad for a date range (read-only).

Usage:
  npm run report:meta-ads -- --since YYYY-MM-DD --until YYYY-MM-DD [--campaign <text>]

Options:
  --since YYYY-MM-DD   first day of the range (required)
  --until YYYY-MM-DD   last day of the range, included (required)
  --campaign <text>    only campaigns whose name contains <text> (any case)
  --help               show this help

Columns: campaign, ad set ID (= utm_term), ad set, ad (= utm_content), spend with currency,
link clicks, landing-page views, Meta leads (0 when Meta reports none).

Needs META_ADS_ACCESS_TOKEN and META_AD_ACCOUNT_ID in .env.local.`;

const toNumber = (value) => {
  const number = Number(value);
  return Number.isFinite(number) ? number : 0;
};

// Meta lists an action type in `actions` only when it happened, so a missing one counts 0.
const actionCount = (record, type) =>
  toNumber((record.actions ?? []).find((action) => action.action_type === type)?.value);

// One row per ad from Insights records (`level=ad`). Optional campaign filter: case-insensitive "name contains".
export function toAdRows(records, { campaign } = {}) {
  const wanted = campaign?.toLowerCase();
  return records
    .filter((record) => !wanted || (record.campaign_name ?? '').toLowerCase().includes(wanted))
    .map((record) => ({
      campaign: record.campaign_name ?? '',
      adSetId: record.adset_id ?? '',
      adSetName: record.adset_name ?? '',
      adName: record.ad_name ?? '',
      spend: toNumber(record.spend),
      currency: record.account_currency ?? '',
      linkClicks: toNumber(record.inline_link_clicks),
      landingPageViews: actionCount(record, 'landing_page_view'),
      metaLeads: actionCount(record, 'lead'),
    }))
    .sort(
      (a, b) =>
        a.campaign.localeCompare(b.campaign) ||
        a.adSetName.localeCompare(b.adSetName) ||
        a.adName.localeCompare(b.adName),
    );
}

// A Markdown table, so both people and the improvement cycle can read it.
export function formatTable(rows) {
  const cell = (value) => String(value).replace(/\|/g, '\\|');
  const header = ['Campaign', 'Ad set ID (utm_term)', 'Ad set', 'Ad (utm_content)', 'Spend', 'Link clicks', 'Landing-page views', 'Meta leads'];
  const lines = [header, header.map(() => '---')];
  for (const row of rows) {
    lines.push([
      row.campaign,
      row.adSetId,
      row.adSetName,
      row.adName,
      `${row.spend.toFixed(2)} ${row.currency}`.trim(),
      row.linkClicks,
      row.landingPageViews,
      row.metaLeads,
    ]);
  }
  return lines.map((line) => `| ${line.map(cell).join(' | ')} |`).join('\n');
}

function parseArgs(argv) {
  const options = {};
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === '--help' || arg === '-h') options.help = true;
    else if (arg === '--since' || arg === '--until' || arg === '--campaign') {
      const value = argv[i + 1];
      if (value === undefined || value.startsWith('--')) throw new Error(`${arg} needs a value`);
      options[arg.slice(2)] = value;
      i += 1;
    } else throw new Error(`unknown option: ${arg}`);
  }
  return options;
}

// Meta's error text only — never the request URL or headers, which carry the key.
async function getJson(url, token) {
  let response;
  try {
    response = await fetch(url, { method: 'GET', headers: { Authorization: `Bearer ${token}` } });
  } catch (error) {
    throw new Error(`could not reach Meta (${error.cause?.code ?? error.message})`);
  }
  const body = await response.json().catch(() => ({}));
  if (!response.ok || body.error) {
    const { message = response.statusText, code, error_subcode: subcode } = body.error ?? {};
    throw new Error(`Meta answered ${response.status}: ${message}${code ? ` (code ${code}${subcode ? `/${subcode}` : ''})` : ''}`);
  }
  return body;
}

async function fetchAdInsights({ accountId, token, since, until }) {
  const records = [];
  let after;
  do {
    const url = new URL(`${GRAPH_URL}/act_${accountId}/insights`);
    url.searchParams.set('level', 'ad');
    url.searchParams.set('fields', FIELDS.join(','));
    url.searchParams.set('time_range', JSON.stringify({ since, until }));
    url.searchParams.set('use_unified_attribution_setting', 'true'); // same attribution as Ads Manager
    url.searchParams.set('limit', String(PAGE_SIZE));
    if (after) url.searchParams.set('after', after);
    const page = await getJson(url, token);
    records.push(...(page.data ?? []));
    // Meta adds `paging.next` only when another page exists; the cursor fetches it without reusing Meta's URL.
    after = page.paging?.next ? page.paging?.cursors?.after : undefined;
  } while (after);
  return records;
}

async function main() {
  let options;
  try {
    options = parseArgs(process.argv.slice(2));
  } catch (error) {
    console.error(`${error.message}\n\n${USAGE}`);
    process.exit(2);
  }
  if (options.help) {
    console.log(USAGE);
    return;
  }
  const { since, until, campaign } = options;
  if (!DATE.test(since ?? '') || !DATE.test(until ?? '') || since > until) {
    console.error(`--since and --until are required, as YYYY-MM-DD, with since on or before until.\n\n${USAGE}`);
    process.exit(2);
  }

  const token = process.env.META_ADS_ACCESS_TOKEN;
  const accountId = process.env.META_AD_ACCOUNT_ID?.replace(/^act_/, '');
  if (!token || !accountId) {
    console.error('META_ADS_ACCESS_TOKEN and META_AD_ACCOUNT_ID must be set in .env.local (run through `npm run report:meta-ads`).');
    process.exit(1);
  }

  const rows = toAdRows(await fetchAdInsights({ accountId, token, since, until }), { campaign });
  const filter = campaign ? `, campaigns containing "${campaign}"` : '';
  console.log(`Meta ads, account act_${accountId}, ${since} to ${until}${filter}: ${rows.length} ad(s)\n`);
  if (rows.length) console.log(formatTable(rows));
}

const sameFile = (a, b) => (process.platform === 'win32' ? a.toLowerCase() === b.toLowerCase() : a === b);
if (process.argv[1] && sameFile(resolve(process.argv[1]), fileURLToPath(import.meta.url))) {
  main().catch((error) => {
    console.error(error.message);
    process.exit(1);
  });
}
