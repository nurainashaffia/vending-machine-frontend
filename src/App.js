import './App.css';
import React from 'react';
import Footer from './features/footer/footer';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import ItemList from './features/item/ItemList';
import NavBarUser from './features/navBar/NavBarUser';
import NavBarAdmin from './features/navBar/NavBarAdmin';
import SlotListUser from './features/slot/SlotListUser';
import SlotListAdmin from './features/slot/SlotListAdmin';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TransactionList from './features/transaction/transaction';
import SlotCard from './features/slot/SlotCard';

function App() {
  return (
    // <div className="page">
    //   <div className='vending-machine'>
    //     <NavBarUser />
    //     <ToastContainer />
    //     <SlotListUser />
    //   </div>
    //   <Footer />
    // </div>
    <Router>
      <div className='page'>
        <div className='vending-machine'>
          <NavBarAdmin />
          <ToastContainer />
          <Routes>
            <Route path="/slot/:slotId" element={<SlotCard />} />
            <Route path="/" element={<SlotListAdmin />} />
            <Route path="/items" element={<ItemList />} />
            <Route path="/transactions" element={<TransactionList />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
