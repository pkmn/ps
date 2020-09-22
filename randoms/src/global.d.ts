export {};

declare global {
	namespace NodeJS {
		interface Global {
			Config: any;
		}
	}
	const Config: {potd?: string; allowrequestingties?: boolean};
}
