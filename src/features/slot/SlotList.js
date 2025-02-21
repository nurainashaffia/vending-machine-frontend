import './Slot.css';
import React, { useState, useEffect } from 'react';
import { getSlots } from '../../services/slotService';
import doritosImage from "../../images/doritos_png.png";
import { saveTransaction } from '../../services/transactionService';

const SlotList = () => {
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const checkout = async (itemId, slotId) => {
    try {
      await saveTransaction(itemId, slotId);
      alert('Successfully checked out!');
    } catch (error) {
      console.error('Checkout error', error);
      setError('Error checking out.');
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }
  
  if (error) {
    return <div>{error}</div>
  }
  
  return (
    <div className='vending-machine-slots'>
      {slots.map((slot) => (
        <div key={slot.slotId} className='vending-machine-slot'>
          <span className={`slot-status-badge ${slot.slotStatus === 'OUT_OF_SERVICE' ? 'out-of-service' : 'available'}`}>
            {slot.slotStatus === 'OUT_OF_SERVICE' ? 'OUT OF SERVICE' : 'AVAILABLE'}
          </span>
          <div className='image-container'>
            <img src={doritosImage} alt="Item" />
          </div>
          <p className='item-name-text'>{slot.itemName}</p>
          <p className='item-price-text'>${slot.itemPrice.toFixed(2)}</p>
          <button className='checkout-button' onClick={() => checkout(slot.itemId, slot.slotId)} disabled={slot.slotStatus==='OUT_OF_SERVICE'}>Checkout &gt;</button>
        </div>
      ))}
    </div>
  );
}

export default SlotList;
