import './App.css';
import Footer from './features/footer/footer';
import Login from './features/login/LoginCard';
import 'react-toastify/dist/ReactToastify.css';
import SlotCard from './features/slot/SlotCard';
import { ToastContainer } from 'react-toastify';
import ItemList from './features/item/ItemList';
import NavBarUser from './features/navBar/NavBarUser';
import NavBarAdmin from './features/navBar/NavBarAdmin';
import SlotListUser from './features/slot/SlotListUser';
import SlotListAdmin from './features/slot/SlotListAdmin';
import CreateItemCard from './features/item/CreateItemCard';
import TransactionList from './features/transaction/TransactionList';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

function AppContent() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/';

  return (
    <div className='page'>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<div className='login-vending-machine'><Login /></div>} />
        <Route path="/slots-user" element={<div className='vending-machine'><NavBarUser /><SlotListUser /></div>} />
        <Route path="/slots-admin" element={<div className='vending-machine'><NavBarAdmin /><SlotListAdmin /></div>} />
        <Route path="/slot/:slotId" element={<div className='vending-machine'><NavBarAdmin /><SlotCard /></div>} />
        <Route path="/items" element={<div className='vending-machine'><NavBarAdmin /><ItemList /></div>} />
        <Route path="/item/new" element={<div className='vending-machine'><NavBarAdmin /><CreateItemCard /></div>} />
        <Route path="/transactions" element={<div className='vending-machine'><NavBarAdmin /><TransactionList /></div>} />
      </Routes>
      {!isLoginPage && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;