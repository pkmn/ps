import {Dex as DexType} from './dex';

declare global {
	namespace NodeJS {
		interface Global {
			Config: any;
			__version: {head: string, origin?: string, tree?: string}
		}
	}
	const Dex: typeof DexType;
	const Config: {potd?: string, allowrequestingties?: boolean};
}
