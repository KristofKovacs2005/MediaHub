import konyvIcon from "../../assets/book-open-cover.png"
import filmIcon from "../../assets/play-alt.png"

export function Cards() {
    return (
        <table className="kartyaTable">
            <tbody>
                <tr className="kartya">
                    <td>
                        <div className="kartyakDivKonyv">
                            <img className="bigCardPicIcon" src={konyvIcon} alt="Könyvek" id="könyvICon" />
                        </div>
                    </td>
                    <td >
                        <div className="kartyakDivFilm">
                            <img className="bigCardPicIcon" src={filmIcon} alt="Filmek" id="filmICon" /><br />
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    )
}