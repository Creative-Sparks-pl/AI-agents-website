-- Consent records: one row per first choice and per later change made in the cookie banner.
-- Database: its own Neon database (Frankfurt), separate from Umami's. Connection string:
-- CONSENT_DATABASE_URL in .env.local and in Vercel (Production and Preview).
-- Written only by POST /api/consent (src/pages/api/consent.ts), validated by src/lib/consent-record.ts.
-- No IP address and no user agent are stored.
-- Before any schema change, create a Neon backup branch from production, as for Umami.

CREATE TABLE consent_records (
  consent_id  uuid        NOT NULL,                 -- the banner library's random consent ID
  recorded_at timestamptz NOT NULL DEFAULT now(),   -- set by the database, never by the browser
  revision    integer     NOT NULL CHECK (revision >= 0),        -- banner revision shown
  language    text        NOT NULL CHECK (language IN ('pl', 'en')),
  accepted    text[]      NOT NULL,                 -- categories accepted, e.g. {necessary,statistics}
  rejected    text[]      NOT NULL,                 -- categories rejected
  kind        text        NOT NULL CHECK (kind IN ('first', 'change')),
  PRIMARY KEY (consent_id, recorded_at)
);

CREATE INDEX consent_records_recorded_at_idx ON consent_records (recorded_at);

-- Yearly retention clean-up (records are kept two years):
-- DELETE FROM consent_records WHERE recorded_at < now() - interval '2 years';
