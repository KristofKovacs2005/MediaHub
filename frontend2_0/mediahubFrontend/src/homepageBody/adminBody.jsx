
import { Header } from '../components/header/header';
import { StatisticContainer } from '../components/charts/statistics/statisticContainer';
import { useState, useEffect } from 'react';
import '../styles/homePageHandler.css';

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

export default AdminBody;