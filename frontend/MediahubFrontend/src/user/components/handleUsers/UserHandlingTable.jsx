import { useEffect, useState } from "react";
import { getUsers } from "../../functions/users";
import { UserHandlingRow } from "./UserHandlingRow";
import "./userHandling.css";

export default function UserHandlingTable() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadUsers = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await getUsers();
            setUsers(Array.isArray(data) ? data : []);
        } catch (loadError) {
            setError(loadError.message || "Nem sikerult a felhasznalokat betolteni.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadUsers();
    }, []);

    const handleStatusUpdated = (userId, newStatus) => {
        setUsers((currentUsers) =>
            currentUsers.map((user) =>
                user.u_id === userId ? { ...user, status: newStatus } : user
            )
        );
    };

    if (loading) return <p>Betoltes...</p>;
    if (error) return <p className="text-danger">Hiba: {error}</p>;
    if (users.length === 0) return <p>Nincsenek felhasznalok.</p>;

    return (
        <div className="user-handling-container">
            <table className="user-handling-table table-auto min-w-[600px]">
                <thead>
                    <tr>
                        {[
                            "Felhasználó  ID",
                            "Felhasználónév",
                            "Email",
                            "Státusz",
                            "Művelet",
                        ].map((head) => (
                            <th key={head} className="user-handling-cell">{head}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <UserHandlingRow
                            key={user.u_id}
                            user={user}
                            onStatusUpdated={handleStatusUpdated}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
}
