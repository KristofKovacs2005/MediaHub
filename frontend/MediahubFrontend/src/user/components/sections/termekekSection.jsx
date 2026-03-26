import { useState, useEffect } from "react";
import { fetchItems } from "../../functions/items";
import { fetchOrdersUser } from "../../functions/orders";
import OrderCard from "../carouselCards/orderCard";
import TermekCard from "../carouselCards/termekCard";
import "./termekekSection.css";
import { useRef } from "react";

export function TermekekSectionUser() {
    // State for data
    const [orders, setOrders] = useState([]);
    const [books, setBooks] = useState([]);
    const [movies, setMovies] = useState([]);

    // Loading states
    const [loadingOrders, setLoadingOrders] = useState(false);
    const [loadingBooks, setLoadingBooks] = useState(false);
    const [loadingMovies, setLoadingMovies] = useState(false);

    // Error states
    const [errorOrders, setErrorOrders] = useState(null);
    const [errorBooks, setErrorBooks] = useState(null);
    const [errorMovies, setErrorMovies] = useState(null);

    useEffect(() => {
        // Fetch orders
        const loadOrders = async () => {
            setLoadingOrders(true);
            const ordersData = await fetchOrdersUser();
            setOrders(ordersData);
            setLoadingOrders(false);
        };

        loadOrders();
        // Fetch books
        fetchItems({
            tags: ["book"],
            setItems: setBooks,
            setLoading: setLoadingBooks,
            setError: setErrorBooks
        });

        // Fetch movies
        fetchItems({
            tags: ["movie"],
            setItems: setMovies,
            setLoading: setLoadingMovies,
            setError: setErrorMovies
        });
    }, []);

    return (
        <div className="termekek-section">
            <section>
                <h2>Kölcsönzött termékek</h2>
                <div className="Carousel kolcsonzesCarousel">
                    <div className="group">
                        {loadingOrders ? (
                            <div className="loading">Betöltés...</div>
                        ) : errorOrders ? (
                            <div className="error">{errorOrders}</div>
                        ) : orders.length > 0 ? (
                            orders.map(order => <OrderCard key={order.o_id} order={order} />)
                        ) : (
                            <div className="no-orders">Nincsenek kölcsönzött termékek</div>
                        )}
                    </div>
                </div>

                <h2>Könyvek</h2>
                <div className="Carousel konyvCarousel">
                    <div className="group">
                        {loadingBooks ? (
                            <div className="loading">Betöltés...</div>
                        ) : errorBooks ? (
                            <div className="error">{errorBooks}</div>
                        ) : books.length > 0 ? (
                            books.map(book => <TermekCard key={book.i_id} item={book} />)
                        ) : (
                            <div className="no-items">Nincsenek könyvek</div>
                        )}
                    </div>
                </div>
                <h2>Filmek</h2>
                <div className="Carousel filmCarousel">
                    <div className="group">
                        {loadingMovies ? (
                            <div className="loading">Betöltés...</div>
                        ) : errorMovies ? (
                            <div className="error">{errorMovies}</div>
                        ) : movies.length > 0 ? (
                            movies.map(movie => <TermekCard key={movie.i_id} item={movie} />)
                        ) : (
                            <div className="no-items">Nincsenek filmek</div>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
}