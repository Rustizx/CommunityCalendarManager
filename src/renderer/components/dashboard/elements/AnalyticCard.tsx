import { ReactNode } from 'react';

interface AnalyticCardProps {
  className: string;
  title: string;
  stats: number;
  icon: ReactNode;
}

function AnalyticCard(props: AnalyticCardProps) {
  const { className, title, stats, icon } = props;
  return (
    <div className="analytics-box">
      <div className={`analytics-icon-box ${className}`}>{icon}</div>
      <div className="analytics-stats">
        <div className="analytics-title">{title}</div>
        <div className="analytics-text">{stats}</div>
      </div>
    </div>
  );
}

export default AnalyticCard;
