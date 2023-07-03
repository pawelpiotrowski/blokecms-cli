import {existsSync, mkdirSync, readdirSync} from 'node:fs';
import React, {useEffect} from 'react';
import {Text, Box} from 'ink';
import Spinner from 'ink-spinner';
import {type InstallFeatureProps} from './interface.js';
import {workingDirectory, workingDirectoryPath} from './constants.js';

export default function Prepare({
	step,
	onComplete,
	onError,
	margin,
}: InstallFeatureProps) {
	const dir = workingDirectoryPath;
	const prepare = () => {
		try {
			if (!existsSync(dir)) {
				mkdirSync(dir);
			}

			if (readdirSync(dir).length === 0) {
				onComplete(step);
				return;
			}

			onError(`Directory ${workingDirectory} exists and it is NOT empty!`);
		} catch (error) {
			onError(error);
		}
	};

	useEffect(prepare, [onComplete, onError, step, dir]);

	return (
		<Box marginRight={margin}>
			<Text>
				<Text color="green">
					<Spinner type="dots" />
				</Text>
				{' Creating temporary directory...'}
			</Text>
		</Box>
	);
}
