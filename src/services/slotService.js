const API_URL = 'http://localhost:8080/api/slots';

export const getSlots = async () => {
    try {
        const response = await fetch(`${API_URL}/find-all`);
        if (!response.ok) {
            throw new Error('Failed to fetch slots.');
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
}