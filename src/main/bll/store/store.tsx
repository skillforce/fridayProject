import {applyMiddleware, combineReducers, createStore} from 'redux';
import {EnterNewPassReducer} from '../redusers/enterNewPass-reducer';
import {LoginReducer} from '../redusers/login-reducer';
import {TestReducer} from '../redusers/test-reducer';
import {RecoverPassReducer} from '../redusers/recoverPass-reducer';
import {RegistrationReducer} from '../redusers/registration-reducer';
import {Error404Reducer} from '../redusers/error404-reducer';
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension';
import ProfileReducer from '../redusers/profile-reducer';
import {AppReducer} from '../redusers/app-reducer';
import TabletReducer from '../redusers/tablet-reducer';
import CardReducer from '../redusers/card-reducer';
import {cardGameReducer} from '../redusers/card-game-reducer';


const reducers = combineReducers({
    enterNewPass: EnterNewPassReducer,
    login: LoginReducer,
    test: TestReducer,
    recoverPass: RecoverPassReducer,
    registration: RegistrationReducer,
    error404: Error404Reducer,
    profile: ProfileReducer,
    app: AppReducer,
    tablet: TabletReducer,
    card: CardReducer,
    cardGame:cardGameReducer
})


const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunkMiddleware),))


export type AppStoreType = ReturnType<typeof reducers>


export default store


// @ts-ignore
window.store = store