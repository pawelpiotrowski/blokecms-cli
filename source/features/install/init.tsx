import React from 'react';
import {Text, Box} from 'ink';
import {UncontrolledTextInput} from 'ink-text-input';
import {type InstallFeatureProps} from './interface.js';

export default function Init({
	step,
	onComplete,
	onExit,
	margin,
}: InstallFeatureProps) {
	const handleSubmit = (answer: string) => {
		if (answer.toLowerCase() !== 'y') {
			onExit();
			return;
		}

		onComplete(step);
	};

	return (
		<>
			<Box marginRight={margin}>
				<Text>
					This will download and install Bloke CMS, do you want to continue?
					(Y/n)
				</Text>
			</Box>
			<UncontrolledTextInput onSubmit={handleSubmit} />
		</>
	);
}
