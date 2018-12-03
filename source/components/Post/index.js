// Core
import React, { Component } from 'react';
import moment from 'moment';
import { func, string, array, number, object } from 'prop-types';

// Components
import { Consumer, withProfile } from 'components/HOC/withProfile';
import Like from 'components/Like';

// Instruments
import Styles from './styles.m.css';

@withProfile
export default class Post extends Component {
    static propTypes = {
        _removePost: func.isRequired,
        _likePost:   func.isRequired,
        comment:     string.isRequired,
        id:          string.isRequired,
        likes:       array.isRequired,
        created:     number.isRequired,
    }

    _removePost = () => {
        const { _removePost, id } = this.props;

        _removePost(id);
    }

    _getCross = () => {
        const { firstName, lastName, currentUserFirstName, currentUserLastName } = this.props;

        return `${firstName} ${lastName}` === `${currentUserFirstName} ${currentUserLastName}`
            ? <span className = { Styles.cross } onClick = { this._removePost } ></span>
            : null
    }

	render() {
        const { 
            id, 
            likes, 
            avatar, 
            comment, 
            created, 
            lastName, 
            firstName,
            _likePost, 
            _removePost, 
        } = this.props;

        const cross = this._getCross();
        
		return (
            <section className = { Styles.post }>
                { cross }
                <img src = { avatar } />
                <a>{` ${ firstName } ${ lastName } `}</a>
                <time>
                    { moment(created).format('MMMM D h:mm:ss') }
                </time>
                <p>{ comment }</p>
                <Like _likePost = { _likePost } id = { id } likes = { likes } />
            </section>
		);
	}
}