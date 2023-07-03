import {type InstallStep} from './step.js';

export type InstallFeatureProps = {
	step: InstallStep;
	onComplete: (s: InstallStep) => void;
	onExit: () => void;
	onError: (s: unknown) => void;
	margin: number;
};
