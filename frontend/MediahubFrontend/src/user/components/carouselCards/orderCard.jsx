import { useEffect } from "react";
import { useState } from "react";
import { decodeBuffer } from "../../util/decoder";
import "./orderCard.css";

export default function OrderCard({ order }) {
    const isItReturned = order.o_returned == 5 || order.o_returned == 4;
    const [item, setItem] = useState(null);
    const token = localStorage.getItem("authToken");
    const orderStatus = {
        1: 'Elfogadásra vár',
        2: 'Elfogadva',
        3: 'Elutasítva',
        4: 'Visszahozva',
        5: 'Későn visszahozva',
        6: 'Későn'
    };
    useEffect(() => {
        const fetchItem = async () => {
            try {
                const itemRes = await fetch(`http://localhost:3000/item/${order.p_id}`, {
                    headers: { "x-access-token": token }
                });

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
    }, [order.p_id]);

    return (
        <div className="order-card">
            {isItReturned ? (
                <div className="returnedOrderCard">
                    <img src={"http://localhost:3000" + (item.img_url || "/uploads/images.jpeg")} alt={item.i_name} className="detailsImage img-fluid" />
                    <h3>{order.i_name}</h3>
                    <p>{orderStatus[order.o_returned]}</p>
                </div>
            ) : (
                <div className="activeOrderCard">
                    <img src={"http://localhost:3000" + (item.img_url || "/uploads/images.jpeg")} alt={item.i_name} className="detailsImage img-fluid" />
                    <h3>{order.i_name}</h3>
                    <p>{orderStatus[order.o_status]}</p>
                    <p>Visszahozás határideje: {new Date(order.o_return_date).toLocaleDateString()}</p>
                    <p><button>Visszavitel</button></p>
                </div>
            )}
        </div>
    );
}