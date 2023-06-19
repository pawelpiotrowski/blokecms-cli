import React from 'react';
import {Text} from 'ink';
import zod from 'zod';
import {option} from 'pastel';

export const isDefault = true;

export const options = zod.object({
	aid: zod.boolean().describe(
		option({
			description: 'Aid',
			alias: 'a',
		}),
	),
});

type Props = {
	options: zod.infer<typeof options>;
};

export default function Install({options}: Props) {
	return (
		<Text>
			Installing
			{options.aid ? <Text color="green"> in interactive mode.</Text> : '...'}
		</Text>
	);
}
