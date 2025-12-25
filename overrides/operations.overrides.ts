export type ResourceOverride = {
	displayName?: string;
	hidden?: boolean;
	order?: number;
};

export type OperationOverride = {
	displayName?: string;
	description?: string;
	hidden?: boolean;
	resource?: string;
	order?: number;
};

export const resourceOverrides: Record<string, ResourceOverride> = {
	'Aduit Log': {
		displayName: 'Audit Log',
	},
	Connections: {
		displayName: 'Connections (Trunks)',
	},
};

export const operationOverrides: Record<string, OperationOverride> = {};
