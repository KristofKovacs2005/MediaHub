import { apiCall } from "../../../functions/apiCall";

export default async function postUser(event) {
    event.preventDefault(); // Prevent default form submission
    const form = event.target;
    const username = (document.getElementById("username")?.value || '').trim();
    const email = (document.getElementById("email")?.value || '').trim();
    const password = (document.getElementById("password")?.value || '');
    const confirmPassword = (document.getElementById("confirmPassword")?.value || '');
    const url = "http://localhost:3000/users"; // Backend endpoint

    const errors = [];
    if (!username) errors.push('username');
    if (!/^\S+@\S+\.\S+$/.test(email)) errors.push('email');
    if (password.length < 6) errors.push('password');
    if (password !== confirmPassword) errors.push('confirmPassword');

    if (errors.length > 0) {
        alert('Kérlek ellenőrizd a következő mezőket: ' + errors.join(', '));
        return;
    }

    const userData = { username, email, password, status: 1 };

    try {
        await apiCall(url, "POST", userData);

        if (form && typeof form.reset === 'function') form.reset();

        // Auto-login after successful registration
        try {
            const loginJson = await apiCall("http://localhost:3000/users/login", "POST", { email, password });
            if (loginJson.token) {
                localStorage.setItem('authToken', loginJson.token);
                localStorage.setItem('username', loginJson.username);
                localStorage.setItem('status', loginJson.status);
                const expiration = new Date();
                expiration.setHours(expiration.getHours() + 1);
                localStorage.setItem('expiration', expiration.toISOString());
            }
        } catch (_) {
            // Login failed silently — user can log in manually
        }

        document.dispatchEvent(new CustomEvent('user-created', { detail: { username } }));
        document.dispatchEvent(new CustomEvent('user-loged-in', { detail: { email } }));
        alert('Sikeres regisztráció!');
        window.location.reload();

    } catch (error) {
        alert('Sikertelen regisztráció: ' + (error.message || error));
    }
}