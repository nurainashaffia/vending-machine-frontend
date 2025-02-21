import React, { useState, useEffect } from 'react';
import { getAssignedItems } from '../../services/itemService';

const AssignedItemList = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAssignedItems = async () => {
            try {
                const data = await getAssignedItems();
                setItems(data);
                setLoading(false);
            } catch (error) {
                setError('Error fetching assigned items.');
                setLoading(false);
            }
        };

        fetchAssignedItems();
    }, []);

    if (loading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>{error}</div>
    }

    return (
        <div className='vending-machine'>
            {/* <h1>Assigned Items</h1> */}
            <div className="vending-machine-slots">
                {items.map(item => (
                    <div key={item.itemId} className="vending-machine-slot">
                        <h2>Item Name: {item.itemName}</h2>
                        <p></p>
                        <p>Item Stock: {item.itemStock}</p>
                        <p>Item Price: {item.itemPrice}</p>
                        {/* Display slots if necessary */}
                        <div>
                            {/* <h3>Assigned Slots</h3> */}
                            {item.slots.map(slot => (
                                <div key={slot.slotId}>
                                    {/* <p>Slot ID: {slot.slotId}</p> */}
                                    <p>Slot Status: {slot.slotStatus}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AssignedItemList;