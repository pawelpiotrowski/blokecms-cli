import {spawn} from 'node:child_process';
import React, {useEffect} from 'react';
import {Text, Box} from 'ink';
import Spinner from 'ink-spinner';
import {type InstallFeatureProps} from './interface.js';
import {blokeCmsPackageDirName, workingDirectory} from './constants.js';

export default function Prebuild({
	step,
	margin,
	onComplete,
	onError,
}: InstallFeatureProps) {
	const install = () => {
		spawn('npm', ['run', 'build:prepare'], {
			cwd: `${workingDirectory}/${blokeCmsPackageDirName}`,
		})
			.on('exit', (code, signal) => {
				if (code === 0) {
					onComplete(step);
					return;
				}

				const errorMessageCode = code ?? 'unknown';
				const errorMessageSignal = signal ?? 'unknown';
				const errorMessage = `Could not set .env file and or ui directories, code: ${errorMessageCode}, signal: ${errorMessageSignal}.`;

				onError(errorMessage);
			})
			.on('error', error => {
				onError(error);
			});
	};

	useEffect(install, [onComplete, onError, step]);

	return (
		<Box marginRight={margin}>
			<Text>
				<Text color="green">
					<Spinner type="dots" />
				</Text>
				{' Generating .env file and ui directories...'}
			</Text>
		</Box>
	);
}
