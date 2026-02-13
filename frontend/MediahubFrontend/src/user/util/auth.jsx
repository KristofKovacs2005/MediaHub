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

export function checkAuthUserLoader() {
    const status = checkStatus();//Státusz(jogosultság) lekérése
    const token = getAuthToken();//Token lekérése
    if(status == 3){
        alert("Ön kilett tíltva a weboldalról");
        return redirect("https://www.google.com");//a kitíltott usert automatikus kidobja a weboldalról!
    }
    if (!token)//ha nincs token akkor visszatér a főoldalra
        return redirect('/');
    return token;//ha minden rendben akkor vissza tér a tokennel
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

export function checkAuthAdminLoader(){//Csak az admin weblapok loader ellenörzője
    const status = checkStatus();//Státusz(jogosultság) lekérése
    const token = getAuthToken();//Token lekérése
    if(status != 5){//ha nem admin akkor vissza tér a fő oldalra
        alert("Nincs ehez jogosultsága")
        return redirect("/")
    }
    if(status == 3){
        alert("Ön kilett tíltva a weboldalról");
        return redirect("https://www.google.com");//a kitíltott usert automatikus kidobja a weboldalról!
    }
    if (!token)//ha nincs token akkor visszatér a főoldalra
        return redirect('/');
    return token;//ha minden rendben akkor vissza tér a tokennel
}

export function checkAuthKonyvtarosOrAdminLoader(){//Könyvtáros és Adminisztrátorok weblapjainak loader ellenőrzője
    const status = checkStatus();//Státusz(jogosultság) lekérése
    const token = getAuthToken();//Token lekérése
    if(status < 4){//ha a jogosultság legalább nem a könyvtáros szintet éri el akkor a felhasználót vissza dobja a főoldalra
        alert("Nincs ehez jogosultsága")
        return redirect("/")
    }
    if(status == 3){
        alert("Ön kilett tíltva a weboldalról");
        return redirect("https://www.google.com");//a kitíltott usert automatikus kidobja a weboldalról!
    }
    if (!token)//ha nincs token akkor visszatér a főoldalra
        return redirect('/');
    return token;//ha minden rendben akkor vissza tér a tokennel
}