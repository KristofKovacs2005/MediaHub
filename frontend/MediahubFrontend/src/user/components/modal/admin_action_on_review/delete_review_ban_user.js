import { authLoader } from "../../../util/auth";
export function useDeleteReportedReview() {
    const token = authLoader({ minRole: 5 });

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
    const token = authLoader({ minRole: 5 });

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
    const token = authLoader({ minRole: 5 });
    async function banUser(u_id) {
        await fetch(`http://localhost:3000/users/${u_id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "x-access-token": token,
            },
            body: JSON.stringify({ status: 3 }),
        });
    }
    return { banUser }
}