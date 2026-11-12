import { test, expect } from '@playwright/test';
import { formatTable, toAdRows } from '../../scripts/meta-ads-report.mjs';

// Shaped like Meta's `GET /act_{id}/insights?level=ad` records: numbers arrive as strings,
// and `actions` lists only the action types that happened (no `landing_page_view` entry when there were none).
const RECORDS = [
  {
    campaign_id: '120200000000000001',
    campaign_name: 'US-UXD-free-skills-2026Q4',
    adset_id: '120200000000000011',
    adset_name: 'UXD broad',
    ad_id: '120200000000000111',
    ad_name: 'video-hook-b',
    spend: '84.17',
    inline_link_clicks: '41',
    account_currency: 'PLN',
    actions: [
      { action_type: 'link_click', value: '41' },
      { action_type: 'landing_page_view', value: '29' },
      { action_type: 'lead', value: '3' },
      { action_type: 'page_engagement', value: '57' },
    ],
    date_start: '2026-10-29',
    date_stop: '2026-11-12',
  },
  {
    campaign_id: '120200000000000001',
    campaign_name: 'US-UXD-free-skills-2026Q4',
    adset_id: '120200000000000011',
    adset_name: 'UXD broad',
    ad_id: '120200000000000112',
    ad_name: 'static-a',
    spend: '3.05',
    inline_link_clicks: '2',
    account_currency: 'PLN',
    actions: [{ action_type: 'link_click', value: '2' }],
    date_start: '2026-10-29',
    date_stop: '2026-11-12',
  },
  {
    campaign_id: '120200000000000002',
    campaign_name: 'PL-brand-awareness',
    adset_id: '120200000000000021',
    adset_name: 'Warm audience',
    ad_id: '120200000000000211',
    ad_name: 'carousel-1',
    spend: '12.5',
    account_currency: 'PLN',
    date_start: '2026-10-29',
    date_stop: '2026-11-12',
  },
];

test.describe('toAdRows', () => {
  test('one row per ad with ad set ID, names, spend, clicks and landing-page views', () => {
    expect(toAdRows(RECORDS)).toEqual([
      {
        campaign: 'PL-brand-awareness',
        adSetId: '120200000000000021',
        adSetName: 'Warm audience',
        adName: 'carousel-1',
        spend: 12.5,
        currency: 'PLN',
        linkClicks: 0,
        landingPageViews: 0,
        metaLeads: 0,
      },
      {
        campaign: 'US-UXD-free-skills-2026Q4',
        adSetId: '120200000000000011',
        adSetName: 'UXD broad',
        adName: 'static-a',
        spend: 3.05,
        currency: 'PLN',
        linkClicks: 2,
        landingPageViews: 0,
        metaLeads: 0,
      },
      {
        campaign: 'US-UXD-free-skills-2026Q4',
        adSetId: '120200000000000011',
        adSetName: 'UXD broad',
        adName: 'video-hook-b',
        spend: 84.17,
        currency: 'PLN',
        linkClicks: 41,
        landingPageViews: 29,
        metaLeads: 3,
      },
    ]);
  });

  test('an ad without a landing_page_view action counts 0 landing-page views', () => {
    const [row] = toAdRows([RECORDS[1]]);
    expect(row.landingPageViews).toBe(0);
    expect(row.metaLeads).toBe(0);
    expect(row.linkClicks).toBe(2);
  });

  test('the campaign filter keeps names containing the text, in any case', () => {
    const rows = toAdRows(RECORDS, { campaign: 'us-uxd' });
    expect(rows.map((row) => row.adName)).toEqual(['static-a', 'video-hook-b']);
    expect(toAdRows(RECORDS, { campaign: 'no such campaign' })).toEqual([]);
  });

  test('no records give no rows', () => {
    expect(toAdRows([])).toEqual([]);
  });
});

test.describe('formatTable', () => {
  test('prints spend with currency and two decimals, one line per ad', () => {
    const lines = formatTable(toAdRows([RECORDS[0]])).split('\n');
    expect(lines).toHaveLength(3);
    expect(lines[0]).toBe(
      '| Campaign | Ad set ID (utm_term) | Ad set | Ad (utm_content) | Spend | Link clicks | Landing-page views | Meta leads |',
    );
    expect(lines[2]).toBe('| US-UXD-free-skills-2026Q4 | 120200000000000011 | UXD broad | video-hook-b | 84.17 PLN | 41 | 29 | 3 |');
  });
});
