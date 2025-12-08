import konyvIcon from "../../assets/book-open-cover.png"
import filmIcon from "../../assets/play-alt.png"

export function Cards(){
    return(
        <section className="kartyakSection">
            <div className="kartyakDivKonyv">
                <img src={konyvIcon} alt="Könyvek" id="könyvICon"/>
                <h3>Könyvek</h3>
            </div>
            <div className="kartyakDivFilm">
                <img src={filmIcon} alt="Filmek" id="filmICon"/>
                <h3>Filmek</h3>
            </div>
        </section>
    )
}