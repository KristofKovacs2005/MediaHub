import Hero from "./components/hero/hero";
import Termekek from "./termekek/items/termekek";

export default function HomeContent() {
    return (
        <div className="pageBelowNavbar">
            <Hero />
            <Termekek />
        </div>
    );
}
