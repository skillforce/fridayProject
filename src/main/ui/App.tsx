import React from 'react';
import './App.css';
import Header from './header/header';
import {Routes} from './routes/Routes';

const App = () => {
    return (
        <div className="App">
       <Header/>
            <Routes/>
        </div>
    );
}

export default App;