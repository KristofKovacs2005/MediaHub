export function buildItemFormData({ iName, author, iDescription, amount, itemTags, imageFile }) {
    const formData = new FormData();
    if (iName) formData.append("i_name", iName);
    if (author) formData.append("author", author);
    if (iDescription) formData.append("i_description", iDescription);
    if (amount != null) formData.append("amount", amount.toString());
    if (itemTags && itemTags.length) formData.append("tags", itemTags.join(","));
    if (imageFile) formData.append("file", imageFile);
    return formData;
}