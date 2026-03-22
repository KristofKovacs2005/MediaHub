export function AboutUs() {
    return (
        <div className="about-us-container">
            <section>
                <div className="about-us-image">
                    <div>
                    <img src="/assets/kristof.jpg" alt="Rólunk" id="#kristof"/>
                    <label htmlFor="#kristof">Kovács Kristóf</label>
                    </div>
                    <div>
                    <img src="/assets/marton.png" alt="Rólunk" id="#marton" />
                    <label htmlFor="#marton">Lóránt Márton</label>
                    </div>
                </div>
                <div className="about-us-text">
                <h1>Rólunk</h1>
                    <p>Ez a weboldal a Mediahub projektje. A webalaklmazás feladata a felhasználók kölcsönzésének digitális könyvelése és kezelése. 
                    A projekt két fő készítette Kovács Kristóf(Backend) és Lóránt Márton(FrontEnd). 
                    A projekt készült a Szoftverfejlesztő és Tesztelő vizsga projektremek beadandójaként.</p>
                </div>
            </section>
        </div>
    );
}