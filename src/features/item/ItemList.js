import './item.css';
import { toast } from 'react-toastify';
import item_01 from "../../images/item-01.png";
import item_02 from "../../images/item-02.png";
import item_03 from "../../images/item-03.png";
import item_04 from "../../images/item-04.png";
import item_05 from "../../images/item-05.png";
import item_06 from "../../images/item-06.png";
import item_07 from "../../images/item-07.png";
import item_08 from "../../images/item-08.png";
import item_09 from "../../images/item-09.png";
import item_10 from "../../images/item-10.png";
import React, { useState, useEffect } from 'react';
import { getItems, updateStock } from '../../services/item/itemService';
import RestockDialog from '../restockDialog/RestockDialog';

const ItemList = () => {
    const defaultImage = item_10;
    const [items, setItems] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const itemImage = {
        53: item_01,
        58: item_02,
        202: item_03,
        252: item_04,
        402: item_05,
        403: item_06,
        404: item_07,
        405: item_08,
        552: item_09
    }

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const data = await getItems();
                setItems(data);
                setLoading(false);
            } catch (error) {
                setError('Error fetching items.');
                setLoading(false);
            }
        };

        fetchItems();
    }, []);

    const openDialog = (item) => {
        if (!item) return;
        setSelectedItem(item);
        setDialogOpen(true);
    }

    const restockItem = async (item, newStock) => {
        try {
            await updateStock(item, newStock);  
            const updatedItems = await getItems();
            setItems(updatedItems); 
            toast.success('Successfully restocked!', {
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
        } catch (error) {
            console.error('Restock error', error);
            setError('Error restocking.');
            toast.error('Restock failed.', {
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
        } finally {
            setLoading(false);
            setDialogOpen(false);
        }
    };

    if (error) {
        return <div>{error}</div>
    }

    return (
        <div className='item-page'>
            <div className='item-page-container'>
                    <div className='item-divider'>
                    <table>
                        <tbody>
                            {items.map((item) => (
                                <React.Fragment key={item.itemId}>
                                    <tr>
                                        <td colSpan="4"><hr className="divider-line"/></td>
                                    </tr>
                                    <tr>
                                        <td><span className="label">ID</span></td>
                                        <td>{item.itemId}</td>
                                        <td rowSpan="4">
                                            <div className="item-list-image-container">
                                                <img src={itemImage[item.itemId] || defaultImage} alt="Item" />
                                            </div>
                                        </td>
                                        <td rowSpan="2" className='button-div'>
                                            <div>
                                                <button className='restock-item-btn' onClick={() => openDialog(item)}>Restock</button>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><span className="label">Name</span></td>
                                        <td>{item.itemName === null ? 'N/A' : item.itemName}</td>
                                        
                                    </tr>
                                    <tr>
                                        <td><span className="label">Price</span></td>
                                        <td>{item.itemPrice === null ? 'N/A' : `$${item.itemPrice.toFixed(2)}`}</td>
                                        <td rowSpan="2" className='button-div'>
                                            <div>
                                                <button className='delete-item-btn'>Delete</button>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><span className="label">Stock</span></td>
                                        <td>{item.itemStock}</td>
                                    </tr>
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <RestockDialog
            selectedItem={selectedItem} 
            setSelectedItem={setSelectedItem}
            isOpen={dialogOpen}
            onSave={(updatedStock) => { selectedItem && restockItem(selectedItem, updatedStock); }}
            onCancel={() => setDialogOpen(false)} />
        </div>
    )
}

export default ItemList;