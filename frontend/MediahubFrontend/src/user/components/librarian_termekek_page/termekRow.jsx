import { useState } from "react";
import { Link } from "react-router-dom"; // <-- import Link
import Modal from "../modal/modal";
import ConfirmDeleteItem from "../modal/confirmItemModal/deleteItem/confirmDeleteItem";
import { useLoadThisItem } from "../../functions/load_this_item_function";

export default function TermekRow({ termek, onActionComplete }) {
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const { tags } = useLoadThisItem({ id: termek.i_id })
    return (
        <tr>
            <td>{termek.i_name}</td>
            <td>{termek.author}</td>
            {termek.amount > 0 ? (
                <td>{termek.amount}</td>
            ):(<td>Nincs raktáron</td>)}
            <td>
                {/* Use Link for navigation */}
                <Link to={`/termekmodositas/${termek.i_id}`} state={{ item: termek, tags: tags }} className="btn btn-primary">
                    Módosítás
                </Link>
            </td>
            <td>
                {/* Delete button remains modal */}
                <button className="btn btn-danger" onClick={() => setIsDeleteOpen(true)}>
                    Törlés
                </button>

                {/* Delete Modal */}
                {isDeleteOpen && (
                    <Modal isOpen={isDeleteOpen} isClose={() => setIsDeleteOpen(false)}>
                        <ConfirmDeleteItem
                            i_id={termek.i_id}
                            isClose={() => setIsDeleteOpen(false)}
                            onConfirm={onActionComplete}
                        />
                    </Modal>
                )}
            </td>
        </tr>
    );
}