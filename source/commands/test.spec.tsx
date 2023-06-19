import React from 'react';
import chalk from 'chalk';
import test from 'ava';
import {render} from 'ink-testing-library';
import Test from './test.js';

test('greet user', t => {
	const {lastFrame} = render(<Test options={{name: 'Bebop'}} />);

	t.is(lastFrame(), `See you space, ${chalk.green('Bebop')}`);
});
