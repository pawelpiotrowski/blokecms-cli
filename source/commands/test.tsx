import React from 'react';
import {Text} from 'ink';
import zod from 'zod';

export const options = zod.object({
	name: zod.string().default('cowboy').describe('Name'),
});

type Props = {
	options: zod.infer<typeof options>;
};

export default function Test({options}: Props) {
	return (
		<Text>
			See you space <Text color="green">{options.name}</Text>
		</Text>
	);
}
