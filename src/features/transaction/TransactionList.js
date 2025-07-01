import './transaction.css';
import { toast } from 'react-toastify';
import React, { useState, useEffect } from 'react';
import { getTransactions, getTransactionFromTransactionId } from '../../services/transaction/transactionService';

const TransactionList = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const data = await getTransactions();
                setTransactions(data);
                setLoading(false);
            } catch (error) {
                setError('Error fetching transactions.');
                setLoading(false);
            }
        };

        fetchTransactions();
    }, []);

    const handleSearch = async () => {
        try {
            if (searchTerm.trim() === '') {
                const data = await getTransactions();
                setTransactions(data);
            } else {
                const result = await getTransactionFromTransactionId(searchTerm);
                setTransactions([result]);
            }
        } catch (err) {
            toast.error('Transaction ID not found', {
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
    
    return (
        <div className='transaction-page'>
            <div className='transaction-page-container'>
                <div className='transaction-buttons-divider'>
                    <div className="transaction-search-container">
                        <input type="text" placeholder="Search Transaction ID..." className="transaction-search-input" value={searchTerm} 
                            onChange={(e) => setSearchTerm(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSearch()} />
                        <button className="transaction-search-icon-btn" onClick={handleSearch}>
                            <i class="fa-solid fa-magnifying-glass"></i>
                            <span className="btn-text"></span>
                        </button>
                    </div>
                </div>
                <div className='transaction-divider'>
                    <table>
                        <tbody>
                            {transactions.map((transaction) => (
                                <React.Fragment key={transaction.transactionId}>
                                    <tr>
                                        <td className='id-label-div'><span className="id-label">ID {transaction.transactionId}</span></td>
                                    </tr>
                                    <tr>
                                        <td colSpan="4"><hr className="transaction-divider-line"/></td>
                                    </tr>
                                    <tr>
                                        <td><span className="label">Date</span></td>
                                        <td>{transaction.transactionDate}</td>
                                    </tr>
                                    <tr>
                                        <td><span className="label">Price</span></td>
                                        <td>{`$${transaction.itemPrice.toFixed(2)}`}</td>
                                    </tr>
                                    <tr>
                                        <td><span className="label">Slot ID</span></td>
                                        <td>{transaction.slotId}</td>
                                    </tr>
                                    <tr>
                                        <td><span className="label">Item ID</span></td>
                                        <td>{transaction.itemId}</td>
                                    </tr>
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default TransactionList;