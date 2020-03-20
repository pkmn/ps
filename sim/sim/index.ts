import {Dex} from './dex';
global.Dex = Dex;
global.toID = Dex.getId;

export {Battle} from './battle';
export {BattleStream} from './battle-stream';
export {Dex} from './dex';
export {Pokemon} from './pokemon';
export {PRNG} from './prng';
export {RandomPlayerAI} from './tools/random-player-ai';
export {Side} from './side';
export {TeamValidator} from './team-validator';

export * from './exported-global-types';
