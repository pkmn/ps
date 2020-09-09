# FAQ

## Is this project actively being maintained?

Yes.

You should be able to judge the activity level of this project by looking at how recently a
[package has been released](https://www.npmjs.com/package/@pkmn/sim), the
[commmit activity on this repository](https://github.com/pkmn/ps/commits/master) and the activity
from the [pkmn organization in general](https://github.com/pkmn). If at any point this package
is no longer being maintained the documentation will be updated to reflect that (and NPM will
warn about it) and the repository itself will be [archived](https://github.com/pkmn-archive).

## What is the release schedule? How far out of sync will these packages be with `smogon/pokemon-showdown`?

The release schedule for each package depends on when Pokémon Showdown updates a particular part of
its codebase and whether a sufficient quantity and quality of changes have landed to justify the
overhead of a release. If there are large breaking changes in `smogon/pokemon-showdown`
there may be some increased latency before a release.

`pkmn/ps`'s [SLO](https://en.wikipedia.org/wiki/Service-level_objective) is to update at *worst*
once a month, but will aim to release approximately weekly. Pokémon Showdown often runs on the
bleeding edge -  being able to pick a commit from a larger range to cut a release from ends up
resulting in a more stable package to build off of. If your project has a particular need for a
one-off import and release to be cut to capture specific functionality or data, please open an issue
or or reach out on [Discord](https://pkmn/dev) to request one.

## How do I use `X`?

Each released package should contain:

- documentation which includes information on installation, usage, and illustrative examples
- unit tests which provide further examples of intended use

If a package does not contain these things it is possible that it is only intended for internal or
advanced usage and you are perhaps depending on it erroneously. There are
[integration tests](https://github.com/pkmn/ps/blob/master/integration) which consist of very
comprehensive worked examples integrating multiple packages at once. Furthermore, other projects
from the [pkmn organization in general](https://github.com/pkmn) demonstrate non-trivial
usecases for the packages in this repository.

## Why is there no package for `X`?

Certain packages are still a work in progress and have not been released yet. In other cases, the
work involved to modularize and release a specific package has been deemed to not be worthwhile.

## When should I use a package in this repository as opposed to vendoring `smogon/pokemon-showdown`?

There are several reasons as to why you may wish to use a package in this repository:

- you are writing your project in TypeScript and are unable to get a vendored version of
  `smogon/pokemon-showdown` to typecheck
- you would rather not deal with having to figure out where a safe place to cut a release at would
  be
- your project needs to run in the browser or is concerned about code size

You should consider **not** using a package in this repository and instead vendoring
`smogon/pokemon-showdown` (eg. as a Git submodule) if none of the above applies and you need to be
on the bleeding edge (though note that several projects in this repository add functionality above
and beyond what is offered by `smogon/pokemon-showdown`).

## Would it not make more sense for `smogon/pokemon-showdown` to release its own packages?

Yes.

However, there is a non-trivial maintenance and operational burden involved in creating and
continuing to release a cohesive package suite and Pokémon Showdown currently prefers to dedicate
its engineering resources in other ways.

## I still have a question

Please feel free to open an 'Question' issue on GitHub or to reach out on
[Discord](https://pkmn/dev).
