
import { Header } from '../components/header/header';
import { useState, useEffect } from 'react';
import '../styles/homePageHandler.css';

const UserBody = () => {
    const [borrowedItems, setBorrowedItems] = useState([]);
    const [books, setBooks] = useState([]);
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch user-specific data on mount
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                // Fetch all items
                const itemsResponse = await fetch('http://localhost:3000/items');
                const itemsData = itemsResponse.ok ? await itemsResponse.json() : [];

                // Fetch user's orders to get borrowed items
                const userId = localStorage.getItem('userId');
                const ordersResponse = await fetch(`http://localhost:3000/orders`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                    }
                });
                const ordersData = ordersResponse.ok ? await ordersResponse.json() : [];
                
                // Filter borrowed items and categorize
                const borrowed = itemsData.filter(item => 
                    ordersData.some(order => order.item_id === item.i_id)
                );
                setBorrowedItems(borrowed);

                // Categorize items as books or movies (you can add actual type detection)
                const booksFiltered = itemsData.filter((item, index) => index % 2 === 0);
                const moviesFiltered = itemsData.filter((item, index) => index % 2 !== 0);
                
                setBooks(booksFiltered);
                setMovies(moviesFiltered);
            } catch (error) {
                console.error('Error fetching user data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    const ItemsList = ({ items, title }) => (
        <div className="items-section">
            <h3>{title}</h3>
            <div className="items-container">
                {items.length > 0 ? (
                    items.map(item => (
                        <div key={item.i_id} className="item-card">
                            <p>{item.i_name}</p>
                        </div>
                    ))
                ) : (
                    <p>Nincsenek elérhető {title}</p>
                )}
            </div>
        </div>
    );

    return (
        <>
            <Header title="Üdvözölünk!" />
            
            {!loading && (
                <section className="user-content">
                    <ItemsList items={borrowedItems} title="Kölcsönzött termékek" />
                    <ItemsList items={books} title="Könyvek" />
                    <ItemsList items={movies} title="Filmek" />
                </section>
            )}
        </>
    );
};

export default UserBody;