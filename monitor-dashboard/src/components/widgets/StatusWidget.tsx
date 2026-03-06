import type { ReactNode } from 'react';

interface StatusWidgetProps {
  label: string;
  value: number;
  tone: 'normal' | 'warning' | 'critical';
  icon?: ReactNode;
}

export const StatusWidget = ({ label, value, tone, icon }: StatusWidgetProps) => {
  return (
    <article data-testid={`widget-${tone}`} className={`widget widget-${tone}`}>
      <header>{icon} {label}</header>
      <p>{value}</p>
    </article>
  );
};
