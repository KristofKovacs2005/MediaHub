
import { Header } from '../components/header/header';
import { StatisticContainer } from '../components/charts/statistics/statisticContainer';
import applyFilters from '../functions/useFilter';
import eltekonyvtarimage from '../assets/ELTE-konyvtar.png';
import { useState, useEffect } from 'react';
import '../styles/homePageHandler.css';

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

export default GuestBody;