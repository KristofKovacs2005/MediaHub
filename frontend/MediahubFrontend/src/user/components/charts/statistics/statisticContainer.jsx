import { StatCard } from "./statCard";
import "./statCss.css";
export function StatisticContainer({ stats }) {
    return (
        <div className="stats-grid">
            {stats.map((stat, index) => (
                <StatCard
                    key={index}
                    value={stat.value}
                    title={stat.title}
                    image={stat.image}
                    color={stat.color}
                />
            ))}
        </div>
    );
};