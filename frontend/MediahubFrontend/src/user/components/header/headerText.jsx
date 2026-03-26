import "./headerCss.css"
export default function HeaderText() {
    return (
        <div 
            className="header-hero"
            style={{ backgroundImage: "url('/images/header.jpg')" }} // <-- change this
        >
            <div className="header-content">
                <h1 className="header-title">
                    Üdvözlünk a MediaHubon!
                </h1>

                <p className="header-subtitle">
                    Fedezd fel könyveink, filmjeink és egyéb médiatartalmaink széles választékát.
                    Kölcsönözz, értékelj és oszd meg véleményed a közösséggel!
                </p>
                
                
            </div>
        </div>
    );
}