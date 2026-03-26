import { useEffect } from "react";
import { useState } from "react";
import { decodeBuffer } from "../../util/decoder";
import "./orderCard.css";

export default function OrderCard({ order }) {
    const isItReturned = order.s_id == 5 || order.s_id == 4;
    const [item, setItem] = useState();
    const token = localStorage.getItem("authToken");
    const orderStatus = {
        1: 'Elfogadásra vár',
        2: 'Elfogadva',
        3: 'Elutasítva',
        4: 'Visszahozva',
        5: 'Későn visszahozva',
        6: 'Későn'
    };
    const getStatusClass = (status) => {
        switch (status) {
            case 1: return "status-badge status-pending";
            case 2: return "status-badge status-approved";
            case 3: return "status-badge status-rejected";
            case 4:
            case 5: return "status-badge status-returned";
            default: return "status-badge";
        }
    };
    
    useEffect(() => {
        const fetchItem = async () => {
            try {
                const itemRes = await fetch(`http://localhost:3000/item/${order.p_id}`, {
                    headers: { "x-access-token": token }
                });
                console.log(item)
                console.log(itemRes)

                if (!itemRes.ok) throw new Error("Nem sikerült lekérni az elemet.");

                const itemData = await itemRes.json();
                const itemObj = Array.isArray(itemData) ? itemData[0] : itemData;

                const normalizedItem = {
                    ...itemObj,
                    i_description: decodeBuffer(itemObj?.i_description)
                };

                setItem(normalizedItem);
            } catch (e) {
                console.warn("Item fetch failed:", e);
            }
        };
        fetchItem();
    }, []);
    return (
        <div className="order-card">
            {isItReturned ? (
                <div className="returnedOrderCard">
                    <img
                        src={"http://localhost:3000" + (item?.img_url || "/uploads/images.jpeg")}
                        alt={item?.i_name || "Nincs név"}
                        className="detailsImage img-fluid"
                    />
                    <h2>{item.i_name}</h2>
                    <span className={getStatusClass(order.o_status)}>
                        {orderStatus[order.o_status]}
                    </span>
                </div>
            ) : (
                <div className="activeOrderCard">
                    <img
                        src={"http://localhost:3000" + (item?.img_url || "/uploads/images.jpeg")}
                        alt={item?.i_name || "Nincs név" }
                        className="detailsImage img-fluid"
                    />
                    <h2>{item?.i_name|| "Nincs név"}</h2>
                    <span className={getStatusClass(order.s_id)}>
                        {orderStatus[order.s_id]}
                    </span>
                    <p>Visszahozás határideje: {new Date(order.return_date).toLocaleDateString()}</p>
                </div>
            )}
        </div>
    );
}