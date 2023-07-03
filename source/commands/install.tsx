import React, {useState} from 'react';
import {Box, Text, useApp} from 'ink';
import {
	InstallStep,
	isLastStep,
	nextStep,
	stepCompletionDelay,
	steps,
} from '../features/install/step.js';
import Init from '../features/install/init.js';
import Download from '../features/install/download.js';
import Complete from '../features/install/complete.js';
import Prepare from '../features/install/prepare.js';
import Extract from '../features/install/extract.js';
import Dependencies from '../features/install/dependencies.js';
import Build from '../features/install/build.js';
import Prebuild from '../features/install/prebuild.js';
import SetupGql from '../features/install/setupgql.js';
import SetupMongo from '../features/install/setupmongo.js';
import DependenciesProd from '../features/install/dependenciesprod.js';
import Cleanup from '../features/install/cleanup.js';

export const isDefault = true;

export default function Install() {
	const [state, setState] = useState({
		step: steps[0],
		error: '',
	});
	const {exit} = useApp();
	let stepTimeout: NodeJS.Timeout;

	const exitHandler = () => {
		clearTimeout(stepTimeout);
		setState({...state, step: InstallStep.Exit});
		exit();
	};

	const errorHandler = (message?: unknown) => {
		clearTimeout(stepTimeout);
		setState({
			...state,
			step: InstallStep.Error,
			error: `"${state.step!}" step failed. Error ${JSON.stringify(message)}`,
		});
	};

	const stepCompletedHandler = (completed: InstallStep) => {
		if (isLastStep(completed)) {
			exitHandler();
			return;
		}

		clearTimeout(stepTimeout);
		stepTimeout = setTimeout(() => {
			setState({...state, step: nextStep(completed)});
		}, stepCompletionDelay(completed));
	};

	const defaultProps = {
		onComplete: stepCompletedHandler,
		onExit: exitHandler,
		onError: errorHandler,
		margin: 1,
	};
	const getProps = (forStep: InstallStep) => ({
		...defaultProps,
		step: forStep,
	});

	return (
		<Box>
			{state.step === InstallStep.Init && (
				<Init {...getProps(InstallStep.Init)} />
			)}
			{state.step === InstallStep.Prepare && (
				<Prepare {...getProps(InstallStep.Prepare)} />
			)}
			{state.step === InstallStep.Download && (
				<Download {...getProps(InstallStep.Download)} />
			)}
			{state.step === InstallStep.Extract && (
				<Extract {...getProps(InstallStep.Extract)} />
			)}
			{state.step === InstallStep.Dependencies && (
				<Dependencies {...getProps(InstallStep.Dependencies)} />
			)}
			{state.step === InstallStep.Prebuild && (
				<Prebuild {...getProps(InstallStep.Prebuild)} />
			)}
			{state.step === InstallStep.SetupGql && (
				<SetupGql {...getProps(InstallStep.SetupGql)} />
			)}
			{state.step === InstallStep.SetupMongo && (
				<SetupMongo {...getProps(InstallStep.SetupMongo)} />
			)}
			{state.step === InstallStep.Build && (
				<Build {...getProps(InstallStep.Build)} />
			)}
			{state.step === InstallStep.DependenciesProd && (
				<DependenciesProd {...getProps(InstallStep.DependenciesProd)} />
			)}
			{state.step === InstallStep.Cleanup && (
				<Cleanup {...getProps(InstallStep.Cleanup)} />
			)}
			{state.step === InstallStep.Complete && (
				<Complete {...getProps(InstallStep.Complete)} />
			)}
			{state.step === InstallStep.Exit && <Text>Bye!</Text>}
			{state.step === InstallStep.Error && (
				<Text color="red">{state.error}</Text>
			)}
		</Box>
	);
}
