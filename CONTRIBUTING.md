
# Contributing

Please read through the index [README](README.md), the READMEs the index links to, and
[pkmn.cc/@pkmn](https://pkmn.cc/@pkmn/) for general information about `@pkmn/ps` about development
on `@pkmn` projects respectively. When opening issues or pull requests, please use one of the
existing templates and fill them out to the best of your ability. Pull requests are unlikely to be
merged without [tests](#tests), but it is fine to open a pull request without tests for feedback or
to ask for help with testing. :)

Contributing to this project is relatively difficult as it depends on having a strong working
knowledge of how Pokémon Showdown works as well as the infrastructure and processes involved in
importing, repackaging, and releasing the code. Furthermore, in many cases you will be directed to
instead submit code upstream to Pokémon Showdown itself instead.

## Tools

This project relies on a number of tools to deal with the complexity of managing a large number
of packages that have to be kept in sync with Pokémon Showdown.

### `subpkg`

`subpkg` is a minimal utility for managing projects with sub-packages (compare to
[`lerna`](https://github.com/lerna/lerna) or `pnpm`'s support for
['workspaces'](https://pnpm.js.org/en/workspaces)). `pkmn/ps` takes advantage of `subpkg` to declare
all shared `dependencies` in the root [`package.json`](package.json) which ensures that all
sub-packages end up using the same versions and each of the dependencies only need to be installed
once for the project instead of per-package. To avoid needing to run all scripts from the root of
the repository simply install `subpkg` and use `subpkg` in place of `npm` when running scripts from
anywhere in the project.

```sh
$ npm install -g subpkg
```

To run scripts for specific subpackages, simply specify the packages after the name of the script:

```sh
$ subpkg compile sim dex
```

#### `bump`

`subpkg` provides a '`bump`' subcommand that allows for bumping the versions of specific
sub-packages. For simplicity, `pkmn/ps` keeps the versions of packages which include or are heavily
dependent on generated code in sync, so the following  helper is recommended:

```sh
function bump() {
  if [ $# -eq 0 ]; then
    subpkg bump sim randoms dex/types dex data mods
  else
    subpkg bump "$@"
  fi
}
```

#### `link`

During development it is desirable to depend directly on internal packages as opposed to their
publically published versions. `subpkg` provides a '`link`' subcommand that can be run after
installation to point the internal packages at local versions instead of the published releases:

```sh
$ subpkg link
```

### `import`

The [`import`](import) script is responsible for syncing the `vendor/`-ed copies of Pokémon Showdown
(note: `git submodule update --init` is required after cloning `pkmn/ps` for the first time to also
fetch these submodules) and **generating packages**. To quote from the comment in the `import`
script's header:

> This is the most 'HERE BE DRAGONS' and hacky code in the entire project, but is also the magic
> sauce™ that makes everything work. The fragile nature of this whole ordeal is slightly offset by
> the large amount of unit and integration tests - assume that whenever you run this script
> everything is broken unless `npm test:integration` and manual inspection suggests otherwise.

An important part of running the `import` script is examining all of the changes from Pokémon
Showdown and updating any and all packages (generated or otherwise) that may require changes due to
changes upstream.

### `publish`

[`publish`](publish) builds and copies production versions of various examples and UI tests to the
`gh-pages` branch so that they appear at http://pkmn.github.io/ps. This should generally be run
whenever new packages are released.

### `update`

To simplify keeping dependencies up to date, `pkmn/ps` leverages
[`npm-check-updates`](https://www.npmjs.com/package/npm-check-updates):

```sh
$ npm install -g npm-check-updates
```

Updating all of the packages' dependencies (which tends to be a good idea before publishing any new
package versions) can then be accomplished fairly simply with the
[`jq`](https://stedolan.github.io/jq/) tool and some shell code:

```sh
function update() {
    for package in $(jq -r .subPackages[] package.json); do
        (cd $package; ncu -u; npm install)
    done
    ncu -u
    npm install
}
```

## Tests

Generating numerous packages from a project like Pokémon Showdown which was not designed with
modularity in mind necessarily involves quite a bit of fragility, and `pkmn/ps` relies on a large
amount of unit and [integration](integration) tests to provide confidence that each of the packages
are functional and stable. Before publishing anything, first **run `npm test:integration`** to
execute the entire test suite.
