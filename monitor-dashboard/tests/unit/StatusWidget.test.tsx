import { render, screen } from '@testing-library/react';
import { StatusWidget } from '../../src/components/widgets/StatusWidget';

describe('StatusWidget', () => {
  it('renders label and value', () => {
    render(<StatusWidget label="Critical" value={2} tone="critical" />);

    expect(screen.getByText('Critical')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByTestId('widget-critical')).toHaveClass('widget-critical');
  });
});
