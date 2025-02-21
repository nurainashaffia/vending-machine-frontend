import './App.css';
import React from 'react';
import NavBar from './features/navBar/NavBar';
import SlotList from './features/slot/SlotList';

function App() {
  return (
    <div className="page">
      <div className='vending-machine'>
        <NavBar />
        <SlotList />
        </div>
    </div>
  );
}

export default App;
