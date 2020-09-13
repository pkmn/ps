# Integration

Integration tests for the various packages housed in this repository.

- `npm run start` will run the simulator and client in the browser, pitting two `RandomPlayerAI`
  instances against each other using predetermined teams and displaying the parsed log output
- `npm run test` will compare the output of exhaustively running battles using
  `smogon/pokemon-showdown{,-client}` code and those from the packages in this repository.

TODO

The `exhaustive` subcommand cycles through all generations and game types,
attempting to use as many different effects as possible in the battles it
randomly simulates. This can be useful as a form of
['smoke testing'](https://en.wikipedia.org/wiki/Smoke_testing_\(software\)), a
form of sanity testing/build verification which can be used to expose obvious
critical issues with the application. Making it through a successful cycle of
smoke tests does *not* mean the application is without bugs, or even that it is
crash free - it simply provides some confidence that the application is less
likely to catch fire.

## Flags

- **`--format`** / **`--formats`**: play the specified format(s) instead of
    iterating through all possible formats. If multiple formats are specified,
    separate each format with a comma (eg. `format1,format2`).
- **`--cycles`**: exhaust the pools of effects `--cycles` times instead of
    just once. If `--cycles` is negative, `--forever` is implied.
- **`--forever`**: continue iterating through formats infinitely, exhausting
    each `--cycles` times.
- **`--seed`**: PRNG seed to use (eg. `'1234,5678,9012,3456'`).
- **`--maxFailures`**: exit early if this many failures have occured.
- **`--compile`**: TODO
