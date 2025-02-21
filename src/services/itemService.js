const API_URL = 'http://localhost:8080/api/items';

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