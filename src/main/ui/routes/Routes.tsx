import {Redirect, Route, Switch} from 'react-router-dom';

import Error404 from '../pages/error404/error404';
import Login from '../pages/login/login';
import Profile from '../pages/profile/profile';
import RecoverPass from '../pages/recoverPass/recoverPass';
import Registration from '../pages/registration/registration';
import TabletCards from '../pages/tablet-cards/tablet-cards';
import SetNewPassword from '../pages/setNewPassword/setNewPassword';
import React from 'react';
import Card from '../pages/card/card';
import {CardGame} from '../pages/cardGame/cardGame';

export const PATH = {
    ERROR_404: '/err404',
    LOGIN: '/login',
    PROFILE: '/profile',
    RECOVER_PASS: '/recPassword',
    REGISTRATION: '/reg',
    TEST: '/test',
    CREATE_NEW_PASS:'/set-new-password/:token',
    CARDS_TABLET:'/cards-tablet',
    CARD:'/card/:token',
    CARD_GAME:'/game/:token'
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
                <Route path={PATH.TEST} render={() => <Redirect to={PATH.LOGIN}/>}/>
                <Route path={PATH.CREATE_NEW_PASS} render={() => <SetNewPassword/>}/>
                <Route path={PATH.CARDS_TABLET} render={() => <TabletCards/>}/>
                <Route path={PATH.CARD} render={() => <Card/>}/>
                <Route path={PATH.CARD_GAME} render={() => <CardGame/>}/>

                <Route render={() => <Error404/>}/>

            </Switch>
        </div>
    )


}