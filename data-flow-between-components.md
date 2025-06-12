# Data Flow: Monitor Data Collection and Dashboard

This document outlines the data flow for the Monitoring project’s `monitor-data-collection` service, which collects environmental KPIs (aligned with GRI guidelines, e.g., GRI 302 for Energy, GRI 305 for Emissions), processes and stores them in MongoDB, and serves them to the `monitor-frontend-user-dashboard` for real-time chart visualization. It includes authentication via `monitor-service-user-mgmt` and alerting via `monitor-service-alerts-logging`, reflecting updates as of June 12, 2025, 03:06 PM +01.

## Components
- **monitor-data-collection**: Node.js/Express.js service for collecting, processing, and serving KPIs, using MongoDB.
- **monitor-frontend-user-dashboard**: ReactJS frontend displaying KPI charts and alerts.
- **monitor-service-user-mgmt**: Node.js service for user authentication via Firebase, issuing JWTs.
- **monitor-service-alerts-logging**: Service for sending alerts (e.g., Slack notifications).
- **Database: MongoDB**: Stores KPIs and user data.
- **Infrastructure**: GKE in GCP, local/dev/prod environments.

## Data Flow
1. **Data Collection**  
   - IoT devices (e.g., energy meters, air quality sensors) send KPIs (e.g., 452.3 kWh, 0.5 tons CO2) to `monitor-data-collection` using a data transfer protocol (TBD).
   - Example: `{ "deviceId": "meter_001", "domain": "energy", "metric": "kWh_consumed", "value": 452.3, "timestamp": "2025-06-12T15:06:00Z" }`.

2. **Data Processing and Storage**  
   - `monitor-data-collection` validates data (e.g., positive values), processes it (e.g., hourly averages), and stores it in MongoDB’s `metrics` collection.
   - Schema: `{ domain, metric, value, timestamp, deviceId }`.
   - Data is saved via internal API (`POST /metrics`) or direct storage, secured by JWT.

3. **User Authentication**  
   - Users log in via the UI login page in `monitor-frontend-user-dashboard`.
   - Credentials are sent to `monitor-service-user-mgmt`’s `/auth/login` (Firebase Auth), returning a JWT stored in Redux.
   - Valid JWT redirects to the dashboard.

4. **Data Retrieval**  
   - The UI dashboard fetches KPIs from `monitor-data-collection` using:
     - REST: `GET /metrics?domain=energy&range=1h` for initial data.
     - WebSocket: `ws://data-collection:8083` for real-time updates.
   - Requests include JWT (`Authorization: Bearer <token>`).

5. **Chart Visualization**  
   - `monitor-frontend-user-dashboard` renders real-time charts (e.g., line charts for kWh trends) using Chart.js.
   - Config (`src/app.conf.json`) points to `http://data-collection.dev.svc:8082` (GKE dev).

6. **Alerting**  
   - `monitor-data-collection` detects anomalies (e.g., CO2 > 0.7 tons) during processing.
   - Sends events to `monitor-service-alerts-logging` via API (`POST /alerts`) or message queue.
   - Example: `{ "type": "high_emissions", "metric": "CO2_tons", "value": 0.8 }`.
   - `monitor-service-alerts-logging` sends Slack alerts via `monitoringbot`.
   - UI may display alerts (e.g., red banner) via WebSocket from `alerts-logging`.
