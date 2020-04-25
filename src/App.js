import React from 'react';
import './App.css';
import CasesPerCountry from './components/CasesPerCountry';

function App() {
  return (
    <div className="App">
      <h1>COVID-19 Statistics</h1>
      <CasesPerCountry />
    </div>
  );
}

export default App;
