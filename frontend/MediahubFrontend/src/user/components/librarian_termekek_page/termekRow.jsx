import { useState } from "react";
import { Link } from "react-router-dom"; // <-- import Link
import Modal from "../modal/modal";

export default function TermekRow({ termek, onActionComplete }) {
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);

    return (
        <tr>
            <td>{termek.i_name}</td>
            <td>{termek.author}</td>
            <td>{termek.i_description}</td>
            <td>{termek.tagek}</td>
            <td>
                {termek.img_url && <img src={"http://localhost:3000" + termek.img_url} alt={termek.i_name} />}
            </td>
            <td>
                {/* Use Link for navigation */}
                <Link
                    to={`/termek_details/termekmodositas/${termek.i_id}`} // <-- route to your modify page
                    className="btn btn-primary"
                >
                    Módosítás
                </Link>

                {/* Delete button remains modal */}
                <button className="btn btn-danger" onClick={() => setIsDeleteOpen(true)}>
                    Törlés
                </button>

                {/* Delete Modal */}
                {isDeleteOpen && (
                    <Modal isOpen={isDeleteOpen} isClose={() => setIsDeleteOpen(false)}>
                        <DeleteTermekModal
                            i_id={termek.i_id}
                            isClose={() => setIsDeleteOpen(false)}
                            onDelete={() => {
                                setIsDeleteOpen(false);
                                onActionComplete();
                            }}
                        />
                    </Modal>
                )}
            </td>
        </tr>
    );
}