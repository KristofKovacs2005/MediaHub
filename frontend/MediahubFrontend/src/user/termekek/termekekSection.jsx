import Termek from "./termek";

export default function TermekekSection({items}) {
    return (
        <section className="termekekSection">
				{items.length === 0 ? (
					<p>No items found.</p>
				) : (
					<section className="kartyakSection">
						{items.map((it, idx) => (
							<Termek
								key={it?.i_id ?? it?.id ?? idx}
								author={it?.author}
								i_name={it?.i_name}
								img_url={it?.img_url}
								i_description={it?.i_description}
							/>
						))}
					</section>
				)}
			</section>
    );
}