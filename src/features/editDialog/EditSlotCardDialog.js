import React, { useEffect } from "react";
import "./editDialog.css";
import { useState } from "react";
import { getItems } from "../../services/item/itemService";

const statusOptions = ["AVAILABLE", "OUT_OF_SERVICE"];

const EditSlotCardDialog = ({ selectedSlot, setSelectedSlot, isOpen, onSave, onCancel }) => {
    const [items, setItems] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
    const [isItemDropdownOpen, setIsItemDropdownOpen] = useState(false);

    useEffect(() => {
        const fetchItems = async () => {
            try {
            const itemData = await getItems();
            setItems(itemData);
            setLoading(false);
            } catch (error) {
            setError('Error fetching items.');
            setLoading(false);
            }
        };

        fetchItems();
    }, []);

    const handleSelectStatus = (value) => {
        setSelectedSlot((prevSlot) => ({ ...prevSlot, slotStatus: value }));
        setIsStatusDropdownOpen(false);
    };
    
    const handleSelectItem = (item) => {
        setSelectedSlot((prevSlot) => ({
            ...prevSlot,
            itemId: item.itemId, // Ensure itemId is updated
            itemName: item.itemName, // Also update itemName so UI reflects change
        }));
        setIsItemDropdownOpen(false);
    };
    

    if (!isOpen) return null;
    const handleCapacityChange = (e) => {
        setSelectedSlot((prevSlot) => ({
            ...prevSlot,
            capacity: Number(e.target.value)
        }));
    };

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h1>Edit Slot</h1>
                <form className="form-container" onSubmit={(e) => e.preventDefault()}>
                    <label>ID</label>
                    <input disabled placeholder={selectedSlot.slotId} className="input-disabled" />

                    <label>Status</label>
                    <div className="dropdown" onClick={() => setIsStatusDropdownOpen(!isStatusDropdownOpen)}>
                        <span>{selectedSlot.slotStatus === "AVAILABLE" ? "Available" : "Out of Service"}</span>
                        <div className={`dropdown-content ${isStatusDropdownOpen ? "show" : ""}`}>
                            {statusOptions.map((status) => (
                                <div key={status} onClick={() => handleSelectStatus(status)} className="dropdown-item">
                                    {status === "AVAILABLE" ? "Available" : "Out of Service"}
                                </div>
                            ))}
                        </div>
                    </div>

                    <label>Last Restocked</label>
                    <input disabled value={selectedSlot.lastRestocked} placeholder={selectedSlot.lastRestocked} className="input-disabled" />
                
                    <label>Assigned Item</label>
                    {selectedSlot.itemId !== null ?
                    <input disabled placeholder={selectedSlot.itemName} className={"input-disabled"} />
                    : <div className="dropdown" onClick={() => setIsItemDropdownOpen(!isItemDropdownOpen)}>
                        <span>{'N/A'}</span>
                        <div className={`dropdown-content ${isItemDropdownOpen ? "show" : ""}`}>
                            {items.map((item) => (
                                <div key={item.itemId} onClick={() => handleSelectItem(item)} className="dropdown-item">
                                    {item.itemName} (Stock: {item.itemStock})
                                </div>                            
                            ))}
                        </div>
                     </div>
                    }

                    <label>Capacity</label>
                    <div className="capacity-container">
                        <input placeholder={selectedSlot.capacity} onChange={handleCapacityChange} className="input-editable" />
                    </div>
                </form>
                <div className="modal-buttons">
                    <button className="cancel-btn" onClick={onCancel}>Cancel</button>
                    <button className="save-btn" onClick={onSave}>Save</button>
                </div>
            </div>
        </div>
    )
}

export default EditSlotCardDialog;