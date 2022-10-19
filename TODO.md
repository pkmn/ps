# TODO

## `@pkmn/sim`

- Pokémon Showdown's underlying data definitions (eg. `MoveData`) could use a lot of cleanup and
  consolidation (better grouping, naming, etc)
- In an ideal world, `@pkmn/sim` could be made to depend on `@pkmn/dex`. The main blockers are:
  - `TeamValidator` needs to be able able to handle an `async getLearnsets` API (requires changes
  to Pokémon Showdown to avoid forking more files)
  - the `import` script needs to decompose Pokémon Showdown's 'data' files to write out just the
  handler logic which can be recombined with the data from `@pkmn/dex` on demand.

## `@pkmn/sets`

- consider rewriting based on
  [Pokémon Showdown](https://github.com/smogon/pokemon-showdown-client/blob/master/src/panel-teamdropdown.tsx)

## `@pkmn/img`

- redo API to use better identifiers than `gen2g` (`gen: 2` = `release: 'Crystal'` > `'gen2'`)
- handle full ordered preference array (not just `gen2g`, full array of preferences)
- allow for specifying whether to fall back to non-canonical or not**
- offload ugliness to `smogon/sprites` (embed in `vendor/`?) related to gaps or missing data
  (should be symlinked), have `smogon/sprites` build a mapping file that can be used to
  avoid redundant lookups

## `@pkmn/login`

- upkeep example with cookies

## `@pkmn/client`

- handle discrepancies with `@pkmn/sim` (for `@pkmn/epoke` state transforms)
  - change `type`/`addedType` etc handling to match server?

## `@pkmn/view`

- demonstration of how to recreate Pokémon Showdown's `AnimatedBattle` hooks on top of
  `@pkmn/client` (`BattleSceneStub` equivalent, but use `Partial` instead of null object pattern)
- logic for displaying the Pokémon Showdown protocol *(how should arbitrary HTML be handled? Fully
  escaped? Or embed an HTML sanitizer?)*
