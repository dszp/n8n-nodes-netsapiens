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
	minApiVersion?: number;
};

export const resourceOverrides: Record<string, ResourceOverride> = {
	'Aduit Log': {
		displayName: 'Audit Log',
	},
	Connections: {
		displayName: 'Connections (Trunks)',
	},
};

export const operationOverrides: Record<string, OperationOverride> = {
	// ── MOH: Consolidate Base64 + FileUpload into single "Upload" operations ──
	CreateMohDomainFileUpload: { hidden: true },
	UpdateMohDomainFileUpload: { hidden: true },
	CreateMohUserFileUpload: { hidden: true },
	UpdateMohUserFileUpload: { hidden: true },
	CreateMohDomainBase64: { displayName: 'Create a New MOH for Domain from Upload' },
	UpdateMohDomainBase64: { displayName: 'Update MOH for Domain from Upload' },
	CreateMohUserBase64: { displayName: 'Create a New MOH for User from Upload' },
	UpdateMohUserBase64: { displayName: 'Update MOH for User from Upload' },

	// ── Greetings: Same pattern as MOH ──
	CreateGreetingFileUpload: { hidden: true },
	UpdateGreetingFileUpload: { hidden: true },
	CreateGreetingBase64: { displayName: 'Create a New Greeting from Upload' },
	UpdateGreetingBase64: { displayName: 'Update Greeting from Upload' },

	// ── Hold Messages: Only FileUpload exists, rename to "Upload" ──
	CreateMsgDomainFileUpload: { displayName: 'Create a New Hold Message for Domain from Upload' },
	UpdateMsgDomainFileUpload: { displayName: 'Update Hold Message for Domain from Upload' },
	PostDomainsByUsersByMsg: { displayName: 'Create a New Hold Message for User from Upload' },
	UpdateMsgUserFileUpload: { displayName: 'Update Hold Message for User from Upload' },

	// NOTE: CountDevices previously needed `minApiVersion: 0` here, because the generator's v44
	// baseline was the ancient NetSapiens.v2.3.1.0 spec and mislabelled it v45-only. The baseline
	// is now a real 44.4.10 core spec, which classifies it correctly, so the hand-patch is gone.
	// Add a manual minApiVersion here only for an endpoint a core serves but does not document.

	// ── Images: Consolidate FileUpload into Base64 "Upload" operations ──
	UpdateImageFileUpload: { hidden: true },
	CreateImageBase64: { displayName: 'Create Image from Upload' },
	UpdateImageBase64: { displayName: 'Update Image from Upload' },
};
