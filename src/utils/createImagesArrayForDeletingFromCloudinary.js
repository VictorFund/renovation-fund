export const createImagesArrayForDeletingFromCloudinary = (data) => {
    const arrayForDeleting = [];

    if (data.hasOwnProperty("photo")) {
        arrayForDeleting.push(data.photo);
    }

    if (data.hasOwnProperty("image")) {
        arrayForDeleting.push(data.image);
    }

    if (data.hasOwnProperty("logo")) {
        arrayForDeleting.push(data.logo);
    }

    return arrayForDeleting;
}