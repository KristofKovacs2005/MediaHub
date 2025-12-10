import "./foOldal.css"

import { Navbar } from "./components/navbar";
import { Footer } from "./components/footer";
import Termekek from "./termekek/termekek";
// ...existing code...
export default function FoOldal(){
    return (
        <>
            <Navbar />
            <div className="pageBelowNavbar">
                <Termekek />
                
            </div>
            <Footer />
        </>
    )
}