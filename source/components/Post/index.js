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
        created:     object.isRequired,
    }

    _removePost = () => {
        const { _removePost, id } = this.props;

        _removePost(id);
    };

	render() {
        const { 
            id, 
            likes, 
            avatar, 
            comment, 
            _removePost, 
            created, _likePost, 
            currentUserLastName, 
            currentUserFirstName 
        } = this.props;
        
		return (
            <section className = { Styles.post }>
                <span className = { Styles.cross } onClick = { this._removePost } ></span>
                <img src = { avatar } />
                <a>{`
                    ${ currentUserFirstName }
                    ${ currentUserLastName }
                `}</a>
                <time>
                    { moment(created).format('MMMM D h:mm:ss') }
                </time>
                <p>{ comment }</p>
                <Like _likePost = { _likePost } id = { id } likes = { likes } />
            </section>
		);
	}
}