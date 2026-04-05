import { useEffect, useState } from "react";
import { updateUserStatus } from "../../functions/users";

const STATUS_LABELS = {
    1: "Felhasználó",
    2: "Figyelmeztetett felhasználó",
    3: "Felfüggesztett felhasználó",
    4: "Könyvtáros",
    5: "Moderátor",
};

const STATUS_OPTIONS = [1, 2, 3, 4];

function getStatusLabel(status) {
    return STATUS_LABELS[status] || `Ismeretlen (${status})`;
}

export function UserHandlingRow({ user, onStatusUpdated }) {
    const [selectedStatus, setSelectedStatus] = useState(user.status);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        setSelectedStatus(user.status);
    }, [user.status]);

    const handleSave = async () => {
        if (selectedStatus === user.status) {
            return;
        }

        try {
            setSaving(true);
            await updateUserStatus(user.u_id, selectedStatus);
            onStatusUpdated(user.u_id, selectedStatus);
        } catch (error) {
            alert(error.message || "Nem sikerult a statuszt modositani.");
        } finally {
            setSaving(false);
        }
    };

    return (
        <tr className="user-handling-row">
            <td className="user-handling-cell">{user.u_id}</td>
            <td className="user-handling-cell">{user.username}</td>
            <td className="user-handling-cell">{user.email}</td>
            <td className="user-handling-cell">{getStatusLabel(user.status)}</td>
            <td className="user-handling-cell">
                <div className="user-handling-actions">
                    <select
                        className="form-select user-handling-select"
                        value={selectedStatus}
                        onChange={(event) => setSelectedStatus(Number(event.target.value))}
                        disabled={saving}
                    >
                        {STATUS_OPTIONS.map((status) => (
                            <option key={status} value={status}>
                                {getStatusLabel(status)}
                            </option>
                        ))}
                    </select>
                    <button
                        className="btn btn-primary"
                        onClick={handleSave}
                        disabled={saving || selectedStatus === user.status}
                    >
                        {saving ? "Mentes..." : "Mentes"}
                    </button>
                </div>
            </td>
        </tr>
    );
}
