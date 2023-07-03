import React, {useEffect} from 'react';
import {Text, Box} from 'ink';
import {type InstallFeatureProps} from './interface.js';
import {
	blokeCmsPackageDirName,
	serverDirName,
	workingDirectory,
} from './constants.js';

export default function Complete({
	step,
	margin,
	onComplete,
}: InstallFeatureProps) {
	const startCmd = 'node dist/main';

	useEffect(() => {
		onComplete(step);
	}, [onComplete, step]);

	return (
		<Box marginRight={margin} flexDirection="column">
			<Text>
				<Text color="green">✔</Text>
				{' All done!'}
			</Text>
			<Text color="cyanBright">Next steps:</Text>
			<Text color="cyanBright">
				{'1. Navigate to server directory: '}{' '}
				<Text color="grey">{`cd ${workingDirectory}/${blokeCmsPackageDirName}/${serverDirName}`}</Text>
			</Text>
			<Text color="cyanBright">
				{'2. Seed user to get access: '}{' '}
				<Text color="grey">{`ADMIN_SEED=<USERNAME> ${startCmd}`}</Text>
			</Text>
			<Text>
				Pay attention to stdout it will print your seed username password.
			</Text>
			<Text color="cyanBright">
				{'3. Stop the app and start with: '}{' '}
				<Text color="grey">{`NODE_ENV=production ${startCmd}`}</Text>
			</Text>
		</Box>
	);
}
