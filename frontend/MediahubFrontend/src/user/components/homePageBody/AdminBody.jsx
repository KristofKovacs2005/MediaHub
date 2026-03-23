import { useEffect, useState } from "react";
import { fetchUsers } from "../../functions/users";
import { Header } from "../header/header";
import ReportedReviews from "../sections/reportedReviews";
export default function AdminBody() {
    const [users, setUsers] = useState([]);
    const { report, loading, error } = useGetReportedReviews();

    useEffect(() => {
        fetchUsers(setUsers);
    }, []);

    const labels = [
        "Felhasználó",
        "Figyelmeztetett",
        "Tiltott",
        "Könyvtáros",
        "Admin"
    ];

    const values = [1, 2, 3, 4, 5].map(status =>
        users.filter(user => user.status === status).length
    );

    return (
        <div className="admin-body">
            <Header />
            <main className="body-content">
                <BarChart
                    valuesArray={values}
                    labelsArray={labels}
                    title="Felhasználók jogosultság szerint"
                    onBarClick={(label) => console.log(label)}
                />

                <ReportedReviews value={report?.length || 0} />
            </main>
        </div>
    );
}