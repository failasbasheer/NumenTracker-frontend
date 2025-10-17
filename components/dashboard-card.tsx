"use client";

type DashboardCardProps = { children: React.ReactNode; className?: string };

export default function DashboardCard({ children, className = "" }: DashboardCardProps) {
  const cardBg = "bg-neutral-900"; // Dark flat background
  const professionalCardClass = `${cardBg} shadow-xl shadow-black/50 rounded-xl transition-all duration-300`;
  return (
    <div className={`p-0 rounded-xl ${professionalCardClass} ${className}`}>
      {children}
    </div>
  );
}
