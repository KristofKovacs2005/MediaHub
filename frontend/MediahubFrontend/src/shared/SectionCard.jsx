import "./shared.css";

/**
 * SectionCard
 *
 * A centred white card inside a full-width section row.
 * Used on the orders page for the pie chart block and the table block.
 * Can be used on any dashboard-style page that needs visual card separation.
 *
 * Props:
 *   children  {node}   - Content inside the card
 *   cardClass {string} - Extra CSS class(es) on the inner card div (optional)
 *                        e.g. "pie-chart-card" to keep page-specific sizing
 *
 * Usage:
 *   <SectionCard>
 *     <h3>Chart title</h3>
 *     <PieChart ... />
 *   </SectionCard>
 *
 *   // With a custom width class:
 *   <SectionCard cardClass="my-wide-card">
 *     <OrderTable orders={orders} />
 *   </SectionCard>
 */
export default function SectionCard({ children, cardClass = "" }) {
    return (
        <section className="shared-section-container">
            <div className={`shared-card ${cardClass}`}>
                {children}
            </div>
        </section>
    );
}
