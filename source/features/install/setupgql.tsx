import {readFileSync, writeFileSync} from 'node:fs';
import React, {useState} from 'react';
import {Text, Box} from 'ink';
import {UncontrolledTextInput} from 'ink-text-input';
import {type InstallFeatureProps} from './interface.js';
import {clientConfigFilePath} from './constants.js';

type ClientConfigContent = {
	ssrAbsoluteUrl: string;
};

export default function SetupGql({
	step,
	onComplete,
	onError,
	margin,
}: InstallFeatureProps) {
	const gqlUrlPattern = 'http';
	const [validationMessage, setValidationMessage] = useState('');
	const isValidSetupUrl = (forAnswer: string) =>
		forAnswer.length === 0 || forAnswer.startsWith(gqlUrlPattern);

	const setClientConfigUrl = (url: string) => {
		try {
			const clientConfigContent = JSON.parse(
				readFileSync(clientConfigFilePath, 'utf8'),
			) as ClientConfigContent;
			clientConfigContent.ssrAbsoluteUrl = url;
			writeFileSync(clientConfigFilePath, JSON.stringify(clientConfigContent));
		} catch (error) {
			onError(`Could not set GraphQL url. ${JSON.stringify(error)}`);
		}
	};

	const handleSubmit = (url: string) => {
		setValidationMessage('');

		if (isValidSetupUrl(url)) {
			if (url.length > 0) {
				setClientConfigUrl(url);
			}

			onComplete(step);
			return;
		}

		setValidationMessage(
			`Not valid url. It has to start with "${gqlUrlPattern}" or leave it blank if running locally.`,
		);
	};

	return (
		<Box marginRight={margin} flexDirection="column">
			{validationMessage.length > 0 && (
				<Text color="gray">{validationMessage}</Text>
			)}
			<Text>
				Provide your publish url for GraphQL setup or leave blank if you run cms
				locally using defaults (in ex. https://example.com):
			</Text>
			<UncontrolledTextInput onSubmit={handleSubmit} />
		</Box>
	);
}
