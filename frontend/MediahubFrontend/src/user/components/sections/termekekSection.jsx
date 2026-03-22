import { useState } from "react";
import { fetchItems } from "../../functions/items";
import { fetchOrders } from "../../functions/orders";
import OrderCard from "../carouselCards/orderCard";
import "./termekekSection.css";
import TermekCard from "../carouselCards/termekUser";
export async function termekekSectionUser() {
    const [orders, setOrders] = useState([]);
    const [books, setBooks] = useState([]);
    const [movies, setMovies] = useState([]);

    useState(() => {
        fetchOrders(setOrders);
        fetchItems({ tags: ["book"], setItems: setBooks });
        fetchItems({ tags: ["movie"], setItems: setMovies });
    }, []);


    return (
        <div className="termekek-section">
            <section>
                <h2>Kölcsönzött termékek</h2>
                <div className="Carousel">
                    <div className="group">
                        {orders.length > 0 ? (
                            orders.map(order => <OrderCard key={order.o_id} order={order} />)
                        ) : (
                            <div className="no-orders">Nincsenek kölcsönzött termékek</div>
                        )}</div>
                        <div className="group" aria-hidden="true">
                        {orders.length > 0 ? (
                            orders.map(order => <OrderCard key={order.o_id} order={order} />)
                        ) : (
                            <div className="no-orders">Nincsenek kölcsönzött termékek</div>
                        )}</div>
                </div>
                <h2>Könyvek</h2>
                <div className="Carousel">
                    <div className="group">
                        {books.length > 0 ? (
                            books.map(book => <TermekCard key={book.i_id} author={book.author} i_name={book.i_name} img_url={book.img_url} i_description={book.i_description} />)
                        ) : (
                            <div className="no-items">Nincsenek könyvek</div>
                        )}</div>

                </div>
                <h2>Filmek</h2>
                <div className="Carousel">
                    <div className="group">
                        {movies.length > 0 ? (
                            movies.map(movie => <TermekCard key={movie.i_id} author={movie.author} i_name={movie.i_name} img_url={movie.img_url} i_description={movie.i_description} />)
                        ) : (
                            <div className="no-items">Nincsenek filmek</div>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
}