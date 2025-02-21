const API_URL = 'http://localhost:8080/api/transactions/save';

export const saveTransaction = async (itemId, slotId) => {
    try {
        console.log('Sending request to save transaction...');
        const response = await fetch(`${API_URL}?itemId=${itemId}&slotId=${slotId}`, 
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        if (!response.ok) {
            throw new Error('Failed to save transaction.');
        }
    } catch (error) {
        throw error;
    }
}