import {Dex as DexType} from './dex';

declare global {
	var Dex: typeof DexType;
	var Config: {potd?: string, allowrequestingties?: boolean};
}
