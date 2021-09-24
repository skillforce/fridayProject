import {Redirect, Route, Switch} from 'react-router-dom';
import EnterNewPass from '../pages/enterNewPass/enterNewPass';
import Error404 from '../pages/error404/error404';
import Login from '../pages/login/login';
import Profile from '../pages/profile/profile';
import RecoverPass from '../pages/recoverPass/recoverPass';
import Registration from '../pages/registration/registration';
import Test from '../pages/test/test';

export const PATH = {
    ENTER_NEW_PASS: '/newPassword',
    ERROR_404: '/err404',
    LOGIN: '/login',
    PROFILE: '/profile',
    RECOVER_PASS: '/recPassword',
    REGISTRATION: '/reg',
    TEST: '/test',
}


export const Routes = () => {
    return (
        <div>
            <Switch>

                <Route path={'/'} exact render={() => <Redirect to={PATH.LOGIN}/>}/>


                <Route path={PATH.ENTER_NEW_PASS} render={() => <EnterNewPass/>}/>
                <Route path={PATH.ERROR_404} render={() => <Error404/>}/>
                <Route path={PATH.LOGIN} render={() => <Login/>}/>
                <Route path={PATH.PROFILE} render={() => <Profile/>}/>
                <Route path={PATH.RECOVER_PASS} render={() => <RecoverPass/>}/>
                <Route path={PATH.REGISTRATION} render={() => <Registration/>}/>
                <Route path={PATH.TEST} render={() => <Test/>}/>


            </Switch>
        </div>
    )


}