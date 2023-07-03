import {readFile, rm, writeFile} from 'node:fs/promises';
import React, {useCallback, useEffect} from 'react';
import {Text, Box} from 'ink';
import Spinner from 'ink-spinner';
import {type InstallFeatureProps} from './interface.js';
import {
	blokeCmsPackageDirName,
	blokeCmsPackageDirPath,
	blokeCmsPackageName,
	clientConfigFilePath,
	clientDirPath,
	scriptsDirPath,
	serverDirPath,
	workingDirectory,
	workingDirectoryPath,
} from './constants.js';

type PackageContent = Record<string, string>;

export default function Cleanup({
	step,
	onComplete,
	onError,
	margin,
}: InstallFeatureProps) {
	const removeUnwanted = useCallback(async () => {
		// Root files
		await rm(`${clientConfigFilePath}`, {force: true});
		await rm(`${blokeCmsPackageDirPath}/package.json`, {force: true});
		// Root directories
		await rm(`${clientDirPath}`, {recursive: true, force: true});
		await rm(`${scriptsDirPath}`, {recursive: true, force: true});
		// Server files
		await rm(`${serverDirPath}/nest-cli.json`, {force: true});
		await rm(`${serverDirPath}/package-lock.json`, {force: true});
		await rm(`${serverDirPath}/README.md`, {force: true});
		await rm(`${serverDirPath}/tsconfig.build.json`, {force: true});
		await rm(`${serverDirPath}/tsconfig.json`, {force: true});
		// Server directories
		await rm(`${serverDirPath}/src`, {recursive: true, force: true});
	}, []);

	const setServerPackage = useCallback(async () => {
		const serverPackageContent = JSON.parse(
			await readFile(`${serverDirPath}/package.json`, 'utf8'),
		) as PackageContent;
		const mainPackageContent = JSON.parse(
			await readFile(
				`${workingDirectory}/${blokeCmsPackageDirName}/package.json`,
				'utf8',
			),
		) as PackageContent;
		const newServerPackageContent = {
			name: blokeCmsPackageName,
			version: serverPackageContent['version'],
			description: mainPackageContent['description'],
			author: mainPackageContent['author'],
			license: mainPackageContent['license'],
			dependencies: serverPackageContent['dependencies'],
		};
		await writeFile(
			`${serverDirPath}/package.json`,
			JSON.stringify(newServerPackageContent),
		);
		await rm(
			`${workingDirectoryPath}/${blokeCmsPackageName}-${newServerPackageContent.version!}.tgz`,
			{force: true},
		);
		await removeUnwanted();
	}, [removeUnwanted]);

	useEffect(() => {
		setServerPackage()
			.then(() => {
				onComplete(step);
			})
			.catch(error => {
				onError(`Could not complete clean up. ${JSON.stringify(error)}`);
			});
	}, [setServerPackage, onComplete, onError, step]);

	return (
		<Box marginRight={margin}>
			<Text>
				<Text color="green">
					<Spinner type="dots" />
				</Text>
				{' Cleaning up...'}
			</Text>
		</Box>
	);
}
