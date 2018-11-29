// Core
import React, { Component } from 'react';
import moment from 'moment';

// Components
import Composer from 'components/Composer';
import Post from 'components/Post';
import StatusBar from 'components/StatusBar';
import Spinner from 'components/Spinner'

// Instruments
import Styles from './styles.m.css';
import { getUniqueID, delay } from 'instruments';

export default class Feed extends Component {
	constructor () {
		super();

		this._createPost = this._createPost.bind(this);
		this._setPostSpinningState = this._setPostSpinningState.bind(this);
		this._likePost = this._likePost.bind(this);
		this._removePost = this._removePost.bind(this);
	}

	state = {
		posts: [
			{ 
				id: '123', 
				comment: 'Hi there!', 
				created: {hour: 1}, 
				likes: [] 
			},
			{ 
				id: '333', 
				comment: 'Youuuuu!', 
				created: {hour: 3}, 
				likes: [] 
			},
		],
		spinning: false,
	}

	_setPostSpinningState (state) {
		this.setState({
			spinning: state,
		});
	}

	async _createPost (comment) {
		const post = {
			id: getUniqueID(),
			created: moment(),
			comment,
			likes: [],
		};

		this._setPostSpinningState(true);

		await delay(1200);

		this.setState(({ posts }) => ({
			posts: [post, ...posts],
			spinning: false
		}));
	}

	async _likePost (id) {
		const { currentUserFirstName, currentUserLastName } = this.props;

		this._setPostSpinningState(true);

		await delay(1200);

		const newPosts = this.state.posts.map((post) => {
			if (post.id === id) {
				return {
					...post,
					likes: [
						{
							id: getUniqueID(),
							firstName: currentUserFirstName,
							lastName: currentUserLastName,
						}
					],
				};
			}

			return post;
		});

		this.setState({
			posts:    newPosts,
			spinning: false
		});
	}

	async _removePost (id) {
		this._setPostSpinningState(true);

		await delay();

		this.setState(({ posts }) => ({
			posts: posts.filter(post => post.id != id),
			spinning: false
		}));
	}

	render() {
		const { posts, spinning } = this.state;

		const postsJSX = posts.map((post) => {
			return <Post key = { post.id } { ...post } _likePost = { this._likePost } _removePost = { this._removePost } />;
		});
       
		return (
			<section className = { Styles.feed }>
				<Spinner spinning = { spinning } />
				<StatusBar />
                <Composer _createPost = { this._createPost } />
                {postsJSX}
            </section>
		);
	}
}