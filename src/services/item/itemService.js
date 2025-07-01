const API_URL = 'https://the-nibble-nook.onrender.com/api/items';

export const createItem = async (item) => {
    try {
        const response = await fetch(`${API_URL}/save`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(item)
        });

        if (!response.ok) {
            throw new Error('Failed to create new item.');
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
}

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

export const searchItems = async (itemName) => {
    try {
        const response = await fetch(`${API_URL}/search?itemName=${encodeURIComponent(itemName)}`);
        if (!response.ok) {
            throw new Error('Failed to search items.');
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
};

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

export const deleteItem = async (itemId) => {
    try {
        const response = await fetch(`${API_URL}/delete/${itemId}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" }
        });

        if (!response.ok) {
            throw new Error(`Failed to delete item. ${response.status}`);
        }

        return itemId;
    } catch (error) {
        console.error('Delete error:', error);
        throw error;
    }
};

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