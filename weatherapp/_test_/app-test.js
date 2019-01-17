/**Jest Snapshot Testing app.js */
import React from 'react';
import App from '../App';

import renderer from 'react-test-renderer';

test('renders correctly', () => {
    const testing = renderer.create(<App />).toJSON();
    expect(testing).toMatchSnapshot();

});
