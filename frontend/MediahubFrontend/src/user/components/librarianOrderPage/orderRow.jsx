import Modal from "../modal/modal";
import ConfirmElfogadas from "../modal/confirmOrderModal/confirmElfogadas/confirmElfogadas";
import ConfirmElutasitas from "../modal/confirmOrderModal/confirmElutasitas/confirmElutasitas";
import { sendEmailForKolcsonzesek } from "../emailJS/sendEmail";
import { emailMessages } from "../emailJS/emailMessages";
import { modifyOrderWithLibrarian } from "../../functions/orders";
import { useEffect, useState } from "react";
import { fetchUsersById } from "../../functions/users";
import { useLoadThisItem } from "../../functions/load_this_item_function";

export default function OrderRow({ order }) {
    const { item } = useLoadThisItem({ id: order.p_id });
    const [isElfogadasOpen, setisElfogadasOpen] = useState(false);
    const [isElutasitasOpen, setisElutasitasOpen] = useState(false);
    const [user, setUser] = useState();

    const fetchingUsers = async () => {
            await fetchUsersById({u_id:order.u_id, setUsersById: setUser});
        };
    useEffect(()=>{
        fetchingUsers();
    },[])
    const handleElfogadas = () => {
        try {
            console.log(user.email)
            modifyOrderWithLibrarian(order.o_id, 2);
            sendEmailForKolcsonzesek(
                user.username,
                user.email,
                emailMessages[0],
            );
            alert("Sikeres módosítás!");
            setisElfogadasOpen(false);
        } catch (err) {
            alert(err.message || "Hiba történt");
        }
    };
    const handleElutasitas = () => {
        try {
            modifyOrderWithLibrarian(order.o_id, 3);
            sendEmailForKolcsonzesek(
                user.username,
                user.email,
                emailMessages[1],
            );
            alert("Sikeres módosítás!");
            setisElutasitasOpen(false);
        } catch (err) {
            alert(err.message || "Hiba történt");
        }
    };
    const handleFigyelmeztetes = () => {
        try {
            sendEmailForKolcsonzesek(
                user.username,
                "marci061123@gmail.com",
                emailMessages[2],
            );
            console.log("Sikeres figyelmeztetés!");
            setisElutasitasOpen(false);
        } catch (err) {
            alert(err.message || "Hiba történt");
        }
    }

    const statusOrderName = {
        1: "Várakozik",
        2: "Aktív",
        3: "Elutasítva",
        4: "Visszahozva",
        5: "Visszahozva későn",
        6: "Késik"
    };

    const isPending = order.s_id === 1;
    const isActive = [2, 6].includes(order.s_id);

    return (
        <tr>
            <td>{item?.i_name || "Betöltés..."}</td>
            <td>{user?.username}</td>
            <td>{statusOrderName[order.s_id]}</td>

            {/* COLUMN 1 */}
            <td>
                {isPending && (
                    <button className="btn btn-success" onClick={() => setisElfogadasOpen(true)}>
                        Elfogadás
                    </button>
                )}
                <Modal isOpen={isElfogadasOpen} isClose={() => setisElfogadasOpen(false)}>
                    <ConfirmElfogadas
                        isClose={() => setisElfogadasOpen(false)}
                        onConfirm={handleElfogadas}
                    />
                </Modal>

                {isActive && (
                    <button className="btn btn-warning">
                        Visszahozva
                    </button>
                )}
            </td>

            {/* COLUMN 2 */}
            <td>
                {isPending && (
                    <button className="btn btn-danger" onClick={() => setisElutasitasOpen(true)}>
                        Elutasítás
                    </button>
                )}
                <Modal isOpen={isElutasitasOpen} isClose={() => setisElutasitasOpen(false)}>
                    <ConfirmElutasitas
                        isClose={() => setisElutasitasOpen(false)}
                        onConfirm={handleElutasitas}
                    />
                </Modal>

                {isActive && (
                    <button className="btn btn-danger" onClick={handleFigyelmeztetes}>
                        Figyelmeztetés
                    </button>
                )}
            </td>
        </tr>
    );
}