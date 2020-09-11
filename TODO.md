# TODO

## `@pkmn/sim`

- **allow `Dex.mod` to be called on a canonical gen (just don't cache - only cache the first call with mod data for a given ID)**
- Pokémon Showdown's underlying data definitions (eg. `MoveData`) could use a lot of cleanup and
  consolidation (better grouping, naming, etc)
- In an ideal world, `@pkmn/sim` could be made to depend on `@pkmn/dex`. The main blockers are:
  - `TeamValidator` needs to be able able to handle an `async getLearnsets` API (requires changes
  to Pokémon Showdown to avoid forking more files)
  - the `import` script needs to decompose Pokémon Showdown's 'data' files to write out just the
  handler logic which can be recombined with the data from `@pkmn/dex` on demand.

## `@pkmn/sets`

- **review and incorporate changes made by [Pokémon Showdown](https://github.com/smogon/pokemon-showdown-client/blob/master/src/panel-teamdropdown.tsx)**
- a `canonicalize` method needs to be added to convert a `PokemonSet` into a canonical form. This
  includes (but is not limited to):
  - turning battle only formes into their base forme (with some more sophisticated logic for
    hackmons?)
  - removing EVs (and IVs?) which dont contribute additional stat points (note: this is more complex
    than just rounding to nearest 4)
  - encoding all IVs and EVs (including Gen 2 Marowak with Swords Dance and Thick Club, Hidden Power
    HP DVs, gender, shiny etc)
  - encoding happiness (handling Return/Frustration etc)
  - removing nicknames
  - moves sorted by ID
  - team members sorted by ID (how to handle formats without Species Clause?)

Once a stable format has been obtained, the team can be packed and then hashed, and then just the
hash can be shared to verify teams have not be changed (ie. **team lock**). Need to include a
version number in case set import changes.

## `@pkmn/data`

- support O(1) lookup of data kinds by stable ID (requires efficient lookup to be implement in
  `@pkmn/sim` and `@pkmn/dex`)
- support iteration in stable ID order and avoid iterating over elements out of range (ie. only
  iterate over 151 objects for Gen 1 `Species` and then complete)

## `@pkmn/img`

- **redo API to use better identifiers than `gen2g` (`gen: 2` = `release: 'Crystal'` > `'gen2'`)**
- **finish documentation**
- **import the latest data**
- **handle full ordered preference array (not just `gen2g`, full array of preferences)**
- **allow for specifying whether to fall back to n*******on-canonical or not**
- offload ugliness to `smogon/sprites` (embed in `vendor/`?) related to gaps or missing data
  (should be symlinked), have `smogon/sprites` build a mapping file that can be used to
  avoid redundant lookups

## `@pkmn/login`

- **zero dependency API for logging into Pokémon Showdown**
- authenticated wrappers of `WebSocket`, `fetch`, Node `http`/`https`, `XMLHttpRequest`

## `@pkmn/protocol`

- **adopt `fixRequest` logic and types from [Pokémon Showdown](https://github.com/smogon/pokemon-showdown-client/blob/master/src/battle-choices.ts)**

## `@pkmn/client`

- **documentation, bundle support**
- **depend on `@pkmn/dex-types` instead of `@pkmn/sim`!**
- **cleanup usages of `null`**

## `@pkmn/view`

- **documentation, unit tests, bundle support**
- **include `BattleChoiceBattle` from [Pokémon Showdown](https://github.com/smogon/pokemon-showdown-client/blob/master/src/battle-choices.ts)**
- demonstration of how to recreate Pokémon Showdown's `AnimatedBattle` hooks on top of `@pkmn/client` (`BattleSceneStub` equivalent, but use `Partial` instead of null object pattern)
- logic for displaying the Pokémon Showdown protocol *(how should arbitrary HTML be handled? Fully
  escaped? Or embed an HTML sanitizer?)*

## `@pkmn/mods`

- fix mod funtionality (in `@pkmn/sim` and `@pkmn/dex`) to be able to apply a mod to an existing
  gen (just don't cache unless its a new id mod data).

## `@pkmn/randoms`

- ~~add logic to `import` to extra all randoms battle *data* into `randoms/data` and logic into
  `random/src` (using similar approaches to how `@pkmn/dex` and `@pkmn/sim` are handled,
  respectively)~~ Use a similar approach to mods for modding the random data
- encapsulate logic behind common `TeamGenerator` interface which can be wired into `@pkmn/sim`
- handle doubles
- does not depend on `@pkmn/sim` (OK for types), fork `PRNG` etc

## Integration

- **update `publish` to publish the `node build` version of the UI integration test**
- **wire up integration test to GitHub CI**
- figure out how to run `eslint` on JS files without crashing
- add deeper equality method for Pokémon Showdown's client state vs. pkmns (requires handling
different representations eg `ID`s, consider using protocol `Verifier` to verify all types)
