export const sortArrayByUpdate = (data) => {
    let sortedByUpdateData = [...data];

    sortedByUpdateData.sort((a, b) => {
        return Date.parse(b.updatedAt) - Date.parse(a.updatedAt);
    });

    return sortedByUpdateData;
}