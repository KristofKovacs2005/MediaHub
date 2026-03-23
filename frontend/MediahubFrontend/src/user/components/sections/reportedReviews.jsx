import mail from "../../../assets/mail.jpg";
import "./reportedReviews.css";
export default function ReportedReviews({value}) {
    return (
        <section className="reported-reviews">
            {value > 0 ? (
                <div>
                    <img src={mail} alt="Reported Reviews" />
                    <h2>Jelentett értékelések</h2>
                    <p>{value}</p>
                </div>
            ): (
                <div>
                    <h2>Nincsenek jelentett értékelések</h2>
                </div>
            )}
        </section>
    );
}