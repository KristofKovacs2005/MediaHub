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

export function getAuthStatus(){
    const status = localStorage.getItem("status")
    return status;
}

export function checkStatus(){//megnézi hogy van a token el lett tárolva a localStorage-ben vagy sem
    const status = getAuthStatus();
    if(!status){//ha nincs akkor visszadobja a felhasználót a főoldalra, vagy ha a főoldalon van akkor a lapot újra tölti, és egyben kijelentkezteti a felhasználót
        alert("Hiba a jogosúltsággal légyszíves jelentkez be újra!")
        localStorage.clear();//minden adatot töröl
        if(window.location == "/"){//itt nézi meg hogy a weblap az a főoldal vagy sem
            window.location.reload();
        }
        return redirect("/")
    }
    return Number(status)
}

// Generalized role-check loader
export function checkAuthRoleLoader(requiredRole) {
    const status = checkStatus();
    const token = getAuthToken();
    if (status == 3) {
        alert("Ön kilett tíltva a weboldalról");
        return redirect("https://www.google.com");
    }
    if (!token) {
        return redirect('/');
    }
    // Admin: requiredRole = 5
    // Librarian/Admin: requiredRole = 4 (librarian or higher)
    if (typeof requiredRole === 'number') {
        if (status < requiredRole) {
            alert("Nincs ehhez jogosultsága");
            return redirect("/");
        }
    }
    return token;
}

// Backward compatibility
export function checkAuthAdminLoader() {
    return checkAuthRoleLoader(5);
}
export function checkAuthKonyvtarosOrAdminLoader() {
    return checkAuthRoleLoader(4);
}

export function checkAuthUserLoader(){
    return checkAuthRoleLoader(1);
}