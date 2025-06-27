import "./restockDialog.css";
import React, { useState, useEffect } from 'react';

const RestockDialog = ({ selectedItem, setSelectedItem, isOpen, onSave, onCancel }) => {
    const [newStock, setNewStock] = useState("");

    useEffect(() => {
        setNewStock("");
    }, [selectedItem]);

    const handleStockChange = (event) => {
        setNewStock(event.target.value);
    };

    const handleSave = () => {
        const stockValue = Number(newStock);
        if (isNaN(stockValue) || stockValue < 0) return;
        onSave(stockValue);
    };

    if (!isOpen || !selectedItem) return null;

    return (
        <div className="modal-overlay-restock">
            <div className="modal-restock">
                Quantity to restock <input value={newStock} placeholder={selectedItem.itemStock} onChange={handleStockChange} className="input-restock" />
                <div className="modal-buttons-restock">
                    <button className="cancel-btn" onClick={onCancel}>Cancel</button>
                    <button className="confirm-btn" onClick={handleSave}>OK</button>
                </div>
            </div>
        </div>
    )
}

export default RestockDialog;