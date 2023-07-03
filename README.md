# Bloke CMS CLI

This project provides CLI for [blokecms](https://github.com/pawelpiotrowski/blokecms).

## Install Bloke CMS

`cd` to a directory where you want cms source files to be copied to.
Run:

```bash
$ npx blokecms-cli@latest
```

Executing this command will result with `blockecms` directory created in current directory.

```
blokecms
	|_package
			|_config.default.yaml
			|_LICENSE
			|_README
			|_server
					|_.env
					|_dist
					|_node_modules
					|_package.json
					|_ui-admin
					|_ui-public
```

### Install Steps

**Prepare** Creates `blokecms` directory.

**Download** Downloads `blokecms@latest` tar package from npm registry.

**Extract** Extracts package content to `package` directory.

**Dependencies** Installs all dependencies needed to build and run the app.

**Prebuild** Creates server `.env` file and ui directories `ui-admin` and `ui-public`.

**SetupGql** Requires input. This url is used by client server side rendering and it has to be cms public url. Default value: `http://localhost:3000` will be used if leaved blank (in ex. when running locally).

**SetupMongo** Requires input. MongoDB connection url. This will be saved in `.env` file as `DB_URL` variable. Default value as per `config.default.yaml` will be used if leaved blank. Hint: you can later override the url with node env variable when starting cms `DB_URL=mongodb://<...> node dist/main`

**Build** Builds application production files. Server build in `blokecms/package/server/dist`. Client admin build in `blokecms/package/server/ui-admin` and client public build in `blokecms/package/server/ui-public`.

**DependenciesProd** Removes dev dependencies from server's `node_modules`.

**Cleanup** Removes all build related directories and files and sets server's `package.json` with "name", "version", "description", "author", "license" and "dependencies".

## First Start

Navigate to server directory:

```bash
cd blokecms/package/server
```

Seed user to get access to cms admin:

```bash
ADMIN_SEED=<USERNAME> node dist/main
```

_Pay attention to stdout it will print your seed username password._

Stop the cms `CTRL + C`.

From now on start the cms with:

```bash
NODE_ENV=production node dist/main
```
