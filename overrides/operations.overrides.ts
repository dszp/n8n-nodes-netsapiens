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

export const resourceOverrides: Record<string, ResourceOverride> = {};

export const operationOverrides: Record<string, OperationOverride> = {};
