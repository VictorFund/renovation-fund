export const handleDeleteCardFromDB = async (url, mutate) => {
    try {
        await fetch(url, { method: "DELETE" });
        // автоматически обновляет страницу при изменении кол-ва карточек
        mutate();
    } catch (error) {
        console.log(error);
    }
};