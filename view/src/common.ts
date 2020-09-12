import {ID} from '@pkmn/types';

export function toID(s: string): ID {
  return ('' + s).toLowerCase().replace(/[^a-z0-9]+/g, '') as ID;
}
