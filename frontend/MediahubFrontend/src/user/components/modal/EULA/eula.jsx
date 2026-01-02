export default function MediaHubTerms({isClose}) {
    return (
        <section className="terms-container">
            <button className="closeButton" onClick={isClose}>X</button>
            <h1>Felhasználási Feltételek és Végfelhasználói Licencszerződés (EULA)</h1>
            <p><strong>Utolsó frissítés:</strong> [DÁTUM]</p>

            <p>
                A <strong>MediaHub</strong> webalkalmazás („Szolgáltatás”) használatával,
                regisztrációval vagy bejelentkezéssel Ön elfogadja a jelen
                Felhasználási Feltételeket és Végfelhasználói Licencszerződést („Szerződés”).
                Ha bármely ponttal nem ért egyet, a Szolgáltatás nem használható.
            </p>

            <h2>1. A Szolgáltatás leírása</h2>
            <p>
                A MediaHub egy online platform, amely lehetővé teszi könyvek, filmek
                és egyéb médiatartalmak böngészését, kölcsönzését és visszaszolgáltatását
                a jelen Szerződésben foglalt szabályok szerint.
            </p>

            <h2>2. Jogosultság</h2>
            <ul>
                <li>Legalább 16 éves életkor (GDPR korhatár)</li>
                <li>Valós és pontos adatok megadása regisztrációkor</li>
            </ul>

            <h2>3. Regisztráció és hozzáférés</h2>
            <p>
                A felhasználó felelős a fiókja biztonságáért.
                Egy személy csak egy fiókot használhat, kivéve külön engedéllyel.
            </p>

            <h2>4. Felhasználói magatartás</h2>
            <ul>
                <li>Jogszabálysértés tilos</li>
                <li>A rendszer rongálása vagy megkerülése tilos</li>
                <li>Zaklatás és visszaélés tilos</li>
                <li>Jogvédett tartalom engedély nélküli megosztása tilos</li>
            </ul>

            <h2>5. Kölcsönzési feltételek</h2>
            <p>
                A kölcsönzött tartalmakat határidőre és megfelelő állapotban kell
                visszaszolgáltatni. Késedelem vagy károkozás esetén korlátozás
                vagy fiókmegszüntetés alkalmazható.
            </p>

            <h2>6. Fiókfelfüggesztés és kitiltás</h2>
            <p>
                A MediaHub jogosult a felhasználó fiókját figyelmeztetni,
                felfüggeszteni vagy véglegesen kitiltani a szabályok megszegése esetén.
            </p>

            <h2>7. Szellemi tulajdon</h2>
            <p>
                A MediaHub minden tartalma jogvédett. A szolgáltatás kizárólag
                személyes, nem kereskedelmi célra használható.
            </p>

            <h2>8. Adatkezelés (GDPR)</h2>
            <p>
                A MediaHub a személyes adatokat az EU GDPR rendelete
                és a magyar Infotv. alapján kezeli.
            </p>

            <h2>9. Felelősségkizárás</h2>
            <p>
                A szolgáltatás „jelen állapotában” kerül biztosításra.
                A MediaHub nem vállal felelősséget adatvesztésért vagy szolgáltatáskimaradásért.
            </p>

            <h2>10. Irányadó jog</h2>
            <p>
                A jelen Szerződésre Magyarország jogszabályai az irányadók.
                Jogvita esetén a budapesti bíróságok illetékesek.
            </p>

            <h2>Kapcsolat</h2>
            <p>
                Email: <a href="mailto:support@mediahub.hu">support@mediahub.hu</a>
            </p>
        </section>
    );
}