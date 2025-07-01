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
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import DeleteDialog from '../deleteDialog/DeleteDialog';
import RestockDialog from '../restockDialog/RestockDialog';
import { deleteItem, getItems, searchItems, updateStock } from '../../services/item/itemService';

const ItemList = () => {
    const defaultImage = item_10;
    const navigate = useNavigate();
    const [items, setItems] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedItem, setSelectedItem] = useState(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [restockDialogOpen, setRestockDialogOpen] = useState(false);
    const itemImage = {
        1: item_01,
        2: item_02,
        3: item_03,
        4: item_04,
        5: item_05,
        6: item_06,
        7: item_07,
        8: item_08,
        9: item_09
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

    const handleSearch = async () => {
        try {
            if (searchTerm.trim() === '') {
                const data = await getItems();
                setItems(data);
            } else {
                const results = await searchItems(searchTerm);
                setItems(results);
            }
        } catch (err) {
            toast.error('Item not found', {
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
        }
    };    

    const openCreateItemCard = () => {
        navigate(`/item/new`);
    }

    const openRestockDialog = (item) => {
        if (!item) return;
        setSelectedItem(item);
        setRestockDialogOpen(true);
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
            setRestockDialogOpen(false);
        }
    };

    const openDeleteItemDialog = (item) => {
        setSelectedItem(item);
        setDeleteDialogOpen(true);
    }

    const confirmDeleteItem = async (item) => { 
        try {
          await deleteItem(item.itemId);
          setItems(prevItems => prevItems.filter(i => i.itemId !== item.itemId));
          toast.success('Successfully deleted item!', {
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
          console.error('Error deleting item', error);
          toast.error('Failed to delete item', {
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
          setDeleteDialogOpen(false);
        }
    }

    if (error) {
        return <div>{error}</div>
    }

    return (
        <div className='item-page'>
            <div className='item-page-container'>
                <div className='buttons-divider'>
                    <button className="create-item-btn" onClick={() => openCreateItemCard()}>
                        <i className="fa-solid fa-plus"></i> 
                        <span className="btn-text">Create New Item</span>
                    </button>
                    <div className="search-container">
                        <input type="text" placeholder="Search Item Name..." className="search-input" value={searchTerm} 
                            onChange={(e) => setSearchTerm(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSearch()} />
                        <button className="item-search-icon-btn">
                            <i class="fa-solid fa-magnifying-glass"></i>
                            <span className="btn-text"></span>
                        </button>
                    </div>
                </div>
                <div className='item-divider'>
                    <table>
                        <tbody>
                            {items.map((item) => (
                                <React.Fragment key={item.itemId}>
                                    <tr>
                                        <td colSpan="4"><hr className="item-divider-line"/></td>
                                    </tr>
                                    <div className='table-content'>
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
                                                    <button className='restock-item-btn' onClick={() => openRestockDialog(item)}>Restock</button>
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
                                                <button className='delete-item-btn' onClick={() => openDeleteItemDialog(item)}>Delete</button>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td><span className="label">Stock</span></td>
                                            <td>{item.itemStock}</td>
                                        </tr>
                                    </div>
                                </React.Fragment>
                            ))}
                        </tbody>
                        <tr>
                            <td colSpan="4"><hr className="item-divider-line"/></td>
                        </tr>
                    </table>
                </div>
            </div>
            <RestockDialog
                selectedItem={selectedItem} 
                setSelectedItem={setSelectedItem}
                isOpen={restockDialogOpen}
                onSave={(updatedStock) => { selectedItem && restockItem(selectedItem, updatedStock); }}
                onCancel={() => setRestockDialogOpen(false)} />
            <DeleteDialog
                message={`Are you sure you want to delete Item ${selectedItem?.itemId}?`} 
                isOpen={deleteDialogOpen} 
                onConfirm={() => {
                if (selectedItem) {
                    confirmDeleteItem(selectedItem);
                }
                }}
                onCancel={() => setDeleteDialogOpen(false)} />
        </div>
    )
}

export default ItemList;