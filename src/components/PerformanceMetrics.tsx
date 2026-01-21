import type { PerformanceMetrics as Metrics } from '@/types/account';

interface PerformanceMetricsProps {
  metrics: Metrics;
}

interface MetricItemProps {
  label: string;
  value: string;
}

function MetricItem({ label, value }: MetricItemProps) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-sm text-muted-foreground font-medium">{label}</span>
      <span className="text-2xl font-bold text-primary font-mono">{value}</span>
    </div>
  );
}

export function PerformanceMetrics({ metrics }: PerformanceMetricsProps) {
  return (
    <div className="bg-card rounded-xl p-6 mb-6 shadow-sm border-2 border-transparent bg-gradient-to-r from-indigo-500 to-purple-600 bg-origin-border">
      <div className="bg-card rounded-lg p-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <MetricItem
            label="Convex Query Time"
            value={`${metrics.queryTime.toFixed(2)}ms`}
          />
          <MetricItem
            label="React Render Time"
            value={`${metrics.renderTime.toFixed(2)}ms`}
          />
          <MetricItem
            label="Total Time"
            value={`${metrics.totalTime.toFixed(2)}ms`}
          />
          <MetricItem
            label="Records Loaded"
            value={metrics.recordsReturned.toLocaleString()}
          />
        </div>
      </div>
    </div>
  );
}
