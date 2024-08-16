import { sortArrayByUpdate } from "./sortArrayByUpdate";

export const getDataByRules = (data, isLoading, isOwner) => {
    let filteredByIsNotApproved = []
    let sortedByUpdateData = [];

    if (!isLoading) {
        sortedByUpdateData = sortArrayByUpdate(data);
        filteredByIsNotApproved = sortedByUpdateData.filter(item => !item.isApproved)
    }

    const neededData = isOwner ? sortedByUpdateData : filteredByIsNotApproved;

    return neededData;
}