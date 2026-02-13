import "./hero.css"

export default function Hero(){
    return(
        <section className="hero-banner" role="banner" aria-label="Welcome to MediaHub">
                    <div className="hero-inner">
                        <div className="hero-copy">
                            <h1>Welcome to MediaHub</h1>
                            <p>Borrow films, books and more — discover something new today.</p>
                        </div>
                    </div>
                </section>
    )
}