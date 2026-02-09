import { redirect } from "react-router-dom";

export function getTokenDuration() {
    const storedDate = localStorage.getItem('expiration');
    const now = new Date();

    const duration = new Date(storedDate).getTime() - now.getTime();

    return duration;
}

export function getAuthToken() {
    const token = localStorage.getItem("authToken");

    if (!token) {
        return null;
    }

    const duration = getTokenDuration();
    if (duration < 0) {
        return 'EXPIRED';
    }

    return token;
}

export function tokenLoader() {
    return getAuthToken();
}

export function checkAuthLoader() {
    const token = getAuthToken();

    if (!token)
        return redirect('/');
}