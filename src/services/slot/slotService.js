const API_URL = 'https://api-the-nibble-nook.onrender.com/slots';

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

export const getSlotFromSlotId = async (slotId) => {
    try {
        const response = await fetch(`${API_URL}/find/${slotId}`)
        if (!response.ok) {
            throw new Error(`Failed to fetch slot ${slotId}.`);
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
}

export const updateSlot = async (slot) => {
    try {
        console.log("Updating slot: ", slot.slotId);
        const response = await fetch(`${API_URL}/update/${slot.slotId}?capacity=${slot.capacity}&slotStatus=${slot.slotStatus}&itemId=${slot.itemId}`, 
            {
                method: "PATCH",
                headers: { "Content-Type": "application/json" }
            }
        );
        if (!response.ok) {
            const errorMessage = await response.json();
            throw new Error(errorMessage.message);
        }
        const updatedSlot = await response.json();
        console.log("Server response:", updatedSlot);
        return updatedSlot;
    } catch (error) {
        console.error("Update slot error: ", error);
        throw error;
    }
}

export const clearSlot = async (slotId) => {
    try {
        console.log("Clearing slot: ", slotId);
        const response = await fetch(`${API_URL}/delete/${slotId}`,{
            method: "DELETE",
        });
        if (!response.ok) {
            throw new Error(`Failed to clear slot ${slotId}.`);
        }
        const clearedSlot = await response.json();
        console.log("Server response:", clearedSlot);
        return clearedSlot;
    } catch (error) {
        console.log("Clear slot error: ", error);
        throw error;
    }
}
