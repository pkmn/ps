import {Dex} from './dex';
global.Dex = Dex;
global.toID = Dex.getId;

export {Battle} from './battle';
export * as BattleStreams from './battle-stream';
export * as Streams from '../lib/streams';
export {Dex, toID} from './dex';
export {Pokemon} from './pokemon';
export {PRNG} from './prng';
export {RandomPlayerAI} from './tools/random-player-ai';
export {Side} from './side';
export {TeamValidator} from './team-validator';

export * from './exported-global-types';
