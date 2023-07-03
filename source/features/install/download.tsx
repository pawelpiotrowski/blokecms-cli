import {spawnSync} from 'node:child_process';
import React, {useEffect} from 'react';
import {Text, Box} from 'ink';
import Spinner from 'ink-spinner';
import {type InstallFeatureProps} from './interface.js';
import {blokeCmsPackageName, workingDirectory} from './constants.js';

export default function Download({
	step,
	margin,
	onComplete,
	onError,
}: InstallFeatureProps) {
	const download = () => {
		try {
			spawnSync('npm', [
				'pack',
				`${blokeCmsPackageName}@latest`,
				'--pack-destination',
				workingDirectory,
			]);
			onComplete(step);
		} catch (error) {
			onError(error);
		}
	};

	useEffect(download, [onComplete, onError, step]);

	return (
		<Box marginRight={margin}>
			<Text>
				<Text color="green">
					<Spinner type="dots" />
				</Text>
				{' Downloading source files...'}
			</Text>
		</Box>
	);
}
