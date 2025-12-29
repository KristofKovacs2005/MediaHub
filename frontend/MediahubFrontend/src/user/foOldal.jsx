import "./foOldal.css"

import { Navbar } from "./components/navbar/navbar";
import { Footer } from "./components/footer/footer";
import Termekek from "./termekek/items/termekek";
import { Carousel } from "./components/carousel/carousel";
import Hero from "./components/hero/hero";

export default function FoOldal(){
    return (
        <div className="foOldalMainDiv">
            <Navbar />
            <div className="pageBelowNavbar">
                <Hero />
                <Carousel />
                <Termekek />
            </div>
            <Footer />
        </div>
    )
}