export const changeStringTypeToArray = (data) => {
    let changedData = { ...data }
    if (
        typeof changedData.description === "string" &&
        typeof changedData.descriptionEn === "string"
    ) {
        if (changedData.description.includes(" | ") || changedData.descriptionEn.includes(" | ")) {
            changedData.description = changedData.description.split(" | ");
            changedData.descriptionEn = changedData.descriptionEn.split(" | ");
        }
        else {
            changedData.description = [changedData.description];
            changedData.descriptionEn = [changedData.descriptionEn];
        }
    }
    return changedData;
}