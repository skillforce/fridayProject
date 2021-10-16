import React from 'react';
import './App.css';
import Header from './header/header';
import {Routes} from './routes/Routes';

// +_+
const App = () => {
    return (
        <div className="App">
       <Header/>
            <Routes/>
        </div>
    );
}

export default App;
