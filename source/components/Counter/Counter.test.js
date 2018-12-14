// Core
import React from 'react';
import Counter from './';
import renderer from 'react-test-renderer';

const renderTree = renderer.create(<Counter count = { 3 } />).toJSON();

test('Counter should correspond to its snapshot counterpart', () => {
	expect(renderTree).toMatchSnapshot();
});