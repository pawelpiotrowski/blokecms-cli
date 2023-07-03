import React from 'react';
import test from 'ava';
import {render} from 'ink-testing-library';
import Install from './install.js';

test('install cms should start with init step', t => {
	const {lastFrame} = render(<Install />);

	t.is(
		lastFrame()?.includes(
			'This will download and install Bloke CMS, do you want to continue? (Y/n)',
		),
		true,
	);
});
