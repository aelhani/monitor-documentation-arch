import { StatusWidget } from '../components/widgets/StatusWidget';
import { useDashboardState } from '../hooks/useDashboardState';

export const DashboardPage = () => {
  const { summary, isLoading, error } = useDashboardState();

  if (isLoading) return <p>Loading dashboard...</p>;
  if (error) return <p role="alert">{error}</p>;

  return (
    <main>
      <h1>Monitor Dashboard</h1>
      <section>
        <StatusWidget label="Normal" value={summary.normal} tone="normal" />
        <StatusWidget label="Warning" value={summary.warning} tone="warning" />
        <StatusWidget label="Critical" value={summary.critical} tone="critical" />
      </section>
    </main>
  );
};
