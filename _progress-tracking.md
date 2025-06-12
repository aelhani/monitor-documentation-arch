# Monitoring Project Progress Tracking

## Overview

This document tracks the development progress of the Monitoring project, comprising 11 components: 1 Database, 4 core backend services, 4 frontend applications, and 2 DevOps components for CI/CD and INFRA. Each component has a coefficient (weight) reflecting its contribution to the total project. Progress is updated periodically to reflect completion percentages.

## Progress Table

| Component                          | Coefficient | Progress (%) | Weighted Progress (%) | Notes |
|------------------------------------|-------------|--------------|-----------------------|-------|
| Database: MongoDB                  | 0.1         | 30           | 3.0                   | MongoDB pod deployed, local connection tested. |
| Core Backend: User Management      | 0.1         | 30           | 3.0                   | `monitor-service-user-mgmt` connects to MongoDB locally, not yet deployed to Kubernetes. |
| Core Backend: Data Collection      | 0.1         | 0            | 0.0                   | Not started. |
| Core Backend: Data Processing      | 0.1         | 0            | 0.0                   | Not started. |
| Core Backend: Alerts & Logging     | 0.1         | 1            | 0.1                   | `monitoringbot` partial setup, full service pending. |
| Frontend: User Dashboard           | 0.1         | 40           | 4.0                   | Implemented basic login with Firebase auth and backend response; session persistence pending. |
| Frontend: Admin Panel              | 0.1         | 0            | 0.0                   | Not started. |
| Frontend: Live Display             | 0.1         | 0            | 0.0                   | Not started. |
| Frontend: Shared Components        | 0.05        | 0            | 0.0                   | Not started. |
| DevOps: CI/CD (Pipelines)          | 0.1         | 25           | 2.5                   | Added build pipeline for monitor-frontend-user-dashboard. |
| DevOps: GKE (Infra Config)         | 0.05        | 10           | 0.5                   | MongoDB YAML complete, app deployment YAML pending. |

**Total Progress**: 13.1% (as of June 12, 2025)

## Changelog

| Date       | Summary                              |
|------------|--------------------------------------|
| 2025-04-28 | Updated progress tracking for 11 components, rounded coefficients to 0.1/0.05, adjusted Live Display and Data Processing. |
| 2025-05-26 | Updated Frontend: User Dashboard to 40% with basic login, Firebase auth, and backend response; session persistence pending. |
| 2025-06-03 | Added docker image build steps; Added draft build pipeline for monitor-frontend-user-dashboard |
