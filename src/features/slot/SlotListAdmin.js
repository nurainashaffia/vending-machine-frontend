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
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import DeleteDialog from '../deleteDialog/DeleteDialog.js';
import { updateSlot } from '../../services/slot/slotService.js';
import EditSlotCardDialog from '../editDialog/EditSlotCardDialog.js';
import { clearSlot, getSlots } from '../../services/slot/slotService.js';

const SlotListAdmin = () => {
  const navigate = useNavigate();
  const [slots, setSlots] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [editSlotOpen, setEditSlotOpen] = useState(false);
  const [clearSlotOpen, setClearSlotOpen] = useState(false);
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
  };

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

  const openSlotCard = (slot) => {
    navigate(`/slot/${slot.slotId}`);
  }

  const openEditSlotDialog = (slot) => {
    setSelectedSlot(slot);
    setEditSlotOpen(true);
  }

  const openClearSlotDialog = (slot) => {
    setSelectedSlot(slot);
    setClearSlotOpen(true);
  }

  const saveUpdateSlot = async (slot) => {
    try {
        const updatedSlot = await updateSlot(slot);
        setSlots((prevSlots) =>
            prevSlots.map((s) => (s.slotId === updatedSlot.slotId ? updatedSlot : s))
        );

        toast.success('Successfully updated slot!', {
            icon: false,
            autoClose: 3000,
            draggable: true,
            closeOnClick: true,
            pauseOnHover: true,
            closeButton: false,
            hideProgressBar: true,
            position: 'bottom-left',
            className: 'custom-toast'
        });
        setEditSlotOpen(false);
    } catch (error) {
        console.error('Update slot error:', error);
        let errorMessage = 'Update failed. Please try again';
        if (error.message) {
            errorMessage = error.message;
        }
        toast.error(errorMessage, {
            icon: true,
            autoClose: 3000,
            draggable: true,
            closeOnClick: true,
            pauseOnHover: true,
            closeButton: false,
            hideProgressBar: true,
            position: 'bottom-left',
            className: 'custom-toast'
        });
        setEditSlotOpen(true);
    } finally {
        setLoading(false);
    }
  }

  const confirmClearSlot = async (slot) => {
    try {
      const response = await clearSlot(slot.slotId);
      setSlots(prevSlots =>
          prevSlots.map(s => 
              s.slotId === response.slotId ? response : s
          )
      );

      toast.success('Successfully cleared slot item!', {
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
      console.error('Clear slot error', error);
      toast.error('Clear slot failed', {
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
      setClearSlotOpen(false);
    }
  }

  if (error) {
    return <div>{error}</div>
  }

  return (
    <div className='vending-machine-slots'> 
      {slots.map((slot) => (
        <div key={slot.slotId} className='vending-machine-slot'>
          <div className='button-container'>
            <div className='button-container-left'>
              <button className='vending-machine-button' onClick={() => openClearSlotDialog(slot)}><i className="fa-solid fa-trash"></i></button>
            </div>
            <div className='button-container-right'>
              <button className='vending-machine-button' onClick={() => openSlotCard(slot)}><i className='fa-solid fa-eye'></i></button>
              <button className='vending-machine-button' onClick={() => openEditSlotDialog(slot)}><i className="fa-solid fa-pen-to-square"></i></button>
            </div>
          </div>
          <div className='vending-machine-image-container'>
            <img src={itemImage[slot?.slotId] || defaultImage} alt="Item" />
          </div>
          <p className='item-desc-small'><span className="label">ID: </span>{slot.slotId}</p>
          <p className='item-desc-small'><span className="label">Capacity: </span>{slot.capacity}</p>
          <p className='item-desc-small'><span className="label">Status:&nbsp;</span>
            {slot.slotStatus === 'AVAILABLE' ? 'Available' : 'Out of Service'}
          </p>
          <p className='item-desc-small'><span className="label">Last Restocked: </span>{slot.lastRestocked === null ? "N/A" : slot.lastRestocked}</p>
        </div>
      ))}
      <EditSlotCardDialog
        selectedSlot={selectedSlot} 
        setSelectedSlot={setSelectedSlot}
        isOpen={editSlotOpen}
        onSave={() => { selectedSlot && saveUpdateSlot(selectedSlot); }}
        onCancel={() => setEditSlotOpen(false)} />
      <DeleteDialog
        message={`Are you sure you want to clear Slot ${selectedSlot?.slotId}?`} 
        isOpen={clearSlotOpen} 
        onConfirm={() => {
          if (selectedSlot) {
            confirmClearSlot(selectedSlot);
          }
        }}
        onCancel={() => setClearSlotOpen(false)} />
    </div>
);
}

export default SlotListAdmin;
