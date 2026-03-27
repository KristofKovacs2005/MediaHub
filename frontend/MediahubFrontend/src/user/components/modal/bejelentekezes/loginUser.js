import { apiCall } from "../../../functions/apiCall";

export const handleLogIn = async (event) => {
    event.preventDefault();
    const form = event.target;
    const email = (document.getElementById("logInUser")?.value || '').trim();
    const password = (document.getElementById("logInPassword")?.value || '');
    const url = "http://localhost:3000/users/login";

    const errors = [];
    if (!email) errors.push('email');
    if (!/^\S+@\S+\.\S+$/.test(email)) errors.push('email');
    if (password.length < 6) errors.push('password');

    if (errors.length > 0) {
        alert('Kérlek ellenőrizd a következő mezőket: ' + errors.join(', '));
        return;
    }

    try {
        const json = await apiCall(url, "POST", { email, password });

        // Store token and user info
        if (json.token) {
            localStorage.setItem('authToken', json.token);
            localStorage.setItem('username', json.username);
            localStorage.setItem('status', json.status);
        }

        if (form && typeof form.reset === 'function') form.reset();

        document.dispatchEvent(new CustomEvent('user-loged-in', { detail: { email, token: json.token } }));
        alert(`Üdvözöljük a Mediahubon ${email}`);

        // Set expiration 1 hour from now
        const expiration = new Date();
        expiration.setHours(expiration.getHours() + 1);
        localStorage.setItem('expiration', expiration.toISOString());

        window.location.reload();

    } catch (error) {
        alert('Hálózati hiba történt: ' + (error.message || error));
    }
};