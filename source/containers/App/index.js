// Core
import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { Switch, Route, Redirect } from 'react-router-dom';

// Components
import Feed from 'components/Feed';
import Profile from 'components/Profile';
import Login from 'components/Login';
import { Provider } from 'components/HOC/withProfile';
import Catcher from 'components/Catcher';

// Instruments
import avatar from 'theme/assets/lisa';
import StatusBar from 'components/StatusBar';

const status = (localStorage.isLoggedIn !== undefined) ? JSON.parse(localStorage.isLoggedIn) : false;

const options = {
    avatar,
    isLoggedIn: status,
    currentUserFirstName: 'Денис',
    currentUserLastName: 'Яцко',
};


@hot(module)
export default class App extends Component {
    _setloginState = (state) => {
        options.isLoggedIn = state;

        this.saveToLocalStorage();
    }

    saveToLocalStorage() {
        const status = JSON.stringify(options.isLoggedIn);

        localStorage.setItem('isLoggedIn', status);
    }

    render() {        
        return (
            <Catcher>
                <Provider value = { options } >
                    <StatusBar _setloginState = { this._setloginState }/>
                    <Switch>
                        <Route component = { Profile } path = '/profile'/>
                        <Route component = { Feed } path = '/feed'/>
                        <Route exact path='/login' render = { (props) => (
                          <Login _setloginState = { this._setloginState } />
                        )}/>
                        { options.isLoggedIn 
                            ? <Redirect to = '/feed' /> 
                            : <Redirect to = '/login' />}
                    </Switch>
                </Provider> 
            </Catcher> 
        );
        
        

        
    }
}
