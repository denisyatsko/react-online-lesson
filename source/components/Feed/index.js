// Core
import React, { Component } from 'react';

// Components
import Composer from 'components/Composer';
import Post from 'components/Post';
import StatusBar from 'components/StatusBar';
import Spinner from 'components/Spinner'

// Instruments
import Styles from './styles.m.css';

export default class Feed extends Component {
	state = {
		posts: [
			{ id: '123', comment: 'Hi there!', created: 3324356 },
			{ id: '333', comment: 'Youuuuu!', created: 3324456 },
		],
		spinning: true,
	}
	render() {
		const { posts, spinning } = this.state;

		const postsJSX = posts.map((post) => {
			return <Post key = { post.id } { ...post } />;
		});

		return (
			<section className = { Styles.feed }>
				<Spinner spinning = { spinning } />
				<StatusBar />
                <Composer />
                {postsJSX}
            </section>
		);
	}
}