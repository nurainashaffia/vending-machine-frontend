const API_URL = 'http://localhost:8080/api/items';

export const getItems = async () => {
    try {
        const response = await fetch(`${API_URL}/find-all`);
        if (!response.ok) {
            throw new Error('Failed to fetch items.');
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
}

export const updateStock = async (item, newStock) => {
    try {
        console.log("Updating item: ", item.itemId);
        const response = await fetch(`${API_URL}/restock/${item.itemId}?itemStock=${newStock}`, 
        {
            method: "PATCH",
            headers: { "Content-Type": "application/json" }
        });
        if (!response.ok) {
            const errorMessage = await response.json();
            throw new Error(errorMessage.message);
        }
        const updatedItem = await response.json();
        console.log("Server response:", updatedItem);
        return updatedItem;
    } catch (error) {
        throw error;
    }
}

export const getAssignedItems = async () => {
    try {
        const response = await fetch(`${API_URL}/find-assigned`);
        if (!response.ok) {
            throw new Error('Failed to fetch assigned items.');
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
}