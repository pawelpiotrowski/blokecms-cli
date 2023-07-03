export enum InstallStep {
	Build = 'Build',
	Cleanup = 'Cleanup',
	Complete = 'Complete',
	Dependencies = 'Dependencies',
	DependenciesProd = 'DependenciesProd',
	Error = 'Error',
	Exit = 'Exit',
	Extract = 'Extract',
	Download = 'Download',
	Init = 'Init',
	Prebuild = 'Prebuild',
	Prepare = 'Prepare',
	SetupGql = 'SetupGql',
	SetupMongo = 'SetupMongo',
}

export const steps = [
	InstallStep.Init,
	InstallStep.Prepare,
	InstallStep.Download,
	InstallStep.Extract,
	InstallStep.Dependencies,
	InstallStep.Prebuild,
	InstallStep.SetupGql,
	InstallStep.SetupMongo,
	InstallStep.Build,
	InstallStep.DependenciesProd,
	InstallStep.Cleanup,
	InstallStep.Complete,
];

export const stepCompletionDelay = (forStep: InstallStep) =>
	forStep === InstallStep.Init ||
	forStep === InstallStep.SetupGql ||
	forStep === InstallStep.SetupMongo
		? 0
		: 1000;

export const stepIndex = (forStep: InstallStep) => steps.indexOf(forStep);

export const isLastStep = (forStep: InstallStep) =>
	stepIndex(forStep) === steps.length - 1;

export const nextStep = (forStep: InstallStep) =>
	steps[steps.indexOf(forStep) + 1];
