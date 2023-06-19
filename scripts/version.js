/**
 * Validate arguments
 */

const args = process.argv.slice(2);
const arg = args[0];
const validArgs = [
	'major',
	'minor',
	'patch',
	'premajor',
	'preminor',
	'prepatch',
	'prerelease',
	'show',
];
const argValidationIndex = validArgs.indexOf(arg);

if (arg == undefined || typeof arg !== 'string' || argValidationIndex < 0) {
	console.error('### Invalid or no argument(s)');
	process.exit(1);
}

/**
 * Check if argument is 'show'
 */
import * as fs from 'fs';
import * as path from 'path';

if (arg === 'show') {
	const currentMainPackageJson = JSON.parse(
		fs.readFileSync(path.join(process.cwd(), 'package.json'), 'utf8'),
	);
	console.log(`Current version is ${currentMainPackageJson.version}`);
	process.exit(0);
}

/**
 * Check for uncommied changes
 */
import {spawnSync} from 'child_process';

const gitStatus = spawnSync('git', ['status', '--porcelain']);
const hasDiff = gitStatus.stdout && gitStatus.stdout.length > 0;

if (hasDiff) {
	console.error('### Version not updated - uncommited changes');
	process.exit(1);
}

/**
 * Update package
 */
console.log('Updating version...');
const commonSpawnNpmVerArgs = [
	'version',
	arg,
	'--no-commit-hooks',
	'--no-git-tag-version',
];
spawnSync('npm', [...commonSpawnNpmVerArgs]);

const updatedPackageJson = JSON.parse(
	fs.readFileSync(path.join(process.cwd(), 'package.json'), 'utf8'),
);

spawnSync('git', ['add', '.']);
spawnSync('git', ['commit', '-m', `version ${updatedPackageJson.version}`]);
console.log(`Updating version to ${updatedPackageJson.version} DONE!`);
process.exit(0);
