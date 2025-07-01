import './Slot.css';
import { useState, useEffect } from "react";
import { useParams, Link } from 'react-router-dom';
import { getSlotFromSlotId } from '../../services/slot/slotService';
import { getTransactionFromTransactionId } from '../../services/transaction/transactionService';

const SlotCard = () => {
    const {slotId} = useParams();
    const [slot, setSlot] = useState(null);
    const [error, setError] = useState(null);
    const [transactions, setTransactions] = useState([]);

    const [ loading, setLoading ] = useState(false);

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