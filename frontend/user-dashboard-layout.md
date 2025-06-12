### Suggested Layout for User Dashboard

#### Overall Structure
- **Single-Page Application**: A clean, single-page React app with a responsive, grid-based layout.
- **Sections**: Header, Sidebar, Main Content, Footer.
- **Design Goal**: Intuitive navigation, clear KPI visualization, minimal clutter for investor demos.

#### Header
- **Purpose**: Branding and user controls.
- **Elements**:
  - Logo (e.g., “Monitoring Dashboard”).
  - User Profile Icon (dropdown with “Profile” and “Logout”).
  - Environment Indicator (e.g., “Dev” or “Prod” for context).

#### Sidebar
- **Purpose**: Navigation to KPI domains.
- **Elements**:
  - Menu Items: Links to “Energy”, “Water”, “Air Quality”, “Global Overview” (GRI-aligned domains).
  - Active Item Highlight: Visual cue for current domain (e.g., bold or colored).
  - Collapsible: Option to hide for more screen space on smaller devices.

#### Main Content
- **Purpose**: Display real-time KPI charts and alerts.
- **Elements**:
  - **Domain Title**: Shows current domain (e.g., “Energy Metrics”).
  - **Chart Area**: Grid of 1–2 charts (e.g., line chart for kWh trends, bar chart for daily totals).
    - Energy: kWh consumed over time (GRI 302).
    - Water: Liters recycled (GRI 303).
    - Air Quality: CO2 tons (GRI 305).
    - Global Overview: Summary metrics (e.g., total emissions).
  - **Time Range Selector**: Dropdown or buttons for “Last Hour”, “Last 24 Hours”, “Last Week”.
  - **Alert Banner**: Displays warnings from `monitor-service-alerts-logging` (e.g., “High CO2: 0.8 tons”).
  - **Refresh Toggle**: Enable/disable real-time WebSocket updates.

#### Footer
- **Purpose**: Basic info and links.
- **Elements**:
  - Copyright (e.g., “© 2025 Monitoring Project”).
  - Contact Link (e.g., “Support” email).
  - Version Number (e.g., “v0.1.0” for MVP).
