import { ReactNode } from 'react';

interface AnalyticCardProps {
  className: string;
  title: string;
  stats: string;
  icon: ReactNode;
}

function AnalyticCard(props: AnalyticCardProps) {
  const { className, title, stats, icon } = props;
  return (
    <div className="home-box">
      <div className={`home-icon-box ${className}`}>{icon}</div>
      <div className="home-stats">
        <div className="home-title">{title}</div>
        <div className="home-text">{stats}</div>
      </div>
    </div>
  );
}

export default AnalyticCard;
