import './Slot.css';
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
import { getSlots } from '../../services/slot/slotService.js';
import ConfirmDialog from "../checkoutDialog/CheckoutDialog.js";
import { saveTransaction } from '../../services/transaction/transactionService.js';

const SlotListUser = () => {
  const [slots, setSlots] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [animatingSlotId, setAnimatingSlotId] = useState(null);
  const defaultImage = item_10; 
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
    const fetchSlots = async () => {
      try {
        const slotData = await getSlots();
        setSlots(slotData);
        setLoading(false);
      } catch (error) {
        setError('Error fetching slots.');
        setLoading(false);
      }
    };

    fetchSlots();
  }, []);

  const openDialog = (slot) => {
    setSelectedSlot(slot);
    setDialogOpen(true);
  }

  const confirmCheckout = async (itemId, slotId) => {
    try {
      await saveTransaction(itemId, slotId);  
      setAnimatingSlotId(slotId);
      setTimeout(() => {
        setAnimatingSlotId(null);

        toast.success('Item dispensed successfully. Enjoy your purchase!', {
        icon: false,
        autoClose: 3000,
        draggable: true,
        closeOnClick: true,
        pauseOnHover: true,
        closeButton: false,
        hideProgressBar: true,
        position: "bottom-left",
        className: "custom-toast"
      })
      }, 2300);
    } catch (error) {
      console.error('Checkout error', error);
      setError('Error checking out.');
      toast.error('Purchase failed.', {
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
    <div className='vending-machine-slots'>
      {slots.map((slot) => (
        <div key={slot.slotId} className='vending-machine-slot'>
          <div className='vending-machine-image-container'>
            <img
              className={
                animatingSlotId === slot.slotId ? "drop-bounce-then-fade" : ""
              }
              src={itemImage[slot?.slotId] || defaultImage}
              alt="Item"
            />
          </div>
          <p className='item-desc-big'>{slot.itemName === null ? "N/A" : slot.itemName}</p>
          <p className='item-desc-medium'>${slot.itemPrice.toFixed(2)}</p>
          <button
            className='checkout-button'
            onClick={() => openDialog(slot)}
            disabled={
              slot.slotStatus === 'OUT_OF_SERVICE' ||
              slot.itemId === null ||
              slot.capacity < 1
            }
          >
            {slot.slotStatus === 'OUT_OF_SERVICE'
              ? 'Out of Service'
              : slot.capacity < 1
              ? 'Out of Stock'
              : 'Checkout >'}
          </button>          
        </div>
      ))}
      <ConfirmDialog
        message={`Are you sure you want to purchase ${selectedSlot?.itemName}?`} 
        isOpen={dialogOpen} 
        onConfirm={() => {
          if (selectedSlot) {
            confirmCheckout(selectedSlot.itemId, selectedSlot.slotId);
          }
        }}
        onCancel={() => setDialogOpen(false)} />
    </div>
  );
}

export default SlotListUser;
