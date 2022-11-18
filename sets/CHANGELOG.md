# Changelog

### 5.0.0

- Generation 9 was released and `PokemonSet` now has a `teraType` field.
- Adds support for ESM and changes global exports from `PokemonSets` and `PokemonTeams` to
  `pkmn.sets` which contains both `Sets` and `Teams`.
- `Team.team` is no longer `Readonly`.

## 4.0.0

- Adds `Sets.canonicalize` and `Team.canonicalize` which always require `Data` but which can be used
  to canonicalize a `PokemonSet` or team. Note that this is **not** sufficient for all deduping
  purposes (you must compare computed stats, not sets).

## 3.1.1

- Add the previously implicit `extends Partial<PokemonSet>` constraint to several functions to
  appease the latest TypeScript compiler.

## 3.1.0

- Pokémon Showdown added support for an optional `dynamicLevel` field which defaults to 10.

## 3.0.0

- Importing sets has always actually only returned a `Partial<PokemonSet>` but has claimed to return
  a `PokemonSet`. Rectifying this is technically a 'bug fix', but has major implications to the APIs
  and as a result the major version has been bumped.

## 2.0.0

- Pokémon Showdown changed its `Dex` interface, impacting the `Data` interface optionally used by
  `@pkmn/sets`.
- The packed wire format has changed to no longer use IDs and instead uses a less lossy scheme for
  names.

## 1.0.1

- Pokémon Showdown changed the default of `hpType` from `undefined` to `''` and for `pokeball` to be
  and `ID`.
