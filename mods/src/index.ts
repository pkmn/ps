import {
  Ability,
  AbilityData,
  Condition,
  DeepPartial,
  Dex,
  DexTable,
  GenID,
  ID as IDT,
  Item,
  ItemData,
  Learnset,
  LearnsetData,
  ModData,
  Move,
  MoveData,
  Nature,
  NatureData,
  Species,
  SpeciesData,
  StatsTable,
  Type,
  TypeData,
  TypeName,
} from '@pkmn/dex-types';

export class ModdedDex<
  A extends Ability = Ability,
  AD extends AbilityData = AbilityData,
  C extends Condition = Condition,
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

  readonly abilities: DexTable<A>;
  readonly conditions: DexTable<C>;
  readonly items: DexTable<I>;
  readonly learnsets: DexTable<Promise<L>>;
  readonly moves: DexTable<M>;
  readonly natures: DexTable<Nature>;
  readonly species: DexTable<S>;
  readonly types: DexTable<Type>;

  constructor(dex: Dex) {
    this.dex = dex;
    this.abilities = {
      get(name: string) {
        return dex.abilities.get(name) as A;
      },
      getByID(id: IDT) {
        return dex.abilities.getByID(id) as A;
      },
    };
    this.conditions = {
      get(name: string) {
        return dex.conditions.get(name) as C;
      },
      getByID(id: IDT) {
        return dex.conditions.getByID(id) as C;
      },
    };
    this.items = {
      get(name: string) {
        return dex.items.get(name) as I;
      },
      getByID(id: IDT) {
        return dex.items.getByID(id) as I;
      },
    };
    this.learnsets = {
      get(name: string) {
        return dex.learnsets.get(name) as Promise<L>;
      },
      getByID(id: IDT) {
        return dex.learnsets.getByID(id) as Promise<L>;
      },
    };
    this.moves = {
      get(name: string) {
        return dex.moves.get(name) as M;
      },
      getByID(id: IDT) {
        return dex.moves.getByID(id) as M;
      },
    };
    this.species = {
      get(name: string) {
        return dex.species.get(name) as S;
      },
      getByID(id: IDT) {
        return dex.species.getByID(id) as S;
      },
    };
    this.natures = this.dex.natures;
    this.types = this.dex.types;
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
  mod(modid: IDT, modData: DeepPartial<ModdedDex['data']> & ModData): ModdedDex;
  mod(modid: GenID | IDT, modData?: DeepPartial<ModdedDex['data']> & ModData) {
    return this.dex.mod(modid as IDT, modData!);
  }

  forGen(gen: number) {
    if (this.dex.gen === gen) return this.dex;
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
