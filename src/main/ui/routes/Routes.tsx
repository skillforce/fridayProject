import {Redirect, Route, Switch} from 'react-router-dom';

import Error404 from '../pages/error404/error404';
import Login from '../pages/login/login';
import Profile from '../pages/profile/profile';
import RecoverPass from '../pages/recoverPass/recoverPass';
import Registration from '../pages/registration/registration';
import Test from '../pages/test/test';
import SetNewPassword from '../pages/setNewPassword/setNewPassword';
import React from 'react';

export const PATH = {
    ERROR_404: '/err404',
    LOGIN: '/login',
    PROFILE: '/profile',
    RECOVER_PASS: '/recPassword',
    REGISTRATION: '/reg',
    TEST: '/test',
    CREATE_NEW_PASS:'/set-new-password/:token'
}


export const Routes = () => {
    return (
        <div>
            <Switch>

                <Route path={'/'} exact render={() => <Redirect to={PATH.LOGIN}/>}/>
                <Route path={PATH.LOGIN} render={() => <Login/>}/>
                <Route path={PATH.PROFILE} render={() => <Profile/>}/>
                <Route path={PATH.RECOVER_PASS} render={() => <RecoverPass/>}/>
                <Route path={PATH.REGISTRATION} render={() => <Registration/>}/>
                <Route path={PATH.TEST} render={() => <Test/>}/>
                <Route path={PATH.CREATE_NEW_PASS} render={() => <SetNewPassword/>}/>

                <Route render={() => <Error404/>}/>

            </Switch>
        </div>
    )


}