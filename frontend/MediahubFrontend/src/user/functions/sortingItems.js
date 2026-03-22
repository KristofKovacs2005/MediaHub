export function sortItemsAZ(items) {
    return [...items].sort((a, b) => a.i_name.localeCompare(b.i_name));
}

export function sortItemsZA(items) {
    return [...items].sort((a, b) => b.i_name.localeCompare(a.i_name));
}