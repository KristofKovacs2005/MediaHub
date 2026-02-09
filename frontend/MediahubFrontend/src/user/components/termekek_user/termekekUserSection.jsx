import Termek_User from "./termekUser";

export default function TermekekSectionUser({items}) {
    return (
        <section className="termekekSection">
                {items.length === 0 ? (
                    <p>No items found.</p>
                ) : (
                    
                    <section className="kartyakSection">
                        {items.map((it, idx) => (
                            <Termek_User
                                key={it?.i_id ?? it?.id ?? idx}
                                i_id={it?.i_id}
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