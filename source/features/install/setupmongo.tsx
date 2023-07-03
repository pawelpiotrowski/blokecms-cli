import {readFileSync, writeFileSync} from 'node:fs';
import React, {useState} from 'react';
import {Text, Box} from 'ink';
import {UncontrolledTextInput} from 'ink-text-input';
import {type InstallFeatureProps} from './interface.js';
import {clientConfigFilePath, serverEnvFilePath} from './constants.js';

export default function SetupMongo({
	step,
	onComplete,
	onError,
	margin,
}: InstallFeatureProps) {
	const mongoUrlPattern = 'mongodb';
	const [validationMessage, setValidationMessage] = useState('');
	const isValidSetupUrl = (forAnswer: string) =>
		forAnswer.length === 0 || forAnswer.startsWith(mongoUrlPattern);

	const setMongoUrl = (url: string) => {
		try {
			let serverEnvContent = readFileSync(serverEnvFilePath, 'utf8');
			serverEnvContent += `\nDB_URL="${url}"\n`;
			const clientConfigContent = JSON.parse(
				readFileSync(clientConfigFilePath, 'utf8'),
			) as Record<string, string>;

			serverEnvContent += `\nAUTH_COOKIES_REQUIRE_HTTPS="${String(
				clientConfigContent['ssrAbsoluteUrl']?.startsWith('https'),
			)}"\n`;

			writeFileSync(serverEnvFilePath, serverEnvContent);
		} catch (error) {
			onError(`Could not set MongoDB url. ${JSON.stringify(error)}`);
		}
	};

	const handleSubmit = (url: string) => {
		setValidationMessage('');

		if (isValidSetupUrl(url)) {
			if (url.length > 0) {
				setMongoUrl(url);
			}

			onComplete(step);
			return;
		}

		setValidationMessage(
			`Not valid url. It has to start with "${mongoUrlPattern}" or leave it blank if running locally.`,
		);
	};

	return (
		<Box marginRight={margin} flexDirection="column">
			{validationMessage.length > 0 && (
				<Text color="gray">{validationMessage}</Text>
			)}
			<Text>
				Provide your Mongo DB url or leave blank if you run cms locally using
				defaults (in ex. mongodb://user:pwd@localhost/blokecms):
			</Text>
			<UncontrolledTextInput onSubmit={handleSubmit} />
		</Box>
	);
}
