import './item.css';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { createItem } from '../../services/item/itemService';

const CreateItemCard = () => {
    const navigate = useNavigate();
    const [itemData, setItemData] = useState({
        itemName: '',
        itemPrice: '',
        itemStock: ''
    });
    const [errors, setErrors] = useState({
        itemPrice: '',
        itemStock: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setItemData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async () => {
        const newErrors = {};

        if (isNaN(itemData.itemPrice) || itemData.itemPrice === '') {
            newErrors.itemPrice = 'Please enter a valid number for price';
        }

        if (isNaN(itemData.itemStock) || itemData.itemStock === '') {
            newErrors.itemStock = 'Please enter a valid number for stock';
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) {
            toast.error('Failed to create item', {
                icon: true,
                autoClose: 3000,
                draggable: true,
                closeOnClick: true,
                pauseOnHover: true,
                closeButton: false,
                hideProgressBar: true,
                position: "bottom-left",
                className: "custom-toast"
            });
            return;
        }

        try {
            const parsedData = {
                ...itemData,
                itemPrice: parseFloat(itemData.itemPrice),
                itemStock: parseInt(itemData.itemStock)
            };
            await createItem(parsedData);
            toast.success('Successfully created new item!', {
                icon: false,
                autoClose: 3000,
                draggable: true,
                closeOnClick: true,
                pauseOnHover: true,
                closeButton: false,
                hideProgressBar: true,
                position: "bottom-left",
                className: "custom-toast"
            });
            navigate('/items');
        } catch (error) {
            toast.error('Failed to create item', {
                icon: true,
                autoClose: 3000,
                draggable: true,
                closeOnClick: true,
                pauseOnHover: true,
                closeButton: false,
                hideProgressBar: true,
                position: "bottom-left",
                className: "custom-toast"
            });
            console.error(error);
        }
    };

    return (
        <div>
            <div className='item-card'>
                <div className='item-card-header'>   
                    <div className='item-card-back'><Link to="/items" className='item-back-link'>&larr; Back to Items</Link></div>
                </div>
                <div className='item-card-section-title'>Create New Item</div>
                <div className='item-card-section-details-container'>
                    <form className='item-card-details'>
                        <tr>
                            <td><span className="label">Name</span></td>
                            <td><input type="text" name="itemName" value={itemData.itemName} onChange={handleChange} className='input-item' /></td>
                        </tr>
                        <tr>
                                <td><span className="label">Price ($)</span></td>
                                <td><input type="number" step="0.01" name="itemPrice" value={itemData.itemPrice} onChange={handleChange} className='input-item' /></td>
                                {errors.itemPrice && <div className="error-message">{errors.itemPrice}</div>}
                            </tr>
                            <tr>
                                <td><span className="label">Stock</span></td>
                                <td><input type="number" name="itemStock" value={itemData.itemStock} onChange={handleChange} className='input-item' /></td>
                                {errors.itemStock && <div className="error-message">{errors.itemStock}</div>}
                            </tr>
                    </form>
                </div>
            </div>
            <div className='save-button-div'>
                <button className="item-save-btn" onClick={handleSubmit}>Save</button>
            </div>
        </div>
    );
}

export default CreateItemCard;