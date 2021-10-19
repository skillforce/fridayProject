import React, {useEffect} from 'react';
import './App.css';
import Header from './header/header';
import {Routes} from './routes/Routes';
import {AppStoreType} from '../bll/store/store';
import {useDispatch, useSelector} from 'react-redux';
import {AuthMe, IsInitializedStatusType} from '../bll/redusers/app-reducer';

// +_+


const App = () => {
    const isInitialized = useSelector<AppStoreType, IsInitializedStatusType>(state => state.app.isInitialized)
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(AuthMe())
    }, [])


    if (isInitialized === 'loading') {
        return <div>loading...</div>
    }

    return (
        <div className="App">
            <Header/>
            <Routes/>
        </div>
    );
}

export default App;
