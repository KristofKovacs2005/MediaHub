export default async function postUser(event) {
    event.preventDefault(); // Prevent the default form submission behavior
    const form = event.target;
    const username = (document.getElementById("username")?.value || '').trim();
    const email = (document.getElementById("email")?.value || '').trim();
    const password = (document.getElementById("password")?.value || '');
    const confirmPassword = (document.getElementById("confirmPassword")?.value || '');
    const url = "http://localhost:3000/users"; // Backend endpoint for user registration

    const errors = [];

    // Basic validation
    if (!username) errors.push('username');
    if (!/^\S+@\S+\.\S+$/.test(email)) errors.push('email');
    if (password.length < 6) errors.push('password');
    if (password !== confirmPassword) errors.push('confirmPassword');

    if (errors.length > 0) {
        // Simple feedback for now — you can replace this with inline field errors
        alert('Kérlek ellenőrizd a következő mezőket: ' + errors.join(', '));
        return;
    }

    const userData = {
        username: username,
        email: email,
        password: password,
        status: 1 // Default status
    };

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        });

        if (response.status === 201) {
            // Success — reset form and notify other components
            if (form && typeof form.reset === 'function') form.reset();
            document.dispatchEvent(new CustomEvent('user-created', { detail: { username } }));
            alert('Sikeres regisztráció!');
            return;
        }

        // Read body for error message if available
        let json = {};
        try { json = await response.json(); } catch (e) {}
        alert('Sikertelen regisztráció: ' + (json.message || response.status));

    } catch (error) {
        console.error("Hiba a felhasználó létrehozásakor:", error);
        alert('Hálózati hiba történt: ' + (error.message || error));
    }
}