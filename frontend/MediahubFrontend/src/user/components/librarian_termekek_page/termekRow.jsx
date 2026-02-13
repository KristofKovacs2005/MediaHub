import { useState } from "react";
import Modal from "../modal/modal";

import ModifyTermekModal from "../modal/termekek_handling/termek_modositas_modal";
import DeleteTermekModal from "../modal/termekek_handling/termek_delete_modal";

export default function TermekRow({ termek, onActionComplete }) {
    const [isModifyOpen, setIsModifyOpen] = useState(false);
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
                <button className="btn btn-primary" onClick={() => setIsModifyOpen(true)}>
                    Módosítás
                </button>
                <button className="btn btn-danger" onClick={() => setIsDeleteOpen(true)}>
                    Törlés
                </button>

                {/* Modify Modal */}
                {isModifyOpen && (
                    <Modal isOpen={isModifyOpen} isClose={() => setIsModifyOpen(false)}>
                        <ModifyTermekModal
                            termek={termek}
                            isClose={() => setIsModifyOpen(false)}
                            onSubmit={() => {
                                setIsModifyOpen(false);
                                onActionComplete();
                            }}
                        />
                    </Modal>
                )}

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
