# docs/air-quality/03-data-contracts-and-api-payloads.md

## 1) Contract Version and Core Enums

Frontend contract baseline:

- `contractVersion = "air-quality.v1"`
- granularity enum: `hour | day | week | month | quarter | year`
- source type enum: `measured | estimated | calculated`
- boundary level enum: `organization | facility | site | asset`

## 2) Dashboard Aggregate Response (Consumed by UI)

> This is the runtime payload used by `getAirQualityDashboard` + `createAirQualityDomainPageDTO`.

```ts
interface AirQualityDashboardResponseV1 {
  contractVersion: 'air-quality.v1';
  filters: {
    dateFrom: string;     // ISO datetime
    dateTo: string;       // ISO datetime
    granularity: 'hour' | 'day' | 'week' | 'month' | 'quarter' | 'year';
    boundaryId: string;
    locationIds?: string[];
    sourceCategoryIds?: string[];
    tenantId?: string;
    timePreset?: 'last_24_hours' | 'last_7_days' | 'last_30_days' | 'last_90_days';
    metricKeys?: string[];
  };
  kpis: AirQualityKpiCard[];
  breakdowns: AirQualityBreakdown[];
  timeSeries: AirQualityTimeSeriesPoint[];
  metadata: {
    generatedAt: string;          // ISO datetime
    dataFreshnessHours: number;
    qualityFlags: string[];
  };
}

interface AirQualityKpiCard {
  metricKey: 'total_co2e' | 'intensity_per_record' | 'trend_pct' | 'scope1_contribution_pct' | string;
  label: string;
  value: number;
  unit: string;
  trendPct: number;
  contributionPct: number;
  comparisonPeriod: string;
  coveragePct: number;
  methodology: {
    standard?: string;
    disclosure?: string;
    methodologyId: string;
    methodologyVersion?: string;
    sourceType?: 'measured' | 'estimated' | 'calculated';
    measuredSharePct?: number;
    estimatedSharePct?: number;
    formula?: string;
    factorsVersionIds?: string[];
  };
  boundary: {
    boundaryId?: string;
    boundaryName: string;
    level?: string;
    includedLocationIds?: string[];
    excludedLocationIds?: string[];
  };
  calculatedAt?: string;
}

interface AirQualityBreakdown {
  dimension: 'source' | 'location' | string;
  key: string;
  label: string;
  co2eKg: number;
  sharePct: number;
  coveragePct: number;
  methodology?: Record<string, unknown>;
  parentKey?: string | null;
  level?: 'site' | 'building' | 'zone' | string;
}

interface AirQualityTimeSeriesPoint {
  timestamp: string;
  co2eKg: number;
  noxKg?: number;
  pm25Kg?: number;
  sourceType: 'measured' | 'estimated' | 'calculated';
  coveragePct: number;
  methodology?: Record<string, unknown>;
}
```

## 3) Dashboard Query Contract (Frontend -> Backend)

Runtime request path:

- `GET /api/v1/air-quality/dashboard`

Current frontend query params shape:

```json
{
  "timePreset": "last_30_days",
  "boundaryId": "global",
  "granularity": "day",
  "metricKeys": ["total_co2e"],
  "dateFrom": "2026-02-24T12:34:56.000Z",
  "dateTo": "2026-03-26T12:34:56.000Z",
  "tenantId": "tenant-a"
}
```

## 4) Export Contract (Frontend -> Backend)

Runtime request path:

- `POST /api/v1/air-quality/exports`

Payload contract currently emitted by frontend:

```json
{
  "format": "pdf",
  "tenantId": "tenant-a",
  "filters": {
    "timePreset": "last_30_days",
    "boundaryId": "global",
    "granularity": "day",
    "metricKeys": ["total_co2e"],
    "dateFrom": "2026-02-24T12:34:56.000Z",
    "dateTo": "2026-03-26T12:34:56.000Z"
  },
  "include": ["reporting_period", "metrics", "breakdowns", "methodology", "boundaries"],
  "reportContext": {
    "reportingPeriod": {
      "from": "2026-02-24T12:34:56.000Z",
      "to": "2026-03-26T12:34:56.000Z",
      "preset": "last_30_days"
    },
    "metrics": ["total_co2e"],
    "breakdowns": ["source", "location"],
    "methodology": true,
    "boundaries": true
  }
}
```

Expected response:

- binary `blob` body (PDF/CSV/JSON file content)
- optional response header `x-trace-id`

## 5) Additional API Definitions Present (Design-Time)

Defined but not consumed by the page today:

- `GET /api/v1/air-quality/kpis`
- `GET /api/v1/air-quality/breakdowns`
- `GET /api/v1/air-quality/time-series`

These remain useful for backend decomposition, but the frontend requires the aggregate dashboard response for current page rendering.

## 6) Mock/Data Source Mode

`getDataSourceMode()` switches between:

- `mock` (local generated payload with synthetic time series and breakdown hierarchy)
- non-mock (real API call through shared request client)

This allows contract testing ahead of full backend availability.

