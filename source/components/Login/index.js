// Core
import React, { Component } from 'react';
import { func } from 'prop-types';
import { withRouter } from 'react-router-dom';

// Instruments
import Styles from './styles.m.css';

// Components
import { Consumer, withProfile } from 'components/HOC/withProfile';

@withRouter
export default class Login extends Component {
	static propTypes = {
        _setloginState: func.isRequired,
    }	

    _authButton = () => {
    	this.props.history.push('/feed');
    	
    	this.props._setloginState(true);
    }

	render() {
		return (
            <section className = { Styles.login }>
                <h1>Please, click to log in</h1>
                <button onClick = { this._authButton }>Log In</button>
            </section>
        );
	}
}