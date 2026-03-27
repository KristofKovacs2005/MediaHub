import "./about_us.css"
import kristof from "../../../assets/kristofPic.jpg"
import marci from "../../../assets/marci.png"
export function AboutUs() {
    return (
        <section className="about-us container">
            <div className="row align-items-center g-5">

                {/* TEXT */}
                <div className="col-12 col-lg-6">
                    <h2 className="mb-3 text-header">Rólunk</h2>
                    <p className="about-text">
                        A MediaHub egy modern webalkalmazás, amely könyvtárak számára készült,
                        hogy egyszerűen és hatékonyan kezelhessék digitális leltárukat és kölcsönzéseiket.
                        A rendszer lehetővé teszi a könyvek és egyéb termékek nyilvántartását,
                        azok adatainak kezelését, valamint a felhasználók számára az egyszerű böngészést és keresést.

                        <br /><br />

                        A felhasználók képesek véleményt írni, értékelni a termékeket, valamint
                        kölcsönzési igényeket leadni, míg a könyvtárosok és moderátorok teljes körű
                        kezelési lehetőségekkel rendelkeznek a kölcsönzések, felhasználók és visszajelzések felett.

                        <br /><br />

                        A célunk egy stabil, megbízható és könnyen bővíthető rendszer létrehozása,
                        amely hosszú távon segíti a könyvtárak digitális fejlődését és javítja
                        a felhasználói élményt.

                        <br /><br />

                        A projekt készítői:
                        <strong> Kovács Kristóf</strong> (Backend) és
                        <strong> Lóránt Márton</strong> (Frontend).

                        <br /><br />

                        A MediaHub a Szoftverfejlesztő és Tesztelő képzés
                        vizsgaprojektjeként készült.
                    </p>
                </div>

                {/* IMAGES */}
                <div className="col-12 col-lg-6">
                    <div className="row g-4 justify-content-center">

                        {/* Kristóf */}
                        <div className="col-6 text-center">
                            <div className="about-card p-3 shadow-sm">
                                <img
                                    src={kristof}
                                    alt="Kovács Kristóf"
                                    className="img-fluid rounded-circle mb-2"
                                />
                                <div className="fw-semibold">Kovács Kristóf</div>
                                <small className="text-muted">Backend</small>
                            </div>
                        </div>

                        {/* Márton */}
                        <div className="col-6 text-center">
                            <div className="about-card p-3 shadow-sm">
                                <img
                                    src={marci}
                                    alt="Lóránt Márton"
                                    className="img-fluid rounded-circle mb-2"
                                />
                                <div className="fw-semibold">Lóránt Márton</div>
                                <small className="text-muted">Frontend</small>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </section>
    );
}