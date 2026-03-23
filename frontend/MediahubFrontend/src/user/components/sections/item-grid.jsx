import TermekCard from "../carouselCards/termekCard";
import "./itemGrid.css";

const ItemsGrid = ({ items, loading, error }) => {
  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!items.length) return <div>Nincs találat.</div>;

  return (
    <section className="items-grid">
      {items.map(item => <TermekCard key={item.i_id} item={item} />)}
    </section>
  );
};

export default ItemsGrid;