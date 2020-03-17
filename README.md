## Layout

**vendor**
  - smogon/pokemon-showdown

**types**
  - just common types for all projects

**sim** (~full GEN)
  - lib/streams
  - sim/
  - random-player-ai
  - data/ (no random teams, js including all scripts)

**data** (partial GEN)
  - dex (based on sim/dex.ts from minus cruft)
  - builds on top of sims data files, either uses them untouched as JS or in the
    decomposed mode

**client**
  - depends on data (can depend either JS or JSON version)
  - battle/pokemon/client - mirror 
  - dogarized, depends on protocol/

**protocol**
  - dogar types and parsing

### Future

**team**
  - team validator (need to be able to pass into Sim)

**view**
 - text.json/BattleTextParser (though using protocol/) 

**chat**
 - rooms/users (needs to be useful to bots AND UI)

**login**
 - as advertised on the tin

### Deps

**calc**
 - must have a generic data layer so can be swapped for:
   - its own data
   - smogon/data
   - pkmn/ps/data

## Principles

- not allowed to change pokemon-showdown source locally, only copy files and add
  - will need to upstream any changes that are required to get it to work
    instead of maintaining a patch queue to apply
- minimize the number of files needing additions as well, instead restructure PS
  upstream to cut down on this


## Implementation

- top level pkmn/ps has standard tsconfig/eslint/package.json
- each sub folder is a package
- generated code:
 - smogon/pokemon-showdown is vendor, sync/import script updates vendored copy
   and then builds: sim first, then data
 - gets checked in, import script update then run smoke tests and check in

## Roadmap

1. sim (vendor)
2. data
3. client (types/protocol)
4. calc

**Goal:**
- 1 set of data files when bundling sim + client + calc (JS version)
- 1 set of data files when bundling client + calc (JSON version)
