import { useState, useEffect } from 'react';
import { renderNavbar } from '../components/navbar/renderNavbar';
import { Footer } from '../components/footer/footer';
import { Header } from '../components/header/header';
import { StatisticContainer } from '../components/charts/statistics/statisticContainer';
import { PieChart } from '../components/charts/pieChart/pieChart';
import { applyFilters } from './useFilter';
import eltekonyvtarimage from '../assets/ELTE-konyvtar.png';
import '../styles/homePageHandler.css';

const HomePageHandler = () => {
    const userRole = localStorage.getItem('userRole') || 'guest';

    // Render complete page layout based on user role
    const renderPage = () => {
        switch (userRole) {
            case 'guest':
                return (
                    <>
                        {renderNavbar()}
                        <main className="body-content">
                            <GuestBody />
                        </main>
                        <Footer />
                    </>
                );
            case 'user':
                return (
                    <>
                        {renderNavbar()}
                        <main className="body-content">
                            <UserBody />
                        </main>
                        <Footer />
                    </>
                );
            case 'librarian':
                return (
                    <>
                        {renderNavbar()}
                        <main className="body-content">
                            <LibrarianBody />
                        </main>
                        <Footer />
                    </>
                );
            case 'admin':
                return (
                    <>
                        {renderNavbar()}
                        <main className="body-content">
                            <AdminBody />
                        </main>
                        <Footer />
                    </>
                );
            default:
                return (
                    <>
                        {renderNavbar()}
                        <main className="body-content">
                            <GuestBody />
                        </main>
                        <Footer />
                    </>
                );
        }
    };

    return (
        <div className="home-page-container">
            {renderPage()}
        </div>
    );
};

// GUEST BODY CONTENT
const GuestBody = () => {
    const [nameFilter, setNameFilter] = useState('');
    const [tagsFilter, setTagsFilter] = useState([]);
    const [authorFilter, setAuthorFilter] = useState('');
    const [stats, setStats] = useState([]);
    const [statsLoading, setStatsLoading] = useState(true);

    // Fetch statistics once on mount from existing routes
    useEffect(() => {
        const fetchStatistics = async () => {
            try {
                // Fetch items
                const itemsResponse = await fetch('http://localhost:3000/items');
                const itemsData = itemsResponse.ok ? await itemsResponse.json() : [];
                
                // Fetch reviews
                const reviewsResponse = await fetch('http://localhost:3000/reviews');
                const reviewsData = reviewsResponse.ok ? await reviewsResponse.json() : [];
                
                // Format statistics
                const formattedStats = [
                    {
                        value: itemsData.length?.toString() || '0',
                        title: 'Termékek',
                        color: '#3498db'
                    },
                    {
                        value: reviewsData.length?.toString() || '0',
                        title: 'Értékelések',
                        color: '#e74c3c'
                    }
                ];
                
                setStats(formattedStats);
            } catch (error) {
                console.error('Error fetching statistics:', error);
            } finally {
                setStatsLoading(false);
            }
        };

        fetchStatistics();
    }, []); // Empty dependency array - fetch only once

    const handleSearch = (e) => {
        e.preventDefault();
        applyFilters({
            nameFilter,
            tagsFilter,
            authorFilter,
            setLoading: () => {},
            setItems: () => {},
            setError: () => {},
            fetchFn: () => {}
        });
    };

    return (
        <>
            <Header 
                title="MediaHub" 
                subtitle="A MediaHub a legjobb helyre az összes médiatartalmaidhoz"
                image={eltekonyvtarimage}
            />

            {!statsLoading && stats.length > 0 && (
                <section className="statistics-section">
                    <h2>Statisztikák</h2>
                    <StatisticContainer stats={stats} />
                </section>
            )}

            <section className="search-section">
                <form onSubmit={handleSearch} className="search-form">
                    <input
                        type="text"
                        placeholder="Keresés..."
                        className="search-input"
                        value={nameFilter}
                        onChange={(e) => setNameFilter(e.target.value)}
                    />
                    <button type="submit" className="search-button">
                        🔍
                    </button>
                </form>
            </section>

            <section className="about-section">
                <div className="about-container">
                    <div className="about-card">
                        <div className="card-image" style={{ backgroundImage: `url(${eltekonyvtarimage})` }}></div>
                    </div>
                    <div className="about-text">
                        <h2>Rólunk</h2>
                        <p>A MediaHub egy innovatív platform, amely a digitális médianyagok szervezésére és megosztására szolgál. Könnyűden kereshet, böngészhet és kezelhet különféle média típusokat egyetlen helyen.</p>
                        <p>Az ELTE Könyvtár partnerségével biztosítjuk, hogy a legmagasabb minőségű tartalom áll rendelkezésedre. Csatlakozhatsz közösségünkhöz és fedezd fel a tudás világát.</p>
                    </div>
                </div>
            </section>
        </>
    );
};

// USER BODY CONTENT
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

// LIBRARIAN BODY CONTENT
const LibrarianBody = () => {
    const [orderStats, setOrderStats] = useState([]);
    const [itemStats, setItemStats] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch librarian statistics on mount
    useEffect(() => {
        const fetchLibrarianStats = async () => {
            try {
                // Fetch orders to count by status
                const ordersResponse = await fetch('http://localhost:3000/orders', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                    }
                });
                const ordersData = ordersResponse.ok ? await ordersResponse.json() : [];
                
                // Count orders by status (assuming status values: 0=pending, 1=accepted, 2=late)
                const pending = ordersData.filter(o => o.status === 0).length;
                const accepted = ordersData.filter(o => o.status === 1).length;
                const late = ordersData.filter(o => o.status === 2).length;

                const orderStatsData = [
                    {
                        value: pending.toString(),
                        title: 'Függőben',
                        color: '#f39c12'
                    },
                    {
                        value: accepted.toString(),
                        title: 'Elfogadott',
                        color: '#2ecc71'
                    },
                    {
                        value: late.toString(),
                        title: 'Késő',
                        color: '#e74c3c'
                    }
                ];
                
                setOrderStats(orderStatsData);

                // Fetch items to categorize by type
                const itemsResponse = await fetch('http://localhost:3000/items');
                const itemsData = itemsResponse.ok ? await itemsResponse.json() : [];
                
                // Count items by type (you may need to adjust based on actual item structure)
                const typeCount = {};
                itemsData.forEach(item => {
                    const type = item.type || 'Ismeretlen';
                    typeCount[type] = (typeCount[type] || 0) + 1;
                });

                const itemStatsData = Object.entries(typeCount).map(([type, count]) => ({
                    type,
                    value: count
                }));
                
                setItemStats(itemStatsData);
            } catch (error) {
                console.error('Error fetching librarian statistics:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchLibrarianStats();
    }, []);

    return (
        <>
            <Header title="Könyvtáros Panel" />
            
            {!loading && orderStats.length > 0 && (
                <section className="statistics-section">
                    <h2>Rendelések Statisztikái</h2>
                    <StatisticContainer stats={orderStats} />
                </section>
            )}

            {!loading && itemStats.length > 0 && (
                <section className="statistics-section">
                    <h2>Termékek Típusa Szerint</h2>
                    <PieChart data={itemStats} />
                </section>
            )}
        </>
    );
};

// ADMIN BODY CONTENT
const AdminBody = () => {
    const [userStats, setUserStats] = useState([]);
    const [commentStats, setCommentStats] = useState([]);
    const [statsLoading, setStatsLoading] = useState(true);

    // Fetch admin statistics on mount
    useEffect(() => {
        const fetchAdminStats = async () => {
            try {
                // Fetch users to count by status
                const usersResponse = await fetch('http://localhost:3000/users', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                    }
                });
                const usersData = usersResponse.ok ? await usersResponse.json() : [];
                
                // Count users by status
                const banned = usersData.filter(u => u.status === 0).length;
                const warned = usersData.filter(u => u.status === 1).length;
                const normal = usersData.filter(u => u.status === 2).length;
                const librarian = usersData.filter(u => u.status === 4).length;

                const userStatsData = [
                    {
                        value: banned.toString(),
                        title: 'Tiltott Felhasználók',
                        color: '#e74c3c'
                    },
                    {
                        value: warned.toString(),
                        title: 'Figyelmeztetett',
                        color: '#f39c12'
                    },
                    {
                        value: normal.toString(),
                        title: 'Normál Felhasználók',
                        color: '#2ecc71'
                    },
                    {
                        value: librarian.toString(),
                        title: 'Könyvtárosok',
                        color: '#3498db'
                    }
                ];
                
                setUserStats(userStatsData);

                // Fetch reviews to count flagged ones
                const reviewsResponse = await fetch('http://localhost:3000/reviews/flagged', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                    }
                });
                const reviewsData = reviewsResponse.ok ? await reviewsResponse.json() : [];

                const commentStatsData = [
                    {
                        value: reviewsData.length.toString(),
                        title: 'Bejelentett Megjegyzések',
                        color: '#e67e22'
                    }
                ];

                setCommentStats(commentStatsData);
            } catch (error) {
                console.error('Error fetching admin statistics:', error);
            } finally {
                setStatsLoading(false);
            }
        };

        fetchAdminStats();
    }, []);

    return (
        <>
            <Header title="Admin Panel" />
            
            {!statsLoading && userStats.length > 0 && (
                <section className="statistics-section">
                    <h2>Felhasználó Statisztikák</h2>
                    <StatisticContainer stats={userStats} />
                </section>
            )}

            {!statsLoading && commentStats.length > 0 && (
                <section className="statistics-section">
                    <h2>Megjegyzés Statisztikák</h2>
                    <StatisticContainer stats={commentStats} />
                </section>
            )}
        </>
    );
};

export default HomePageHandler;
