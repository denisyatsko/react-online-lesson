// Core
import React, { Component } from 'react';
import moment from 'moment';
import { func, string, array, number, object } from 'prop-types';

// Components
import { Consumer } from 'components/HOC/withProfile';
import Like from 'components/Like';

// Instruments
import Styles from './styles.m.css';

export default class Post extends Component {
    static propTypes = {
        _removePost: func.isRequired,
        _likePost:   func.isRequired,
        comment:     string.isRequired,
        id:          string.isRequired,
        likes:       array.isRequired,
        created:     object.isRequired,
    };

    constructor () {
        super();
        
        this._removePost = this._removePost.bind(this);
    };

    _removePost () {
        const { _removePost, id } = this.props;

        _removePost(id);
    };

	render() {
        const { comment , created, _likePost, id, likes, _removePost } = this.props;
        
		return (
            <Consumer>
                {(context) => (
                    <section className = { Styles.post }>
                        <span className = { Styles.cross } onClick = { this._removePost } ></span>
                        <img src = { context.avatar } />
                        <a>{`
                            ${ context.currentUserFirstName }
                            ${ context.currentUserLastName }
                        `}</a>
                        <time>
                            { moment(created).format('MMMM D h:mm:ss') }
                        </time>
                        <p>{ comment }</p>
                        <Like 
                            _likePost = { _likePost } 
                            id = { id } 
                            likes = { likes } 
                            { ...context }
                        />
                    </section>
                )}
            </Consumer> 
		);
	}
}