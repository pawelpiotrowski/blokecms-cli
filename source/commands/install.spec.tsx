import React from 'react';
import chalk from 'chalk';
import test from 'ava';
import {render} from 'ink-testing-library';
import Install from './install.js';

test('install cms', t => {
	const {lastFrame} = render(<Install options={{aid: true}} />);

	t.is(lastFrame(), `Installing${chalk.green(' in interactive mode.')}`);
});
