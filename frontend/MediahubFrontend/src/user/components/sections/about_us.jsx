import "./about_us.css"
export function AboutUs() {
    return (
        <section className="about-us container">
            <div className="row align-items-center g-5">

                {/* TEXT */}
                <div className="col-12 col-lg-6">
                    <h2 className="mb-3">Rólunk</h2>
                    <p className="text-muted">
                        Ez a weboldal a Mediahub projektje. A webalkalmazás feladata a 
                        felhasználók kölcsönzésének digitális könyvelése és kezelése.
                        <br /><br />
                        A projekt két fő készítette:
                        <strong> Kovács Kristóf</strong> (Backend) és 
                        <strong> Lóránt Márton</strong> (Frontend).
                        <br /><br />
                        A projekt a Szoftverfejlesztő és Tesztelő vizsga 
                        projektremek beadandójaként készült.
                    </p>
                </div>

                {/* IMAGES */}
                <div className="col-12 col-lg-6">
                    <div className="row g-4 justify-content-center">

                        {/* Kristóf */}
                        <div className="col-6 text-center">
                            <div className="about-card p-3 shadow-sm">
                                <img 
                                    src="/assets/kristof.jpg" 
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
                                    src="/assets/marton.png" 
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