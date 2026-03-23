import { redirect } from "react-router-dom";

export function getTokenDuration() {
    const storedDate = localStorage.getItem('expiration');
    const now = new Date();

    const duration =new Date(storedDate).getTime()- now.getTime();
    console.log(duration)
    return duration;
}

export function getAuthToken() {
    const token = localStorage.getItem("authToken");
    if (!token) return null;

    const duration = getTokenDuration();
    if (duration < 0) return null; // expired treated as no token
    return token;
}

export function tokenLoader() {
    return getAuthToken();
}

export function getAuthStatus() {
    const status = localStorage.getItem("status");
    return status ? Number(status) : null; // always a number or null
}

export const MESSAGES = {
    banned: "Ön kilett tíltva a weboldalról",
    unauthorized: "Nincs ehez jogosultsága"
};

export function authLoader({ minRole = 1, redirectUrl = '/' } = {}) {
    const status = getAuthStatus();
    const token = getAuthToken();

    // banned user
    if (status === 3) {
        alert(MESSAGES.banned);
        return redirect("https://www.google.com");
    }

    // no token or insufficient role
    if (!token || status < minRole) {
        alert(MESSAGES.unauthorized);
        return redirect(redirectUrl);
    }

    return token; // everything ok
}

