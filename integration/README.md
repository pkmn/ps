# Integration

This directory contains integration tests exercising the various packages housed in this repository.

## UI

[`src/ui/index.ts`](src/ui/index.ts) runs in the browser and contains logic to randomly play out a
battle between two predefined teams and display the formatted results in the DOM. There is no 'test'
logic (whether it is successful or not relies on visual inspection), it mostly serves as an example
and proof of concept for running the simulator in the browser.

**`npm start`** can be used to serve the page, and `npm run build` can be used to build a 'production'
version (this version is served on [GitHub Pages](https://pkmn.github.io/ps/integration/), though
it actually uses the `gh-pages` script as it needs to change the root URL).

## Tests

In addition the the UI example, there are two actual tests - one for the simulator and one for the
client. Both can be run using the [`test`](test) script (which also provides several different
options), though they can also be run with a fixed configuration via `npm test`. Several flags are
available for both tests:

- **`--seed`**: PRNG seed to use (eg. `'1234,5678,9012,3456'`).
- **`--error`**: dump the battle _input_ logs of each battle which errors.

### Simulator

The simulator test can be started with **`test sim`** - this runs multiple random battles across
generations with both the `smogon/pokemon-showdown` and `@pkmn/sim` code and ensures their input
and output matches. Additionally, it verifies the protocol messages the simulator produces. The
simulator logic does not rely on the exhaustive logic the client test uses due to practical
difficulties in synchronizing a stateful AI across two different simulations. In addition to the
regular flags, the following flags may be used with the simulator test:

- **`--num`**: play a specific number of games for a format instead of the
    default 100.
- **`--format`**: play the specified format for each of the games it runs.
    Note that the harness only supports formats where the team can be randomly
    generated.
- **`--output`**: makes the harness display the _output_ logs of each battle
    it runs.
- **`--cycle`**: cycles through the possible formats, playing one battle in
    each `--num` battles in total.
- **`--all`**: plays every supported format `--num` times before moving on to
    the next format.
- **`--input`**: dump the battle _input_ logs of each battle it runs.

### Client

The client test can be started with **`test client`** and cycles through all generations and game
types, attempting to use as many different effects as possible in the battles it randomly simulates.
The protocol for the simulated battles are verified and then fed into
`smogon/pokemon-showdown-client` and `@pkmn/client` and the formatted output is compared. The
following additional flags may be used:

- **`--format`** / **`--formats`**: play the specified format(s) instead of
    iterating through all possible formats. If multiple formats are specified,
    separate each format with a comma (eg. `format1,format2`).
- **`--cycles`**: exhaust the pools of effects `--cycles` times instead of
    just once. If `--cycles` is negative, `--forever` is implied.
- **`--forever`**: continue iterating through formats infinitely, exhausting
    each `--cycles` times.
- **`--maxFailures`**: exit early if this many failures have occured.
