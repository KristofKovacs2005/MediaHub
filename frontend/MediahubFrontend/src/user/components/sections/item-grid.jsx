import TermekCard from "../carouselCards/termekCard";


const ItemsGrid = ({ items, loading, error }) => {
  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!items.length) return <div>Nincs találat.</div>;

  return (
    <div className="items-grid">
      {items.map(item => <TermekCard key={item.i_id} item={item} />)}
    </div>
  );
};

export default ItemsGrid;