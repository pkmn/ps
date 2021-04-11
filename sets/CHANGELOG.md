# Changelog

## 2.0.0

- Pokémon Showdown changed its `Dex` interface, impacting the `Data` interface optionally used by
  `@pkmn/sets`.
- The packed wire format has changed to no longer use IDs and instead uses a less lossy scheme for
  names.

## 1.0.1

- Pokémon Showdown changed the default of `hpType` from `undefined` to `''` and for `pokeball` to be
  and `ID`.
