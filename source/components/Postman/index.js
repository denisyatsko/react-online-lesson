// Core 
import React from 'react';
import { Transition } from 'react-transition-group';
import { fromTo } from 'gsap';

// Instruments
import Styles from './styles.m.css';
import { withProfile } from 'components/HOC/withProfile';

const Postman = (props) => {
    let _handleEnter = (postman) => {
        fromTo(
            postman,
            1,
            {x: 300},
            {x: 0}
        ); 
    }

    let _handleExit = (postman) => {
        fromTo(
            postman,
            2,
            {x: 0},
            {x: 600}
        ); 
    }

    return (
        <Transition
            appear
            in 
            timeout = { 3000 }
            onEnter = { _handleEnter } 
            onEntered = { _handleExit }>
            <section className = { Styles.postman }>
                <img src = { props.avatar } />
                <span>Welcome online, { props.currentUserFirstName }</span>
            </section>
        </Transition>
    );
}

export default withProfile(Postman);