import {combineReducers, createStore} from 'redux';
import {EnterNewPassReducer} from '../redusers/enterNewPass-reducer';
import {LoginReducer} from '../redusers/login-reducer';
import {TestReducer} from '../redusers/test-reducer';
import {RecoverPassReducer} from '../redusers/recoverPass-reducer';
import {RegistrationReducer} from '../redusers/registration';
import {Error404Reducer} from '../redusers/error404-reducer';


const reducers = combineReducers({
   enterNewPass:EnterNewPassReducer,
   login: LoginReducer,
   test: TestReducer,
   recoverPass: RecoverPassReducer,
   registration:RegistrationReducer,
   error404:Error404Reducer
})


const store = createStore(reducers)


export type AppStoreType = ReturnType<typeof reducers>




export default store



// @ts-ignore
window.store = store