const API_URL = 'https://the-nibble-nook.onrender.com/api/transactions';

export const saveTransaction = async (itemId, slotId) => {
    try {
        console.log('Sending request to save transaction...');
        const response = await fetch(`${API_URL}/save?itemId=${itemId}&slotId=${slotId}`, 
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

export const getTransactions = async () => {
    try {
        const response = await fetch(`${API_URL}/find-all`);
        if (!response.ok) {
            throw new Error('Failed to fetch transactions.');
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
}

export const getTransactionFromTransactionId = async (transactionId) => {
    try {
        const response = await fetch(`${API_URL}/find/${transactionId}`)
        if (!response.ok) {
            throw new Error(`Failed to fetch transaction ${transactionId}.`);
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
}