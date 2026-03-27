import { useParams } from "react-router-dom";
import { useState } from "react";
import { useLoadThisItem } from "../../functions/load_this_item_function";
import { TermekDetails } from "./termek_details";
import { CommentsSection } from "./commentsSection";
import { Footer } from "../footer/footer";
import RenderNavbar from "../navbar/renderNavbar";
import Modal from "../modal/modal";
import NewCommentModal from "../modal/newComment/modalContent";
import "./termek_details_page.css";

export default function TermekDetailsPage() {
	const { id } = useParams(); // Get item_id from route parameter
	const { item, comments, tags, loading, error } = useLoadThisItem({ id });
	const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
	const username = localStorage.getItem("username"); // stored as string
	const isLoggedIn = !!localStorage.getItem("authToken");
	const userHasCommented = username
		? comments.some(comment => comment.username === username)
		: false;//visszatér true vagy false értékkel attól függően, hogy a user írt-e már véleményt az adott elemre
	// Loading state
	if (loading) {
		return (
			<div className="detailsPageMainDiv">
				<RenderNavbar />
				<div className="pageBelowNavbar">
					<div className="loadingContainer">
						<p>Betöltés...</p>
					</div>
				</div>
				<Footer />
			</div>
		);
	}

	// Error state
	if (error) {
		return (
			<div className="detailsPageMainDiv">
				<RenderNavbar />
				<div className="pageBelowNavbar">
					<div className="errorContainer">
						<p>Hiba: {error}</p>
					</div>
				</div>
				<Footer />
			</div>
		);
	}

	// No item found
	if (!item) {
		return (
			<div className="detailsPageMainDiv">
				<RenderNavbar />
				<div className="pageBelowNavbar">
					<div className="errorContainer">
						<p>Az elem nem található.</p>
					</div>
				</div>
				<Footer />
			</div>
		);
	}

	return (
		<div className="detailsPageMainDiv">
			<RenderNavbar />

			<div className="pageBelowNavbar">
				<TermekDetails item={item} tags={tags} />
				<CommentsSection
					comments={comments}
					itemName={item?.i_name || "Ismeretlen elem"}
					itemId={id}
					userHasCommented={userHasCommented}
					isLoggedIn={isLoggedIn}
					onOpenReviewModal={() => setIsReviewModalOpen(true)}
				/>
			</div>

			<Modal isOpen={isReviewModalOpen} isClose={() => setIsReviewModalOpen(false)}>
				<NewCommentModal
					itemId={id}
					isClose={() => setIsReviewModalOpen(false)}
				/>
			</Modal>

			<Footer />
		</div>
	);
}
