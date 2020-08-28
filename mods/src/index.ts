import {
  Ability,
  AbilityData,
  Dex,
  Effect,
  GenID,
  ID as IDT,
  Item,
  ItemData,
  Learnset,
  LearnsetData,
  ModData,
  Move,
  MoveData,
  NatureData,
  Species,
  SpeciesData,
  StatsTable,
  TypeData,
  TypeName,
} from '@pkmn/dex-types';

export class ModdedDex<
  A extends Ability = Ability,
  AD extends AbilityData = AbilityData,
  E extends Effect = Effect,
  I extends Item = Item,
  ID extends ItemData = ItemData,
  L extends Learnset = Learnset,
  LD extends LearnsetData = LearnsetData,
  M extends Move = Move,
  MD extends MoveData = MoveData,
  S extends Species = Species,
  SD extends SpeciesData = SpeciesData,
> implements Dex {
  private readonly dex: Dex;

  constructor(dex: Dex) {
    this.dex = dex;
  }

  get gen() {
    return this.dex.gen;
  }

  get modid() {
    return this.dex.modid;
  }

  get data() {
    return this.dex.data as {
      Abilities: { [id: string]: AD };
      Aliases: { [id: string]: string };
      Items: { [id: string]: ID };
      Moves: { [id: string]: MD };
      Species: { [id: string]: SD };
      Natures: { [id: string]: NatureData };
      Learnsets: null | { [id: string]: LD };
      Types: { [type in Exclude<TypeName, '???'>]: TypeData };
    };
  }

  mod(genid: GenID): ModdedDex;
  mod(modid: IDT, modData: Partial<ModdedDex['data']> & ModData): ModdedDex;
  mod(modid: GenID | IDT, modData?: Partial<ModdedDex['data']> & ModData) {
    return this.dex.mod(modid as IDT, modData!);
  }

  forGen(gen: number) {
    return this.dex.forGen(gen);
  }

  includeModData() {
    this.dex.includeModData();
    return this;
  }

  includeData() {
    this.dex.includeData();
    return this;
  }

  includeFormats() {
    this.dex.includeFormats();
    return this;
  }

  getSpecies(name: string) {
    return this.dex.getSpecies(name) as S;
  }

  getEffect(name: string) {
    return this.dex.getEffect(name) as E;
  }

  getAbility(name: string) {
    return this.dex.getAbility(name) as A;
  }

  getLearnset(name: string) {
    return this.dex.getLearnset(name) as Promise<L>;
  }

  getItem(name: string) {
    return this.dex.getItem(name) as I;
  }

  getMove(name: string) {
    return this.dex.getMove(name) as M;
  }

  getNature(name: string) {
    return this.dex.getNature(name);
  }

  getType(name: string) {
    return this.dex.getType(name);
  }

  hasAbility(species: S, ability: string) {
    return this.dex.hasAbility(species, ability);
  }

  getHiddenPower(ivs: StatsTable) {
    return this.dex.getHiddenPower(ivs);
  }

  getImmunity(
    source: { type: string } | string,
    target: { getTypes: () => string[] } | { types: string[] } | string[] | string
  ) {
    return this.dex.getImmunity(source, target);
  }

  getEffectiveness(
    source: { type: string } | string,
    target: { getTypes: () => string[] } | { types: string[] } | string[] | string
  ) {
    return this.dex.getEffectiveness(source, target);
  }
}
