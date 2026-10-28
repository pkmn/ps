import type {ActiveMove, ModdedMoveDataTable, Move} from '@pkmn/sim';

export const Moves: ModdedMoveDataTable = {
	absorb: {
		inherit: true,
		isNonstandard: "Past",
	},
	acid: {
		inherit: true,
		isNonstandard: "Past",
	},
	aeroblast: {
		inherit: true,
		isNonstandard: "Past",
	},
	anchorshot: {
		inherit: true,
		basePower: 90,
	},
	appleacid: {
		inherit: true,
		basePower: 90,
	},
	armthrust: {
		inherit: true,
		isNonstandard: "Past",
	},
	astonish: {
		inherit: true,
		isNonstandard: "Past",
	},
	astralbarrage: {
		inherit: true,
		basePower: 110,
		isNonstandard: "Past",
	},
	attackorder: {
		inherit: true,
		isNonstandard: "Past",
	},
	aurorabeam: {
		inherit: true,
		isNonstandard: "Past",
	},
	banefulbunker: {
		inherit: true,
		pp: 5,
	},
	beakblast: {
		inherit: true,
		basePower: 120,
		pp: 5,
	},
	belch: {
		inherit: true,
		desc: "Fails unless the user has eaten a Berry, either by eating one that was held, stealing and eating one off another Pokemon with Bug Bite or Pluck, or eating one that was thrown at it with Fling. Consuming a Berry with Natural Gift does not count for the purposes of eating one.",
		shortDesc: "Fails unless the user has eaten a Berry.",
		onDisableMove: undefined, // no inherit
	},
	behemothbash: {
		inherit: true,
		isNonstandard: "Past",
	},
	behemothblade: {
		inherit: true,
		isNonstandard: "Past",
	},
	blazingtorque: {
		inherit: true,
		isNonstandard: "Past",
	},
	bleakwindstorm: {
		inherit: true,
		isNonstandard: "Past",
	},
	bloodmoon: {
		inherit: true,
		basePower: 130,
		isNonstandard: "Past",
	},
	blueflare: {
		inherit: true,
		isNonstandard: "Past",
	},
	boltbeak: {
		inherit: true,
		basePower: 80,
	},
	boltstrike: {
		inherit: true,
		isNonstandard: "Past",
	},
	bonerush: {
		inherit: true,
		basePower: 30,
	},
	branchpoke: {
		inherit: true,
		isNonstandard: "Past",
	},
	brine: {
		inherit: true,
		isNonstandard: "Past",
	},
	bubblebeam: {
		inherit: true,
		isNonstandard: "Past",
	},
	burningbulwark: {
		inherit: true,
		isNonstandard: "Past",
	},
	burnup: {
		inherit: true,
		isNonstandard: null,
	},
	celebrate: {
		inherit: true,
		isNonstandard: "Past",
	},
	chloroblast: {
		inherit: true,
		isNonstandard: "Past",
	},
	clangoroussoul: {
		inherit: true,
		accuracy: true,
	},
	collisioncourse: {
		inherit: true,
		isNonstandard: "Past",
	},
	combattorque: {
		inherit: true,
		isNonstandard: "Past",
	},
	confide: {
		inherit: true,
		isNonstandard: "Past",
	},
	confusion: {
		inherit: true,
		isNonstandard: "Past",
	},
	conversion: {
		inherit: true,
		isNonstandard: "Past",
	},
	conversion2: {
		inherit: true,
		isNonstandard: "Past",
	},
	corrosivegas: {
		inherit: true,
		isNonstandard: null,
	},
	crabhammer: {
		inherit: true,
		accuracy: 95,
	},
	crushclaw: {
		inherit: true,
		flags: { contact: 1, protect: 1, mirror: 1, metronome: 1, slicing: 1 },
	},
	crushgrip: {
		inherit: true,
		isNonstandard: "Past",
	},
	curse: {
		inherit: true,
		volatileStatus: undefined, // no inherit
		onModifyMove(move, source, target) {
			this.debug('Curse onModifyMove triggered', source, target);
			if (!source.hasType('Ghost')) {
				move.target = 'self';
			} else if (!target || (source !== target && source.isAlly(target))) {
				move.target = 'randomNormal';
			}
		},
		onTryHit(target, source, move) {
			this.debug('Curse onTryHit triggered', target, source);
			if (source.hasType('Ghost') && target.volatiles['curse']) {
				return false;
			}
		},
		onHit(target, source) {
			this.debug('Curse onHit triggered', source, target);
			if (!source.hasType('Ghost')) {
				return !!this.boost({ spe: -1, atk: 1, def: 1 }, source, source);
			}
			this.directDamage(source.maxhp / 2, source, source);
			if (source.isAlly(target)) {
				const random = this.getRandomTarget(source, 'Curse');
				if (!random) return false;
				target = random;
			}
			delete target.volatiles['curse'];
			target.addVolatile('curse');
		},
	},
	cut: {
		inherit: true,
		isNonstandard: "Past",
	},
	darkvoid: {
		inherit: true,
		isNonstandard: "Past",
	},
	defendorder: {
		inherit: true,
		isNonstandard: "Past",
	},
	defensecurl: {
		inherit: true,
		isNonstandard: "Past",
	},
	diamondstorm: {
		inherit: true,
		isNonstandard: "Past",
	},
	direclaw: {
		inherit: true,
		desc: "Has a 30% chance to cause the target to either fall asleep, become poisoned, or become paralyzed.",
		shortDesc: "30% chance to sleep, poison, or paralyze target.",
		flags: { contact: 1, protect: 1, mirror: 1, metronome: 1, slicing: 1 },
		secondary: {
			chance: 30,
			onHit(target, source) {
				const status = this.sample(['psn', 'par', 'slp']);
				target.trySetStatus(status, source);
			},
		},
	},
	disable: {
		inherit: true,
		condition: {
			inherit: true,
			onBeforeMove(attacker, defender, move) {
				if (!(move.isZ && move.isZOrMaxPowered) && move.id === this.effectState.move && !move.flags['cantusetwice']) {
					this.add('cant', attacker, 'Disable', move);
					return false;
				}
			},
		},
	},
	disarmingvoice: {
		inherit: true,
		isNonstandard: "Past",
	},
	doodle: {
		inherit: true,
		isNonstandard: "Past",
	},
	doomdesire: {
		inherit: true,
		isNonstandard: "Past",
	},
	doublekick: {
		inherit: true,
		isNonstandard: "Past",
	},
	doubleshock: {
		inherit: true,
		flags: { contact: 1, protect: 1, mirror: 1, punch: 1 },
	},
	dragonascent: {
		inherit: true,
		isNonstandard: "Past",
	},
	dragonbreath: {
		inherit: true,
		isNonstandard: "Past",
	},
	dragoncheer: {
		inherit: true,
		flags: { bypasssub: 1, allyanim: 1, metronome: 1, sound: 1 },
	},
	dragonclaw: {
		inherit: true,
		flags: { contact: 1, protect: 1, mirror: 1, metronome: 1, slicing: 1 },
	},
	dragonenergy: {
		inherit: true,
		isNonstandard: "Past",
	},
	dragonhammer: {
		inherit: true,
		basePower: 100,
		isNonstandard: "Past",
	},
	dreameater: {
		inherit: true,
		isNonstandard: "Past",
	},
	dynamaxcannon: {
		inherit: true,
		isNonstandard: "Past",
	},
	echoedvoice: {
		inherit: true,
		isNonstandard: "Past",
	},
	electrify: {
		inherit: true,
		isNonstandard: null,
	},
	electrodrift: {
		inherit: true,
		isNonstandard: "Past",
	},
	ember: {
		inherit: true,
		isNonstandard: "Past",
	},
	encore: {
		inherit: true,
		condition: {
			inherit: true,
			onStart(target) {
				let move: Move | ActiveMove | null = target.lastMove;
				if (!move || target.volatiles['dynamax']) return false;

				// Encore only works on Max Moves if the base move is not itself a Max Move
				if (move.isMax && move.baseMove) move = this.dex.moves.get(move.baseMove);
				const moveSlot = target.getMoveData(move.id);
				if (move.isZ || move.isMax || move.flags['failencore'] || !moveSlot || moveSlot.pp <= 0) {
					// it failed
					return false;
				}
				this.effectState.move = move.id;
				this.add('-start', target, 'Encore');
				const action = this.queue.willMove(target);
				if (!action) {
					this.effectState.duration!++;
				} else if (action.moveid !== move.id && !target.hasItem('mentalherb')) {
					this.queue.changeAction(target, {
						choice: 'move',
						// target: undefined,
						// targetLoc: undefined,
						moveid: move.id,
					});
				}
			},
			onOverrideAction: undefined, // no inherit
		},
	},
	esperwing: {
		inherit: true,
		isNonstandard: "Past",
	},
	fairywind: {
		inherit: true,
		isNonstandard: "Past",
	},
	fakeout: {
		inherit: true,
		desc: "Has a 100% chance to make the target flinch. This move cannot be selected unless it is the user's first turn on the field.",
		onDisableMove(pokemon) {
			if (pokemon.activeMoveActions) {
				pokemon.disableMove('fakeout');
			}
		},
	},
	falsesurrender: {
		inherit: true,
		isNonstandard: "Past",
	},
	falseswipe: {
		inherit: true,
		isNonstandard: "Past",
	},
	fierywrath: {
		inherit: true,
		isNonstandard: "Past",
	},
	filletaway: {
		inherit: true,
		isNonstandard: "Past",
	},
	firelash: {
		inherit: true,
		basePower: 90,
	},
	firepledge: {
		inherit: true,
		isNonstandard: "Past",
	},
	firstimpression: {
		inherit: true,
		desc: "This move cannot be selected unless it is the user's first turn on the field.",
		basePower: 100,
		onDisableMove(pokemon) {
			if (pokemon.activeMoveActions) {
				pokemon.disableMove('firstimpression');
			}
		},
	},
	fishiousrend: {
		inherit: true,
		basePower: 80,
	},
	flamewheel: {
		inherit: true,
		isNonstandard: "Past",
	},
	fleurcannon: {
		inherit: true,
		isNonstandard: "Past",
	},
	floralhealing: {
		inherit: true,
		isNonstandard: "Past",
	},
	forcepalm: {
		inherit: true,
		isNonstandard: "Past",
	},
	freezedry: {
		inherit: true,
		desc: "This move's type effectiveness against Water is changed to be super effective no matter what this move's type is.",
		shortDesc: "Super effective on Water.",
		secondary: undefined, // no inherit
	},
	freezeshock: {
		inherit: true,
		isNonstandard: "Past",
	},
	freezingglare: {
		inherit: true,
		isNonstandard: "Past",
	},
	furyattack: {
		inherit: true,
		isNonstandard: "Past",
	},
	furycutter: {
		inherit: true,
		isNonstandard: "Past",
	},
	furyswipes: {
		inherit: true,
		isNonstandard: "Past",
	},
	fusionbolt: {
		inherit: true,
		isNonstandard: "Past",
	},
	fusionflare: {
		inherit: true,
		isNonstandard: "Past",
	},
	geargrind: {
		inherit: true,
		accuracy: 90,
		basePower: 60,
	},
	glaciallance: {
		inherit: true,
		isNonstandard: "Past",
	},
	glaciate: {
		inherit: true,
		isNonstandard: "Past",
	},
	grasspledge: {
		inherit: true,
		isNonstandard: "Past",
	},
	gravapple: {
		inherit: true,
		basePower: 90,
	},
	growl: {
		inherit: true,
		isNonstandard: "Past",
	},
	growth: {
		inherit: true,
		type: "Grass",
	},
	gust: {
		inherit: true,
		isNonstandard: "Past",
	},
	happyhour: {
		inherit: true,
		isNonstandard: "Past",
	},
	harden: {
		inherit: true,
		isNonstandard: "Past",
	},
	headbutt: {
		inherit: true,
		isNonstandard: "Past",
	},
	heartswap: {
		inherit: true,
		isNonstandard: "Past",
	},
	holdback: {
		inherit: true,
		isNonstandard: "Past",
	},
	holdhands: {
		inherit: true,
		isNonstandard: "Past",
	},
	honeclaws: {
		inherit: true,
		isNonstandard: "Past",
	},
	hornattack: {
		inherit: true,
		isNonstandard: "Past",
	},
	howl: {
		inherit: true,
		flags: { snatch: 1, sound: 1, bypasssub: 1, metronome: 1 },
	},
	hydrosteam: {
		inherit: true,
		isNonstandard: "Past",
	},
	hyperdrill: {
		inherit: true,
		basePower: 120,
		isNonstandard: "Past",
	},
	hyperspacefury: {
		inherit: true,
		isNonstandard: "Past",
	},
	hyperspacehole: {
		inherit: true,
		isNonstandard: "Past",
	},
	iceburn: {
		inherit: true,
		isNonstandard: "Past",
	},
	incinerate: {
		inherit: true,
		isNonstandard: "Past",
	},
	infernalparade: {
		inherit: true,
		basePower: 65,
	},
	ironhead: {
		inherit: true,
		desc: "Has a 20% chance to make the target flinch.",
		shortDesc: "20% chance to make the target flinch.",
		secondary: {
			chance: 20,
			volatileStatus: 'flinch',
		},
	},
	ivycudgel: {
		inherit: true,
		isNonstandard: "Past",
	},
	judgment: {
		inherit: true,
		isNonstandard: "Past",
	},
	junglehealing: {
		inherit: true,
		isNonstandard: "Past",
	},
	kingsshield: {
		inherit: true,
		isNonstandard: null,
		pp: 5,
	},
	leafage: {
		inherit: true,
		isNonstandard: "Past",
	},
	leer: {
		inherit: true,
		isNonstandard: "Past",
	},
	lick: {
		inherit: true,
		isNonstandard: "Past",
	},
	lightofruin: {
		inherit: true,
		isNonstandard: null,
	},
	lunarblessing: {
		inherit: true,
		isNonstandard: "Past",
	},
	lunardance: {
		inherit: true,
		isNonstandard: "Past",
	},
	lusterpurge: {
		inherit: true,
		isNonstandard: "Past",
	},
	magicalleaf: {
		inherit: true,
		isNonstandard: "Past",
	},
	magicaltorque: {
		inherit: true,
		isNonstandard: "Past",
	},
	magmastorm: {
		inherit: true,
		isNonstandard: "Past",
	},
	makeitrain: {
		inherit: true,
		desc: "Lowers the user's Special Attack by 2 stages.",
		shortDesc: "Lowers the user's Sp. Atk by 2. Hits foe(s).",
		accuracy: 95,
		self: {
			boosts: {
				spa: -2,
			},
		},
	},
	malignantchain: {
		inherit: true,
		isNonstandard: "Past",
	},
	megadrain: {
		inherit: true,
		isNonstandard: "Past",
	},
	megapunch: {
		inherit: true,
		isNonstandard: "Past",
	},
	metalclaw: {
		inherit: true,
		isNonstandard: "Past",
		flags: { contact: 1, protect: 1, mirror: 1, metronome: 1, slicing: 1 },
	},
	meteorassault: {
		inherit: true,
		basePower: 170,
		isNonstandard: null,
	},
	metronome: {
		inherit: true,
		isNonstandard: "Past",
	},
	mightycleave: {
		inherit: true,
		isNonstandard: "Past",
	},
	milkdrink: {
		inherit: true,
		target: "adjacentAllyOrSelf",
	},
	mimic: {
		inherit: true,
		isNonstandard: "Past",
	},
	mist: {
		inherit: true,
		isNonstandard: "Past",
	},
	mistball: {
		inherit: true,
		isNonstandard: "Past",
	},
	moonblast: {
		inherit: true,
		desc: "Has a 10% chance to lower the target's Special Attack by 1 stage.",
		shortDesc: "10% chance to lower the target's Sp. Atk by 1.",
		secondary: {
			chance: 10,
			boosts: {
				spa: -1,
			},
		},
	},
	moongeistbeam: {
		inherit: true,
		isNonstandard: "Past",
	},
	mountaingale: {
		inherit: true,
		basePower: 120,
	},
	mysticalpower: {
		inherit: true,
		isNonstandard: "Past",
	},
	nightdaze: {
		inherit: true,
		basePower: 90,
	},
	nightslash: {
		inherit: true,
		pp: 20,
	},
	nihillight: {
		inherit: true,
		pp: 5,
	},
	noretreat: {
		inherit: true,
		condition: {
			onStart(pokemon) {
				if (!pokemon.addVolatile('trapped')) return;
				this.add('-start', pokemon, 'move: No Retreat');
			},
		},
	},
	noxioustorque: {
		inherit: true,
		isNonstandard: "Past",
	},
	obstruct: {
		inherit: true,
		pp: 5,
	},
	octolock: {
		inherit: true,
		isNonstandard: null,
	},
	orderup: {
		inherit: true,
		isNonstandard: "Past",
	},
	originpulse: {
		inherit: true,
		isNonstandard: "Past",
	},
	payday: {
		inherit: true,
		isNonstandard: "Past",
	},
	peck: {
		inherit: true,
		isNonstandard: "Past",
	},
	photongeyser: {
		inherit: true,
		isNonstandard: "Past",
	},
	playnice: {
		inherit: true,
		isNonstandard: "Past",
	},
	poisongas: {
		inherit: true,
		isNonstandard: "Past",
	},
	poisonsting: {
		inherit: true,
		isNonstandard: "Past",
	},
	poisontail: {
		inherit: true,
		isNonstandard: "Past",
	},
	powdersnow: {
		inherit: true,
		isNonstandard: "Past",
	},
	powershift: {
		inherit: true,
		isNonstandard: null,
	},
	precipiceblades: {
		inherit: true,
		isNonstandard: "Past",
	},
	present: {
		inherit: true,
		isNonstandard: "Past",
	},
	prismaticlaser: {
		inherit: true,
		isNonstandard: "Past",
	},
	protect: {
		inherit: true,
		pp: 5,
	},
	psybeam: {
		inherit: true,
		isNonstandard: "Past",
	},
	psyblade: {
		inherit: true,
		isNonstandard: "Past",
	},
	psychoboost: {
		inherit: true,
		isNonstandard: "Past",
	},
	psyshieldbash: {
		inherit: true,
		basePower: 90,
	},
	psystrike: {
		inherit: true,
		isNonstandard: "Past",
	},
	purify: {
		inherit: true,
		pp: 5,
	},
	ragefist: {
		inherit: true,
		desc: "Power is equal to 50+(X × 50), where X is the total number of times the user has been hit by a damaging attack during the battle, even if the user did not lose HP from the attack. X cannot be greater than 6 and resets to 0 when the user leaves the field. Each hit of a multi-hit attack is counted, but confusion damage is not counted.",
		shortDesc: "+50 BP/hit on user. Max 6 hits. Resets on switch-out.",
		// Hit counter reset is implemented in Pokemon#clearVolatile
	},
	razorleaf: {
		inherit: true,
		isNonstandard: "Past",
	},
	relicsong: {
		inherit: true,
		isNonstandard: "Past",
	},
	retaliate: {
		inherit: true,
		isNonstandard: "Past",
	},
	revelationdance: {
		inherit: true,
		basePower: 100,
		isNonstandard: "Past",
	},
	roaroftime: {
		inherit: true,
		isNonstandard: "Past",
	},
	rocksmash: {
		inherit: true,
		isNonstandard: "Past",
	},
	rockthrow: {
		inherit: true,
		isNonstandard: "Past",
	},
	rollout: {
		inherit: true,
		isNonstandard: "Past",
	},
	ruination: {
		inherit: true,
		isNonstandard: "Past",
	},
	sacredfire: {
		inherit: true,
		isNonstandard: "Past",
	},
	saltcure: {
		inherit: true,
		desc: "Causes damage to the target equal to 1/16 of its maximum HP (1/8 if the target is Steel or Water type), rounded down, at the end of each turn during effect. This effect ends when the target is no longer active.",
		shortDesc: "Deals 1/16 max HP each turn; 1/8 on Steel, Water.",
		condition: {
			inherit: true,
			onResidual(pokemon) {
				this.damage(pokemon.baseMaxhp / (pokemon.hasType(['Water', 'Steel']) ? 8 : 16));
			},
		},
	},
	sandattack: {
		inherit: true,
		isNonstandard: "Past",
	},
	sandsearstorm: {
		inherit: true,
		isNonstandard: "Past",
	},
	sandstorm: {
		inherit: true,
		pp: 5,
	},
	scratch: {
		inherit: true,
		isNonstandard: "Past",
	},
	secretsword: {
		inherit: true,
		isNonstandard: "Past",
	},
	seedflare: {
		inherit: true,
		isNonstandard: "Past",
	},
	shadowclaw: {
		inherit: true,
		flags: { contact: 1, protect: 1, mirror: 1, metronome: 1, slicing: 1 },
	},
	shadowforce: {
		inherit: true,
		isNonstandard: "Past",
	},
	shelltrap: {
		inherit: true,
		pp: 10,
	},
	shockwave: {
		inherit: true,
		isNonstandard: "Past",
	},
	shoreup: {
		inherit: true,
		isNonstandard: "Past",
	},
	silktrap: {
		inherit: true,
		isNonstandard: "Past",
	},
	sketch: {
		inherit: true,
		isNonstandard: "Past",
	},
	slam: {
		inherit: true,
		isNonstandard: "Past",
	},
	slash: {
		inherit: true,
		basePower: 80,
	},
	sludge: {
		inherit: true,
		isNonstandard: "Past",
	},
	smog: {
		inherit: true,
		isNonstandard: "Past",
	},
	smokescreen: {
		inherit: true,
		isNonstandard: "Past",
	},
	snaptrap: {
		inherit: true,
		isNonstandard: null,
		type: "Steel",
	},
	snipeshot: {
		inherit: true,
		basePower: 85,
	},
	snowscape: {
		inherit: true,
		pp: 5,
	},
	spacialrend: {
		inherit: true,
		isNonstandard: "Past",
	},
	spark: {
		inherit: true,
		isNonstandard: "Past",
	},
	spikyshield: {
		inherit: true,
		pp: 5,
	},
	spinout: {
		inherit: true,
		isNonstandard: "Past",
		pp: 10,
	},
	spiritshackle: {
		inherit: true,
		basePower: 90,
	},
	splash: {
		inherit: true,
		isNonstandard: "Past",
	},
	springtidestorm: {
		inherit: true,
		isNonstandard: "Past",
	},
	steameruption: {
		inherit: true,
		isNonstandard: "Past",
	},
	stomp: {
		inherit: true,
		isNonstandard: "Past",
	},
	stormthrow: {
		inherit: true,
		isNonstandard: null,
	},
	strangesteam: {
		inherit: true,
		isNonstandard: "Past",
	},
	strength: {
		inherit: true,
		isNonstandard: "Past",
	},
	strengthsap: {
		inherit: true,
		pp: 5,
	},
	stuffcheeks: {
		inherit: true,
		desc: "Fails if the user is not holding a Berry. The user eats its Berry and raises its Defense by 2 stages. This effect is not prevented by the Klutz or Unnerve Abilities, or the effects of Embargo or Magic Room.",
		shortDesc: "Fails unless a Berry is held. User eats Berry, Def +2.",
		onDisableMove: undefined, // no inherit
	},
	sunsteelstrike: {
		inherit: true,
		isNonstandard: "Past",
	},
	supersonic: {
		inherit: true,
		isNonstandard: "Past",
	},
	surgingstrikes: {
		inherit: true,
		isNonstandard: "Past",
	},
	swift: {
		inherit: true,
		isNonstandard: "Past",
	},
	syrupbomb: {
		inherit: true,
		accuracy: 90,
	},
	tachyoncutter: {
		inherit: true,
		isNonstandard: "Past",
	},
	tackle: {
		inherit: true,
		isNonstandard: "Past",
	},
	tailglow: {
		inherit: true,
		isNonstandard: "Past",
	},
	tailwhip: {
		inherit: true,
		isNonstandard: "Past",
	},
	takedown: {
		inherit: true,
		isNonstandard: "Past",
	},
	takeheart: {
		inherit: true,
		isNonstandard: "Past",
	},
	tarshot: {
		inherit: true,
		isNonstandard: "Past",
	},
	teleport: {
		inherit: true,
		isNonstandard: "Past",
	},
	terablast: {
		inherit: true,
		isNonstandard: "Past",
	},
	terastarstorm: {
		inherit: true,
		isNonstandard: "Past",
	},
	thundercage: {
		inherit: true,
		isNonstandard: "Past",
	},
	thunderclap: {
		inherit: true,
		isNonstandard: "Past",
	},
	thunderouskick: {
		inherit: true,
		isNonstandard: "Past",
	},
	thundershock: {
		inherit: true,
		isNonstandard: "Past",
	},
	toxicthread: {
		inherit: true,
		desc: "Lowers the target's Speed by 2 stages and poisons it.",
		shortDesc: "Lowers the target's Speed by 2 and poisons it.",
		boosts: {
			spe: -2,
		},
	},
	trickortreat: {
		inherit: true,
		isNonstandard: null,
	},
	tripledive: {
		inherit: true,
		basePower: 35,
		isNonstandard: "Past",
	},
	triplekick: {
		inherit: true,
		isNonstandard: "Past",
	},
	tropkick: {
		inherit: true,
		basePower: 85,
	},
	twister: {
		inherit: true,
		isNonstandard: "Past",
	},
	vcreate: {
		inherit: true,
		isNonstandard: "Past",
	},
	victorydance: {
		inherit: true,
		isNonstandard: "Past",
	},
	vinewhip: {
		inherit: true,
		isNonstandard: "Past",
	},
	visegrip: {
		inherit: true,
		isNonstandard: "Past",
	},
	watergun: {
		inherit: true,
		isNonstandard: "Past",
	},
	waterpledge: {
		inherit: true,
		isNonstandard: "Past",
	},
	wickedblow: {
		inherit: true,
		isNonstandard: "Past",
	},
	wickedtorque: {
		inherit: true,
		isNonstandard: "Past",
	},
	wildboltstorm: {
		inherit: true,
		isNonstandard: "Past",
	},
	wingattack: {
		inherit: true,
		isNonstandard: "Past",
	},
	wish: {
		inherit: true,
		pp: 5,
	},
	withdraw: {
		inherit: true,
		isNonstandard: "Past",
	},
	workup: {
		inherit: true,
		isNonstandard: "Past",
	},
	covet: {
		inherit: true,
		desc: "If this attack was successful and the user is not holding an item, it steals the target's held item. A target with the Sticky Hold Ability does not lose its held item if it has not fainted. The target's item is not stolen if it is a Mega Stone and either the user or the target is the species that can Mega Evolve with it. Items lost to this move cannot be regained with Recycle or the Harvest Ability.",
	},
	knockoff: {
		inherit: true,
		desc: "This move's power is multiplied by 1.5 if the target is holding an item, and the target loses its held item. A target with the Sticky Hold Ability does not lose its held item if it has not fainted. This move does not increase in power or remove the target's item if it is a Mega Stone held by the species that can Mega Evolve with it. Items lost to this move cannot be regained with Recycle or the Harvest Ability.",
	},
	switcheroo: {
		inherit: true,
		desc: "The user swaps its held item with the target's held item. Fails if both the user and the target have no held item, or if the user is trying to give or take a Mega Stone to or from the species that can Mega Evolve with it. The target is immune to this move if it has the Sticky Hold Ability.",
	},
	thief: {
		inherit: true,
		desc: "If this attack was successful and the user is not holding an item, it steals the target's held item. A target with the Sticky Hold Ability does not lose its held item if it has not fainted. The target's item is not stolen if it is a Mega Stone and either the user or the target is the species that can Mega Evolve with it. Items lost to this move cannot be regained with Recycle or the Harvest Ability.",
	},
	trick: {
		inherit: true,
		desc: "The user swaps its held item with the target's held item. Fails if both the user and the target have no held item, or if the user is trying to give or take a Mega Stone to or from the species that can Mega Evolve with it. The target is immune to this move if it has the Sticky Hold Ability.",
	},
};
