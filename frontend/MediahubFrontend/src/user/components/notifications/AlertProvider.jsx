import { useEffect, useRef, useState } from "react";
import "./alertProvider.css";

function buildAlertTone(message) {
    const text = String(message || "").toLowerCase();

    if (
        text.includes("hiba") ||
        text.includes("sikertelen") ||
        text.includes("nincs") ||
        text.includes("tilt") ||
        text.includes("ellenorizd")
    ) {
        return "error";
    }

    if (
        text.includes("siker") ||
        text.includes("udvoz") ||
        text.includes("visszaallitva") ||
        text.includes("torolve")
    ) {
        return "success";
    }

    return "info";
}

export default function AlertProvider({ children }) {
    const [alerts, setAlerts] = useState([]);
    const timeoutsRef = useRef(new Map());

    useEffect(() => {
        const nativeAlert = window.alert;

        window.alert = (message) => {
            const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
            const nextAlert = {
                id,
                message: String(message ?? ""),
                tone: buildAlertTone(message),
            };

            setAlerts((current) => [...current, nextAlert]);

            const timeoutId = window.setTimeout(() => {
                setAlerts((current) => current.filter((alert) => alert.id !== id));
                timeoutsRef.current.delete(id);
            }, 4200);

            timeoutsRef.current.set(id, timeoutId);
        };

        return () => {
            window.alert = nativeAlert;
            timeoutsRef.current.forEach((timeoutId) => window.clearTimeout(timeoutId));
            timeoutsRef.current.clear();
        };
    }, []);

    const dismissAlert = (id) => {
        const timeoutId = timeoutsRef.current.get(id);
        if (timeoutId) {
            window.clearTimeout(timeoutId);
            timeoutsRef.current.delete(id);
        }

        setAlerts((current) => current.filter((alert) => alert.id !== id));
    };

    return (
        <>
            {children}
            <div className="app-alert-stack" aria-live="polite" aria-atomic="true">
                {alerts.map((alert) => (
                    <div
                        key={alert.id}
                        className={`app-alert app-alert-${alert.tone}`}
                        role="status"
                    >
                        <div className="app-alert-copy">
                            <span className="app-alert-badge">
                                {alert.tone === "success" ? "OK" : alert.tone === "error" ? "Hiba" : "Info"}
                            </span>
                            <p>{alert.message}</p>
                        </div>
                        <button
                            type="button"
                            className="app-alert-close"
                            aria-label="Értesítés bezárása"
                            onClick={() => dismissAlert(alert.id)}
                        >
                            ×
                        </button>
                    </div>
                ))}
            </div>
        </>
    );
}
