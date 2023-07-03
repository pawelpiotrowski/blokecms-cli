import {readdirSync} from 'node:fs';
import React, {useEffect} from 'react';
import {Text, Box} from 'ink';
import * as tar from 'tar';
import Spinner from 'ink-spinner';
import {type InstallFeatureProps} from './interface.js';
import {
	blokeCmsPackageExt,
	blokeCmsPackageName,
	workingDirectory,
	workingDirectoryPath,
} from './constants.js';

export default function Extract({
	step,
	margin,
	onComplete,
	onError,
}: InstallFeatureProps) {
	const extract = () => {
		let tarPackage: string | undefined;
		try {
			tarPackage = readdirSync(workingDirectoryPath).find(
				file =>
					file.startsWith(blokeCmsPackageName) &&
					file.endsWith(blokeCmsPackageExt),
			);
		} catch (error) {
			onError(error);
		}

		if (typeof tarPackage === 'string') {
			tar
				.x({
					file: `${workingDirectoryPath}/${tarPackage}`,
					cwd: workingDirectory,
				})
				.then(() => {
					onComplete(step);
				})
				.catch(error => {
					onError(error);
				});
			return;
		}

		onError(`${blokeCmsPackageName} not found!`);
	};

	useEffect(extract, [onComplete, onError, step]);

	return (
		<Box marginRight={margin}>
			<Text>
				<Text color="green">
					<Spinner type="dots" />
				</Text>
				{' Extracting files...'}
			</Text>
		</Box>
	);
}
