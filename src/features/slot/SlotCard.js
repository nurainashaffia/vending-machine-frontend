import './Slot.css';
import { useParams, Link } from 'react-router-dom';
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
import React, { useState, useEffect } from "react";
import { getSlotFromSlotId } from '../../services/slot/slotService';
import { getTransactionFromTransactionId } from '../../services/transaction/transactionService';

const SlotCard = () => {
    const { slotId } = useParams();
    const { transactionId } = useParams();
    const [ error, setError ] = useState(null);
    const [ slot, setSlot ] = useState(null);
    const [transactions, setTransactions] = useState([]);

    const [ loading, setLoading ] = useState(false);
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
        const fetchSlot = async () => {
          try {
            const slotData = await getSlotFromSlotId(slotId);
            setSlot(slotData);
            setLoading(false);
          } catch (error) {
            setError(`Error fetching slot ${slotId}.`);
            setLoading(false);
          }
        };
    
        fetchSlot();
    }, [slotId]);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                if (slot?.transactionId?.length > 0) {
                    const transactionPromises = slot.transactionId.map(id => getTransactionFromTransactionId(id));
                    const transactionDetails = await Promise.all(transactionPromises);
                    setTransactions(transactionDetails);
                }
            } catch (error) {
                setError("Error fetching transactions.");
            }
        };
    
        fetchTransactions();
    }, [slot?.transactionId]);
    

    if (error) {
        return (
            <p>{error}</p>
        )
    }

    return (
        <div className='slot-card'> 
            <div className='slot-card-header'>   
                <div className='slot-card-back'><Link to="/slots-admin" className='slot-back-link'>&larr; Back to Slots</Link></div>   
            </div>       
            <div className='slot-card-section-title'>Slot</div>
            <div className='slot-card-section-details-container'>
                <table className='slot-card-details'>
                    <tr>
                        <td><span className="label">ID</span></td>
                        <td><span className="value">{slot?.slotId}</span></td>
                    </tr>
                    <tr>
                        <td><span className="label">Capacity</span></td>
                        <td><span className="value">{slot?.capacity}</span></td>
                    </tr>
                    <tr>
                        <td><span className="label">Status</span></td>
                        <td><span className="value">{slot?.slotStatus === 'AVAILABLE' ? 'Available' : 'Out of Service'}</span></td>
                    </tr>
                    <tr>
                        <td><span className="label">Last Restocked</span></td>
                        <td><span className="value">{slot?.lastRestocked === null ? "N/A" : slot?.lastRestocked}</span></td>
                    </tr>
                </table>
            </div>

            <div className='slot-card-section-title'>Item Details</div>
            <div className='slot-card-section-details-container'>
                {slot?.itemId ? (
                    <table className='slot-card-details'>
                        <tr>
                            <td><span className="label">ID</span></td>
                            <td><span className="value">{slot?.itemId}</span></td>
                        </tr>
                        <tr>
                            <td><span className="label">Stock</span></td>
                            <td><span className="value">{slot?.itemStock}</span></td>
                        </tr>
                        <tr>
                            <td><span className="label">Price</span></td>
                            <td><span className="value">${slot?.itemPrice.toFixed(2)}</span></td>
                        </tr>
                        <tr>
                            <td><span className="label">Name</span></td>
                            <td><span className="value">{slot?.itemName}</span></td>
                        </tr>                
                    </table>
                ) : <p className='slot-card-details' style={{ paddingLeft:"3px" }}>N/A</p>
                }
            </div>

            <div className='slot-card-section-title'>Transaction History</div>
            <div className='slot-card-section-details-container'>
            {Array.isArray(slot?.transactionId) && slot.transactionId.length > 0 ? (transactions.length > 0 ? (
                <table className='slot-card-details'>
                    <thead>
                        <tr>
                            <th><span className="label">ID</span></th>
                            <th><span className="label-transaction-date">Date</span></th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((t) => (
                            <tr key={t.transactionId}>
                                <td><span className="value-transaction-id">{t.transactionId}</span></td>
                                <td><span className="value-transaction-date">{t.transactionDate}</span></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : <p className='slot-card-details'>Loading transactions...</p>
            ) : <p className='slot-card-details' style={{ paddingLeft:"3px" }}>N/A</p>}
        </div>
    </div>
    )
}

export default SlotCard;