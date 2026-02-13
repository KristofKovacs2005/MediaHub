import Hero from "./components/hero/hero";
import { Carousel } from "./components/carousel/carousel";
import Termekek from "./termekek/items/termekek";

export default function HomeContent() {
    return (
        <div className="pageBelowNavbar">
            <Hero />
            <Carousel />
            <Termekek />
        </div>
    );
}
