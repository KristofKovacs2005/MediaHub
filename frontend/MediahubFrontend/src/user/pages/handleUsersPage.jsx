import RenderNavbar from "../components/navbar/renderNavbar";
import { Footer } from "../components/footer/footer";
import UserHandlingTable from "../components/handleUsers/UserHandlingTable";
import "../components/handleUsers/userHandling.css";

export default function HandleUsersPage() {
	return (
		<div className="page-main">
			<RenderNavbar />

			<main className="page-content">
				<h2>Felhasznalok kezelese</h2>
				<UserHandlingTable />
			</main>

			<Footer />
		</div>
	);
}