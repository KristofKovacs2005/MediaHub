import { getAuthStatus } from "./auth";

export function canBorrow(currentBorrowCount){

    const status = getAuthStatus();

    if(status === 1){
        return currentBorrowCount < 1;
    }

    if(status === 2){
        return currentBorrowCount < 3;
    }

    return false;
}
