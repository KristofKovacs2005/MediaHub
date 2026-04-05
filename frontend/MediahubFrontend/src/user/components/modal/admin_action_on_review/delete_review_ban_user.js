import { getAuthToken } from "../../../util/auth";

export function useDeleteReportedReview() {
    const token = getAuthToken();

    async function deleteReview(r_id) {
        await fetch(`http://localhost:3000/reviews/${r_id}`, {
            method: "DELETE",
            headers: {
                "x-access-token": token,
            },
        });
    }

    return { deleteReview };
}

export function useReportedReviewToNormalReview() {
    const token = getAuthToken();

    async function modifyReview(r_id) {
        await fetch(`http://localhost:3000/reviews/${r_id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "x-access-token": token,
            },
            body: JSON.stringify({ flagged: false }),
        });
    }

    return { modifyReview };
}

export function useBanUserForRuleBreaking() {
    const token = getAuthToken();
    async function banUser(u_id, r_id) {
        await fetch(`http://localhost:3000/users/${u_id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "x-access-token": token,
            },
            body: JSON.stringify({ status: 3 }),
        });
        // Also delete the review that triggered the suspension
        if (r_id != null) {
            await fetch(`http://localhost:3000/reviews/${r_id}`, {
                method: "DELETE",
                headers: {
                    "x-access-token": token,
                },
            });
        }
    }
    return { banUser };
}