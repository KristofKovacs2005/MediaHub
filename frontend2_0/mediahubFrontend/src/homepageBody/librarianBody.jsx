
import { Header } from '../components/header/header';
import { StatisticContainer } from '../components/charts/statistics/statisticContainer';
import { useState, useEffect } from 'react';
import '../styles/homePageHandler.css';
import { PieChart } from '../components/charts/pieChart/pieChart';


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

export default LibrarianBody;