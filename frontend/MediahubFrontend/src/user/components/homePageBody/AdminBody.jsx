import { useEffect, useState } from "react";
import { fetchUsers } from "../../functions/users";
import { Header } from "../header/header";
import ReportedReviews from "../sections/reportedReviews";
export function AdminBody() {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        fetchUsers(setUsers);
        const { report, loading, error } = useGetReportedReviews();
    }, []);

    const statusCounts = {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0
    };
    const labels = [
        "Felhasználó",
        "Figyelmeztetett",
        "Tiltott",
        "Könyvtáros",
        "Admin"
    ];

    const values = [
        statusCounts[1],
        statusCounts[2],
        statusCounts[3],
        statusCounts[4],
        statusCounts[5]
    ];

    users.forEach(user => {
        if (statusCounts[user.status] !== undefined) {
            statusCounts[user.status]++;
        }
    });
    return (
        <div className="admin-body">
            <Header />
            <main className="body-content">
                <BarChart
                    valuesArray={values}
                    labelsArray={labels}
                    title="Felhasználók jogosúltság szerint"
                    onBarClick={(label) => console.log(label)}
                />
                <ReportedReviews value={report.length} />
            </main>
        </div>
    );
}