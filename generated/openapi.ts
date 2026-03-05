export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'HEAD' | 'OPTIONS' | 'TRACE';

export type ParameterLocation = 'path' | 'query' | 'header';

export type GeneratedOpenApiParameter = {
  name: string;
  in: ParameterLocation;
  required: boolean;
  description?: string;
  schemaType?: string;
};

export type GeneratedOpenApiOperation = {
  id: string;
  method: HttpMethod;
  path: string;
  resource: string;
  summary?: string;
  description?: string;
  parameters: GeneratedOpenApiParameter[];
  hasRequestBody: boolean;
  minApiVersion?: number;
};

export const resources: readonly string[] = [
  "Access Log",
  "Addresses",
  "Aduit Log",
  "Answer Rules",
  "Authentication/Access Token (Oauth - Username/Password)",
  "Authentication/API Key (Machine 2 Machine)",
  "Authentication/JWT (JSON Web Token)",
  "Auto Attendant",
  "Backup & Restore",
  "Call Blocking",
  "Call Center/Agent Actions",
  "Call Center/Agents",
  "Call Center/Call Dispositions",
  "Call Center/Callqueues",
  "Call Center/QueuedCalls",
  "Call Center/Statistics",
  "Call Traces & Cradle to Grave",
  "Calls (live/active calls)",
  "CDR (Call History)",
  "CDR Schedule",
  "Charts",
  "Conference/Conferences",
  "Conference/Participants",
  "Configs/Configuration Definitions",
  "Configs/Configurations",
  "Configs/Configurations/NS Configs",
  "Connections",
  "Contacts",
  "Contacts/Shared Contacts",
  "Dashboards",
  "Departments",
  "Devices",
  "Dial Permisions",
  "Dialrule",
  "Domains",
  "Email",
  "Event Subscriptions",
  "Firebase",
  "Images",
  "iNSight",
  "Manage Code",
  "Media/Greetings",
  "Media/Hold Messages/Domain",
  "Media/Hold Messages/User",
  "Media/Music on Hold/Domain",
  "Media/Music on Hold/User",
  "Media/Text to Speech",
  "Media/Voicemail",
  "Meetings",
  "Meetings/Event Logs",
  "Meetings/Iotum",
  "Messages",
  "Phone Numbers",
  "Phone Numbers/Use Cases",
  "Phones/Macs",
  "Phones/Macs/Supported Models and Servers",
  "Presence",
  "Quotas",
  "Recordings",
  "Resellers",
  "Routes",
  "Sites",
  "SMS Numbers",
  "SnapBuilder",
  "SnapBuilder/Phone Templates",
  "SSL Certificates",
  "Templates",
  "Timeframes/Domain (Shared)",
  "Timeframes/Domain (Shared)/Always",
  "Timeframes/Domain (Shared)/Custom",
  "Timeframes/Domain (Shared)/Days of Week",
  "Timeframes/Domain (Shared)/Holiday",
  "Timeframes/Domain (Shared)/Specific Dates",
  "Timeframes/Holiday Information",
  "Timeframes/User",
  "Timeframes/User/Always",
  "Timeframes/User/Custom",
  "Timeframes/User/Days of Week",
  "Timeframes/User/Holiday",
  "Timeframes/User/Specific Dates",
  "Transcriptions & Sentiment",
  "Users",
  "Version",
  "Voicemail Reminders"
];

export const operations: readonly GeneratedOpenApiOperation[] = [
  {
    "id": "Version",
    "method": "GET",
    "path": "/version",
    "resource": "Version",
    "summary": "Read API Version ",
    "description": "",
    "parameters": [],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  {
    "id": "PostAuthCode",
    "method": "POST",
    "path": "/authCode",
    "resource": "Authentication/Access Token (Oauth - Username/Password)",
    "summary": "Get Access Token From Auth Code",
    "description": "",
    "parameters": [
      {
        "name": "Authorization",
        "in": "header",
        "required": false,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true,
    "minApiVersion": 45
  },
  {
    "id": "PostTokens",
    "method": "POST",
    "path": "/tokens",
    "resource": "Authentication/Access Token (Oauth - Username/Password)",
    "summary": "Get Access Token From Refresh",
    "description": "> Note: # and anything after is NOT needed, its just to allow multiple examples for the same path/method. ",
    "parameters": [],
    "hasRequestBody": true
  },
  {
    "id": "PostTokens_2",
    "method": "POST",
    "path": "/tokens",
    "resource": "Authentication/Access Token (Oauth - Username/Password)",
    "summary": "Get Access Token after MFA request Copy",
    "description": "This API will accept username and password along with a passcode generated via a authenticator application and generate a Access token ",
    "parameters": [],
    "hasRequestBody": true
  },
  {
    "id": "PostTokens_3",
    "method": "POST",
    "path": "/tokens",
    "resource": "Authentication/Access Token (Oauth - Username/Password)",
    "summary": "Get Access Token after MFA request",
    "description": "This API will accept username and password along with a passcode generated via a authenticator application and generate a Access token ",
    "parameters": [],
    "hasRequestBody": true
  },
  {
    "id": "PostSsoEnroll",
    "method": "POST",
    "path": "/ssoEnroll",
    "resource": "Authentication/Access Token (Oauth - Username/Password)",
    "summary": "SSO Enroll",
    "description": "",
    "parameters": [],
    "hasRequestBody": true,
    "minApiVersion": 45
  },
  {
    "id": "ReadMyApikey",
    "method": "GET",
    "path": "/apikeys/~",
    "resource": "Authentication/API Key (Machine 2 Machine)",
    "summary": "Read API Key info on your API Key",
    "description": "This parameter-less action will return the information on the API key being used for the request giving confirmation on access levels allowed. ",
    "parameters": [],
    "hasRequestBody": false
  },
  {
    "id": "ReadApikeys",
    "method": "GET",
    "path": "/apikeys",
    "resource": "Authentication/API Key (Machine 2 Machine)",
    "summary": "Read API Keys under your account",
    "description": "This action will show apikeys that have been generated by your current APIkey and that you have access to update or revoke as needed. \n\n> Note: # and anything after is NOT needed, its just to allow multiple examples for the same path/method. ",
    "parameters": [],
    "hasRequestBody": false
  },
  {
    "id": "ReadApikey",
    "method": "GET",
    "path": "/apikeys/{key_id}",
    "resource": "Authentication/API Key (Machine 2 Machine)",
    "summary": "Read Info on specific APIKey via Key ID",
    "description": "This action will show apikeys that have been generated by your current APIkey and that you have access to update or revoke as needed. \n\n> Note: # and anything after is NOT needed, its just to allow multiple examples for the same path/method. ",
    "parameters": [
      {
        "name": "key_id",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false
  },
  {
    "id": "UpdateApikey",
    "method": "PUT",
    "path": "/apikeys/{key_id}",
    "resource": "Authentication/API Key (Machine 2 Machine)",
    "summary": "Update API Key",
    "description": "This is a limited action and will require special access to create API keys. The Update is even more limited only allowing the change of the description and IP restrictions. You will not be able to change the scope, access rights or any premissions. A new apikey would need to be created in those cases. ",
    "parameters": [
      {
        "name": "key_id",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true
  },
  {
    "id": "RevokeApikey",
    "method": "DELETE",
    "path": "/apikeys/{key_id}",
    "resource": "Authentication/API Key (Machine 2 Machine)",
    "summary": "Revoke API Key",
    "description": "This is a limited action and will require special access to revoke API keys. Revoking the apikey will remove the key from the DB and any Cache stoping access immediately. ",
    "parameters": [
      {
        "name": "key_id",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false
  },
  {
    "id": "CreateApikey",
    "method": "POST",
    "path": "/apikeys",
    "resource": "Authentication/API Key (Machine 2 Machine)",
    "summary": "Create API Key",
    "description": "This is a limited action and will require special access to create API keys. ",
    "parameters": [],
    "hasRequestBody": true
  },
  {
    "id": "PostJwt",
    "method": "POST",
    "path": "/jwt",
    "resource": "Authentication/JWT (JSON Web Token)",
    "summary": "Create JWT token From User/Pass",
    "description": "This API will accept username and password and generate a JWT token. ",
    "parameters": [],
    "hasRequestBody": true
  },
  {
    "id": "RevokeMyJWT",
    "method": "DELETE",
    "path": "/jwt",
    "resource": "Authentication/JWT (JSON Web Token)",
    "summary": "Revoke current JWT ",
    "description": "This API requires a valid JWT and will revoke it by JTI of the current Token. It will then prevent its use moving forward. ",
    "parameters": [],
    "hasRequestBody": false
  },
  {
    "id": "GetJwt",
    "method": "GET",
    "path": "/jwt",
    "resource": "Authentication/JWT (JSON Web Token)",
    "summary": "Read Current JWT",
    "description": "",
    "parameters": [],
    "hasRequestBody": false
  },
  {
    "id": "PostJwt_2",
    "method": "POST",
    "path": "/jwt",
    "resource": "Authentication/JWT (JSON Web Token)",
    "summary": "Create JWT token from Refresh JWT",
    "description": "This API will accept a refresh token in JSON object to grant a new JWT and revoke the refresh token as used. \n\n> Note: # and anything after is NOT needed, its just to allow multiple examples for the same path/method. ",
    "parameters": [],
    "hasRequestBody": true
  },
  {
    "id": "PostJwt_3",
    "method": "POST",
    "path": "/jwt",
    "resource": "Authentication/JWT (JSON Web Token)",
    "summary": "Create JWT token after MFA request",
    "description": "This API will accept username and password along with a passcode generated via a authenticator application and generate a JWT token. Please recall that on the endpoint notation here in the docs, the \"#2\" after \"/jwt\" should be removed and is only there to facilitate naming.",
    "parameters": [],
    "hasRequestBody": true
  },
  {
    "id": "PostJwt_4",
    "method": "POST",
    "path": "/jwt",
    "resource": "Authentication/JWT (JSON Web Token)",
    "summary": "Create JWT token For Delegated  Access",
    "description": "This API will require valid access through APIKey and allows for generation of a JWT for a different user. \n\n> Note: # and anything after is NOT needed, its just to allow multiple examples for the same path/method. ",
    "parameters": [
      {
        "name": "Authorization",
        "in": "header",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true
  },
  {
    "id": "RevokeJWTbyUid",
    "method": "DELETE",
    "path": "/jwt/{uid}",
    "resource": "Authentication/JWT (JSON Web Token)",
    "summary": "Revoke JWT(s) by UID (user@domain)",
    "description": "",
    "parameters": [
      {
        "name": "uid",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false
  },
  {
    "id": "RevokeJWTbyJti",
    "method": "DELETE",
    "path": "/jwt/{jti}",
    "resource": "Authentication/JWT (JSON Web Token)",
    "summary": "Revoke JWT by JTI (JWT ID)",
    "description": "> Note: # and anything after is NOT needed, its just to allow multiple examples for the same path/method. ",
    "parameters": [
      {
        "name": "jti",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false
  },
  {
    "id": "ReadSubscriptions",
    "method": "GET",
    "path": "/subscriptions",
    "resource": "Event Subscriptions",
    "summary": "Read Event Subscriptions",
    "description": "",
    "parameters": [],
    "hasRequestBody": false
  },
  {
    "id": "CreateSubscription",
    "method": "POST",
    "path": "/subscriptions",
    "resource": "Event Subscriptions",
    "summary": "Create a Event Subscription",
    "description": "",
    "parameters": [],
    "hasRequestBody": true
  },
  {
    "id": "ReadSubscriptionsDomain",
    "method": "GET",
    "path": "/domains/{domain}/subscriptions",
    "resource": "Event Subscriptions",
    "summary": "Read Event Subscriptions for Domain",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  {
    "id": "CreateSubscriptionDomain",
    "method": "POST",
    "path": "/domains/{domain}/subscriptions",
    "resource": "Event Subscriptions",
    "summary": "Create a Event Subscription for Domain",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": true,
    "minApiVersion": 45
  },
  {
    "id": "ReadSubscription",
    "method": "GET",
    "path": "/subscriptions/{id}",
    "resource": "Event Subscriptions",
    "summary": "Read Event Subscription By Id",
    "description": "",
    "parameters": [
      {
        "name": "id",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false
  },
  {
    "id": "UpdateSubscription",
    "method": "PUT",
    "path": "/subscriptions/{id}",
    "resource": "Event Subscriptions",
    "summary": "Update an Event Subscription",
    "description": "",
    "parameters": [
      {
        "name": "id",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true
  },
  {
    "id": "DeleteSubscription",
    "method": "DELETE",
    "path": "/subscriptions/{id}",
    "resource": "Event Subscriptions",
    "summary": "Delete a subscription",
    "description": "",
    "parameters": [
      {
        "name": "id",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true
  },
  {
    "id": "UpdateSubscriptionDomain",
    "method": "PUT",
    "path": "/domains/{domain}/subscriptions/{id}",
    "resource": "Event Subscriptions",
    "summary": "Update an Event Subscription for Domain",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "id",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true,
    "minApiVersion": 45
  },
  {
    "id": "DeleteSubscriptionDomain",
    "method": "DELETE",
    "path": "/domains/{domain}/subscriptions/{id}",
    "resource": "Event Subscriptions",
    "summary": "Delete a subscription For Domain",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "id",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  {
    "id": "GetResellers",
    "method": "GET",
    "path": "/resellers",
    "resource": "Resellers",
    "summary": "Get Resellers",
    "description": "",
    "parameters": [],
    "hasRequestBody": false
  },
  {
    "id": "CreateReseller",
    "method": "POST",
    "path": "/resellers",
    "resource": "Resellers",
    "summary": "Create Reseller",
    "description": "",
    "parameters": [],
    "hasRequestBody": true
  },
  {
    "id": "GetResellersCount",
    "method": "GET",
    "path": "/resellers/count",
    "resource": "Resellers",
    "summary": "Count Resellers",
    "description": "",
    "parameters": [],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  {
    "id": "GetResellersByCount",
    "method": "GET",
    "path": "/resellers/{reseller}/count",
    "resource": "Resellers",
    "summary": "Check if Reseller Exists",
    "description": "",
    "parameters": [
      {
        "name": "reseller",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  {
    "id": "UpdateReseller",
    "method": "PUT",
    "path": "/resellers/{reseller}",
    "resource": "Resellers",
    "summary": "Update Reseller",
    "description": "",
    "parameters": [
      {
        "name": "reseller",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true
  },
  {
    "id": "DeleteReseller",
    "method": "DELETE",
    "path": "/resellers/{reseller}",
    "resource": "Resellers",
    "summary": "Delete Reseller",
    "description": "",
    "parameters": [
      {
        "name": "reseller",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false
  },
  {
    "id": "GetReseller",
    "method": "GET",
    "path": "/resellers/{reseller}",
    "resource": "Resellers",
    "summary": "Get Specific Reseller",
    "description": "",
    "parameters": [
      {
        "name": "reseller",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false
  },
  {
    "id": "GetDomains",
    "method": "GET",
    "path": "/domains",
    "resource": "Domains",
    "summary": "Get Domains ",
    "description": "This API is the same for both Super User and Reseller. If using Reseller scopped access there territory/reseller will be used from the access rights for the filter.  ",
    "parameters": [
      {
        "name": "start",
        "in": "query",
        "required": false,
        "description": ""
      },
      {
        "name": "limit",
        "in": "query",
        "required": false,
        "description": ""
      }
    ],
    "hasRequestBody": false
  },
  {
    "id": "CreateDomain",
    "method": "POST",
    "path": "/domains",
    "resource": "Domains",
    "summary": "Create a Domain",
    "description": "This API will allow a new domain to be created. Version 2 of the api will assist in creating some resources that previously were not auto created on api domain create inlcuding creating a \"domain\" subscriber  for the owner to hold the defaults and creating a dialplan with a name that matches the domain that is chained up to a system wide table. ",
    "parameters": [],
    "hasRequestBody": true
  },
  {
    "id": "CountDomains",
    "method": "GET",
    "path": "/domains/count",
    "resource": "Domains",
    "summary": "Count Domains",
    "description": "This API is the same for both Super User and Reseller. If using Reseller scopped access there territory/reseller will be used from the access rights for the filter.  ",
    "parameters": [],
    "hasRequestBody": false
  },
  {
    "id": "GetDomain",
    "method": "GET",
    "path": "/domains/{domain}",
    "resource": "Domains",
    "summary": "Get Specific Domain",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": "The Domain name for the resource being requested"
      }
    ],
    "hasRequestBody": false
  },
  {
    "id": "UpdateDomain",
    "method": "PUT",
    "path": "/domains/{domain}",
    "resource": "Domains",
    "summary": "Update a Domain",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": "This is the main organization name. This is used to link resource to its group/tenant/organization/enterprise."
      }
    ],
    "hasRequestBody": true
  },
  {
    "id": "DeleteDomain",
    "method": "DELETE",
    "path": "/domains/{domain}",
    "resource": "Domains",
    "summary": "Delete a Domain",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": "The Domain name for the resource being requested"
      }
    ],
    "hasRequestBody": false
  },
  {
    "id": "DomainBilling",
    "method": "GET",
    "path": "/domains/{domain}/billing",
    "resource": "Domains",
    "summary": "Get Specific Domain With Billing Summary",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": "The Domain name for the resource being requested"
      }
    ],
    "hasRequestBody": false
  },
  {
    "id": "GetMyDomain",
    "method": "GET",
    "path": "/domains/~",
    "resource": "Domains",
    "summary": "Get My Domain Info",
    "description": "",
    "parameters": [],
    "hasRequestBody": false
  },
  {
    "id": "CountDomain",
    "method": "GET",
    "path": "/domains/{domain}/count",
    "resource": "Domains",
    "summary": "Check if Domain Exists",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": "The Domain name for the resource being requested"
      }
    ],
    "hasRequestBody": false
  },
  {
    "id": "UpdatePhonenumberQueue",
    "method": "PUT",
    "path": "/domains/{domain}/phonenumbers",
    "resource": "Phone Numbers/Use Cases",
    "summary": "Send Phonenumber to Call Queue",
    "description": "This API will allow updating of an existing number in a domain. ",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": true
  },
  {
    "id": "GetDomainPhonenumbers",
    "method": "GET",
    "path": "/domains/{domain}/phonenumbers",
    "resource": "Phone Numbers",
    "summary": "Get All Phone Numbers for Domain",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": false
  },
  {
    "id": "CreatePhonenumber",
    "method": "POST",
    "path": "/domains/{domain}/phonenumbers",
    "resource": "Phone Numbers",
    "summary": "Add Phone Number in Domain",
    "description": "This will allow adding a phone number. ",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": true
  },
  {
    "id": "UpdatePhonenumberUser",
    "method": "PUT",
    "path": "/domains/{domain}/phonenumbers",
    "resource": "Phone Numbers/Use Cases",
    "summary": "Send Phonenumber to a User ",
    "description": "This API will allow updating of an existing number in a domain. ",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": true
  },
  {
    "id": "UpdatePhonenumberOffnet",
    "method": "PUT",
    "path": "/domains/{domain}/phonenumbers",
    "resource": "Phone Numbers/Use Cases",
    "summary": "Send Phonenumber to Offnet Number",
    "description": "This API example will forward a owned number to an offnet number. It shows ability to add a header and using a responder application that will keep call ownership with the domain for billing needs.  ",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": true
  },
  {
    "id": "UpdatePhonenumberAvailable",
    "method": "PUT",
    "path": "/domains/{domain}/phonenumbers",
    "resource": "Phone Numbers/Use Cases",
    "summary": "Move phonenumber back to Available in Inventory",
    "description": "This API example will move the number back to available in the domain's invenetory\n",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": true
  },
  {
    "id": "CountDomainPhonenumbers",
    "method": "GET",
    "path": "/domains/{domain}/phonenumbers/count",
    "resource": "Phone Numbers",
    "summary": "Count Phone Numbers for Domain",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  {
    "id": "GetPhonenumbers",
    "method": "GET",
    "path": "/phonenumbers",
    "resource": "Phone Numbers",
    "summary": "Get All Phone Numbers for System or Reseller",
    "description": "This path will give you all Phonenumbers (DIDs) that are accessable based on the access rights of the Access Token or API Key used to make the requests. Super User or Reseller both supported, but for per domain lookups you should use /domains/{domain}/phonenumbers. ",
    "parameters": [
      {
        "name": "start",
        "in": "query",
        "required": false,
        "description": ""
      },
      {
        "name": "limit",
        "in": "query",
        "required": false,
        "description": ""
      }
    ],
    "hasRequestBody": false
  },
  {
    "id": "DeletePhonenumber",
    "method": "DELETE",
    "path": "/domains/{domain}/phonenumbers/{phonenumber}",
    "resource": "Phone Numbers",
    "summary": "Remove Phone Number from Domain",
    "description": "This will allow adding a phone number. ",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "phonenumber",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false
  },
  {
    "id": "UpdatePhonenumber",
    "method": "PUT",
    "path": "/domains/{domain}/phonenumbers/{phonenumber}",
    "resource": "Phone Numbers",
    "summary": "Update Phone Number in Domain",
    "description": "This API will allow updating of an existing number in a domain. ",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "phonenumber",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true
  },
  {
    "id": "GetPhonenumber",
    "method": "GET",
    "path": "/domains/{domain}/phonenumbers/{phonenumber}",
    "resource": "Phone Numbers",
    "summary": "Get Specific Phone Number in Domain",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "phonenumber",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false
  },
  {
    "id": "GetUsers",
    "method": "GET",
    "path": "/domains/{domain}/users",
    "resource": "Users",
    "summary": "Get Users in Domain",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "limit",
        "in": "query",
        "required": false,
        "description": ""
      },
      {
        "name": "start",
        "in": "query",
        "required": false,
        "description": ""
      }
    ],
    "hasRequestBody": false
  },
  {
    "id": "CreateUser",
    "method": "POST",
    "path": "/domains/{domain}/users",
    "resource": "Users",
    "summary": "Create User in Domain",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": true
  },
  {
    "id": "CountUsers",
    "method": "GET",
    "path": "/domains/{domain}/users/count",
    "resource": "Users",
    "summary": "Count users in Domain",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": false
  },
  {
    "id": "SearchUsers",
    "method": "GET",
    "path": "/domains/{domain}/users",
    "resource": "Users",
    "summary": "Search for Users in Domain",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "site",
        "in": "query",
        "required": false,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false
  },
  {
    "id": "DeleteUser",
    "method": "DELETE",
    "path": "/domains/{domain}/users/{user}",
    "resource": "Users",
    "summary": "Delete User in Domain",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": false
  },
  {
    "id": "UpdateUser",
    "method": "PUT",
    "path": "/domains/{domain}/users/{user}",
    "resource": "Users",
    "summary": "Update a User in Domain",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": true
  },
  {
    "id": "GetUser",
    "method": "GET",
    "path": "/domains/{domain}/users/{user}",
    "resource": "Users",
    "summary": "Get Specific User in Domain",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": false
  },
  {
    "id": "GetMyUser",
    "method": "GET",
    "path": "/domains/~/users/~",
    "resource": "Users",
    "summary": "Get My User ",
    "description": "",
    "parameters": [],
    "hasRequestBody": false
  },
  {
    "id": "ListUsers",
    "method": "GET",
    "path": "/domains/{domain}/users/list",
    "resource": "Users",
    "summary": "List Basic Info on Users in Domain",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "fields",
        "in": "query",
        "required": false,
        "description": "Comma delimited string of specific return fields to list.",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  {
    "id": "GetDevices",
    "method": "GET",
    "path": "/domains/{domain}/users/{user}/devices",
    "resource": "Devices",
    "summary": "Get Devices for User",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": false
  },
  {
    "id": "CreateDevice",
    "method": "POST",
    "path": "/domains/{domain}/users/{user}/devices",
    "resource": "Devices",
    "summary": "Create Device for User",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": true
  },
  {
    "id": "GetDomainsByDevicesCount",
    "method": "GET",
    "path": "/domains/{domain}/devices/count",
    "resource": "Devices",
    "summary": "Count Devices for Domain",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "limit",
        "in": "query",
        "required": false,
        "description": ""
      },
      {
        "name": "start",
        "in": "query",
        "required": false,
        "description": ""
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  {
    "id": "GetResellersByDevicesCount",
    "method": "GET",
    "path": "/resellers/{reseller}/devices/count",
    "resource": "Devices",
    "summary": "Count Devices for Reseller",
    "description": "",
    "parameters": [
      {
        "name": "reseller",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      },
      {
        "name": "limit",
        "in": "query",
        "required": false,
        "description": ""
      },
      {
        "name": "start",
        "in": "query",
        "required": false,
        "description": ""
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  {
    "id": "CountDevices",
    "method": "GET",
    "path": "/domains/{domain}/users/{user}/devices/count",
    "resource": "Devices",
    "summary": "Count Devices for User",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "limit",
        "in": "query",
        "required": false,
        "description": ""
      },
      {
        "name": "start",
        "in": "query",
        "required": false,
        "description": ""
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  {
    "id": "GetDomainsByDevicesByCount",
    "method": "GET",
    "path": "/domains/{domain}/devices/{device}/count",
    "resource": "Devices",
    "summary": "Count Devices by Device",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "device",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      },
      {
        "name": "limit",
        "in": "query",
        "required": false,
        "description": ""
      },
      {
        "name": "start",
        "in": "query",
        "required": false,
        "description": ""
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  {
    "id": "UpdateDevice",
    "method": "PUT",
    "path": "/domains/{domain}/users/{user}/devices/{device}",
    "resource": "Devices",
    "summary": "Update Device for User",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "device",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true
  },
  {
    "id": "DeleteDevice",
    "method": "DELETE",
    "path": "/domains/{domain}/users/{user}/devices/{device}",
    "resource": "Devices",
    "summary": "Delete Device for User",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "device",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false
  },
  {
    "id": "GetDevice",
    "method": "GET",
    "path": "/domains/{domain}/users/{user}/devices/{device}",
    "resource": "Devices",
    "summary": "Get Specifc Device",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "device",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false
  },
  {
    "id": "GetDomainDevices",
    "method": "GET",
    "path": "/domains/{domain}/devices",
    "resource": "Devices",
    "summary": "Get Devices in Domain",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  {
    "id": "GetSupportedModels",
    "method": "GET",
    "path": "/phones/models",
    "resource": "Phones/Macs/Supported Models and Servers",
    "summary": "Get list of Supported/Provisionable Models",
    "description": "",
    "parameters": [],
    "hasRequestBody": false
  },
  {
    "id": "GetSupportedModelsByVendor",
    "method": "GET",
    "path": "/phones/models",
    "resource": "Phones/Macs/Supported Models and Servers",
    "summary": "Get list of Supported/Provisionable by Vendor",
    "description": "",
    "parameters": [
      {
        "name": "brand",
        "in": "query",
        "required": false,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false
  },
  {
    "id": "GetSpecificModel",
    "method": "GET",
    "path": "/phones/models",
    "resource": "Phones/Macs/Supported Models and Servers",
    "summary": "Get details of Specific Model",
    "description": "",
    "parameters": [
      {
        "name": "brand",
        "in": "query",
        "required": false,
        "description": "",
        "schemaType": "string"
      },
      {
        "name": "model",
        "in": "query",
        "required": false,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false
  },
  {
    "id": "GetProvisionableServers",
    "method": "GET",
    "path": "/phones/servers",
    "resource": "Phones/Macs/Supported Models and Servers",
    "summary": "Get list of Provisionable Server Profiles",
    "description": "",
    "parameters": [],
    "hasRequestBody": false
  },
  {
    "id": "GetProvisionableServer",
    "method": "GET",
    "path": "/phones/servers/{server}",
    "resource": "Phones/Macs/Supported Models and Servers",
    "summary": "Read Provisionable Server Details",
    "description": "",
    "parameters": [
      {
        "name": "server",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false
  },
  {
    "id": "GetPhones",
    "method": "GET",
    "path": "/phones",
    "resource": "Phones/Macs",
    "summary": "Read Mac Addresses",
    "description": "",
    "parameters": [
      {
        "name": "limit",
        "in": "query",
        "required": false,
        "description": ""
      }
    ],
    "hasRequestBody": false
  },
  {
    "id": "PostPhones",
    "method": "POST",
    "path": "/phones",
    "resource": "Phones/Macs",
    "summary": "Add MAC address",
    "description": "",
    "parameters": [],
    "hasRequestBody": true
  },
  {
    "id": "PutPhones",
    "method": "PUT",
    "path": "/phones",
    "resource": "Phones/Macs",
    "summary": "Update MAC address",
    "description": "",
    "parameters": [],
    "hasRequestBody": true
  },
  {
    "id": "DeletePhones",
    "method": "DELETE",
    "path": "/phones",
    "resource": "Phones/Macs",
    "summary": "Remove MAC address",
    "description": "",
    "parameters": [],
    "hasRequestBody": true
  },
  {
    "id": "GetPhonesCount",
    "method": "GET",
    "path": "/phones/count",
    "resource": "Phones/Macs",
    "summary": "Count Mac Addresses",
    "description": "",
    "parameters": [],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  {
    "id": "GetDomainsByPhones",
    "method": "GET",
    "path": "/domains/{domain}/phones",
    "resource": "Phones/Macs",
    "summary": "Read Mac Addresses in Domain",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "limit",
        "in": "query",
        "required": false,
        "description": ""
      }
    ],
    "hasRequestBody": false
  },
  {
    "id": "PostDomainsByPhones",
    "method": "POST",
    "path": "/domains/{domain}/phones",
    "resource": "Phones/Macs",
    "summary": "Add MAC address for Domain",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": true
  },
  {
    "id": "PutDomainsByPhones",
    "method": "PUT",
    "path": "/domains/{domain}/phones",
    "resource": "Phones/Macs",
    "summary": "Update MAC address in Domain",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": true
  },
  {
    "id": "DeleteDomainsByPhones",
    "method": "DELETE",
    "path": "/domains/{domain}/phones",
    "resource": "Phones/Macs",
    "summary": "Remove MAC address in Domain",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": true
  },
  {
    "id": "GetPhonesBy",
    "method": "GET",
    "path": "/phones/{mac}",
    "resource": "Phones/Macs",
    "summary": "Read Specific Mac Address",
    "description": "",
    "parameters": [
      {
        "name": "mac",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false
  },
  {
    "id": "GetDomainsByPhonesBy",
    "method": "GET",
    "path": "/domains/{domain}/phones/{mac}",
    "resource": "Phones/Macs",
    "summary": "Read Specific Mac Addresses in Domain",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "mac",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      },
      {
        "name": "limit",
        "in": "query",
        "required": false,
        "description": ""
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  {
    "id": "GetDomainsBySitesList",
    "method": "GET",
    "path": "/domains/{domain}/sites/list",
    "resource": "Sites",
    "summary": "List Sites in Domain",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  {
    "id": "GetDomainsBySites",
    "method": "GET",
    "path": "/domains/{domain}/sites",
    "resource": "Sites",
    "summary": "Read Sites in Domain",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": false
  },
  {
    "id": "PostDomainsBySites",
    "method": "POST",
    "path": "/domains/{domain}/sites",
    "resource": "Sites",
    "summary": "Create Site in Domain",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": true
  },
  {
    "id": "GetDomainsBySitesCount",
    "method": "GET",
    "path": "/domains/{domain}/sites/count",
    "resource": "Sites",
    "summary": "Count Sites in Domain",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  {
    "id": "PutDomainsBySitesBy",
    "method": "PUT",
    "path": "/domains/{domain}/sites/{site}",
    "resource": "Sites",
    "summary": "Update Site in Domain",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "site",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true
  },
  {
    "id": "GetDomainsBySitesBy",
    "method": "GET",
    "path": "/domains/{domain}/sites/{site}",
    "resource": "Sites",
    "summary": "Read Specific Site in Domain",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "site",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false
  },
  {
    "id": "ReadCallqueues",
    "method": "GET",
    "path": "/domains/{domain}/callqueues",
    "resource": "Call Center/Callqueues",
    "summary": "Read Call Queues in Domain",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": false
  },
  {
    "id": "CreateCallqueue",
    "method": "POST",
    "path": "/domains/{domain}/callqueues",
    "resource": "Call Center/Callqueues",
    "summary": "Create Call Queue in Domain",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": true
  },
  {
    "id": "UpdateCallqueue",
    "method": "PUT",
    "path": "/domains/{domain}/callqueues/{callqueue}",
    "resource": "Call Center/Callqueues",
    "summary": "Update Call Queue in Domain",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "callqueue",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": true
  },
  {
    "id": "DeleteCallqueue",
    "method": "DELETE",
    "path": "/domains/{domain}/callqueues/{callqueue}",
    "resource": "Call Center/Callqueues",
    "summary": "Delete Call Queue",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "callqueue",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": false
  },
  {
    "id": "ReadCallqueue",
    "method": "GET",
    "path": "/domains/{domain}/callqueues/{callqueue}",
    "resource": "Call Center/Callqueues",
    "summary": "Read Specific Call Queue",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "callqueue",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": false
  },
  {
    "id": "ListCallqueues",
    "method": "GET",
    "path": "/domains/{domain}/callqueues/list",
    "resource": "Call Center/Callqueues",
    "summary": "Read Basic info on Call Queues in Domain",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  {
    "id": "ReadAgents",
    "method": "GET",
    "path": "/domains/{domain}/callqueues/{callqueue}/agents",
    "resource": "Call Center/Agents",
    "summary": "Read Agents in Call Queue",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "callqueue",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": false
  },
  {
    "id": "CreateAgent",
    "method": "POST",
    "path": "/domains/{domain}/callqueues/{callqueue}/agents",
    "resource": "Call Center/Agents",
    "summary": "Add Agent to Call Queue",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "callqueue",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": true
  },
  {
    "id": "GetDomainsByCallqueuesByAgentsCount",
    "method": "GET",
    "path": "/domains/{domain}/callqueues/{callqueue}/agents/count",
    "resource": "Call Center/Agents",
    "summary": "Count Agents in Call Queue",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "callqueue",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  {
    "id": "ReadAgentsDomain",
    "method": "GET",
    "path": "/domains/{domain}/agents",
    "resource": "Call Center/Agents",
    "summary": "Read Agents in Domain",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": false
  },
  {
    "id": "ReadAgent",
    "method": "GET",
    "path": "/domains/{domain}/callqueues/{callqueue}/agents/{callqueue-agent-id}",
    "resource": "Call Center/Agents",
    "summary": "Read Specific Agent in Call Queue",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "callqueue",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "callqueue-agent-id",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": false
  },
  {
    "id": "UpdateAgent",
    "method": "PUT",
    "path": "/domains/{domain}/callqueues/{callqueue}/agents/{callqueue-agent-id}",
    "resource": "Call Center/Agents",
    "summary": "Update Agent in Call Queue",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "callqueue",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "callqueue-agent-id",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": true
  },
  {
    "id": "DeleteAgent",
    "method": "DELETE",
    "path": "/domains/{domain}/callqueues/{callqueue}/agents/{callqueue-agent-id}",
    "resource": "Call Center/Agents",
    "summary": "Remove Agent from Call Queue",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "callqueue",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "callqueue-agent-id",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": false
  },
  {
    "id": "AgentLogin",
    "method": "PATCH",
    "path": "/domains/{domain}/callqueues/{callqueue}/agents/{callqueue-agent-id}/login",
    "resource": "Call Center/Agent Actions",
    "summary": "Agent Login ",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "callqueue",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "callqueue-agent-id",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": false
  },
  {
    "id": "AgentLogout",
    "method": "PATCH",
    "path": "/domains/{domain}/callqueues/{callqueue}/agents/{callqueue-agent-id}/logout",
    "resource": "Call Center/Agent Actions",
    "summary": "Agent Logout",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "callqueue",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "callqueue-agent-id",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": false
  },
  {
    "id": "AgentSingleCall",
    "method": "PATCH",
    "path": "/domains/{domain}/callqueues/{callqueue}/agents/{callqueue-agent-id}/onecall",
    "resource": "Call Center/Agent Actions",
    "summary": "Agent Single Call",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "callqueue",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "callqueue-agent-id",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": false
  },
  {
    "id": "AgentStatus",
    "method": "PATCH",
    "path": "/domains/{domain}/callqueues/all/agents/{callqueue-agent-id}/{status}",
    "resource": "Call Center/Agent Actions",
    "summary": "Agent Set Offline Status",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "callqueue-agent-id",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "status",
        "in": "path",
        "required": true,
        "description": "If you're going to use the custom status such as how you set it in the portal, you need to use \"cust1\" through \"cust8\" instead of the literal/actual status name you intend to use, and then alias/reference the \"custX\" status in your code.",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false
  },
  {
    "id": "GetDomainsByQueuedcallBy",
    "method": "GET",
    "path": "/domains/{domain}/queuedcall/{queue}",
    "resource": "Call Center/QueuedCalls",
    "summary": "Read Queued Calls",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": "Domain containing Callqueue"
      },
      {
        "name": "queue",
        "in": "path",
        "required": true,
        "description": "Callqueue from which to read queued calls",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false
  },
  {
    "id": "PostDomainsByQueuedcallBy",
    "method": "POST",
    "path": "/domains/{domain}/queuedcall/{callqueue}",
    "resource": "Call Center/QueuedCalls",
    "summary": "Add a Queued Call",
    "description": "Used to create a queue call between desginated Queue and destination.",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "callqueue",
        "in": "path",
        "required": true,
        "description": "When used in path the callqueue value will link to a extension id for a preconfigured callqueue."
      }
    ],
    "hasRequestBody": true,
    "minApiVersion": 45
  },
  {
    "id": "GetDomainsByStatisticsCallqueuesBy",
    "method": "GET",
    "path": "/domains/{domain}/statistics/callqueues/{callqueue}",
    "resource": "Call Center/Statistics",
    "summary": "Get Callqueue Statistics for a Specific Queue",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": "This is the main organization name. This is used to link resource to its group/tenant/organization/enterprise. "
      },
      {
        "name": "callqueue",
        "in": "path",
        "required": true,
        "description": "When used in path the callqueue value will link to a extension id for a preconfigured callqueue."
      },
      {
        "name": "datetime-start",
        "in": "query",
        "required": true,
        "description": "This is the start of the time window for a given query. The format is based on RFC3339 but also will support additonal params for use in providing a timezone which will allow the API to give the correct range for a given set of data and will be formated in respone using the same format.\n\nSupported formats include.\n\n2023-11-27 13:00:00\n2023-11-27T13:00:00Z\n2023-11-27T13:00:00-08:00\n2023-11-27T13:00:00-08:00[US/Pacific]\n2023-11-27T13:00:00Z[America/Phoenix]"
      },
      {
        "name": "datetime-end",
        "in": "query",
        "required": true,
        "description": "This is the end of the time window for a given query. The format is based on RFC3339 but also will support additonal params for use in providing a timezone which will allow the API to give the correct range for a given set of data and will be formated in respone using the same format. Allowed values same as datetime-start."
      },
      {
        "name": "fields",
        "in": "query",
        "required": false,
        "description": "Fields in order to fill and get particular statistics for. Separate multiple fields with \",\". Default value is VOL,CH,ATT,AC,AAS,SL",
        "schemaType": "string"
      },
      {
        "name": "remove_zeros",
        "in": "query",
        "required": false,
        "description": "Remove zeros from the results.",
        "schemaType": "string"
      },
      {
        "name": "queue_list",
        "in": "query",
        "required": false,
        "description": "Allows for a filter of certain queues. List can be comma separated for example 5202,5201",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  {
    "id": "GetDomainsByStatisticsCallqueuesAggregate",
    "method": "GET",
    "path": "/domains/{domain}/statistics/callqueues/aggregate",
    "resource": "Call Center/Statistics",
    "summary": "Get Callqueue Statistics for all Queues Aggregated",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": "This is the main organization name. This is used to link resource to its group/tenant/organization/enterprise. "
      },
      {
        "name": "datetime-start",
        "in": "query",
        "required": true,
        "description": "This is the start of the time window for a given query. The format is based on RFC3339 but also will support additonal params for use in providing a timezone which will allow the API to give the correct range for a given set of data and will be formated in respone using the same format.\n\nSupported formats include.\n\n2023-11-27 13:00:00\n2023-11-27T13:00:00Z\n2023-11-27T13:00:00-08:00\n2023-11-27T13:00:00-08:00[US/Pacific]\n2023-11-27T13:00:00Z[America/Phoenix]"
      },
      {
        "name": "datetime-end",
        "in": "query",
        "required": true,
        "description": "This is the end of the time window for a given query. The format is based on RFC3339 but also will support additonal params for use in providing a timezone which will allow the API to give the correct range for a given set of data and will be formated in respone using the same format. Allowed values same as datetime-start."
      },
      {
        "name": "fields",
        "in": "query",
        "required": false,
        "description": "Fields in order to fill and get particular statistics for. Separate multiple fields with \",\". Default value is VOL,CH,ATT,AC,AAS,SL",
        "schemaType": "string"
      },
      {
        "name": "remove_zeros",
        "in": "query",
        "required": false,
        "description": "Remove zeros from the results",
        "schemaType": "string"
      },
      {
        "name": "queue_list",
        "in": "query",
        "required": false,
        "description": "Allows for a filter of certain queues. List can be comma separated for example 5202,5201",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  {
    "id": "GetDomainsByStatisticsQueuePerQueue",
    "method": "GET",
    "path": "/domains/{domain}/statistics/queue/per-queue",
    "resource": "Call Center/Statistics",
    "summary": "Get Callqueue Statistics for all Queues by Queue",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": "This is the main organization name. This is used to link resource to its group/tenant/organization/enterprise. "
      },
      {
        "name": "datetime-start",
        "in": "query",
        "required": true,
        "description": "This is the start of the time window for a given query. The format is based on RFC3339 but also will support additonal params for use in providing a timezone which will allow the API to give the correct range for a given set of data and will be formated in respone using the same format.\n\nSupported formats include.\n\n2023-11-27 13:00:00\n2023-11-27T13:00:00Z\n2023-11-27T13:00:00-08:00\n2023-11-27T13:00:00-08:00[US/Pacific]\n2023-11-27T13:00:00Z[America/Phoenix]"
      },
      {
        "name": "datetime-end",
        "in": "query",
        "required": true,
        "description": "This is the end of the time window for a given query. The format is based on RFC3339 but also will support additonal params for use in providing a timezone which will allow the API to give the correct range for a given set of data and will be formated in respone using the same format. Allowed values same as datetime-start."
      },
      {
        "name": "fields",
        "in": "query",
        "required": false,
        "description": "Fields in order to fill and get particular statistics for. Separate multiple fields with \",\".Default value is VOL,CH,ATT,AC,AAS,SL",
        "schemaType": "string"
      },
      {
        "name": "remove_zeros",
        "in": "query",
        "required": false,
        "description": "Remove zeros from the results",
        "schemaType": "string"
      },
      {
        "name": "queue_list",
        "in": "query",
        "required": false,
        "description": "Alows for a filter of certain queues. List can be comma separated for example 421,425",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  {
    "id": "GetDomainsByStatisticsAgent",
    "method": "GET",
    "path": "/domains/{domain}/statistics/agent",
    "resource": "Call Center/Statistics",
    "summary": "Get Agent Statistics for all Queues by Agent",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": "This is the main organization name. This is used to link resource to its group/tenant/organization/enterprise. "
      },
      {
        "name": "datetime-start",
        "in": "query",
        "required": true,
        "description": "This is the start of the time window for a given query. The format is based on RFC3339 but also will support additonal params for use in providing a timezone which will allow the API to give the correct range for a given set of data and will be formated in respone using the same format.\n\nSupported formats include.\n\n2023-11-27 13:00:00\n2023-11-27T13:00:00Z\n2023-11-27T13:00:00-08:00\n2023-11-27T13:00:00-08:00[US/Pacific]\n2023-11-27T13:00:00Z[America/Phoenix]"
      },
      {
        "name": "datetime-end",
        "in": "query",
        "required": true,
        "description": "This is the end of the time window for a given query. The format is based on RFC3339 but also will support additonal params for use in providing a timezone which will allow the API to give the correct range for a given set of data and will be formated in respone using the same format. Allowed values same as datetime-start."
      },
      {
        "name": "fields",
        "in": "query",
        "required": false,
        "description": "Fields in order to fill and get particular statistics for. Separate multiple fields with \",\" Default value is NAME,CH,ATT,AH,AHT,TT",
        "schemaType": "string"
      },
      {
        "name": "department",
        "in": "query",
        "required": false,
        "description": "This is the depertment that queue belongs to in the domain.",
        "schemaType": "string"
      },
      {
        "name": "remove_zeros",
        "in": "query",
        "required": false,
        "description": "Remove zeros from the results",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  {
    "id": "GetDomainsByStatisticsAgentCallqueuesBy",
    "method": "GET",
    "path": "/domains/{domain}/statistics/agent/callqueues/{callqueue}",
    "resource": "Call Center/Statistics",
    "summary": "Get Agent Statistics for Single Queues by Agent",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": "This is the main organization name. This is used to link resource to its group/tenant/organization/enterprise. "
      },
      {
        "name": "callqueue",
        "in": "path",
        "required": true,
        "description": "When used in path the callqueue value will link to a extension id for a preconfigured callqueue"
      },
      {
        "name": "datetime-start",
        "in": "query",
        "required": true,
        "description": "This is the start of the time window for a given query. The format is based on RFC3339 but also will support additonal params for use in providing a timezone which will allow the API to give the correct range for a given set of data and will be formated in respone using the same format.\n\nSupported formats include.\n\n2023-11-27 13:00:00\n2023-11-27T13:00:00Z\n2023-11-27T13:00:00-08:00\n2023-11-27T13:00:00-08:00[US/Pacific]\n2023-11-27T13:00:00Z[America/Phoenix]"
      },
      {
        "name": "datetime-end",
        "in": "query",
        "required": true,
        "description": "This is the end of the time window for a given query. The format is based on RFC3339 but also will support additonal params for use in providing a timezone which will allow the API to give the correct range for a given set of data and will be formated in respone using the same format. Allowed values same as datetime-start."
      },
      {
        "name": "fields",
        "in": "query",
        "required": false,
        "description": "Fields in order to fill and get particular statistics for. Separate multiple fields with \",\" Default value is NAME,CH,ATT,AH,AHT,TT",
        "schemaType": "string"
      },
      {
        "name": "remove_zeros",
        "in": "query",
        "required": false,
        "description": "Remove zeros from the results",
        "schemaType": "string"
      },
      {
        "name": "department",
        "in": "query",
        "required": false,
        "description": "This is the depertment that user belongs to in the domain. Can be any string to group users, a department is not require to be setup before in order to set it for a user.",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  {
    "id": "GetDomainsByStatisticsAgentBy",
    "method": "GET",
    "path": "/domains/{domain}/statistics/agent/{agent}",
    "resource": "Call Center/Statistics",
    "summary": "Get Agent Statistics for Single Agent",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": "This is the main organization name. This is used to link resource to its group/tenant/organization/enterprise. "
      },
      {
        "name": "agent",
        "in": "path",
        "required": true,
        "description": "When used in path the agent value will link to a extension id for a call center agent.",
        "schemaType": "string"
      },
      {
        "name": "datetime-start",
        "in": "query",
        "required": true,
        "description": "This is the start of the time window for a given query. The format is based on RFC3339 but also will support additonal params for use in providing a timezone which will allow the API to give the correct range for a given set of data and will be formated in respone using the same format.\n\nSupported formats include.\n\n2023-11-27 13:00:00\n2023-11-27T13:00:00Z\n2023-11-27T13:00:00-08:00\n2023-11-27T13:00:00-08:00[US/Pacific]\n2023-11-27T13:00:00Z[America/Phoenix]"
      },
      {
        "name": "datetime-end",
        "in": "query",
        "required": true,
        "description": "This is the end of the time window for a given query. The format is based on RFC3339 but also will support additonal params for use in providing a timezone which will allow the API to give the correct range for a given set of data and will be formated in respone using the same format. Allowed values same as datetime-start."
      },
      {
        "name": "fields",
        "in": "query",
        "required": false,
        "description": "Fields in order to fill and get particular statistics for. Separate multiple fields with \",\" Default value is NAME,CH,ATT,AH,AHT,TT",
        "schemaType": "string"
      },
      {
        "name": "remove_zeros",
        "in": "query",
        "required": false,
        "description": "Remove zeros from the results",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  {
    "id": "GetDomainsByStatisticsDNIS",
    "method": "GET",
    "path": "/domains/{domain}/statistics/DNIS",
    "resource": "Call Center/Statistics",
    "summary": "Get DNIS Statistics for all Queues",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": "This is the main organization name. This is used to link resource to its group/tenant/organization/enterprise. "
      },
      {
        "name": "datetime-start",
        "in": "query",
        "required": true,
        "description": "This is the start of the time window for a given query. The format is based on RFC3339 but also will support additonal params for use in providing a timezone which will allow the API to give the correct range for a given set of data and will be formated in respone using the same format.\n\nSupported formats include.\n\n2023-11-27 13:00:00\n2023-11-27T13:00:00Z\n2023-11-27T13:00:00-08:00\n2023-11-27T13:00:00-08:00[US/Pacific]\n2023-11-27T13:00:00Z[America/Phoenix]"
      },
      {
        "name": "datetime-end",
        "in": "query",
        "required": true,
        "description": "This is the end of the time window for a given query. The format is based on RFC3339 but also will support additonal params for use in providing a timezone which will allow the API to give the correct range for a given set of data and will be formated in respone using the same format. Allowed values same as datetime-start."
      },
      {
        "name": "fields",
        "in": "query",
        "required": false,
        "description": "Fields in order to fill and get particular statistics for. Separate multiple fields with \",\". Default value is NAME,VOL,CH,ATT,AH",
        "schemaType": "string"
      },
      {
        "name": "remove_zeros",
        "in": "query",
        "required": false,
        "description": "Remove zeros from the results",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  {
    "id": "GetDomainsByStatisticsDNISCallqueuesBy",
    "method": "GET",
    "path": "/domains/{domain}/statistics/DNIS/callqueues/{callqueue}",
    "resource": "Call Center/Statistics",
    "summary": "Get DNIS Statistics for Single Queue",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": "This is the main organization name. This is used to link resource to its group/tenant/organization/enterprise. "
      },
      {
        "name": "callqueue",
        "in": "path",
        "required": true,
        "description": "When used in path the callqueue value will link to a extension id for a preconfigured callqueue"
      },
      {
        "name": "datetime-start",
        "in": "query",
        "required": true,
        "description": "This is the start of the time window for a given query. The format is based on RFC3339 but also will support additonal params for use in providing a timezone which will allow the API to give the correct range for a given set of data and will be formated in respone using the same format.\n\nSupported formats include.\n\n2023-11-27 13:00:00\n2023-11-27T13:00:00Z\n2023-11-27T13:00:00-08:00\n2023-11-27T13:00:00-08:00[US/Pacific]\n2023-11-27T13:00:00Z[America/Phoenix]"
      },
      {
        "name": "datetime-end",
        "in": "query",
        "required": true,
        "description": "This is the end of the time window for a given query. The format is based on RFC3339 but also will support additonal params for use in providing a timezone which will allow the API to give the correct range for a given set of data and will be formated in respone using the same format. Allowed values same as datetime-start."
      },
      {
        "name": "fields",
        "in": "query",
        "required": false,
        "description": "Fields in order to fill and get particular statistics for. Separate multiple fields with \",\". Default value is NAME,VOL,CH,ATT,AH",
        "schemaType": "string"
      },
      {
        "name": "remove_zeros",
        "in": "query",
        "required": false,
        "description": "Remove zeros from the results",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  {
    "id": "GetDomainsByStatisticsAgentLog",
    "method": "GET",
    "path": "/domains/{domain}/statistics/agentLog",
    "resource": "Call Center/Statistics",
    "summary": "Get Agent Log",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": "This is the main organization name. This is used to link resource to its group/tenant/organization/enterprise."
      },
      {
        "name": "datetime-start",
        "in": "query",
        "required": true,
        "description": "This is the start of the time window for a given query. The format is based on RFC3339 but also will support additonal params for use in providing a timezone which will allow the API to give the correct range for a given set of data and will be formated in respone using the same format.\n\nSupported formats include.\n\n2023-11-27 13:00:00\n2023-11-27T13:00:00Z\n2023-11-27T13:00:00-08:00\n2023-11-27T13:00:00-08:00[US/Pacific]\n2023-11-27T13:00:00Z[America/Phoenix]"
      },
      {
        "name": "datetime-end",
        "in": "query",
        "required": true,
        "description": "This is the end of the time window for a given query. The format is based on RFC3339 but also will support additonal params for use in providing a timezone which will allow the API to give the correct range for a given set of data and will be formated in respone using the same format. Allowed values same as datetime-start."
      },
      {
        "name": "fields",
        "in": "query",
        "required": false,
        "description": "Fields in order to fill and get particular statistics for. Separate multiple fields with \",\".Default value is AM,UM,L,B",
        "schemaType": "string"
      },
      {
        "name": "remove_zeros",
        "in": "query",
        "required": false,
        "description": "Remove zeros from the results.",
        "schemaType": "string"
      },
      {
        "name": "department",
        "in": "query",
        "required": false,
        "description": "This is the depertment that user belongs to in the domain. Can be any string to group users, a department is not require to be setup before in order to set it for a user.",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  {
    "id": "SendEmail",
    "method": "POST",
    "path": "/domains/{domain}/users/{user}/email",
    "resource": "Email",
    "summary": "Send Email using Template",
    "description": "This API will send a email to a specific user usign their email address configured on the account and obtained from the domain and user provided. A example email would be a welcome email with links to setup the new account. ",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": true
  },
  {
    "id": "GetDomainsByCallqueuereportAbandoned",
    "method": "GET",
    "path": "/domains/{domain}/callqueuereport/abandoned",
    "resource": "Call Center/Statistics",
    "summary": "Get Abandoned Calls for all Queues",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": "This is the main organization name. This is used to link resource to its group/tenant/organization/enterprise."
      },
      {
        "name": "datetime-start",
        "in": "query",
        "required": true,
        "description": "This is the start of the time window for a given query. The format is based on RFC3339 but also will support additonal params for use in providing a timezone which will allow the API to give the correct range for a given set of data and will be formated in respone using the same format.\n\nSupported formats include.\n\n2023-11-27 13:00:00\n2023-11-27T13:00:00Z\n2023-11-27T13:00:00-08:00\n2023-11-27T13:00:00-08:00[US/Pacific]\n2023-11-27T13:00:00Z[America/Phoenix]"
      },
      {
        "name": "datetime-end",
        "in": "query",
        "required": true,
        "description": "This is the end of the time window for a given query. The format is based on RFC3339 but also will support additonal params for use in providing a timezone which will allow the API to give the correct range for a given set of data and will be formated in respone using the same format. Allowed values same as datetime-start."
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  {
    "id": "GetDomainsByCallqueuereportAbandonedBy",
    "method": "GET",
    "path": "/domains/{domain}/callqueuereport/abandoned/{callqueue}",
    "resource": "Call Center/Statistics",
    "summary": "Get Abandoned Calls for a Specific Queue",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": "This is the main organization name. This is used to link resource to its group/tenant/organization/enterprise."
      },
      {
        "name": "callqueue",
        "in": "path",
        "required": true,
        "description": "When used in path the callqueue value will link to a extension id for a preconfigured callqueue."
      },
      {
        "name": "datetime-start",
        "in": "query",
        "required": true,
        "description": "This is the start of the time window for a given query. The format is based on RFC3339 but also will support additonal params for use in providing a timezone which will allow the API to give the correct range for a given set of data and will be formated in respone using the same format.\n\nSupported formats include.\n\n2023-11-27 13:00:00\n2023-11-27T13:00:00Z\n2023-11-27T13:00:00-08:00\n2023-11-27T13:00:00-08:00[US/Pacific]\n2023-11-27T13:00:00Z[America/Phoenix]"
      },
      {
        "name": "datetime-end",
        "in": "query",
        "required": true,
        "description": "This is the end of the time window for a given query. The format is based on RFC3339 but also will support additonal params for use in providing a timezone which will allow the API to give the correct range for a given set of data and will be formated in respone using the same format. Allowed values same as datetime-start."
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  {
    "id": "GetDomainsByDispositions",
    "method": "GET",
    "path": "/domains/{domain}/dispositions",
    "resource": "Call Center/Call Dispositions",
    "summary": "Read Call Dispostions",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  {
    "id": "PostDomainsByDispositions",
    "method": "POST",
    "path": "/domains/{domain}/dispositions",
    "resource": "Call Center/Call Dispositions",
    "summary": "Create Call Disposition in Domain",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": true,
    "minApiVersion": 45
  },
  {
    "id": "GetDomainsByUsersByAnswerrules",
    "method": "GET",
    "path": "/domains/{domain}/users/{user}/answerrules",
    "resource": "Answer Rules",
    "summary": "Read Answerrules for a User",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": false
  },
  {
    "id": "PostDomainsByUsersByAnswerrules",
    "method": "POST",
    "path": "/domains/{domain}/users/{user}/answerrules",
    "resource": "Answer Rules",
    "summary": "Add a Answerrule for a User",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": true
  },
  {
    "id": "GetDomainsByUsersByAnswerrulesCount",
    "method": "GET",
    "path": "/domains/{domain}/users/{user}/answerrules/count",
    "resource": "Answer Rules",
    "summary": "Count Answerrules for a User",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  {
    "id": "GetDomainsUsersAnswerrules",
    "method": "GET",
    "path": "/domains/~/users/~/answerrules",
    "resource": "Answer Rules",
    "summary": "Read Answerrules for my  User",
    "description": "",
    "parameters": [],
    "hasRequestBody": false
  },
  {
    "id": "GetDomainsByUsersByAnswerrulesBy",
    "method": "GET",
    "path": "/domains/{domain}/users/{user}/answerrules/{timeframe}",
    "resource": "Answer Rules",
    "summary": "Read Specifc Timeframe Answerrule for User",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "timeframe",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false
  },
  {
    "id": "DeleteDomainsByUsersByAnswerrulesBy",
    "method": "DELETE",
    "path": "/domains/{domain}/users/{user}/answerrules/{timeframe}",
    "resource": "Answer Rules",
    "summary": "Delete a Answerrule for a User ",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "timeframe",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false
  },
  {
    "id": "PutDomainsByUsersByAnswerrulesBy",
    "method": "PUT",
    "path": "/domains/{domain}/users/{user}/answerrules/{timeframe}",
    "resource": "Answer Rules",
    "summary": "Update a Answerrule for a User",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "timeframe",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true
  },
  {
    "id": "PutDomainsByUsersByAnswerrulesReorder",
    "method": "PUT",
    "path": "/domains/{domain}/users/{user}/answerrules/reorder",
    "resource": "Answer Rules",
    "summary": "Reorder Answerrules for my User",
    "description": "To reorder the answerrules, give an array of time frames used in the user's current answerrules in the order desired. Please be sure to include all time frames and no extraneous ones. Be sure to include \"Default\" when necessary which is named \"*\".",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": true
  },
  {
    "id": "GetDomainsByNumberFilters",
    "method": "GET",
    "path": "/domains/{domain}/number-filters",
    "resource": "Call Blocking",
    "summary": "Read blocked numbers for a Domain",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  {
    "id": "PostDomainsByNumberFilters",
    "method": "POST",
    "path": "/domains/{domain}/number-filters",
    "resource": "Call Blocking",
    "summary": "Add blocked numbers for a Domain",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": true,
    "minApiVersion": 45
  },
  {
    "id": "DeleteDomainsByNumberFilters",
    "method": "DELETE",
    "path": "/domains/{domain}/number-filters",
    "resource": "Call Blocking",
    "summary": "Delete blocked numbers for a Domain",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": true,
    "minApiVersion": 45
  },
  {
    "id": "GetDomainsByUsersBynumberFilters",
    "method": "GET",
    "path": "/domains/{domain}/users/{user}number-filters",
    "resource": "Call Blocking",
    "summary": "Read blocked numbers for a User",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  {
    "id": "PostDomainsByUsersByNumberFilters",
    "method": "POST",
    "path": "/domains/{domain}/users/{user}/number-filters",
    "resource": "Call Blocking",
    "summary": "Add blocked numbers for a User",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": true,
    "minApiVersion": 45
  },
  {
    "id": "DeleteDomainsByUsersByNumberFilters",
    "method": "DELETE",
    "path": "/domains/{domain}/users/{user}/number-filters",
    "resource": "Call Blocking",
    "summary": "Delete blocked numbers for a User",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": true,
    "minApiVersion": 45
  },
  {
    "id": "PostDomainsByAutoattendants",
    "method": "POST",
    "path": "/domains/{domain}/autoattendants",
    "resource": "Auto Attendant",
    "summary": "Create Auto Attendant",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": true
  },
  {
    "id": "GetDomainsByAutoattendants",
    "method": "GET",
    "path": "/domains/{domain}/autoattendants",
    "resource": "Auto Attendant",
    "summary": "Read Auto Attendants",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": false
  },
  {
    "id": "GetDomainsByUsersByAutoattendantsBy",
    "method": "GET",
    "path": "/domains/{domain}/users/{user}/autoattendants/{prompt}",
    "resource": "Auto Attendant",
    "summary": "Read Specific Auto Attendant",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "prompt",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false
  },
  {
    "id": "PutDomainsByUsersByAutoattendantsBy",
    "method": "PUT",
    "path": "/domains/{domain}/users/{user}/autoattendants/{prompt}",
    "resource": "Auto Attendant",
    "summary": "Update Specific Auto Attendant",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "prompt",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true
  },
  {
    "id": "DeleteDomainsByUsersByAutoattendantsBy",
    "method": "DELETE",
    "path": "/domains/{domain}/users/{user}/autoattendants/{prompt}",
    "resource": "Auto Attendant",
    "summary": "Delete Specific Auto Attendant",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "prompt",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  {
    "id": "ReadVoicemails",
    "method": "GET",
    "path": "/domains/{domain}/users/{user}/voicemails/{folder}",
    "resource": "Media/Voicemail",
    "summary": "Read Voicemail for User by Folder",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "folder",
        "in": "path",
        "required": true,
        "description": "Options include new, save, and trash",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false
  },
  {
    "id": "GetDomainsByUsersByVoicemailsByCount",
    "method": "GET",
    "path": "/domains/{domain}/users/{user}/voicemails/{folder}/count",
    "resource": "Media/Voicemail",
    "summary": "Count Voicemail for User by Folder",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "folder",
        "in": "path",
        "required": true,
        "description": "Options include new, save, and trash",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  {
    "id": "ReadVoicemail",
    "method": "GET",
    "path": "/domains/{domain}/users/{user}/voicemails/{folder}/{filename}",
    "resource": "Media/Voicemail",
    "summary": "Read Specific Voicemail for User ",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "folder",
        "in": "path",
        "required": true,
        "description": "Options include new, save, and trash",
        "schemaType": "string"
      },
      {
        "name": "filename",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false
  },
  {
    "id": "DeleteVoicemail",
    "method": "DELETE",
    "path": "/domains/{domain}/users/{user}/voicemails/{folder}/{filename}",
    "resource": "Media/Voicemail",
    "summary": "Delete Voicemail ",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "folder",
        "in": "path",
        "required": true,
        "description": "Options include new, save, and trash",
        "schemaType": "string"
      },
      {
        "name": "filename",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false
  },
  {
    "id": "SaveVoicemail",
    "method": "PATCH",
    "path": "/domains/{domain}/users/{user}/voicemails/{folder}/{filename}/save",
    "resource": "Media/Voicemail",
    "summary": "Move Voicemail to save folder",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "folder",
        "in": "path",
        "required": true,
        "description": "Options include new, save, and trash",
        "schemaType": "string"
      },
      {
        "name": "filename",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false
  },
  {
    "id": "ForwardVoicemail",
    "method": "PATCH",
    "path": "/domains/{domain}/users/{user}/voicemails/{folder}/{filename}/forward",
    "resource": "Media/Voicemail",
    "summary": "Forward Voicemail to another user",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "folder",
        "in": "path",
        "required": true,
        "description": "Options include new, save, and trash",
        "schemaType": "string"
      },
      {
        "name": "filename",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true
  },
  {
    "id": "ReadGreetings",
    "method": "GET",
    "path": "/domains/{domain}/users/{user}/greetings",
    "resource": "Media/Greetings",
    "summary": "Read Greetings for User",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": false
  },
  {
    "id": "CreateGreetingTTS",
    "method": "POST",
    "path": "/domains/{domain}/users/{user}/greetings",
    "resource": "Media/Greetings",
    "summary": "Create a new Greeting from TTS",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": true
  },
  {
    "id": "GetDomainsByUsersByGreetingsCount",
    "method": "GET",
    "path": "/domains/{domain}/users/{user}/greetings/count",
    "resource": "Media/Greetings",
    "summary": "Count Greetings for User",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  {
    "id": "ReadGreeting",
    "method": "GET",
    "path": "/domains/{domain}/users/{user}/greetings/{index}",
    "resource": "Media/Greetings",
    "summary": "Read Specific Greeting for User",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "index",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false
  },
  {
    "id": "DeleteGreeting",
    "method": "DELETE",
    "path": "/domains/{domain}/users/{user}/greetings/{index}",
    "resource": "Media/Greetings",
    "summary": "Delete Specific Greeting for User",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "index",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false
  },
  {
    "id": "UpdateGreetingTTS",
    "method": "PUT",
    "path": "/domains/{domain}/users/{user}/greetings/{index}",
    "resource": "Media/Greetings",
    "summary": "Update Greeting with TTS script",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "index",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true
  },
  {
    "id": "CreateGreetingBase64",
    "method": "POST",
    "path": "/domains/{domain}/users/{user}/greetings",
    "resource": "Media/Greetings",
    "summary": "Create a new Greeting from Upload (JSON + Base64 File)",
    "description": "> Note: # and anything after is NOT needed, its just to allow multiple examples for the same path/method. ",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": true
  },
  {
    "id": "UpdateGreetingBase64",
    "method": "PUT",
    "path": "/domains/{domain}/users/{user}/greetings/{index}",
    "resource": "Media/Greetings",
    "summary": "Update Greeting from Upload (JSON + Base64 File)",
    "description": "> Note: # and anything after is NOT needed, its just to allow multiple examples for the same path/method. ",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "index",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true
  },
  {
    "id": "CreateGreetingFileUpload",
    "method": "POST",
    "path": "/domains/{domain}/users/{user}/greetings",
    "resource": "Media/Greetings",
    "summary": "Create a new Greeting from Upload (Multipart/Mixed Post)",
    "description": "> Note: # and anything after is NOT needed, its just to allow multiple examples for the same path/method. ",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": true
  },
  {
    "id": "UpdateGreetingFileUpload",
    "method": "PUT",
    "path": "/domains/{domain}/users/{user}/greetings/{index}",
    "resource": "Media/Greetings",
    "summary": "Update Greeting from Upload (Multipart/Mixed Post)",
    "description": "> Note: # and anything after is NOT needed, its just to allow multiple examples for the same path/method. ",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "index",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true
  },
  {
    "id": "ReadMohDomain",
    "method": "GET",
    "path": "/domains/{domain}/moh",
    "resource": "Media/Music on Hold/Domain",
    "summary": "Read MOH for Domain",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": false
  },
  {
    "id": "CreateMohDomainTTS",
    "method": "POST",
    "path": "/domains/{domain}/moh",
    "resource": "Media/Music on Hold/Domain",
    "summary": "Create a new MOH for Domain from TTS",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": true
  },
  {
    "id": "GetDomainsByMohCount",
    "method": "GET",
    "path": "/domains/{domain}/moh/count",
    "resource": "Media/Music on Hold/Domain",
    "summary": "Count MOH for Domain",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  {
    "id": "UpdateMohDomainTTS",
    "method": "PUT",
    "path": "/domains/{domain}/moh/{index}",
    "resource": "Media/Music on Hold/Domain",
    "summary": "Update MOH for Domain from TTS",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "index",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true
  },
  {
    "id": "DeleteMohDomain",
    "method": "DELETE",
    "path": "/domains/{domain}/moh/{index}",
    "resource": "Media/Music on Hold/Domain",
    "summary": "Delete MOH for Domain",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "index",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false
  },
  {
    "id": "CreateMohDomainBase64",
    "method": "POST",
    "path": "/domains/{domain}/moh",
    "resource": "Media/Music on Hold/Domain",
    "summary": "Create a new MOH for Domain from Upload (JSON + Base64 File)",
    "description": "> Note: # and anything after is NOT needed, its just to allow multiple examples for the same path/method. ",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": true
  },
  {
    "id": "UpdateMohDomainBase64",
    "method": "PUT",
    "path": "/domains/{domain}/moh/{index}",
    "resource": "Media/Music on Hold/Domain",
    "summary": "Update MOH for Domain from Upload (JSON + Base64 File)",
    "description": "> Note: # and anything after is NOT needed, its just to allow multiple examples for the same path/method. ",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "index",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true
  },
  {
    "id": "CreateMohDomainFileUpload",
    "method": "POST",
    "path": "/domains/{domain}/moh",
    "resource": "Media/Music on Hold/Domain",
    "summary": "Create a new MOH for Domain from Upload (Multipart/Mixed Post)",
    "description": "> Note: # and anything after is NOT needed, its just to allow multiple examples for the same path/method. ",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": true
  },
  {
    "id": "UpdateMohDomainFileUpload",
    "method": "PUT",
    "path": "/domains/{domain}/moh/{index}",
    "resource": "Media/Music on Hold/Domain",
    "summary": "Update MOH for Domain from Upload (Multipart/Mixed Post)",
    "description": "> Note: # and anything after is NOT needed, its just to allow multiple examples for the same path/method. ",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "index",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true
  },
  {
    "id": "ReadMohUser",
    "method": "GET",
    "path": "/domains/{domain}/users/{user}/moh",
    "resource": "Media/Music on Hold/User",
    "summary": "Read MOH for User",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": false
  },
  {
    "id": "CreateMohUserTTS",
    "method": "POST",
    "path": "/domains/{domain}/users/{user}/moh",
    "resource": "Media/Music on Hold/User",
    "summary": "Create a new MOH for Domain from TTS",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": true
  },
  {
    "id": "GetDomainsByUsersByMohCount",
    "method": "GET",
    "path": "/domains/{domain}/users/{user}/moh/count",
    "resource": "Media/Music on Hold/User",
    "summary": "Count MOH for User",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  {
    "id": "CreateMohUserBase64",
    "method": "POST",
    "path": "/domains/{domain}/users/{user}/moh",
    "resource": "Media/Music on Hold/User",
    "summary": "Create a new MOH for User from Upload (JSON + Base64 File)",
    "description": "> Note: # and anything after is NOT needed, its just to allow multiple examples for the same path/method. ",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": true
  },
  {
    "id": "UpdateMohUserBase64",
    "method": "PUT",
    "path": "/domains/{domain}/users/{user}/moh/{index}/",
    "resource": "Media/Music on Hold/User",
    "summary": "Update MOH for User from Upload (JSON + Base64 File)",
    "description": "> Note: # and anything after is NOT needed, its just to allow multiple examples for the same path/method. ",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "index",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true
  },
  {
    "id": "UpdateMohUserTTS",
    "method": "PUT",
    "path": "/domains/{domain}/users/{user}/moh/{index}",
    "resource": "Media/Music on Hold/User",
    "summary": "Update MOH for Domain from TTS",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "index",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true
  },
  {
    "id": "DeleteMohUser",
    "method": "DELETE",
    "path": "/domains/{domain}/users/{user}/moh/{index}",
    "resource": "Media/Music on Hold/User",
    "summary": "Delete MOH for User ",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "index",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false
  },
  {
    "id": "CreateMohUserFileUpload",
    "method": "POST",
    "path": "/domains/{domain}/users/{user}/moh",
    "resource": "Media/Music on Hold/User",
    "summary": "Create a new MOH for User from Upload (Multipart/Mixed Post)",
    "description": "> Note: # and anything after is NOT needed, its just to allow multiple examples for the same path/method. ",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": true
  },
  {
    "id": "UpdateMohUserFileUpload",
    "method": "PUT",
    "path": "/domains/{domain}/users/{user}/moh/{index}",
    "resource": "Media/Music on Hold/User",
    "summary": "Update a MOH for User from Upload (Multipart/Mixed Post)",
    "description": "> Note: # and anything after is NOT needed, its just to allow multiple examples for the same path/method. ",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "index",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true
  },
  {
    "id": "ReadMsgDomain",
    "method": "GET",
    "path": "/domains/{domain}/msg",
    "resource": "Media/Hold Messages/Domain",
    "summary": "Read Hold Messages for Domain",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": false
  },
  {
    "id": "CreateMsgDomainFileUpload",
    "method": "POST",
    "path": "/domains/{domain}/msg",
    "resource": "Media/Hold Messages/Domain",
    "summary": "Create a new Hold Messge for Domain from Upload (Multipart/Mixed Post)",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": true
  },
  {
    "id": "GetDomainsByMsgCount",
    "method": "GET",
    "path": "/domains/{domain}/msg/count",
    "resource": "Media/Hold Messages/Domain",
    "summary": "Count Hold Messages for Domain",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  {
    "id": "UpdateMsgDomainFileUpload",
    "method": "PUT",
    "path": "/domains/{domain}/msg/{index}",
    "resource": "Media/Hold Messages/Domain",
    "summary": "Update Hold Messge for Domain from Upload (Multipart/Mixed Post)",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "index",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true
  },
  {
    "id": "DeleteMsgDomain",
    "method": "DELETE",
    "path": "/domains/{domain}/msg/{index}",
    "resource": "Media/Hold Messages/Domain",
    "summary": "Delete Hold Messge for Domain",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "index",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false
  },
  {
    "id": "ReadMsgUser",
    "method": "GET",
    "path": "/domains/{domain}/users/{user}/msg",
    "resource": "Media/Hold Messages/User",
    "summary": "Read Hold Messages for User",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": false
  },
  {
    "id": "PostDomainsByUsersByMsg",
    "method": "POST",
    "path": "/domains/{domain}/users/{user}/msg",
    "resource": "Media/Hold Messages/User",
    "summary": "Create a new Hold Messge for User from Upload (Multipart/Mixed Post)",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": true
  },
  {
    "id": "CountMsgUser",
    "method": "GET",
    "path": "/domains/{domain}/users/{user}/msg/count",
    "resource": "Media/Hold Messages/User",
    "summary": "Count Hold Messages for User",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  {
    "id": "UpdateMsgUserFileUpload",
    "method": "PUT",
    "path": "/domains/{domain}/users/{user}/msg/{index}",
    "resource": "Media/Hold Messages/User",
    "summary": "Update Hold Messge for User from Upload (Multipart/Mixed Post)",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "index",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true
  },
  {
    "id": "DeleteMsgUser",
    "method": "DELETE",
    "path": "/domains/{domain}/users/{user}/msg/{index}",
    "resource": "Media/Hold Messages/User",
    "summary": "Delete Hold Messge for User ",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "index",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false
  },
  {
    "id": "GetDomainsByUsersByVoicesBy",
    "method": "GET",
    "path": "/domains/{domain}/users/{user}/voices/{language}",
    "resource": "Media/Text to Speech",
    "summary": "Get Available Voices",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "language",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      },
      {
        "name": "gender",
        "in": "query",
        "required": false,
        "description": "",
        "schemaType": "string"
      },
      {
        "name": "vendor",
        "in": "query",
        "required": false,
        "description": "",
        "schemaType": "string"
      },
      {
        "name": "id",
        "in": "query",
        "required": false,
        "description": "",
        "schemaType": "string"
      },
      {
        "name": "name",
        "in": "query",
        "required": false,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false
  },
  {
    "id": "PostDomainsByUsersByVoices",
    "method": "POST",
    "path": "/domains/{domain}/users/{user}/voices",
    "resource": "Media/Text to Speech",
    "summary": "Synthesize Voice (Text to Speech) ",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": true
  },
  {
    "id": "GetDomainsByUsersByVoices",
    "method": "GET",
    "path": "/domains/{domain}/users/{user}/voices",
    "resource": "Media/Text to Speech",
    "summary": "Synthesize Voice (Text to Speech)  via GET",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "script",
        "in": "query",
        "required": false,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false
  },
  {
    "id": "GetCdrs",
    "method": "GET",
    "path": "/cdrs",
    "resource": "CDR (Call History)",
    "summary": "Read CDRs",
    "description": "",
    "parameters": [
      {
        "name": "datetime-start",
        "in": "query",
        "required": true,
        "description": ""
      },
      {
        "name": "datetime-end",
        "in": "query",
        "required": true,
        "description": ""
      },
      {
        "name": "start",
        "in": "query",
        "required": false,
        "description": ""
      },
      {
        "name": "limit",
        "in": "query",
        "required": false,
        "description": ""
      },
      {
        "name": "type",
        "in": "query",
        "required": false,
        "description": "Options include Inbound, Outbound, On-net, Off-net, Missed, Received, or integer type 0,1,2,3",
        "schemaType": "string"
      },
      {
        "name": "orig_callid",
        "in": "query",
        "required": false,
        "description": "Optional and legacy ability to lookup a specific call by orig_callid . Only available for top level without specific domain set. \n",
        "schemaType": "string"
      },
      {
        "name": "term_callid",
        "in": "query",
        "required": false,
        "description": "Optional and legacy ability to lookup a specific call by term_callid. Only available for top level without specific domain set. ",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false
  },
  {
    "id": "GetDomainsByCdrs",
    "method": "GET",
    "path": "/domains/{domain}/cdrs",
    "resource": "CDR (Call History)",
    "summary": "Read CDRs for Domain",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "datetime-start",
        "in": "query",
        "required": true,
        "description": ""
      },
      {
        "name": "datetime-end",
        "in": "query",
        "required": true,
        "description": ""
      },
      {
        "name": "start",
        "in": "query",
        "required": false,
        "description": ""
      },
      {
        "name": "limit",
        "in": "query",
        "required": false,
        "description": ""
      },
      {
        "name": "type",
        "in": "query",
        "required": false,
        "description": "Options include Inbound, Outbound, On-net, Off-net, Missed, Received, or integer type 0,1,2,3",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false
  },
  {
    "id": "GetDomainsByUsersByCdrs",
    "method": "GET",
    "path": "/domains/{domain}/users/{user}/cdrs",
    "resource": "CDR (Call History)",
    "summary": " Read CDRs for Specific User",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "datetime-start",
        "in": "query",
        "required": true,
        "description": ""
      },
      {
        "name": "datetime-end",
        "in": "query",
        "required": true,
        "description": ""
      },
      {
        "name": "start",
        "in": "query",
        "required": false,
        "description": ""
      },
      {
        "name": "limit",
        "in": "query",
        "required": false,
        "description": ""
      },
      {
        "name": "type",
        "in": "query",
        "required": false,
        "description": "Options include Inbound, Outbound, On-net, Off-net, Missed, Received, or integer type 0,1,2,3",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false
  },
  {
    "id": "GetDomainsByCdrs_2",
    "method": "GET",
    "path": "/domains/{domain}/cdrs",
    "resource": "CDR (Call History)",
    "summary": "Search CDRs for Domain",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "datetime-start",
        "in": "query",
        "required": true,
        "description": ""
      },
      {
        "name": "datetime-end",
        "in": "query",
        "required": true,
        "description": ""
      },
      {
        "name": "dialled",
        "in": "query",
        "required": false,
        "description": "The dialed number for the call. Can be a paritial match. ",
        "schemaType": "string"
      },
      {
        "name": "caller",
        "in": "query",
        "required": false,
        "description": "The callerid number for the call. Can be a paritial match. ",
        "schemaType": "string"
      },
      {
        "name": "site",
        "in": "query",
        "required": false,
        "description": "Use if wanting to seach for calls in a certain \"site\".",
        "schemaType": "string"
      },
      {
        "name": "group",
        "in": "query",
        "required": false,
        "description": "Use if wanting to seach for calls in a certain \"department\".",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false
  },
  {
    "id": "GetDomainsByCdrs_3",
    "method": "GET",
    "path": "/domains/{domain}/cdrs",
    "resource": "CDR (Call History)",
    "summary": "Read CDRs for Site in Domain",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "datetime-start",
        "in": "query",
        "required": false,
        "description": ""
      },
      {
        "name": "datetime-end",
        "in": "query",
        "required": false,
        "description": ""
      },
      {
        "name": "site",
        "in": "query",
        "required": false,
        "description": "Use if wanting to seach for calls in a certain \"site\".",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false
  },
  {
    "id": "GetCdrsCount",
    "method": "GET",
    "path": "/cdrs/count",
    "resource": "CDR (Call History)",
    "summary": "Count CDRs and SUM minutes",
    "description": "",
    "parameters": [
      {
        "name": "datetime-start",
        "in": "query",
        "required": true,
        "description": ""
      },
      {
        "name": "datetime-end",
        "in": "query",
        "required": true,
        "description": ""
      },
      {
        "name": "type",
        "in": "query",
        "required": false,
        "description": "Options include Inbound, Outbound, On-net, Off-net, Missed, Received, or integer type 0,1,2,3",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false
  },
  {
    "id": "GetDomainsByCdrsCount",
    "method": "GET",
    "path": "/domains/{domain}/cdrs/count",
    "resource": "CDR (Call History)",
    "summary": "Count CDRs and SUM minutes for Domain",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "datetime-start",
        "in": "query",
        "required": true,
        "description": ""
      },
      {
        "name": "datetime-end",
        "in": "query",
        "required": true,
        "description": ""
      },
      {
        "name": "type",
        "in": "query",
        "required": false,
        "description": "Options include Inbound, Outbound, On-net, Off-net, Missed, Received, or integer type 0,1,2,3",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false
  },
  {
    "id": "GetDomainsByUsersByCdrsCount",
    "method": "GET",
    "path": "/domains/{domain}/users/{user}/cdrs/count",
    "resource": "CDR (Call History)",
    "summary": "Count CDRs and SUM minutes for Specifc User",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "datetime-start",
        "in": "query",
        "required": true,
        "description": ""
      },
      {
        "name": "datetime-end",
        "in": "query",
        "required": true,
        "description": ""
      },
      {
        "name": "type",
        "in": "query",
        "required": false,
        "description": "Options include Inbound, Outbound, On-net, Off-net, Missed, Received, or integer type 0,1,2,3",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false
  },
  {
    "id": "GetDomainsByScheduleCount",
    "method": "GET",
    "path": "/domains/{domain}/schedule/count",
    "resource": "CDR Schedule",
    "summary": "Count CDR Schedules for Domain",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  {
    "id": "GetResellersByScheduleCount",
    "method": "GET",
    "path": "/resellers/{reseller}/schedule/count",
    "resource": "CDR Schedule",
    "summary": "Count CDR Schedules for Reseller",
    "description": "",
    "parameters": [
      {
        "name": "reseller",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  {
    "id": "GetDomainsByScheduleByCount",
    "method": "GET",
    "path": "/domains/{domain}/schedule/{schedule_name}/count",
    "resource": "CDR Schedule",
    "summary": "Count CDR Schedules by Name",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "schedule_name",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  {
    "id": "GetSipFlow",
    "method": "GET",
    "path": "/sipflow",
    "resource": "Call Traces & Cradle to Grave",
    "summary": "Get Call Trace (SIPFlow) For Call",
    "description": "",
    "parameters": [
      {
        "name": "start_time",
        "in": "query",
        "required": false,
        "description": "",
        "schemaType": "string"
      },
      {
        "name": "end_time",
        "in": "query",
        "required": false,
        "description": "",
        "schemaType": "string"
      },
      {
        "name": "callids",
        "in": "query",
        "required": false,
        "description": "",
        "schemaType": "string"
      },
      {
        "name": "servers",
        "in": "query",
        "required": true,
        "description": "",
        "schemaType": "string"
      },
      {
        "name": "type",
        "in": "query",
        "required": true,
        "description": "call_trace,cradle_to_grave,csv",
        "schemaType": "string"
      },
      {
        "name": "download",
        "in": "query",
        "required": false,
        "description": "Set to yes to download the file instead of getting base64 data in JSON. ",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false
  },
  {
    "id": "GetCradle2Grave",
    "method": "GET",
    "path": "/sipflow",
    "resource": "Call Traces & Cradle to Grave",
    "summary": "Get Cradle to Grave Info For Call",
    "description": "",
    "parameters": [
      {
        "name": "start_time",
        "in": "query",
        "required": false,
        "description": "",
        "schemaType": "string"
      },
      {
        "name": "end_time",
        "in": "query",
        "required": false,
        "description": "",
        "schemaType": "string"
      },
      {
        "name": "callids",
        "in": "query",
        "required": false,
        "description": "",
        "schemaType": "string"
      },
      {
        "name": "servers",
        "in": "query",
        "required": true,
        "description": "",
        "schemaType": "string"
      },
      {
        "name": "type",
        "in": "query",
        "required": true,
        "description": "call_trace,cradle_to_grave,csv",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false
  },
  {
    "id": "GetCallTrace",
    "method": "GET",
    "path": "/sipflow",
    "resource": "Call Traces & Cradle to Grave",
    "summary": "Get CSV of call trace For Call",
    "description": "",
    "parameters": [
      {
        "name": "start_time",
        "in": "query",
        "required": false,
        "description": "",
        "schemaType": "string"
      },
      {
        "name": "end_time",
        "in": "query",
        "required": false,
        "description": "",
        "schemaType": "string"
      },
      {
        "name": "callids",
        "in": "query",
        "required": false,
        "description": "",
        "schemaType": "string"
      },
      {
        "name": "servers",
        "in": "query",
        "required": true,
        "description": "",
        "schemaType": "string"
      },
      {
        "name": "type",
        "in": "query",
        "required": true,
        "description": "call_trace,cradle_to_grave,csv",
        "schemaType": "string"
      },
      {
        "name": "download",
        "in": "query",
        "required": false,
        "description": "Set to yes to download the file instead of getting base64 data in JSON. ",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false
  },
  {
    "id": "GetDomainsByTranscriptions",
    "method": "GET",
    "path": "/domains/{domain}/transcriptions",
    "resource": "Transcriptions & Sentiment",
    "summary": "Read Transcription for Specific Call",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "id",
        "in": "query",
        "required": true,
        "description": "The Job Id of the recording transcription. Required to be given on request. ID can be found in CDR read when available using field \"call-intelligence-job-id\"",
        "schemaType": "number"
      },
      {
        "name": "date",
        "in": "query",
        "required": true,
        "description": "The date will help identify the year and month of the call to limit the search down. The format will be YYYYMM",
        "schemaType": "string"
      },
      {
        "name": "callid",
        "in": "query",
        "required": true,
        "description": "One callid_id needs to be provided that can be linked to the domain of the call> you can use any of the fields orig_callid, term_callid, by_callid or if you dont know which one you have just callid though callid might have additional DB lookups. ",
        "schemaType": "string"
      },
      {
        "name": "orig_callid",
        "in": "query",
        "required": false,
        "description": "One callid_id needs to be provided that can be linked to the domain of the call> you can use any of the fields orig_callid, term_callid, by_callid or if you dont know which one you have just callid though callid might have additional DB lookups. ",
        "schemaType": "string"
      },
      {
        "name": "term_callid",
        "in": "query",
        "required": false,
        "description": "One callid_id needs to be provided that can be linked to the domain of the call> you can use any of the fields orig_callid, term_callid, by_callid or if you dont know which one you have just callid though callid might have additional DB lookups. ",
        "schemaType": "string"
      },
      {
        "name": "by_callid",
        "in": "query",
        "required": false,
        "description": "One callid_id needs to be provided that can be linked to the domain of the call> you can use any of the fields orig_callid, term_callid, by_callid or if you dont know which one you have just callid though callid might have additional DB lookups. ",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  {
    "id": "GetDomainsByCalls",
    "method": "GET",
    "path": "/domains/{domain}/calls",
    "resource": "Calls (live/active calls)",
    "summary": "Read Active Calls In Domain",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": false
  },
  {
    "id": "GetDomainsByCallsCount",
    "method": "GET",
    "path": "/domains/{domain}/calls/count",
    "resource": "Calls (live/active calls)",
    "summary": "Count Active Calls In Domain",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": false
  },
  {
    "id": "GetDomainsByUsersByCalls",
    "method": "GET",
    "path": "/domains/{domain}/users/{user}/calls",
    "resource": "Calls (live/active calls)",
    "summary": "Read Active Calls for User",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": false
  },
  {
    "id": "PostDomainsByUsersByCalls",
    "method": "POST",
    "path": "/domains/{domain}/users/{user}/calls",
    "resource": "Calls (live/active calls)",
    "summary": "Make a new Call",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": true
  },
  {
    "id": "GetDomainsByUsersByCallsBy",
    "method": "GET",
    "path": "/domains/{domain}/users/{user}/calls/{callid}",
    "resource": "Calls (live/active calls)",
    "summary": "Read Specific Active Call",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "callid",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false
  },
  {
    "id": "DeleteDomainsByUsersByCallsBy",
    "method": "DELETE",
    "path": "/domains/{domain}/users/{user}/calls/{call_id}",
    "resource": "Calls (live/active calls)",
    "summary": "Disconnect Call",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "call_id",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false
  },
  {
    "id": "PatchDomainsByUsersByCallsByTransferPeer",
    "method": "PATCH",
    "path": "/domains/{domain}/users/{user}/calls/{call_id}/transferPeer",
    "resource": "Calls (live/active calls)",
    "summary": "Transfer Peer Call",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "call_id",
        "in": "path",
        "required": true,
        "description": "This will be the callid for the requested call. This should be a random string generated by your application per call session.",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true,
    "minApiVersion": 45
  },
  {
    "id": "PatchDomainsByUsersByCallsByTransfer",
    "method": "PATCH",
    "path": "/domains/{domain}/users/{user}/calls/{call_id}/transfer",
    "resource": "Calls (live/active calls)",
    "summary": "Transfer Call",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "call_id",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true
  },
  {
    "id": "PatchDomainsByUsersByCallsByAnswer",
    "method": "PATCH",
    "path": "/domains/{domain}/users/{user}/calls/{call_id}/answer",
    "resource": "Calls (live/active calls)",
    "summary": "Answer Call",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "call_id",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true
  },
  {
    "id": "PatchDomainsByUsersByCallsByHold",
    "method": "PATCH",
    "path": "/domains/{domain}/users/{user}/calls/{call_id}/hold",
    "resource": "Calls (live/active calls)",
    "summary": "Hold Active Call",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "call_id",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false
  },
  {
    "id": "PatchDomainsByUsersByCallsByUnhold",
    "method": "PATCH",
    "path": "/domains/{domain}/users/{user}/calls/{call_id}/unhold",
    "resource": "Calls (live/active calls)",
    "summary": "Un-Hold Active Call",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "call_id",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false
  },
  {
    "id": "DeleteDomainsByUsersByCallsByReject",
    "method": "DELETE",
    "path": "/domains/{domain}/users/{user}/calls/{call_id}/reject",
    "resource": "Calls (live/active calls)",
    "summary": "Reject Call",
    "description": "Reject a call with orig call ID. This would cancel a \"ringing\" call prior to any answer event. If you're looking to disconnect an active call then, reference DELETE on /domains/{domain}/users/{user}/calls/{call_id}",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "call_id",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  {
    "id": "PostCallsReport",
    "method": "POST",
    "path": "/calls/report",
    "resource": "Calls (live/active calls)",
    "summary": "Report Active Calls",
    "description": "",
    "parameters": [],
    "hasRequestBody": true,
    "minApiVersion": 45
  },
  {
    "id": "GetDomainsByContacts",
    "method": "GET",
    "path": "/domains/{domain}/contacts",
    "resource": "Contacts/Shared Contacts",
    "summary": "Get Domain Contacts",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": false
  },
  {
    "id": "PostDomainsByContacts",
    "method": "POST",
    "path": "/domains/{domain}/contacts",
    "resource": "Contacts/Shared Contacts",
    "summary": "Create Shared Contact",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": true
  },
  {
    "id": "GetDomainsByContactsBy",
    "method": "GET",
    "path": "/domains/{domain}/contacts/{contact_id}",
    "resource": "Contacts/Shared Contacts",
    "summary": "Get Specific Domain Contact",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "contact_id",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false
  },
  {
    "id": "PutDomainsByContactsBy",
    "method": "PUT",
    "path": "/domains/{domain}/contacts/{contact_id}",
    "resource": "Contacts/Shared Contacts",
    "summary": "Update Shared Contact",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "contact_id",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true
  },
  {
    "id": "DeleteDomainsByContactsBy",
    "method": "DELETE",
    "path": "/domains/{domain}/contacts/{contact_id}",
    "resource": "Contacts/Shared Contacts",
    "summary": "Delete Shared Contact",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "contact_id",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false
  },
  {
    "id": "GetDomainsByUsersByContacts",
    "method": "GET",
    "path": "/domains/{domain}/users/{user}/contacts",
    "resource": "Contacts",
    "summary": "Get Contacts for User",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "includeDomain",
        "in": "query",
        "required": false,
        "description": "Whether to include onnet domain users, will also match the users to contact details. (values: \"yes\"/\"no\", default \"no\")",
        "schemaType": "boolean"
      }
    ],
    "hasRequestBody": false
  },
  {
    "id": "PostDomainsByUsersByContacts",
    "method": "POST",
    "path": "/domains/{domain}/users/{user}/contacts",
    "resource": "Contacts",
    "summary": "Create Contact",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": true
  },
  {
    "id": "GetDomainsByUsersByContactsBy",
    "method": "GET",
    "path": "/domains/{domain}/users/{user}/contacts/{contact_id}",
    "resource": "Contacts",
    "summary": "Get Specific Contact for User",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "contact_id",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false
  },
  {
    "id": "PutDomainsByUsersByContactsBy",
    "method": "PUT",
    "path": "/domains/{domain}/users/{user}/contacts/{contact_id}",
    "resource": "Contacts",
    "summary": "Update Contact",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "contact_id",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true
  },
  {
    "id": "DeleteDomainsByUsersByContactsBy",
    "method": "DELETE",
    "path": "/domains/{domain}/users/{user}/contacts/{contact_id}",
    "resource": "Contacts",
    "summary": "Delete Contact",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "contact_id",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false
  },
  {
    "id": "GetDomainsByUsersByContactsCount",
    "method": "GET",
    "path": "/domains/{domain}/users/{user}/contacts/count",
    "resource": "Contacts",
    "summary": "Count Contacts for User",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": false
  },
  {
    "id": "GetDomainsUsersContacts",
    "method": "GET",
    "path": "/domains/~/users/~/contacts",
    "resource": "Contacts",
    "summary": "Get My Contacts",
    "description": "",
    "parameters": [],
    "hasRequestBody": false
  },
  {
    "id": "GetAddressesForDomain",
    "method": "GET",
    "path": "/domains/{domain}/addresses",
    "resource": "Addresses",
    "summary": "Get Addresses for Domain",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": false
  },
  {
    "id": "CreateAddressForDomain",
    "method": "POST",
    "path": "/domains/{domain}/addresses",
    "resource": "Addresses",
    "summary": "Create Address for Domain",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": true
  },
  {
    "id": "ValidateAddress",
    "method": "POST",
    "path": "/domains/{domain}/addresses/validate",
    "resource": "Addresses",
    "summary": "Validate Address",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": true
  },
  {
    "id": "UpdateAddressForDomain",
    "method": "PUT",
    "path": "/domains/{domain}/addresses/{emergency-address-id}",
    "resource": "Addresses",
    "summary": "Update Address for Domain",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "emergency-address-id",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true
  },
  {
    "id": "DeleteAddressForDomain",
    "method": "DELETE",
    "path": "/domains/{domain}/addresses/{emergency-address-id}",
    "resource": "Addresses",
    "summary": "Delete Address For Domain",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "emergency-address-id",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false
  },
  {
    "id": "UpdateAddressForUser",
    "method": "PUT",
    "path": "/domains/{domain}/users/{user}/addresses/{emergency-address-id}",
    "resource": "Addresses",
    "summary": "Update Address for User",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "emergency-address-id",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true
  },
  {
    "id": "GetAddressUsingAddressID",
    "method": "GET",
    "path": "/domains/{domain}/users/{user}/addresses/{emergency-address-id}",
    "resource": "Addresses",
    "summary": "Get Address Using Address ID",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "emergency-address-id",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false
  },
  {
    "id": "UpdateAddressEndpoint",
    "method": "PUT",
    "path": "/domains/{domain}/addresses/endpoints/{endpoint}",
    "resource": "Addresses",
    "summary": "Update Address Endpoint",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "endpoint",
        "in": "path",
        "required": true,
        "description": "The callback number of the address.",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true
  },
  {
    "id": "DeleteAddressEndpoint",
    "method": "DELETE",
    "path": "/domains/{domain}/addresses/endpoints/{endpoint}",
    "resource": "Addresses",
    "summary": "Delete Address Endpoint",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "endpoint",
        "in": "path",
        "required": true,
        "description": "The callback number of the address.",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true
  },
  {
    "id": "CreateAddressForUser",
    "method": "POST",
    "path": "/domains/{domain}/users/{user}/addresses",
    "resource": "Addresses",
    "summary": "Create Address for User",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": true
  },
  {
    "id": "GetAddressesForUser",
    "method": "GET",
    "path": "/domains/{domain}/users/{user}/addresses",
    "resource": "Addresses",
    "summary": "Get Addresses for User",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "limit",
        "in": "query",
        "required": false,
        "description": ""
      },
      {
        "name": "show_all_personal",
        "in": "query",
        "required": false,
        "description": "Set to \"yes\" and do not set user in order to show all addresses in domain regardless of user identity. Requires Office Manager or above",
        "schemaType": "string"
      },
      {
        "name": "show_only_personal",
        "in": "query",
        "required": false,
        "description": "Set to \"yes\" to show only the personal addresses. Default to \"no\" which would also showing all the domain-level addreses",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false
  },
  {
    "id": "DeleteAddressForUser",
    "method": "DELETE",
    "path": "/domains/{domain}/users/{user}/addresses/{address_id}",
    "resource": "Addresses",
    "summary": "Delete Address For User",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "address_id",
        "in": "path",
        "required": true,
        "description": "Address ID to delete",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false
  },
  {
    "id": "CreateAddressEndpoint",
    "method": "POST",
    "path": "/domains/{domain}/addresses/endpoints",
    "resource": "Addresses",
    "summary": "Create Address Endpoint",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": true
  },
  {
    "id": "GetAddressEndpointsForDomain",
    "method": "GET",
    "path": "/domains/{domain}/addresses/endpoints",
    "resource": "Addresses",
    "summary": "Get Address Endpoints for a Domain",
    "description": "Emergency Address Endpoints are different than Emergency Addresses. Endpoints contain the Emergency Caller ID Number and the address associated with it should be the billing address. Emergency Addresses are what is passed in to the PIDFLO object. ",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "limit",
        "in": "query",
        "required": false,
        "description": ""
      }
    ],
    "hasRequestBody": false
  },
  {
    "id": "GetAddressesCountForDomain",
    "method": "GET",
    "path": "/domains/{domain}/addresses/count",
    "resource": "Addresses",
    "summary": "Get Addresses Count for Domain",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": false
  },
  {
    "id": "GetDomainsByUsersByVmailnag",
    "method": "GET",
    "path": "/domains/{domain}/users/{user}/vmailnag",
    "resource": "Voicemail Reminders",
    "summary": "Get Voicemail Reminders for Specific User",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": false
  },
  {
    "id": "DeleteDomainsByUsersByVmailnag",
    "method": "DELETE",
    "path": "/domains/{domain}/users/{user}/vmailnag",
    "resource": "Voicemail Reminders",
    "summary": "Delete Voicemail Reminders for Specific User",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": false
  },
  {
    "id": "PostDomainsByUsersByVmailnag",
    "method": "POST",
    "path": "/domains/{domain}/users/{user}/vmailnag",
    "resource": "Voicemail Reminders",
    "summary": "Create Voicemail Reminder",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": true
  },
  {
    "id": "PutDomainsByUsersByVmailnag",
    "method": "PUT",
    "path": "/domains/{domain}/users/{user}/vmailnag",
    "resource": "Voicemail Reminders",
    "summary": "Update Voicemail Reminders for Specific User",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": true
  },
  {
    "id": "GetDomainsByUsersByVmailnagCount",
    "method": "GET",
    "path": "/domains/{domain}/users/{user}/vmailnag/count",
    "resource": "Voicemail Reminders",
    "summary": "Count Voicemail Reminders for Specific User",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  {
    "id": "ReadDialrules",
    "method": "GET",
    "path": "/domains/{domain}/dialplans/{dialplan}/dialrules",
    "resource": "Dialrule",
    "summary": "Read Dialrules in a Dialplan",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "dialplan",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false
  },
  {
    "id": "CreateDialrule",
    "method": "POST",
    "path": "/domains/{domain}/dialplans/{dialplan}/dialrules",
    "resource": "Dialrule",
    "summary": "Add a new dial rule into a dial plan",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "dialplan",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true
  },
  {
    "id": "GetDomainsByDialplansByDialrulesCount",
    "method": "GET",
    "path": "/domains/{domain}/dialplans/{dialplan}/dialrules/count",
    "resource": "Dialrule",
    "summary": "Count Dialrules in a Dialplan",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "dialplan",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  {
    "id": "ReadDialrule",
    "method": "GET",
    "path": "/domains/{domain}/dialplans/{dialplan}/dialrules/{dialrule}",
    "resource": "Dialrule",
    "summary": "Read Specific Dialrule in a Dialplan",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "dialplan",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      },
      {
        "name": "dialrule",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false
  },
  {
    "id": "UpdateDialrule",
    "method": "PUT",
    "path": "/domains/{domain}/dialplans/{dialplan}/dialrules/{dialrule}",
    "resource": "Dialrule",
    "summary": "Update a dial rule by ID in a dial plan",
    "description": "Note you cannot update any fields starting with dial-rule-matching (like dial-rule-matching-to-uri and dial-rule-matching-from-uri) , any modification there should be a delete and create new. ",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "dialplan",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      },
      {
        "name": "dialrule",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true
  },
  {
    "id": "DeleteDialrule",
    "method": "DELETE",
    "path": "/domains/{domain}/dialplans/{dialplan}/dialrules/{dialrule}",
    "resource": "Dialrule",
    "summary": "Delete a dial rule by ID in a dial plan",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "dialplan",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      },
      {
        "name": "dialrule",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false
  },
  {
    "id": "GetDialplans",
    "method": "GET",
    "path": "/dialplans",
    "resource": "Dialrule",
    "summary": "Read Dialplans",
    "description": "",
    "parameters": [],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  {
    "id": "PostDialplans",
    "method": "POST",
    "path": "/dialplans",
    "resource": "Dialrule",
    "summary": "Create Dialplan Global",
    "description": "",
    "parameters": [],
    "hasRequestBody": true,
    "minApiVersion": 45
  },
  {
    "id": "PostDomainsByDialplans",
    "method": "POST",
    "path": "/domains/{domain}/dialplans",
    "resource": "Dialrule",
    "summary": "Create Dialplan for Domain",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": true,
    "minApiVersion": 45
  },
  {
    "id": "PutDomainsByDialplansBy",
    "method": "PUT",
    "path": "/domains/{domain}/dialplans/{dialplan}",
    "resource": "Dialrule",
    "summary": "Update Dialplan for Domain",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "dialplan",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true,
    "minApiVersion": 45
  },
  {
    "id": "DeleteDomainsByDialplansBy",
    "method": "DELETE",
    "path": "/domains/{domain}/dialplans/{dialplan}",
    "resource": "Dialrule",
    "summary": "Delete Dialplan for Domain",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "dialplan",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  {
    "id": "GetDialpolicy",
    "method": "GET",
    "path": "/dialpolicy",
    "resource": "Dial Permisions",
    "summary": "Read Policies",
    "description": "",
    "parameters": [],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  {
    "id": "PostDialpolicy",
    "method": "POST",
    "path": "/dialpolicy",
    "resource": "Dial Permisions",
    "summary": "Create Dialpolicy Table",
    "description": "",
    "parameters": [],
    "hasRequestBody": true,
    "minApiVersion": 45
  },
  {
    "id": "GetDialpolicyBy",
    "method": "GET",
    "path": "/dialpolicy/{policy}",
    "resource": "Dial Permisions",
    "summary": "Read Specific Policy",
    "description": "",
    "parameters": [
      {
        "name": "policy",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  {
    "id": "PutDialpolicyBy",
    "method": "PUT",
    "path": "/dialpolicy/{policy}",
    "resource": "Dial Permisions",
    "summary": "Update Dialpolicy ",
    "description": "",
    "parameters": [
      {
        "name": "policy",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true,
    "minApiVersion": 45
  },
  {
    "id": "DeleteDialpolicyBy",
    "method": "DELETE",
    "path": "/dialpolicy/{policy}",
    "resource": "Dial Permisions",
    "summary": "Delete Dialpolicy ",
    "description": "",
    "parameters": [
      {
        "name": "policy",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  {
    "id": "GetDomainsByDialpolicyBy",
    "method": "GET",
    "path": "/domains/{domain}/dialpolicy/{policy}",
    "resource": "Dial Permisions",
    "summary": "Read Specific Policy in Domain",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "policy",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  {
    "id": "PutDomainsByDialpolicyBy",
    "method": "PUT",
    "path": "/domains/{domain}/dialpolicy/{policy}",
    "resource": "Dial Permisions",
    "summary": "Update Dialpolicy  in Domain",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "policy",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true,
    "minApiVersion": 45
  },
  {
    "id": "DeleteDomainsByDialpolicyBy",
    "method": "DELETE",
    "path": "/domains/{domain}/dialpolicy/{policy}",
    "resource": "Dial Permisions",
    "summary": "Delete Dialpolicy  in Domain",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "policy",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  {
    "id": "GetDialpolicyByPermission",
    "method": "GET",
    "path": "/dialpolicy/{policy}/permission",
    "resource": "Dial Permisions",
    "summary": "Read Permissions in a DialPolicy",
    "description": "",
    "parameters": [
      {
        "name": "policy",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  {
    "id": "CreatePermission",
    "method": "POST",
    "path": "/dialpolicy/{policy}/permission",
    "resource": "Dial Permisions",
    "summary": "Add a new permission to a dialpolicy table",
    "description": "",
    "parameters": [
      {
        "name": "policy",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true,
    "minApiVersion": 45
  },
  {
    "id": "GetDomainsByDialpolicyByPermission",
    "method": "GET",
    "path": "/domains/{domain}/dialpolicy/{policy}/permission",
    "resource": "Dial Permisions",
    "summary": "Read Permissions in a DialPolicy in Domain",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "policy",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  {
    "id": "CreatePermissionDomain",
    "method": "POST",
    "path": "/domains/{domain}/dialpolicy/{policy}/permission",
    "resource": "Dial Permisions",
    "summary": "Add a new permission to a dialpolicy table in Domain",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "policy",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true,
    "minApiVersion": 45
  },
  {
    "id": "ReadPermission",
    "method": "GET",
    "path": "/dialpolicy/{policy}/permission/{id}",
    "resource": "Dial Permisions",
    "summary": "Read Specific Permission in a Dialpolicy",
    "description": "",
    "parameters": [
      {
        "name": "policy",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      },
      {
        "name": "id",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  {
    "id": "UpdatePermission",
    "method": "PUT",
    "path": "/dialpolicy/{policy}/permission/{id}",
    "resource": "Dial Permisions",
    "summary": "Update a permission in a dialpolicy table",
    "description": "",
    "parameters": [
      {
        "name": "policy",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      },
      {
        "name": "id",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true,
    "minApiVersion": 45
  },
  {
    "id": "DeletePermission",
    "method": "DELETE",
    "path": "/dialpolicy/{policy}/permission/{id}",
    "resource": "Dial Permisions",
    "summary": "Delete a permission by ID in a dialpolicy",
    "description": "",
    "parameters": [
      {
        "name": "policy",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      },
      {
        "name": "id",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  {
    "id": "ReadPermissionDomain",
    "method": "GET",
    "path": "/domains/{domain}/dialpolicy/{policy}/permission/{id}",
    "resource": "Dial Permisions",
    "summary": "Read Specific Permission in a Dialpolicy in Domain",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "policy",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      },
      {
        "name": "id",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  {
    "id": "UpdatePermissionDomain",
    "method": "PUT",
    "path": "/domains/{domain}/dialpolicy/{policy}/permission/{id}",
    "resource": "Dial Permisions",
    "summary": "Update a permission in a dialpolicy table in Domain",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "policy",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      },
      {
        "name": "id",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true,
    "minApiVersion": 45
  },
  {
    "id": "DeletePermissionDomain",
    "method": "DELETE",
    "path": "/domains/{domain}/dialpolicy/{policy}/permission/{id}",
    "resource": "Dial Permisions",
    "summary": "Delete a permission by ID in a dialpolicy in Domain",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "policy",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      },
      {
        "name": "id",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  {
    "id": "GetMessageSessionsForDomain",
    "method": "GET",
    "path": "/domains/{domain}/messagesessions",
    "resource": "Messages",
    "summary": "Get Messagesessions for Domain",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "limit",
        "in": "query",
        "required": false,
        "description": ""
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  {
    "id": "startSession",
    "method": "POST",
    "path": "/domains/{domain}/users/{user}/messages",
    "resource": "Messages",
    "summary": "Start a new Message Session",
    "description": "This is a good place to start with messaging if you do not already have a message session ID. ",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": true,
    "minApiVersion": 45
  },
  {
    "id": "GetMessageSessionsForUser",
    "method": "GET",
    "path": "/domains/{domain}/users/{user}/messagesessions",
    "resource": "Messages",
    "summary": "Get Messagesessions for User",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "limit",
        "in": "query",
        "required": false,
        "description": ""
      }
    ],
    "hasRequestBody": false
  },
  {
    "id": "GetMessageSessionForUser",
    "method": "GET",
    "path": "/domains/{domain}/users/{user}/messagesessions/{messagesession}",
    "resource": "Messages",
    "summary": "Get Messagesession for User",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "messagesession",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  {
    "id": "updateMessageSessionParticipants",
    "method": "PUT",
    "path": "/domains/{domain}/users/{user}/messagesessions/{messagesession}",
    "resource": "Messages",
    "summary": "Update Messagesession (Participants)",
    "description": "This is how you add or remove participants from a chat message session. You cannot add or remove from a group MMS session, in that case you must start a new session.",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "messagesession",
        "in": "path",
        "required": true,
        "description": "ID of the message session to send in (when changing participants, do not change the session ID)",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true
  },
  {
    "id": "deleteMessagesession",
    "method": "DELETE",
    "path": "/domains/{domain}/users/{user}/messagesessions/{messagesession}",
    "resource": "Messages",
    "summary": "Delete Messagesession",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "messagesession",
        "in": "path",
        "required": true,
        "description": "ID of the message session to delete",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false
  },
  {
    "id": "GetMessagesForMessagesession",
    "method": "GET",
    "path": "/domains/{domain}/users/{user}/messagesessions/{messagesession}/messages",
    "resource": "Messages",
    "summary": "Get Messages for Messagesession",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "messagesession",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      },
      {
        "name": "limit",
        "in": "query",
        "required": false,
        "description": ""
      }
    ],
    "hasRequestBody": false
  },
  {
    "id": "sendMessageChat",
    "method": "POST",
    "path": "/domains/{domain}/users/{user}/messagesessions/{messagesession}/messages",
    "resource": "Messages",
    "summary": "Send a message (Chat)",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "messagesession",
        "in": "path",
        "required": true,
        "description": "ID of the message session to send in. Needs to be at least 32 characters long and random. Only alphanumeric chracters and underscore are allowed.",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true
  },
  {
    "id": "sendMessageGroupChat",
    "method": "POST",
    "path": "/domains/{domain}/users/{user}/messagesessions/{messagesession}/messages",
    "resource": "Messages",
    "summary": "Send a message (Group Chat)",
    "description": "> Note: # and anything after is NOT needed, its just to allow multiple examples for the same path/method. ",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "messagesession",
        "in": "path",
        "required": true,
        "description": "ID of the message session to send in. Needs to be at least 32 characters long and random. Only alphanumeric chracters and underscore are allowed.",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true
  },
  {
    "id": "sendMessageMediaChat",
    "method": "POST",
    "path": "/domains/{domain}/users/{user}/messagesessions/{messagesession}/messages",
    "resource": "Messages",
    "summary": "Send a message (Media Chat)",
    "description": "> Note: # and anything after is NOT needed, its just to allow multiple examples for the same path/method. ",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "messagesession",
        "in": "path",
        "required": true,
        "description": "ID of the message session to send in. Needs to be at least 32 characters long and random. Only alphanumeric chracters and underscore are allowed.",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true
  },
  {
    "id": "sendMessageSMS",
    "method": "POST",
    "path": "/domains/{domain}/users/{user}/messagesessions/{messagesession}/messages",
    "resource": "Messages",
    "summary": "Send a message (SMS)",
    "description": "> Note: # and anything after is NOT needed, its just to allow multiple examples for the same path/method. ",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "messagesession",
        "in": "path",
        "required": true,
        "description": "ID of the message session to send in. Needs to be at least 32 characters long and random. Only alphanumeric chracters and underscore are allowed.",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true
  },
  {
    "id": "sendMessageGroupSMS",
    "method": "POST",
    "path": "/domains/{domain}/users/{user}/messagesessions/{messagesession}/messages",
    "resource": "Messages",
    "summary": "Send a message (Group SMS)",
    "description": "> Note: # and anything after is NOT needed, its just to allow multiple examples for the same path/method. ",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "messagesession",
        "in": "path",
        "required": true,
        "description": "ID of the message session to send in. Needs to be at least 32 characters long and random. Only alphanumeric chracters and underscore are allowed.",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true
  },
  {
    "id": "sendMessageMMS",
    "method": "POST",
    "path": "/domains/{domain}/users/{user}/messagesessions/{messagesession}/messages",
    "resource": "Messages",
    "summary": "Send a message (MMS)",
    "description": "> Note: # and anything after is NOT needed, its just to allow multiple examples for the same path/method. ",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "messagesession",
        "in": "path",
        "required": true,
        "description": "ID of the message session to send in. Needs to be at least 32 characters long and random. Only alphanumeric chracters and underscore are allowed.",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true
  },
  {
    "id": "updateMessageSessionSessionName",
    "method": "PUT",
    "path": "/domains/{domain}/users/{user}/messagesessions/{messagesession}",
    "resource": "Messages",
    "summary": "Update Messagesession (Session Name)",
    "description": "This is how you change the chat session name. You cannot name or rename an MMS group session.\n\n> Note: # and anything after is NOT needed, its just to allow multiple examples for the same path/method. ",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "messagesession",
        "in": "path",
        "required": true,
        "description": "ID of the message session to send in (when changing participants, do not change the session ID)",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true
  },
  {
    "id": "leaveMessagesession",
    "method": "PUT",
    "path": "/domains/{domain}/users/{user}/messagesessions/{messagesession}/leave",
    "resource": "Messages",
    "summary": "Update Messagesession (Leave)",
    "description": "This is how you leave a chat conversation.",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "messagesession",
        "in": "path",
        "required": true,
        "description": "ID of the message session to send in (when changing participants, do not change the session ID)",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false
  },
  {
    "id": "GetSmsNumbersForDomain",
    "method": "GET",
    "path": "/domains/{domain}/smsnumbers",
    "resource": "SMS Numbers",
    "summary": "Get SMS Numbers for Domain",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": false
  },
  {
    "id": "CreateSMSNumber",
    "method": "POST",
    "path": "/domains/{domain}/smsnumbers",
    "resource": "SMS Numbers",
    "summary": "Create SMS Number",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": true
  },
  {
    "id": "GetAllSMSNumbersSystem",
    "method": "GET",
    "path": "/smsnumbers",
    "resource": "SMS Numbers",
    "summary": "Get All SMS Numbers for System",
    "description": "",
    "parameters": [],
    "hasRequestBody": false
  },
  {
    "id": "UpdateSMSNumber",
    "method": "PUT",
    "path": "/domains/{domain}/smsnumbers/{smsnumber}",
    "resource": "SMS Numbers",
    "summary": "Update SMS Number",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "smsnumber",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true
  },
  {
    "id": "DeleteSMSNumber",
    "method": "DELETE",
    "path": "/domains/{domain}/smsnumbers/{smsnumber}",
    "resource": "SMS Numbers",
    "summary": "Delete an SMS Number",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "smsnumber",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false
  },
  {
    "id": "GetSmsNumbersForUser",
    "method": "GET",
    "path": "/domains/{domain}/users/{user}/smsnumbers",
    "resource": "SMS Numbers",
    "summary": "Get SMS Numbers for User",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": false
  },
  {
    "id": "CountSmsNumbers",
    "method": "GET",
    "path": "/domains/{domain}/users/{user}/smsnumbers/count",
    "resource": "SMS Numbers",
    "summary": "Count SMS Numbers for User",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": false
  },
  {
    "id": "GetDomainsByUsersByRecordingsBy",
    "method": "GET",
    "path": "/domains/{domain}/users/{user}/recordings/{callid}",
    "resource": "Recordings",
    "summary": "Get Specific Recording by Callid for User",
    "description": "A user who is a party to a call may request the recording data for that call.",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "callid",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false
  },
  {
    "id": "GetDomainsByRecordingsBy",
    "method": "GET",
    "path": "/domains/{domain}/recordings/{callid}",
    "resource": "Recordings",
    "summary": "Get Specific Recording by Callid for Domain",
    "description": "A user with sufficient scope may request recording data for calls to which they were not a party - but which are within their purview - using the domain and callid.",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "callid",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false
  },
  {
    "id": "VerifyEmail",
    "method": "POST",
    "path": "/domains/{domain}/users/{user}/email/verify/{token}",
    "resource": "Email",
    "summary": "Verify Email",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "token",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  {
    "id": "GetConnections",
    "method": "GET",
    "path": "/connections",
    "resource": "Connections",
    "summary": "Get All Connections",
    "description": "",
    "parameters": [
      {
        "name": "device-sip-registration-uri",
        "in": "query",
        "required": false,
        "description": "",
        "schemaType": "string"
      },
      {
        "name": "termination-match",
        "in": "query",
        "required": false,
        "description": "",
        "schemaType": "string"
      },
      {
        "name": "domain",
        "in": "query",
        "required": false,
        "description": ""
      },
      {
        "name": "reseller",
        "in": "query",
        "required": false,
        "description": "",
        "schemaType": "string"
      },
      {
        "name": "route-chain",
        "in": "query",
        "required": false,
        "description": "",
        "schemaType": "string"
      },
      {
        "name": "user-scope",
        "in": "query",
        "required": false,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false
  },
  {
    "id": "CreateConnection",
    "method": "POST",
    "path": "/connections",
    "resource": "Connections",
    "summary": "Create a Connection",
    "description": "",
    "parameters": [],
    "hasRequestBody": true
  },
  {
    "id": "CountAllConnections",
    "method": "GET",
    "path": "/connections/count",
    "resource": "Connections",
    "summary": "Count All Conections",
    "description": "",
    "parameters": [
      {
        "name": "device-sip-registration-uri",
        "in": "query",
        "required": false,
        "description": "",
        "schemaType": "string"
      },
      {
        "name": "termination-match",
        "in": "query",
        "required": false,
        "description": "",
        "schemaType": "string"
      },
      {
        "name": "domain",
        "in": "query",
        "required": false,
        "description": ""
      },
      {
        "name": "reseller",
        "in": "query",
        "required": false,
        "description": "",
        "schemaType": "string"
      },
      {
        "name": "route-chain",
        "in": "query",
        "required": false,
        "description": "",
        "schemaType": "string"
      },
      {
        "name": "user-scope",
        "in": "query",
        "required": false,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false
  },
  {
    "id": "GetDomainsByConnections",
    "method": "GET",
    "path": "/domains/{domain}/connections",
    "resource": "Connections",
    "summary": "Get All Connections for a Domain",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "device-sip-registration-uri",
        "in": "query",
        "required": false,
        "description": "",
        "schemaType": "string"
      },
      {
        "name": "termination-match",
        "in": "query",
        "required": false,
        "description": "",
        "schemaType": "string"
      },
      {
        "name": "reseller",
        "in": "query",
        "required": false,
        "description": "",
        "schemaType": "string"
      },
      {
        "name": "route-chain",
        "in": "query",
        "required": false,
        "description": "",
        "schemaType": "string"
      },
      {
        "name": "user-scope",
        "in": "query",
        "required": false,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false
  },
  {
    "id": "GetDomainsByConnectionsBy",
    "method": "GET",
    "path": "/domains/{domain}/connections/{connection-orig-match-pattern}",
    "resource": "Connections",
    "summary": "Get Specific Connection for a Domain",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "connection-orig-match-pattern",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false
  },
  {
    "id": "DeleteDomainsByConnectionsBy",
    "method": "DELETE",
    "path": "/domains/{domain}/connections/{connection-orig-match-pattern}",
    "resource": "Connections",
    "summary": "Delete a Specific Connection for a Domain",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "connection-orig-match-pattern",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false
  },
  {
    "id": "UpdateConnection",
    "method": "PUT",
    "path": "/domains/{domain}/connections/{connection-orig-match-pattern}",
    "resource": "Connections",
    "summary": "Update a Connection",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "connection-orig-match-pattern",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true
  },
  {
    "id": "GetRoutes",
    "method": "GET",
    "path": "/routes",
    "resource": "Routes",
    "summary": "Read Routes",
    "description": "",
    "parameters": [
      {
        "name": "route-destination-match-pattern",
        "in": "query",
        "required": false,
        "description": "",
        "schemaType": "string"
      },
      {
        "name": "route-source-match-pattern",
        "in": "query",
        "required": false,
        "description": "",
        "schemaType": "string"
      },
      {
        "name": "route-class",
        "in": "query",
        "required": false,
        "description": "",
        "schemaType": "string"
      },
      {
        "name": "route-match-server-hostname",
        "in": "query",
        "required": false,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false
  },
  {
    "id": "PostRoutes",
    "method": "POST",
    "path": "/routes",
    "resource": "Routes",
    "summary": "Create a Route",
    "description": "",
    "parameters": [],
    "hasRequestBody": true
  },
  {
    "id": "CountRoutes",
    "method": "GET",
    "path": "/routes/count",
    "resource": "Routes",
    "summary": "Count All Routes",
    "description": "",
    "parameters": [
      {
        "name": "forward_request_matchrule",
        "in": "query",
        "required": false,
        "description": "",
        "schemaType": "string"
      },
      {
        "name": "route-source-match-pattern",
        "in": "query",
        "required": false,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false
  },
  {
    "id": "GetRoutesByRoutecon",
    "method": "GET",
    "path": "/routes/{route-id}/routecon",
    "resource": "Routes",
    "summary": "Read Route Connections for Route",
    "description": "",
    "parameters": [
      {
        "name": "route-id",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  {
    "id": "PostRoutesByRoutecon",
    "method": "POST",
    "path": "/routes/{route-id}/routecon",
    "resource": "Routes",
    "summary": "Create a Route Connection",
    "description": "",
    "parameters": [
      {
        "name": "route-id",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true,
    "minApiVersion": 45
  },
  {
    "id": "GetRouteconCount",
    "method": "GET",
    "path": "/routecon/count",
    "resource": "Routes",
    "summary": "Count All Route Connections",
    "description": "",
    "parameters": [
      {
        "name": "route-destination-match-pattern",
        "in": "query",
        "required": false,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false
  },
  {
    "id": "PutRoutesBy",
    "method": "PUT",
    "path": "/routes/{route-id}",
    "resource": "Routes",
    "summary": "Update A Specific Route",
    "description": "",
    "parameters": [
      {
        "name": "route-id",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true,
    "minApiVersion": 45
  },
  {
    "id": "DeleteRoute",
    "method": "DELETE",
    "path": "/routes/{route-id}",
    "resource": "Routes",
    "summary": "Delete A Specific Route",
    "description": "",
    "parameters": [
      {
        "name": "route-id",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  {
    "id": "PutRoutesByRouteconBy",
    "method": "PUT",
    "path": "/routes/{route-id}/routecon/{index}",
    "resource": "Routes",
    "summary": "Update A Specific Route Connection",
    "description": "",
    "parameters": [
      {
        "name": "route-id",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      },
      {
        "name": "index",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true,
    "minApiVersion": 45
  },
  {
    "id": "DeleteRouteCon",
    "method": "DELETE",
    "path": "/routes/{route-id}/routecon/{index}",
    "resource": "Routes",
    "summary": "Delete A Specific Route connection",
    "description": "",
    "parameters": [
      {
        "name": "route-id",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      },
      {
        "name": "index",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  {
    "id": "PostDomainsByUsersByMeetingsByInstanceByLog",
    "method": "POST",
    "path": "/domains/{domain}/users/{user}/meetings/{id}/instance/{instance}/log",
    "resource": "Meetings/Event Logs",
    "summary": "Create a Meeting Log Event",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "id",
        "in": "path",
        "required": true,
        "description": "Meeting Id",
        "schemaType": "string"
      },
      {
        "name": "instance",
        "in": "path",
        "required": true,
        "description": "Meeting Instance Id",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true
  },
  {
    "id": "GetDomainsByUsersByMeetingsByInstanceByLog",
    "method": "GET",
    "path": "/domains/{domain}/users/{user}/meetings/{id}/instance/{instance}/log",
    "resource": "Meetings/Event Logs",
    "summary": "Read Meeting Events",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "id",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      },
      {
        "name": "instance",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false
  },
  {
    "id": "GetVideoResellers",
    "method": "GET",
    "path": "/video/resellers",
    "resource": "Meetings/Iotum",
    "summary": "Read Iotum Video Domain Resellers",
    "description": "Read a Iotum Company (domain)",
    "parameters": [],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  {
    "id": "GetDomainsByUsersByVideo",
    "method": "GET",
    "path": "/domains/{domain}/users/{user}/video",
    "resource": "Meetings/Iotum",
    "summary": "Read Iotum Video Host",
    "description": "Read a Iotum Host",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  {
    "id": "GetDomainsByVideoHosts",
    "method": "GET",
    "path": "/domains/{domain}/video/hosts",
    "resource": "Meetings/Iotum",
    "summary": "Read All Iotum Video Hosts in a Domain",
    "description": "Read All Iotum Video Hosts in a Domain",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  {
    "id": "GetDomainsByUsersByVideoConference",
    "method": "GET",
    "path": "/domains/{domain}/users/{user}/video/conference",
    "resource": "Meetings/Iotum",
    "summary": "Read Iotum Video Host Conferences",
    "description": "Read a Iotum Host",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  {
    "id": "PostDomainsByUsersByVideoConference",
    "method": "POST",
    "path": "/domains/{domain}/users/{user}/video/conference",
    "resource": "Meetings/Iotum",
    "summary": "Create a Ad-hoc Conference",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": true,
    "minApiVersion": 45
  },
  {
    "id": "GetDomainsByUsersByVideoContacts",
    "method": "GET",
    "path": "/domains/{domain}/users/{user}/video/contacts",
    "resource": "Meetings/Iotum",
    "summary": "Read Iotum Video Host Contacts",
    "description": "Read a Iotum Host",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  {
    "id": "GetDomainsByVideo",
    "method": "GET",
    "path": "/domains/{domain}/video",
    "resource": "Meetings/Iotum",
    "summary": "Read Iotum Video Company",
    "description": "Read a Iotum Company (domain)",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  {
    "id": "PutDomainsByVideo",
    "method": "PUT",
    "path": "/domains/{domain}/video",
    "resource": "Meetings/Iotum",
    "summary": "Update Domain's Iotum Company",
    "description": "Update the details of a Domain's Iotum Company",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": true,
    "minApiVersion": 45
  },
  {
    "id": "PostDomainsByVideo",
    "method": "POST",
    "path": "/domains/{domain}/video",
    "resource": "Meetings/Iotum",
    "summary": "Create Iotum Video Company",
    "description": "Read a Iotum Company (domain)",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": true,
    "minApiVersion": 45
  },
  {
    "id": "DeleteDomainsByVideo",
    "method": "DELETE",
    "path": "/domains/{domain}/video",
    "resource": "Meetings/Iotum",
    "summary": "Delete a Video Company",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  {
    "id": "GetDomainsByVideoProducts",
    "method": "GET",
    "path": "/domains/{domain}/video/products",
    "resource": "Meetings/Iotum",
    "summary": "Read Iotum Video Company Products",
    "description": "Read the products (plans and add-ons) a domain's company is currently using",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  {
    "id": "GetDomainsByVideoAvailableproducts",
    "method": "GET",
    "path": "/domains/{domain}/video/availableproducts",
    "resource": "Meetings/Iotum",
    "summary": "Read Iotum Video Available Products",
    "description": "Read all available products for the company via the reseller",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  {
    "id": "PostDomainsByUsersByHost",
    "method": "POST",
    "path": "/domains/{domain}/users/{user}/host",
    "resource": "Meetings/Iotum",
    "summary": "Create a Host",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": true,
    "minApiVersion": 45
  },
  {
    "id": "PutDomainsByUsersByHost",
    "method": "PUT",
    "path": "/domains/{domain}/users/{user}/host",
    "resource": "Meetings/Iotum",
    "summary": "Update User's Iotum Host",
    "description": "Update a user's Iotum Host.",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": true,
    "minApiVersion": 45
  },
  {
    "id": "DeleteDomainsByUsersByHost",
    "method": "DELETE",
    "path": "/domains/{domain}/users/{user}/host",
    "resource": "Meetings/Iotum",
    "summary": "Delete a Host",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  {
    "id": "PostDomainsByUsersByHostContacts",
    "method": "POST",
    "path": "/domains/{domain}/users/{user}/host/contacts",
    "resource": "Meetings/Iotum",
    "summary": "Create Host Contacts",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": true,
    "minApiVersion": 45
  },
  {
    "id": "PostDomainsByVideoSubscriptionBy",
    "method": "POST",
    "path": "/domains/{domain}/video/subscription/{slug}",
    "resource": "Meetings/Iotum",
    "summary": "Create Iotum Video Subscription",
    "description": "Create a Iotum video subscription to one of the available Iotum products for that company",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "slug",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true,
    "minApiVersion": 45
  },
  {
    "id": "DeleteDomainsByVideoSubscriptionBy",
    "method": "DELETE",
    "path": "/domains/{domain}/video/subscription/{slug}",
    "resource": "Meetings/Iotum",
    "summary": "Delete Iotum Video Subscription",
    "description": "Delete a subscription to a product for the domain's company.",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "slug",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  {
    "id": "PutDomainsByVideoSubscriptions",
    "method": "PUT",
    "path": "/domains/{domain}/video/subscriptions",
    "resource": "Meetings/Iotum",
    "summary": "Update Domain's Iotum Subscriptions",
    "description": "Update the plans and add-ons a domain's Iotum company is subscribed to.",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": true,
    "minApiVersion": 45
  },
  {
    "id": "PostDomainsByUsersByMeetingsBy",
    "method": "POST",
    "path": "/domains/{domain}/users/{user}/meetings/{id}",
    "resource": "Meetings",
    "summary": "Create a Meeting with Id",
    "description": "API v1 create meeting passing in newly requested meeting Id",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "id",
        "in": "path",
        "required": true,
        "description": "Meeting Id to create",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true
  },
  {
    "id": "GetDomainsByUsersByMeetingsBy",
    "method": "GET",
    "path": "/domains/{domain}/users/{user}/meetings/{id}",
    "resource": "Meetings",
    "summary": "Read Meeting",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "id",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false
  },
  {
    "id": "PostDomainsByUsersByMeetings",
    "method": "POST",
    "path": "/domains/{domain}/users/{user}/meetings",
    "resource": "Meetings",
    "summary": "Create a Meeting",
    "description": "Create a new meeting wit",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": true
  },
  {
    "id": "GetDomainsByUsersByMeetings",
    "method": "GET",
    "path": "/domains/{domain}/users/{user}/meetings",
    "resource": "Meetings",
    "summary": "Read Meetings for User",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": false
  },
  {
    "id": "GetDomainsByUsersByMeetingsCount",
    "method": "GET",
    "path": "/domains/{domain}/users/{user}/meetings/count",
    "resource": "Meetings",
    "summary": "Count Domains Meetings",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": false
  },
  {
    "id": "GetDomainsByUsersByMeetingsByCount",
    "method": "GET",
    "path": "/domains/{domain}/users/{user}/meetings/{meeting_id}/count",
    "resource": "Meetings",
    "summary": "Count Meeting",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "meeting_id",
        "in": "path",
        "required": true,
        "description": "Meeting Id which to query meeting total",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false
  },
  {
    "id": "PostMeetingsRegisterBy",
    "method": "POST",
    "path": "/meetings/register/{meeting_registration_id}",
    "resource": "Meetings",
    "summary": "Register Meeting",
    "description": "",
    "parameters": [
      {
        "name": "meeting_registration_id",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true
  },
  {
    "id": "PutDomainsByUsersByMeetingsBy",
    "method": "PUT",
    "path": "/domains/{domain}/users/{user}/meetings/{meeting}",
    "resource": "Meetings",
    "summary": "Update a Meeting",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "meeting",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true
  },
  {
    "id": "DeleteDomainsByUsersByMeetingsBy",
    "method": "DELETE",
    "path": "/domains/{domain}/users/{user}/meetings/{meeting}",
    "resource": "Meetings",
    "summary": "Delete a Meeting",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "meeting",
        "in": "path",
        "required": true,
        "description": "the meeting id to perfom the delete on",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true
  },
  {
    "id": "PostDomainsByUsersByMeetingsGetId",
    "method": "POST",
    "path": "/domains/{domain}/users/{user}/meetings/getId",
    "resource": "Meetings",
    "summary": "Request a Meeting ID",
    "description": "API v1 request Id prior to create meeting",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": false
  },
  {
    "id": "PostDomainsByBackup",
    "method": "POST",
    "path": "/domains/{domain}/backup",
    "resource": "Backup & Restore",
    "summary": "Manually Backup a Domain",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": false
  },
  {
    "id": "PostBackup",
    "method": "POST",
    "path": "/backup",
    "resource": "Backup & Restore",
    "summary": "Request a Full System backup",
    "description": "",
    "parameters": [],
    "hasRequestBody": false
  },
  {
    "id": "GetRestore",
    "method": "GET",
    "path": "/restore",
    "resource": "Backup & Restore",
    "summary": "Read Available Restore Points",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "query",
        "required": true,
        "description": ""
      },
      {
        "name": "hostname",
        "in": "query",
        "required": false,
        "description": "",
        "schemaType": "string"
      },
      {
        "name": "index",
        "in": "query",
        "required": false,
        "description": "",
        "schemaType": "string"
      },
      {
        "name": "type",
        "in": "query",
        "required": false,
        "description": "",
        "schemaType": "string"
      },
      {
        "name": "show-file-details",
        "in": "query",
        "required": false,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false
  },
  {
    "id": "PutRestore",
    "method": "PUT",
    "path": "/restore",
    "resource": "Backup & Restore",
    "summary": "Restore a Specifc Domain Backup",
    "description": "",
    "parameters": [],
    "hasRequestBody": true
  },
  {
    "id": "UpdateNsApiConfiguration",
    "method": "PUT",
    "path": "/nsconfigs",
    "resource": "Configs/Configurations/NS Configs",
    "summary": "Update a NS API Configuration",
    "description": "",
    "parameters": [],
    "hasRequestBody": true,
    "minApiVersion": 45
  },
  {
    "id": "CreateNsApiConfiguration",
    "method": "POST",
    "path": "/nsconfigs",
    "resource": "Configs/Configurations/NS Configs",
    "summary": "Create a NS API Configuration",
    "description": "Create a configuration for API or Portal nsconfig file",
    "parameters": [],
    "hasRequestBody": true,
    "minApiVersion": 45
  },
  {
    "id": "ReadAllNsApiConfigurations",
    "method": "GET",
    "path": "/nsconfigs",
    "resource": "Configs/Configurations/NS Configs",
    "summary": "Read all NS Api Configurations",
    "description": "",
    "parameters": [
      {
        "name": "local-only",
        "in": "query",
        "required": false,
        "description": "",
        "schemaType": "boolean"
      },
      {
        "name": "include-api",
        "in": "query",
        "required": false,
        "description": "",
        "schemaType": "boolean"
      },
      {
        "name": "include-portals",
        "in": "query",
        "required": false,
        "description": "",
        "schemaType": "boolean"
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  {
    "id": "DeleteNsApiConfiguration",
    "method": "DELETE",
    "path": "/nsconfigs",
    "resource": "Configs/Configurations/NS Configs",
    "summary": "Delete a NS API Configuration Copy",
    "description": "Delete a configuration for API or Portal nsconfig file",
    "parameters": [],
    "hasRequestBody": true,
    "minApiVersion": 45
  },
  {
    "id": "ReadSpecificConfiguration",
    "method": "GET",
    "path": "/configurations/{config-name}",
    "resource": "Configs/Configurations",
    "summary": "Read a Specific Configuration",
    "description": "",
    "parameters": [
      {
        "name": "config-name",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      },
      {
        "name": "domain",
        "in": "query",
        "required": false,
        "description": "This is the domain this configuration applies to. Defaults to search for \"*\""
      },
      {
        "name": "reseller",
        "in": "query",
        "required": false,
        "description": "This is the reseller or territory this configuration applies to. Defaults to search for \"*\"",
        "schemaType": "string"
      },
      {
        "name": "user",
        "in": "query",
        "required": false,
        "description": "This is the user this configuration applies to. Defaults to search for \"*\""
      },
      {
        "name": "core-server",
        "in": "query",
        "required": false,
        "description": "This is the hostname this configuration applies to. Defaults to search for \"*\"",
        "schemaType": "string"
      },
      {
        "name": "user-scope",
        "in": "query",
        "required": false,
        "description": "This is the user scope this configuration applies to. Defaults to search for \"*\"",
        "schemaType": "string"
      },
      {
        "name": "admin-ui-account-type",
        "in": "query",
        "required": false,
        "description": "This is the admin UI account this configuration applies to. Defaults to search for \"*\"",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false
  },
  {
    "id": "DeleteConfiguration",
    "method": "DELETE",
    "path": "/configurations/{config-name}",
    "resource": "Configs/Configurations",
    "summary": "Delete a Configuration",
    "description": "",
    "parameters": [
      {
        "name": "config-name",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true
  },
  {
    "id": "ReadAllConfigurations",
    "method": "GET",
    "path": "/configurations",
    "resource": "Configs/Configurations",
    "summary": "Read all Configurations",
    "description": "",
    "parameters": [],
    "hasRequestBody": false
  },
  {
    "id": "CreateConfiguration",
    "method": "POST",
    "path": "/configurations",
    "resource": "Configs/Configurations",
    "summary": "Create a Configuration",
    "description": "",
    "parameters": [],
    "hasRequestBody": true
  },
  {
    "id": "UpdateConfiguration",
    "method": "PUT",
    "path": "/configurations",
    "resource": "Configs/Configurations",
    "summary": "Update a Configuration",
    "description": "Update a configurution, must already exist or will get a 404. ",
    "parameters": [],
    "hasRequestBody": true
  },
  {
    "id": "GetConfigurationsCount",
    "method": "GET",
    "path": "/configurations/count",
    "resource": "Configs/Configurations",
    "summary": "Count Configurations",
    "description": "",
    "parameters": [
      {
        "name": "hostname",
        "in": "query",
        "required": false,
        "description": "Identify UI Configuration to count by its hostname",
        "schemaType": "string"
      },
      {
        "name": "reseller",
        "in": "query",
        "required": false,
        "description": "Identify UI Configuration to count by its reseller",
        "schemaType": "string"
      },
      {
        "name": "domain",
        "in": "query",
        "required": false,
        "description": "Identify UI Configuration to count by its domain"
      },
      {
        "name": "user",
        "in": "query",
        "required": false,
        "description": "Identify UI Configuration to count by its user"
      },
      {
        "name": "role",
        "in": "query",
        "required": false,
        "description": "Identify UI Configuration to count by its role",
        "schemaType": "string"
      },
      {
        "name": "login_type",
        "in": "query",
        "required": false,
        "description": "Identify UI Configuration to count by its login type",
        "schemaType": "string"
      },
      {
        "name": "config_name",
        "in": "query",
        "required": false,
        "description": "Identify UI Configuration to count by its name",
        "schemaType": "string"
      },
      {
        "name": "include_wildcards",
        "in": "query",
        "required": false,
        "description": "Set to true to also include wildcard (*) matches in the query results",
        "schemaType": "boolean"
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  {
    "id": "GetConfigDefinitions",
    "method": "GET",
    "path": "/config-definitions",
    "resource": "Configs/Configuration Definitions",
    "summary": "Read all Configuration Definitions",
    "description": "",
    "parameters": [],
    "hasRequestBody": false
  },
  {
    "id": "PostConfigDefinitions",
    "method": "POST",
    "path": "/config-definitions",
    "resource": "Configs/Configuration Definitions",
    "summary": "Create a Configuration Definition",
    "description": "",
    "parameters": [],
    "hasRequestBody": true
  },
  {
    "id": "GetConfigDefinitionsBy",
    "method": "GET",
    "path": "/config-definitions/{config-name}",
    "resource": "Configs/Configuration Definitions",
    "summary": "Read a Specific Configuration Definition",
    "description": "",
    "parameters": [
      {
        "name": "config-name",
        "in": "path",
        "required": true,
        "description": "To read definitions for all configurations, use \"*\"",
        "schemaType": "string"
      },
      {
        "name": "tags",
        "in": "query",
        "required": false,
        "description": "An optional comma seperated list of tags the definition to search has. To search all configs with the tags, set config-name to \"*\"",
        "schemaType": "string"
      },
      {
        "name": "start",
        "in": "query",
        "required": false,
        "description": ""
      },
      {
        "name": "limit",
        "in": "query",
        "required": false,
        "description": "Default to 100"
      },
      {
        "name": "sort",
        "in": "query",
        "required": false,
        "description": "Defaults to \"code_version desc,config_name asc\"",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false
  },
  {
    "id": "PutConfigDefinitionsBy",
    "method": "PUT",
    "path": "/config-definitions/{config-name}",
    "resource": "Configs/Configuration Definitions",
    "summary": "Update a Configuration Definition",
    "description": "",
    "parameters": [
      {
        "name": "config-name",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true
  },
  {
    "id": "DeleteConfigDefinitionsBy",
    "method": "DELETE",
    "path": "/config-definitions/{config-name}",
    "resource": "Configs/Configuration Definitions",
    "summary": "Delete Configuration Definition",
    "description": "This will delete the configuration definition and all configurations that match the name.",
    "parameters": [
      {
        "name": "config-name",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false
  },
  {
    "id": "ReadImage",
    "method": "GET",
    "path": "/images/{filename}",
    "resource": "Images",
    "summary": "Read Image",
    "description": "Read an image file",
    "parameters": [
      {
        "name": "filename",
        "in": "path",
        "required": true,
        "description": "The name of the image file.",
        "schemaType": "string"
      },
      {
        "name": "reseller",
        "in": "query",
        "required": true,
        "description": "",
        "schemaType": "string"
      },
      {
        "name": "domain",
        "in": "query",
        "required": true,
        "description": ""
      },
      {
        "name": "server",
        "in": "query",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false
  },
  {
    "id": "CreateImageBase64",
    "method": "POST",
    "path": "/images/{filename}",
    "resource": "Images",
    "summary": "Create Image from Upload (JSON + Base64 File)",
    "description": "Create an image file",
    "parameters": [
      {
        "name": "filename",
        "in": "path",
        "required": true,
        "description": "The name of the image file.",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true
  },
  {
    "id": "DeleteImage",
    "method": "DELETE",
    "path": "/images/{filename}",
    "resource": "Images",
    "summary": "Delete an Image",
    "description": "Delete an image file",
    "parameters": [
      {
        "name": "filename",
        "in": "path",
        "required": true,
        "description": "The name of the image file.",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true
  },
  {
    "id": "UpdateImageFileUpload",
    "method": "PUT",
    "path": "/images/{filename}",
    "resource": "Images",
    "summary": "Update Image from Upload (Multipart/Mixed Post)",
    "description": "Update an image file",
    "parameters": [
      {
        "name": "filename",
        "in": "path",
        "required": true,
        "description": "The name of the image file.",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true
  },
  {
    "id": "CreateImageFileUpload",
    "method": "POST",
    "path": "/images/{filename}",
    "resource": "Images",
    "summary": "Create Image from Upload (Multipart/Mixed Post)",
    "description": "Create an image file",
    "parameters": [
      {
        "name": "filename",
        "in": "path",
        "required": true,
        "description": "The name of the image file.",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true
  },
  {
    "id": "UpdateImageBase64",
    "method": "PUT",
    "path": "/images/{filename}",
    "resource": "Images",
    "summary": "Update Image from Upload (JSON + Base64 File)",
    "description": "Update an image file",
    "parameters": [
      {
        "name": "filename",
        "in": "path",
        "required": true,
        "description": "The name of the image file.",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true
  },
  {
    "id": "ReadTemplate",
    "method": "GET",
    "path": "/templates/{filename}",
    "resource": "Templates",
    "summary": "Read Template",
    "description": "Read a template file",
    "parameters": [
      {
        "name": "filename",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      },
      {
        "name": "reseller",
        "in": "query",
        "required": false,
        "description": "The reseller or territory the template file applies to. Defaults to \"*\"",
        "schemaType": "string"
      },
      {
        "name": "domain",
        "in": "query",
        "required": false,
        "description": "The domain the template file applies to. Defaults to \"*\""
      },
      {
        "name": "server",
        "in": "query",
        "required": false,
        "description": "The server the template file applies to. Defaults to \"*\"",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false
  },
  {
    "id": "CreateTemplateBase64",
    "method": "POST",
    "path": "/templates/{filename}",
    "resource": "Templates",
    "summary": "Create Template from Upload (JSON + Base64 File)",
    "description": "Create a template file",
    "parameters": [
      {
        "name": "filename",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true
  },
  {
    "id": "DeleteTemplate",
    "method": "DELETE",
    "path": "/templates/{filename}",
    "resource": "Templates",
    "summary": "Delete a Template",
    "description": "Delete a template file",
    "parameters": [
      {
        "name": "filename",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true
  },
  {
    "id": "UpdateTemplateBase64",
    "method": "PUT",
    "path": "/templates/{filename}",
    "resource": "Templates",
    "summary": "Update Template from Upload (JSON + Base64 File)",
    "description": "Update a template file",
    "parameters": [
      {
        "name": "filename",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true
  },
  {
    "id": "PostDomainsByTimeframes",
    "method": "POST",
    "path": "/domains/{domain}/timeframes",
    "resource": "Timeframes/Domain (Shared)/Always",
    "summary": "Create Always Timeframe",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": true
  },
  {
    "id": "GetDomainsByTimeframes",
    "method": "GET",
    "path": "/domains/{domain}/timeframes",
    "resource": "Timeframes/Domain (Shared)",
    "summary": "Read All Timeframes for Domain (Shared)",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": false
  },
  {
    "id": "PostDomainsByTimeframes_2",
    "method": "POST",
    "path": "/domains/{domain}/timeframes",
    "resource": "Timeframes/Domain (Shared)/Specific Dates",
    "summary": "Create Specific Dates Timeframe",
    "description": "When creating a Specific Dates timeframe it is not necessary to supply a ```timeframe-id``` for the timeframe or for the date ranges within that timeframe. These ```timeframe-id```s will be generated automatically.",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": true
  },
  {
    "id": "PostDomainsByTimeframesBy",
    "method": "POST",
    "path": "/domains/{domain}/timeframes/{id}",
    "resource": "Timeframes/Domain (Shared)/Specific Dates",
    "summary": "Create Additional Date Ranges within Specific Dates Timeframe",
    "description": "When creating additional date ranges within a Specific Dates timeframe it is not necessary to supply a ```timeframe-id``` for the new date ranges. These ```timeframe-id```s will be generated automatically.",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "id",
        "in": "path",
        "required": true,
        "description": "```timeframe-id``` for the timeframe to modify",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true,
    "minApiVersion": 45
  },
  {
    "id": "PutDomainsByTimeframesBy",
    "method": "PUT",
    "path": "/domains/{domain}/timeframes/{id}",
    "resource": "Timeframes/Domain (Shared)/Specific Dates",
    "summary": "Replace All Date Ranges in Specific Dates Timeframe",
    "description": "If a new array of specific date ranges is supplied in the update request for a Specific Dates timeframe, it will replace all existing specific date ranges in the timeframe, meaning that any existing specific date ranges in that timeframe will be removed. To update individual specific date ranges within a Specific Dates timeframe, refer to \"Update Date Ranges within Specific Dates Timeframe.\" It is not necessary to supply a ```timeframe-id``` for the new date ranges. These ```timeframe-id```s will be generated automatically.",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "id",
        "in": "path",
        "required": true,
        "description": "```timeframe-id``` of the timeframe to modify",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true,
    "minApiVersion": 45
  },
  {
    "id": "DeleteDomainsByTimeframesBy",
    "method": "DELETE",
    "path": "/domains/{domain}/timeframes/{id}",
    "resource": "Timeframes/Domain (Shared)/Specific Dates",
    "summary": "Delete Date Range within Specific Dates Timeframe",
    "description": "In order to delete a date range within a Specific Dates timeframe, supply the ```timeframe-id``` of the particular range to be deleted as the parameter ```child_id``` within the request.",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "id",
        "in": "path",
        "required": true,
        "description": "```timeframe-id``` of the timeframe to modify",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true,
    "minApiVersion": 45
  },
  {
    "id": "GetDomainsByTimeframesBy",
    "method": "GET",
    "path": "/domains/{domain}/timeframes/{id}",
    "resource": "Timeframes/Domain (Shared)",
    "summary": "Read Specific Timeframe for Domain (Shared)",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "id",
        "in": "path",
        "required": true,
        "description": "```timeframe-id``` of the timeframe to read",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  {
    "id": "PutDomainsByTimeframesBy_2",
    "method": "PUT",
    "path": "/domains/{domain}/timeframes/{id}",
    "resource": "Timeframes/Domain (Shared)/Specific Dates",
    "summary": "Update Date Ranges within Specific Dates Timeframe",
    "description": "In order to update date ranges within a Specific Dates timeframe, include the parameter ```update_only``` and provide within the array ```timeframe-specific-dates-array``` the new values for the date ranges you intend to update, including in each date range the associated ```timeframe-id``` for that range. If any date ranges are missing the ```timeframe-id``` parameter, it may result in undesired behavior.\n\n\nThe value for ```update-only``` must be set to ```yes``` for this operation to succeed as desired. If any other value is supplied or the parameter ```update-only``` is omitted, it will result in the behavior described in \"Replace All Date Ranges in Specific Dates Timeframe\" - see examples for more information.",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "id",
        "in": "path",
        "required": true,
        "description": "```timeframe-id``` of the timeframe to modify",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true,
    "minApiVersion": 45
  },
  {
    "id": "PostDomainsByTimeframesBy_2",
    "method": "POST",
    "path": "/domains/{domain}/timeframes/{id}",
    "resource": "Timeframes/Domain (Shared)/Holiday",
    "summary": "Create Additional Holidays within Holiday Timeframe",
    "description": "When creating additional holidays within a Holiday timeframe it is not necessary to supply a ```timeframe-id``` for the new holidays. These ```timeframe-id```s will be generated automatically.",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "id",
        "in": "path",
        "required": true,
        "description": "```timeframe-id``` of the timeframe to modify",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true,
    "minApiVersion": 45
  },
  {
    "id": "DeleteDomainsByTimeframesBy_2",
    "method": "DELETE",
    "path": "/domains/{domain}/timeframes/{id}",
    "resource": "Timeframes/Domain (Shared)/Holiday",
    "summary": "Delete Holiday within Holiday Timeframe",
    "description": "In order to delete a holiday within a Holidays timeframe, supply the ```timeframe-id``` of the particular holiday to be deleted as the parameter ```child_id``` within the request.",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "id",
        "in": "path",
        "required": true,
        "description": "```timeframe-id``` of the timeframe to modify",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true,
    "minApiVersion": 45
  },
  {
    "id": "PostDomainsByTimeframes_3",
    "method": "POST",
    "path": "/domains/{domain}/timeframes",
    "resource": "Timeframes/Domain (Shared)/Days of Week",
    "summary": "Create Days of Week Timeframe",
    "description": "A Days of Week timeframe consists of a single Days of Week entry within the ```timeframe-day-of-week-array``` array inside the timeframe. In order to create a Days of Week timeframe, supply a single new Days of Week entry object within the ```timeframe-day-of-week-array``` array in the create request. See examples for more information.\n\nWhen creating a Days of Week timeframe it is not necessary to supply a ```timeframe-id``` for the timeframe or for the Days of Week entry within that timeframe. These ```timeframe-id```s will be generated automatically.",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": true
  },
  {
    "id": "PutDomainsByTimeframesBy_3",
    "method": "PUT",
    "path": "/domains/{domain}/timeframes/{id}",
    "resource": "Timeframes/Domain (Shared)/Days of Week",
    "summary": "Update Days of Week Timeframe",
    "description": "A Days of Week timeframe consists of a single Days of Week entry within the ```timeframe-day-of-week-array``` array inside the timeframe. In order to update a Days of Week timeframe, supply a single new Days of Week entry object within the ```timeframe-day-of-week-array``` array in the update request. It is not necessary to supply a ```timeframe-id``` for the new Days of Week entry. The ```timeframe-id``` will be generated automatically. See examples for more information.\n\nThe value for ```update-only``` must be set to ```yes``` for this operation to succeed as desired. If any other value is supplied or the parameter ```update-only``` is omitted, undesired behavior will occur.",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "id",
        "in": "path",
        "required": true,
        "description": "```timeframe-id``` of the timeframe to modify",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true,
    "minApiVersion": 45
  },
  {
    "id": "PostDomainsByTimeframesBy_3",
    "method": "POST",
    "path": "/domains/{domain}/timeframes/{id}",
    "resource": "Timeframes/Domain (Shared)/Custom",
    "summary": "Create Additional Entries within Custom Timeframe",
    "description": "When creating additional entries within a Custom timeframe it is not necessary to supply a ```timeframe-id``` for the new entries. These ```timeframe-id```s will be generated automatically.",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "id",
        "in": "path",
        "required": true,
        "description": "```timeframe-id``` of the timeframe to modify",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true,
    "minApiVersion": 45
  },
  {
    "id": "DeleteDomainsByTimeframesBy_3",
    "method": "DELETE",
    "path": "/domains/{domain}/timeframes/{id}",
    "resource": "Timeframes/Domain (Shared)/Custom",
    "summary": "Delete Entry within Custom Timeframe",
    "description": "In order to delete an entry within a Custom timeframe, supply the ```timeframe-id``` of the particular entry to be deleted as the parameter ```child_id``` within the request.",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "id",
        "in": "path",
        "required": true,
        "description": "```timeframe-id``` of the timeframe to modify",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true,
    "minApiVersion": 45
  },
  {
    "id": "PostDomainsByTimeframes_4",
    "method": "POST",
    "path": "/domains/{domain}/timeframes",
    "resource": "Timeframes/Domain (Shared)/Holiday",
    "summary": "Create Holidays Timeframe",
    "description": "When creating a Holiday timeframe it is not necessary to supply a ```timeframe-id``` for the timeframe or for the holidays within that timeframe. These ```timeframe-id```s will be generated automatically.",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": true
  },
  {
    "id": "PutDomainsByTimeframesBy_4",
    "method": "PUT",
    "path": "/domains/{domain}/timeframes/{id}",
    "resource": "Timeframes/Domain (Shared)/Holiday",
    "summary": "Replace All Holidays in Holiday Timeframe",
    "description": "If a new array of holiday objects is supplied in the update request for a Holidays timeframe, it will replace all existing holidays in the timeframe, meaning that any existing holidays in that timeframe will be removed. To update individual holidays within a Holiday timeframe, refer to \"Update Holidays within Holiday Timeframe.\" It is not necessary to supply a ```timeframe-id``` for the new holidays. These ```timeframe-id```s will be generated automatically.",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "id",
        "in": "path",
        "required": true,
        "description": "```timeframe-id``` of the timeframe to modify",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true,
    "minApiVersion": 45
  },
  {
    "id": "DeleteDomainsByTimeframesBy_4",
    "method": "DELETE",
    "path": "/domains/{domain}/timeframes/{id}",
    "resource": "Timeframes/Domain (Shared)",
    "summary": "Delete Specific Timeframe for Domain (Shared)",
    "description": "A timeframe can be deleted via its ID. Any answering rules will become invalid upon deleting their associated timeframe and will cease to function.",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "id",
        "in": "path",
        "required": true,
        "description": "```timeframe-id``` of the timeframe to delete",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  {
    "id": "PutDomainsByTimeframesBy_5",
    "method": "PUT",
    "path": "/domains/{domain}/timeframes/{id}",
    "resource": "Timeframes/Domain (Shared)/Holiday",
    "summary": "Update Holidays within Holiday Timeframe",
    "description": "In order to update holidays within a Holiday timeframe, include the parameter ```update_only``` and provide within the array ```timeframe-holiday-array``` the new values for the holidays you intend to update, including in each holiday object the associated ```timeframe-id``` for that holiday. If any holidays are missing the ```timeframe-id``` parameter, it may result in undesired behavior.\n\nThe value for ```update-only``` must be set to ```yes``` for this operation to succeed as desired. If any other value is supplied or the parameter ```update-only``` is omitted, it will result in the behavior described in \"Replace All Holidays in Holiday Timeframe\" - see examples for more information.\n\nIMPORTANT:\nUpdates to holidays are limited to workweek, observance configurations, time-of-day configurations, and recurrence. To add a different holiday, remove the existing holiday and then create the desired holiday.",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "id",
        "in": "path",
        "required": true,
        "description": "```timeframe-id``` of the timeframe to modify",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true,
    "minApiVersion": 45
  },
  {
    "id": "PostDomainsByTimeframes_5",
    "method": "POST",
    "path": "/domains/{domain}/timeframes",
    "resource": "Timeframes/Domain (Shared)/Custom",
    "summary": "Create Custom Timeframe",
    "description": "When creating a Custom timeframe it is not necessary to supply a ```timeframe-id``` for the timeframe or for the entries within that timeframe. These ```timeframe-id```s will be generated automatically.",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": true
  },
  {
    "id": "PutDomainsByTimeframesBy_6",
    "method": "PUT",
    "path": "/domains/{domain}/timeframes/{id}",
    "resource": "Timeframes/Domain (Shared)/Custom",
    "summary": "Replace All Entries in Custom Timeframe",
    "description": "If a new array of entries is supplied in the update request for a Custom timeframe, it will replace all existing entries in the timeframe, meaning that any existing entries in that timeframe will be removed. To update individual entries within a Custom timeframe, refer to \"Update Entries within Custom Timeframe.\" It is not necessary to supply a ```timeframe-id``` for the new holidays. These ```timeframe-id```s will be generated automatically.",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "id",
        "in": "path",
        "required": true,
        "description": "```timeframe-id``` of the timeframe to modify",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true,
    "minApiVersion": 45
  },
  {
    "id": "PutDomainsByTimeframesBy_7",
    "method": "PUT",
    "path": "/domains/{domain}/timeframes/{id}",
    "resource": "Timeframes/Domain (Shared)/Custom",
    "summary": "Update Entries within Custom Timeframe",
    "description": "In order to update entries within a Custom timeframe, include the parameter ```update_only``` and provide within the arrays ```timeframe-specific-dates-array```, ```timeframe-day-of-week-array```, and/or ```timeframe-holiday-array``` the new values for the entries you intend to update, including in each entry the associated ```timeframe-id``` for that entry. If any entries are missing the ```timeframe-id``` parameter, it may result in undesired behavior.\n\nThe value for ```update-only``` must be set to ```yes``` for this operation to succeed as desired. If any other value is supplied or the parameter ```update-only``` is omitted, it will result in the behavior described in \"Replace All Entries in Custom Timeframe\" - see examples for more information.",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "id",
        "in": "path",
        "required": true,
        "description": "```timeframe-id``` of the timeframe to modify",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true,
    "minApiVersion": 45
  },
  {
    "id": "PutDomainsByTimeframesBy_8",
    "method": "PUT",
    "path": "/domains/{domain}/timeframes/{id}",
    "resource": "Timeframes/Domain (Shared)",
    "summary": "Convert Timeframe to Another Type",
    "description": "It is possible to convert a timeframe from one type to another, e.g. from Holiday to Specific Dates or from Days of Week to Custom.\n\nIt is not possible to convert a Custom timeframe to any other type.\n \nConverting Specific Dates, Days of Week, or Holiday to Custom will result in a Custom timeframe which contains any entries which existed in the time frame before conversion.\n \nConverting Always to Custom will result in an empty Custom timeframe to which desired entries can then be added.\n \nConverting between any non-Custom types will result in losing those entries (for instance, converting Specific Dates to Days of Week will delete any date ranges in the timeframe)",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "id",
        "in": "path",
        "required": true,
        "description": "```timeframe-id``` of the timeframe to convert the type of",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true,
    "minApiVersion": 45
  },
  {
    "id": "PostDomainsByUsersByTimeframes",
    "method": "POST",
    "path": "/domains/{domain}/users/{user}/timeframes",
    "resource": "Timeframes/User/Always",
    "summary": "Create Always Timeframe",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": true
  },
  {
    "id": "GetDomainsByUsersByTimeframes",
    "method": "GET",
    "path": "/domains/{domain}/users/{user}/timeframes",
    "resource": "Timeframes/User",
    "summary": "Read All Timeframes for User",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": false
  },
  {
    "id": "PostDomainsByUsersByTimeframes_2",
    "method": "POST",
    "path": "/domains/{domain}/users/{user}/timeframes",
    "resource": "Timeframes/User/Specific Dates",
    "summary": "Create Specific Dates Timeframe",
    "description": "When creating a Specific Dates timeframe it is not necessary to supply a ```timeframe-id``` for the timeframe or for the date ranges within that timeframe. These ```timeframe-id```s will be generated automatically.",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": true
  },
  {
    "id": "PostDomainsByUsersByTimeframesBy",
    "method": "POST",
    "path": "/domains/{domain}/users/{user}/timeframes/{id}",
    "resource": "Timeframes/User/Specific Dates",
    "summary": "Create Additional Date Ranges within Specific Dates Timeframe",
    "description": "When creating additional date ranges within a Specific Dates timeframe it is not necessary to supply a ```timeframe-id``` for the new date ranges. These ```timeframe-id```s will be generated automatically.",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "id",
        "in": "path",
        "required": true,
        "description": "```timeframe-id``` for the timeframe to modify",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true,
    "minApiVersion": 45
  },
  {
    "id": "PutDomainsByUsersByTimeframesBy",
    "method": "PUT",
    "path": "/domains/{domain}/users/{user}/timeframes/{id}",
    "resource": "Timeframes/User/Specific Dates",
    "summary": "Replace All Date Ranges in Specific Dates Timeframe",
    "description": "If a new array of specific date ranges is supplied in the update request for a Specific Dates timeframe, it will replace all existing specific date ranges in the timeframe, meaning that any existing specific date ranges in that timeframe will be removed. To update individual specific date ranges within a Specific Dates timeframe, refer to \"Update Date Ranges within Specific Dates Timeframe.\" It is not necessary to supply a ```timeframe-id``` for the new date ranges. These ```timeframe-id```s will be generated automatically.",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "id",
        "in": "path",
        "required": true,
        "description": "```timeframe-id``` of the timeframe to modify",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true,
    "minApiVersion": 45
  },
  {
    "id": "DeleteDomainsByUsersByTimeframesBy",
    "method": "DELETE",
    "path": "/domains/{domain}/users/{user}/timeframes/{id}",
    "resource": "Timeframes/User/Specific Dates",
    "summary": "Delete Date Range within Specific Dates Timeframe",
    "description": "In order to delete a date range within a Specific Dates timeframe, supply the ```timeframe-id``` of the particular range to be deleted as the parameter ```child_id``` within the request.",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "id",
        "in": "path",
        "required": true,
        "description": "```timeframe-id``` of the timeframe to modify",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true,
    "minApiVersion": 45
  },
  {
    "id": "GetDomainsByUsersByTimeframesBy",
    "method": "GET",
    "path": "/domains/{domain}/users/{user}/timeframes/{id}",
    "resource": "Timeframes/User",
    "summary": "Read Specific Timeframe for User",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "id",
        "in": "path",
        "required": true,
        "description": "```timeframe-id``` of the timeframe to read",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  {
    "id": "PutDomainsByUsersByTimeframesBy_2",
    "method": "PUT",
    "path": "/domains/{domain}/users/{user}/timeframes/{id}",
    "resource": "Timeframes/User/Specific Dates",
    "summary": "Update Date Ranges within Specific Dates Timeframe",
    "description": "In order to update date ranges within a Specific Dates timeframe, include the parameter ```update_only``` and provide within the array ```timeframe-specific-dates-array``` the new values for the date ranges you intend to update, including in each date range the associated ```timeframe-id``` for that range. If any date ranges are missing the ```timeframe-id``` parameter, it may result in undesired behavior.\n\n\nThe value for ```update-only``` must be set to ```yes``` for this operation to succeed as desired. If any other value is supplied or the parameter ```update-only``` is omitted, it will result in the behavior described in \"Replace All Date Ranges in Specific Dates Timeframe\" - see examples for more information.",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "id",
        "in": "path",
        "required": true,
        "description": "```timeframe-id``` of the timeframe to modify",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true,
    "minApiVersion": 45
  },
  {
    "id": "PostDomainsByUsersByTimeframesBy_2",
    "method": "POST",
    "path": "/domains/{domain}/users/{user}/timeframes/{id}",
    "resource": "Timeframes/User/Holiday",
    "summary": "Create Additional Holidays within Holiday Timeframe",
    "description": "When creating additional holidays within a Holiday timeframe it is not necessary to supply a ```timeframe-id``` for the new holidays. These ```timeframe-id```s will be generated automatically.",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "id",
        "in": "path",
        "required": true,
        "description": "```timeframe-id``` of the timeframe to modify",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true,
    "minApiVersion": 45
  },
  {
    "id": "DeleteDomainsByUsersByTimeframesBy_2",
    "method": "DELETE",
    "path": "/domains/{domain}/users/{user}/timeframes/{id}",
    "resource": "Timeframes/User/Holiday",
    "summary": "Delete Holiday within Holiday Timeframe",
    "description": "In order to delete a holiday within a Holidays timeframe, supply the ```timeframe-id``` of the particular holiday to be deleted as the parameter ```child_id``` within the request.",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "id",
        "in": "path",
        "required": true,
        "description": "```timeframe-id``` of the timeframe to modify",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true,
    "minApiVersion": 45
  },
  {
    "id": "PostDomainsByUsersByTimeframes_3",
    "method": "POST",
    "path": "/domains/{domain}/users/{user}/timeframes",
    "resource": "Timeframes/User/Days of Week",
    "summary": "Create Days of Week Timeframe",
    "description": "A Days of Week timeframe consists of a single Days of Week entry within the ```timeframe-day-of-week-array``` array inside the timeframe. In order to create a Days of Week timeframe, supply a single new Days of Week entry object within the ```timeframe-day-of-week-array``` array in the create request. See examples for more information.\n\nWhen creating a Days of Week timeframe it is not necessary to supply a ```timeframe-id``` for the timeframe or for the Days of Week entry within that timeframe. These ```timeframe-id```s will be generated automatically.",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": true
  },
  {
    "id": "PutDomainsByUsersByTimeframesBy_3",
    "method": "PUT",
    "path": "/domains/{domain}/users/{user}/timeframes/{id}",
    "resource": "Timeframes/User/Days of Week",
    "summary": "Update Days of Week Timeframe",
    "description": "A Days of Week timeframe consists of a single Days of Week entry within the ```timeframe-day-of-week-array``` array inside the timeframe. In order to update a Days of Week timeframe, supply a single new Days of Week entry object within the ```timeframe-day-of-week-array``` array in the update request. It is not necessary to supply a ```timeframe-id``` for the new Days of Week entry. The ```timeframe-id``` will be generated automatically. See examples for more information.\n\nThe value for ```update-only``` must be set to ```yes``` for this operation to succeed as desired. If any other value is supplied or the parameter ```update-only``` is omitted, undesired behavior will occur.",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "id",
        "in": "path",
        "required": true,
        "description": "```timeframe-id``` of the timeframe to modify",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true,
    "minApiVersion": 45
  },
  {
    "id": "PostDomainsByUsersByTimeframesBy_3",
    "method": "POST",
    "path": "/domains/{domain}/users/{user}/timeframes/{id}",
    "resource": "Timeframes/User/Custom",
    "summary": "Create Additional Entries within Custom Timeframe",
    "description": "When creating additional entries within a Custom timeframe it is not necessary to supply a ```timeframe-id``` for the new entries. These ```timeframe-id```s will be generated automatically.",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "id",
        "in": "path",
        "required": true,
        "description": "```timeframe-id``` of the timeframe to modify",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true,
    "minApiVersion": 45
  },
  {
    "id": "DeleteDomainsByUsersByTimeframesBy_3",
    "method": "DELETE",
    "path": "/domains/{domain}/users/{user}/timeframes/{id}",
    "resource": "Timeframes/User/Custom",
    "summary": "Delete Entry within Custom Timeframe",
    "description": "In order to delete an entry within a Custom timeframe, supply the ```timeframe-id``` of the particular entry to be deleted as the parameter ```child_id``` within the request.",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "id",
        "in": "path",
        "required": true,
        "description": "```timeframe-id``` of the timeframe to modify",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true,
    "minApiVersion": 45
  },
  {
    "id": "PostDomainsByUsersByTimeframes_4",
    "method": "POST",
    "path": "/domains/{domain}/users/{user}/timeframes",
    "resource": "Timeframes/User/Holiday",
    "summary": "Create Holidays Timeframe",
    "description": "When creating a Holiday timeframe it is not necessary to supply a ```timeframe-id``` for the timeframe or for the holidays within that timeframe. These ```timeframe-id```s will be generated automatically.",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": true
  },
  {
    "id": "PutDomainsByUsersByTimeframesBy_4",
    "method": "PUT",
    "path": "/domains/{domain}/users/{user}/timeframes/{id}",
    "resource": "Timeframes/User/Holiday",
    "summary": "Update Holidays within Holiday Timeframe",
    "description": "In order to update holidays within a Holiday timeframe, include the parameter ```update_only``` and provide within the array ```timeframe-holiday-array``` the new values for the holidays you intend to update, including in each holiday object the associated ```timeframe-id``` for that holiday. If any holidays are missing the ```timeframe-id``` parameter, it may result in undesired behavior.\n\nThe value for ```update-only``` must be set to ```yes``` for this operation to succeed as desired. If any other value is supplied or the parameter ```update-only``` is omitted, it will result in the behavior described in \"Replace All Holidays in Holiday Timeframe\" - see examples for more information.\n\nIMPORTANT:\nUpdates to holidays are limited to workweek, observance configurations, time-of-day configurations, and recurrence. To add a different holiday, remove the existing holiday and then create the desired holiday.",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "id",
        "in": "path",
        "required": true,
        "description": "```timeframe-id``` of the timeframe to modify",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true,
    "minApiVersion": 45
  },
  {
    "id": "DeleteDomainsByUsersByTimeframesBy_4",
    "method": "DELETE",
    "path": "/domains/{domain}/users/{user}/timeframes/{id}",
    "resource": "Timeframes/User",
    "summary": "Delete Specific Timeframe for User",
    "description": "A timeframe can be deleted via its ID. Any answering rules will become invalid upon deleting their associated timeframe and will cease to function.",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "id",
        "in": "path",
        "required": true,
        "description": "```timeframe-id``` of the timeframe to delete",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  {
    "id": "PutDomainsByUsersByTimeframesBy_5",
    "method": "PUT",
    "path": "/domains/{domain}/users/{user}/timeframes/{id}",
    "resource": "Timeframes/User/Holiday",
    "summary": "Replace All Holidays in Holiday Timeframe",
    "description": "If a new array of holiday objects is supplied in the update request for a Holidays timeframe, it will replace all existing holidays in the timeframe, meaning that any existing holidays in that timeframe will be removed. To update individual holidays within a Holiday timeframe, refer to \"Update Holidays within Holiday Timeframe.\" It is not necessary to supply a ```timeframe-id``` for the new holidays. These ```timeframe-id```s will be generated automatically.",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "id",
        "in": "path",
        "required": true,
        "description": "```timeframe-id``` of the timeframe to modify",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true,
    "minApiVersion": 45
  },
  {
    "id": "PostDomainsByUsersByTimeframes_5",
    "method": "POST",
    "path": "/domains/{domain}/users/{user}/timeframes",
    "resource": "Timeframes/User/Custom",
    "summary": "Create Custom Timeframe",
    "description": "When creating a Custom timeframe it is not necessary to supply a ```timeframe-id``` for the timeframe or for the entries within that timeframe. These ```timeframe-id```s will be generated automatically.",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": true
  },
  {
    "id": "PutDomainsByUsersByTimeframesBy_6",
    "method": "PUT",
    "path": "/domains/{domain}/users/{user}/timeframes/{id}",
    "resource": "Timeframes/User/Custom",
    "summary": "Update Entries within Custom Timeframe",
    "description": "In order to update entries within a Custom timeframe, include the parameter ```update_only``` and provide within the arrays ```timeframe-specific-dates-array```, ```timeframe-day-of-week-array```, and/or ```timeframe-holiday-array``` the new values for the entries you intend to update, including in each entry the associated ```timeframe-id``` for that entry. If any entries are missing the ```timeframe-id``` parameter, it may result in undesired behavior.\n\nThe value for ```update-only``` must be set to ```yes``` for this operation to succeed as desired. If any other value is supplied or the parameter ```update-only``` is omitted, it will result in the behavior described in \"Replace All Entries in Custom Timeframe\" - see examples for more information.",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "id",
        "in": "path",
        "required": true,
        "description": "```timeframe-id``` of the timeframe to modify",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true,
    "minApiVersion": 45
  },
  {
    "id": "PutDomainsByUsersByTimeframesBy_7",
    "method": "PUT",
    "path": "/domains/{domain}/users/{user}/timeframes/{id}",
    "resource": "Timeframes/User/Custom",
    "summary": "Replace All Entries in Custom Timeframe",
    "description": "If a new array of entries is supplied in the update request for a Custom timeframe, it will replace all existing entries in the timeframe, meaning that any existing entries in that timeframe will be removed. To update individual entries within a Custom timeframe, refer to \"Update Entries within Custom Timeframe.\" It is not necessary to supply a ```timeframe-id``` for the new holidays. These ```timeframe-id```s will be generated automatically.",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "id",
        "in": "path",
        "required": true,
        "description": "```timeframe-id``` of the timeframe to modify",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true,
    "minApiVersion": 45
  },
  {
    "id": "Delete",
    "method": "DELETE",
    "path": "/",
    "resource": "Timeframes/User",
    "summary": "Delete All Timeframes for User",
    "description": "",
    "parameters": [],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  {
    "id": "PutDomainsByUsersByTimeframesBy_8",
    "method": "PUT",
    "path": "/domains/{domain}/users/{user}/timeframes/{id}",
    "resource": "Timeframes/User",
    "summary": "Convert Timeframe to Another Type",
    "description": "It is possible to convert a timeframe from one type to another, e.g. from Holiday to Specific Dates or from Days of Week to Custom.\n\nIt is not possible to convert a Custom timeframe to any other type.\n \nConverting Specific Dates, Days of Week, or Holiday to Custom will result in a Custom timeframe which contains any entries which existed in the time frame before conversion.\n \nConverting Always to Custom will result in an empty Custom timeframe to which desired entries can then be added.\n \nConverting between any non-Custom types will result in losing those entries (for instance, converting Specific Dates to Days of Week will delete any date ranges in the timeframe)",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "id",
        "in": "path",
        "required": true,
        "description": "```timeframe-id``` of the timeframe to convert the type of",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true,
    "minApiVersion": 45
  },
  {
    "id": "GetHolidaysCountries",
    "method": "GET",
    "path": "/holidays/countries",
    "resource": "Timeframes/Holiday Information",
    "summary": "Read List of Supported Countries",
    "description": "Retrieve a list of supported country codes to be used when reading holiday information.",
    "parameters": [],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  {
    "id": "GetHolidaysRegions",
    "method": "GET",
    "path": "/holidays/regions",
    "resource": "Timeframes/Holiday Information",
    "summary": "Read List of Supported Regions",
    "description": "Retrieve a list of supported region codes by country, to be used when reading holiday information.",
    "parameters": [],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  {
    "id": "GetHolidaysByBy",
    "method": "GET",
    "path": "/holidays/{country}/{year}",
    "resource": "Timeframes/Holiday Information",
    "summary": "Read Holiday Information by Country",
    "description": "In order to create holidays in a Holiday timeframe or a Custom timeframe, it is necessary to supply a series of parameters for each holiday that can be obtained via this endpoint.",
    "parameters": [
      {
        "name": "country",
        "in": "path",
        "required": true,
        "description": "The country from which to read holidays - format: ISO-3166 A-2",
        "schemaType": "string"
      },
      {
        "name": "year",
        "in": "path",
        "required": true,
        "description": "The year in which to read holidays - format: YYYY",
        "schemaType": "string"
      },
      {
        "name": "language",
        "in": "query",
        "required": false,
        "description": "Language formatted according to ISO 639-1",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true,
    "minApiVersion": 45
  },
  {
    "id": "GetHolidaysByByBy",
    "method": "GET",
    "path": "/holidays/{country}/{region}/{year}",
    "resource": "Timeframes/Holiday Information",
    "summary": "Read Holiday Information by Country and Region",
    "description": "",
    "parameters": [
      {
        "name": "country",
        "in": "path",
        "required": true,
        "description": "The country from which to read holidays - format: ISO-3166 A-2 e.g.: US, MX",
        "schemaType": "string"
      },
      {
        "name": "region",
        "in": "path",
        "required": true,
        "description": "The region within the ```country``` from which to read holidays - format: ISO 3166-2 e.g.: US-NY, MX-ZAC",
        "schemaType": "string"
      },
      {
        "name": "year",
        "in": "path",
        "required": true,
        "description": "The year in which to read holidays",
        "schemaType": "string"
      },
      {
        "name": "language",
        "in": "query",
        "required": false,
        "description": "Language formatted according to ISO 639-1",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  {
    "id": "GetFirebase",
    "method": "GET",
    "path": "/firebase",
    "resource": "Firebase",
    "summary": "Read firebase service accounts",
    "description": "",
    "parameters": [],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  {
    "id": "PostFirebase",
    "method": "POST",
    "path": "/firebase",
    "resource": "Firebase",
    "summary": "Add firebase service account",
    "description": "",
    "parameters": [],
    "hasRequestBody": true,
    "minApiVersion": 45
  },
  {
    "id": "GetCertificates",
    "method": "GET",
    "path": "/certificates",
    "resource": "SSL Certificates",
    "summary": "Read SSL certificates for CertManager",
    "description": "",
    "parameters": [],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  {
    "id": "PostCertificates",
    "method": "POST",
    "path": "/certificates",
    "resource": "SSL Certificates",
    "summary": "Create SSL certificate for CertManager",
    "description": "",
    "parameters": [],
    "hasRequestBody": true,
    "minApiVersion": 45
  },
  {
    "id": "GetCertificatesBy",
    "method": "GET",
    "path": "/certificates/{name}",
    "resource": "SSL Certificates",
    "summary": "Read SSL certificate by Common Name",
    "description": "",
    "parameters": [
      {
        "name": "name",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  {
    "id": "PutCertificatesBy",
    "method": "PUT",
    "path": "/certificates/{name}",
    "resource": "SSL Certificates",
    "summary": "Update SSL certificate for CertManager",
    "description": "",
    "parameters": [
      {
        "name": "name",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true,
    "minApiVersion": 45
  },
  {
    "id": "DeleteCertificatesBy",
    "method": "DELETE",
    "path": "/certificates/{name}",
    "resource": "SSL Certificates",
    "summary": "Delete SSL certificate for CertManager",
    "description": "",
    "parameters": [
      {
        "name": "name",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  {
    "id": "GetCodeBy",
    "method": "GET",
    "path": "/code/{hostname}",
    "resource": "Manage Code",
    "summary": "View Code Packages on Hostname",
    "description": "",
    "parameters": [
      {
        "name": "hostname",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  {
    "id": "GetInsightBy",
    "method": "GET",
    "path": "/insight/{label}",
    "resource": "iNSight",
    "summary": "Query Data from iNSight",
    "description": "",
    "parameters": [
      {
        "name": "label",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      },
      {
        "name": "range",
        "in": "query",
        "required": false,
        "description": "The range to use in the query, using this option will avoid the need to calculate start, end and step. \n",
        "schemaType": "string"
      },
      {
        "name": "aggregated",
        "in": "query",
        "required": false,
        "description": "Select Eiterh aggregated data or by server. ",
        "schemaType": "string"
      },
      {
        "name": "start",
        "in": "query",
        "required": false,
        "description": "The timestamp to start the range. Optional and will override range values. "
      },
      {
        "name": "end",
        "in": "query",
        "required": false,
        "description": "The timestamp to end the range. Optional and will override range values. ",
        "schemaType": "integer"
      },
      {
        "name": "step",
        "in": "query",
        "required": false,
        "description": "The interval to use in the query. Optional and will override range values. ",
        "schemaType": "string"
      },
      {
        "name": "query",
        "in": "query",
        "required": false,
        "description": "advanced use only, will override full query if label set to \"custom\" you can use to provide full promQL query",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  {
    "id": "GetDomainsByConferences",
    "method": "GET",
    "path": "/domains/{domain}/conferences",
    "resource": "Conference/Conferences",
    "summary": "Get Conferences in Domain",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  {
    "id": "PostDomainsByConferences",
    "method": "POST",
    "path": "/domains/{domain}/conferences",
    "resource": "Conference/Conferences",
    "summary": "Create Conference for Domain",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": true,
    "minApiVersion": 45
  },
  {
    "id": "GetDomainsByConferencesBy",
    "method": "GET",
    "path": "/domains/{domain}/conferences/{conference}",
    "resource": "Conference/Conferences",
    "summary": "Get Conference in Domain",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "conference",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  {
    "id": "PutDomainsByConferencesBy",
    "method": "PUT",
    "path": "/domains/{domain}/conferences/{conference}",
    "resource": "Conference/Conferences",
    "summary": "Update Conference in Domain",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "conference",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true,
    "minApiVersion": 45
  },
  {
    "id": "DeleteDomainsByConferencesBy",
    "method": "DELETE",
    "path": "/domains/{domain}/conferences/{conference}",
    "resource": "Conference/Conferences",
    "summary": "Delete Conference in Domain",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "conference",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  {
    "id": "GetDomainsByConferencesCount",
    "method": "GET",
    "path": "/domains/{domain}/conferences/count",
    "resource": "Conference/Conferences",
    "summary": "Count Conferences in Domain",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  {
    "id": "GetDomainsByConferencesByCdr",
    "method": "GET",
    "path": "/domains/{domain}/conferences/{conference}/cdr",
    "resource": "Conference/Conferences",
    "summary": "Get Conference CDR from Domain",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "conference",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      },
      {
        "name": "from",
        "in": "query",
        "required": false,
        "description": "",
        "schemaType": "string"
      },
      {
        "name": "to",
        "in": "query",
        "required": false,
        "description": "",
        "schemaType": "string"
      },
      {
        "name": "include_participants",
        "in": "query",
        "required": false,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  {
    "id": "GetDomainsByConferencesByParticipants",
    "method": "GET",
    "path": "/domains/{domain}/conferences/{conference}/participants",
    "resource": "Conference/Participants",
    "summary": "Get Participants from Conference",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "conference",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  {
    "id": "PostDomainsByConferencesByParticipants",
    "method": "POST",
    "path": "/domains/{domain}/conferences/{conference}/participants",
    "resource": "Conference/Participants",
    "summary": "Create Participant for Conference",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "conference",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true,
    "minApiVersion": 45
  },
  {
    "id": "PutDomainsByConferencesByParticipantsBy",
    "method": "PUT",
    "path": "/domains/{domain}/conferences/{conference}/participants/{participant}",
    "resource": "Conference/Participants",
    "summary": "Update Participant for Conference",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "conference",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      },
      {
        "name": "participant",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true,
    "minApiVersion": 45
  },
  {
    "id": "DeleteDomainsByConferencesByParticipantsBy",
    "method": "DELETE",
    "path": "/domains/{domain}/conferences/{conference}/participants/{participant}",
    "resource": "Conference/Participants",
    "summary": "Delete Participant from Conference",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "conference",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "number"
      },
      {
        "name": "participant",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "number"
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  {
    "id": "GetDomainsByPhonetemplates",
    "method": "GET",
    "path": "/domains/{domain}/phonetemplates",
    "resource": "SnapBuilder/Phone Templates",
    "summary": "Read Phone Templates available to a Domain",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  {
    "id": "PostDomainsByPhonetemplates",
    "method": "POST",
    "path": "/domains/{domain}/phonetemplates",
    "resource": "SnapBuilder/Phone Templates",
    "summary": "Create Phone Template  in domain",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": true,
    "minApiVersion": 45
  },
  {
    "id": "GetDomainsByPhonetemplatesBy",
    "method": "GET",
    "path": "/domains/{domain}/phonetemplates/{name}",
    "resource": "SnapBuilder/Phone Templates",
    "summary": "Read Specific Phone Templates by name ",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "name",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  {
    "id": "PutDomainsByPhonetemplatesBy",
    "method": "PUT",
    "path": "/domains/{domain}/phonetemplates/{name}",
    "resource": "SnapBuilder/Phone Templates",
    "summary": "Update Phone Template  in domain",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "name",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true,
    "minApiVersion": 45
  },
  {
    "id": "DeleteDomainsByPhonetemplatesBy",
    "method": "DELETE",
    "path": "/domains/{domain}/phonetemplates/{name}",
    "resource": "SnapBuilder/Phone Templates",
    "summary": "Delete Phone Template  in domain",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "name",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  {
    "id": "GetDeviceprofiles",
    "method": "GET",
    "path": "/deviceprofiles",
    "resource": "SnapBuilder",
    "summary": "Read Device Profiles",
    "description": "",
    "parameters": [],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  {
    "id": "GetDeviceprofilesCount",
    "method": "GET",
    "path": "/deviceprofiles/count",
    "resource": "SnapBuilder",
    "summary": "Count Device Profiles",
    "description": "",
    "parameters": [],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  {
    "id": "GetDeviceprofilesByBy",
    "method": "GET",
    "path": "/deviceprofiles/{make}/{model}",
    "resource": "SnapBuilder",
    "summary": "Get specific Device Profile for Model of Phone",
    "description": "",
    "parameters": [
      {
        "name": "make",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      },
      {
        "name": "model",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  {
    "id": "GetDomainsByPhoneconfigurationCount",
    "method": "GET",
    "path": "/domains/{domain}/phoneconfiguration/count",
    "resource": "SnapBuilder",
    "summary": "Count Phone Configurations",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  {
    "id": "GetDomainsByPhoneconfigurationBy",
    "method": "GET",
    "path": "/domains/{domain}/phoneconfiguration/{mac}",
    "resource": "SnapBuilder",
    "summary": "Get Phone Configuration for specific Mac",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "mac",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  {
    "id": "PutDomainsByPhoneconfigurationBy",
    "method": "PUT",
    "path": "/domains/{domain}/phoneconfiguration/{mac}",
    "resource": "SnapBuilder",
    "summary": "Update Phone Configuration for Specific Mac Address",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "mac",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true,
    "minApiVersion": 45
  },
  {
    "id": "DeleteDomainsByPhoneconfigurationBy",
    "method": "DELETE",
    "path": "/domains/{domain}/phoneconfiguration/{mac}",
    "resource": "SnapBuilder",
    "summary": "Delete Phone Configuration for Specific Mac Address",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "mac",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  {
    "id": "PostDomainsByPhoneconfiguration",
    "method": "POST",
    "path": "/domains/{domain}/phoneconfiguration",
    "resource": "SnapBuilder",
    "summary": "Create Phone Configuration for Specific Mac Address",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": true,
    "minApiVersion": 45
  },
  {
    "id": "GetDomainsByChartsByCount",
    "method": "GET",
    "path": "/domains/{domain}/charts/{dashboard_id}/count",
    "resource": "Charts",
    "summary": "Count Charts",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "dashboard_id",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "number"
      },
      {
        "name": "type",
        "in": "query",
        "required": false,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  {
    "id": "GetDomainsByChartsByList",
    "method": "GET",
    "path": "/domains/{domain}/charts/{dashboard_id}/list",
    "resource": "Charts",
    "summary": "Get Chart List",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "dashboard_id",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "number"
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  {
    "id": "GetDomainsByUsersByDashboardsCount",
    "method": "GET",
    "path": "/domains/{domain}/users/{user}/dashboards/count",
    "resource": "Dashboards",
    "summary": "Count Dashboards for a User",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "owner_id",
        "in": "query",
        "required": false,
        "description": "",
        "schemaType": "number"
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  {
    "id": "GetDomainsByUsersByDashboardsList",
    "method": "GET",
    "path": "/domains/{domain}/users/{user}/dashboards/list",
    "resource": "Dashboards",
    "summary": "Get Dashboard List for a User",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "owner_id",
        "in": "query",
        "required": false,
        "description": "",
        "schemaType": "number"
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  {
    "id": "GetDomainsByQuotas",
    "method": "GET",
    "path": "/domains/{domain}/quotas",
    "resource": "Quotas",
    "summary": "Get Quota for Domain",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  {
    "id": "GetResellersByQuotas",
    "method": "GET",
    "path": "/resellers/{reseller}/quotas",
    "resource": "Quotas",
    "summary": "Get Quota for Domains in Reseller",
    "description": "",
    "parameters": [
      {
        "name": "reseller",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  {
    "id": "GetDomainsByQuotasCount",
    "method": "GET",
    "path": "/domains/{domain}/quotas/count",
    "resource": "Quotas",
    "summary": "Count Quotas for Domain",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  {
    "id": "GetResellersByQuotasCount",
    "method": "GET",
    "path": "/resellers/{reseller}/quotas/count",
    "resource": "Quotas",
    "summary": "Count Quotas for Reseller",
    "description": "",
    "parameters": [
      {
        "name": "reseller",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  {
    "id": "GetDomainsByDepartmentsList",
    "method": "GET",
    "path": "/domains/{domain}/departments/list",
    "resource": "Departments",
    "summary": "List Departments in a Domain",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  {
    "id": "GetDomainsByPresenceList",
    "method": "GET",
    "path": "/domains/{domain}/presence/list",
    "resource": "Presence",
    "summary": "List Presence in a Domain",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "last_update",
        "in": "query",
        "required": false,
        "description": "",
        "schemaType": "string"
      },
      {
        "name": "limit",
        "in": "query",
        "required": false,
        "description": ""
      },
      {
        "name": "order",
        "in": "query",
        "required": false,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  {
    "id": "GetDomainsByDepartmentsByPresenceList",
    "method": "GET",
    "path": "/domains/{domain}/departments/{department}/presence/list",
    "resource": "Presence",
    "summary": "List Presence in a Department",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "department",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      },
      {
        "name": "last_update",
        "in": "query",
        "required": false,
        "description": "",
        "schemaType": "string"
      },
      {
        "name": "limit",
        "in": "query",
        "required": false,
        "description": ""
      },
      {
        "name": "order",
        "in": "query",
        "required": false,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  {
    "id": "GetAuditlog",
    "method": "GET",
    "path": "/auditlog",
    "resource": "Aduit Log",
    "summary": "Read Audit Log",
    "description": "",
    "parameters": [
      {
        "name": "datetime-start",
        "in": "query",
        "required": false,
        "description": ""
      },
      {
        "name": "datetime-end",
        "in": "query",
        "required": false,
        "description": ""
      },
      {
        "name": "by-ip",
        "in": "query",
        "required": false,
        "description": "",
        "schemaType": "string"
      },
      {
        "name": "action-type",
        "in": "query",
        "required": false,
        "description": "",
        "schemaType": "string"
      },
      {
        "name": "target-domain",
        "in": "query",
        "required": false,
        "description": "",
        "schemaType": "string"
      },
      {
        "name": "target-object",
        "in": "query",
        "required": false,
        "description": "",
        "schemaType": "string"
      },
      {
        "name": "target-host",
        "in": "query",
        "required": false,
        "description": "",
        "schemaType": "string"
      },
      {
        "name": "target-user",
        "in": "query",
        "required": false,
        "description": "",
        "schemaType": "string"
      },
      {
        "name": "by-client",
        "in": "query",
        "required": false,
        "description": "",
        "schemaType": "string"
      },
      {
        "name": "by-domain",
        "in": "query",
        "required": false,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  {
    "id": "GetAccesslog",
    "method": "GET",
    "path": "/accesslog",
    "resource": "Access Log",
    "summary": "Read Accesslog",
    "description": "",
    "parameters": [
      {
        "name": "datetime-start",
        "in": "query",
        "required": false,
        "description": ""
      },
      {
        "name": "datetime-end",
        "in": "query",
        "required": false,
        "description": ""
      },
      {
        "name": "by-ip",
        "in": "query",
        "required": false,
        "description": "",
        "schemaType": "string"
      },
      {
        "name": "action-type",
        "in": "query",
        "required": false,
        "description": "",
        "schemaType": "string"
      },
      {
        "name": "target-domain",
        "in": "query",
        "required": false,
        "description": "",
        "schemaType": "string"
      },
      {
        "name": "target-object",
        "in": "query",
        "required": false,
        "description": "",
        "schemaType": "string"
      },
      {
        "name": "target-host",
        "in": "query",
        "required": false,
        "description": "",
        "schemaType": "string"
      },
      {
        "name": "target-user",
        "in": "query",
        "required": false,
        "description": "",
        "schemaType": "string"
      },
      {
        "name": "by-client",
        "in": "query",
        "required": false,
        "description": "",
        "schemaType": "string"
      },
      {
        "name": "by-domain",
        "in": "query",
        "required": false,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  }
];

export const operationMap: Record<string, GeneratedOpenApiOperation> = {
  "Version": {
    "id": "Version",
    "method": "GET",
    "path": "/version",
    "resource": "Version",
    "summary": "Read API Version ",
    "description": "",
    "parameters": [],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  "PostAuthCode": {
    "id": "PostAuthCode",
    "method": "POST",
    "path": "/authCode",
    "resource": "Authentication/Access Token (Oauth - Username/Password)",
    "summary": "Get Access Token From Auth Code",
    "description": "",
    "parameters": [
      {
        "name": "Authorization",
        "in": "header",
        "required": false,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true,
    "minApiVersion": 45
  },
  "PostTokens": {
    "id": "PostTokens",
    "method": "POST",
    "path": "/tokens",
    "resource": "Authentication/Access Token (Oauth - Username/Password)",
    "summary": "Get Access Token From Refresh",
    "description": "> Note: # and anything after is NOT needed, its just to allow multiple examples for the same path/method. ",
    "parameters": [],
    "hasRequestBody": true
  },
  "PostTokens_2": {
    "id": "PostTokens_2",
    "method": "POST",
    "path": "/tokens",
    "resource": "Authentication/Access Token (Oauth - Username/Password)",
    "summary": "Get Access Token after MFA request Copy",
    "description": "This API will accept username and password along with a passcode generated via a authenticator application and generate a Access token ",
    "parameters": [],
    "hasRequestBody": true
  },
  "PostTokens_3": {
    "id": "PostTokens_3",
    "method": "POST",
    "path": "/tokens",
    "resource": "Authentication/Access Token (Oauth - Username/Password)",
    "summary": "Get Access Token after MFA request",
    "description": "This API will accept username and password along with a passcode generated via a authenticator application and generate a Access token ",
    "parameters": [],
    "hasRequestBody": true
  },
  "PostSsoEnroll": {
    "id": "PostSsoEnroll",
    "method": "POST",
    "path": "/ssoEnroll",
    "resource": "Authentication/Access Token (Oauth - Username/Password)",
    "summary": "SSO Enroll",
    "description": "",
    "parameters": [],
    "hasRequestBody": true,
    "minApiVersion": 45
  },
  "ReadMyApikey": {
    "id": "ReadMyApikey",
    "method": "GET",
    "path": "/apikeys/~",
    "resource": "Authentication/API Key (Machine 2 Machine)",
    "summary": "Read API Key info on your API Key",
    "description": "This parameter-less action will return the information on the API key being used for the request giving confirmation on access levels allowed. ",
    "parameters": [],
    "hasRequestBody": false
  },
  "ReadApikeys": {
    "id": "ReadApikeys",
    "method": "GET",
    "path": "/apikeys",
    "resource": "Authentication/API Key (Machine 2 Machine)",
    "summary": "Read API Keys under your account",
    "description": "This action will show apikeys that have been generated by your current APIkey and that you have access to update or revoke as needed. \n\n> Note: # and anything after is NOT needed, its just to allow multiple examples for the same path/method. ",
    "parameters": [],
    "hasRequestBody": false
  },
  "ReadApikey": {
    "id": "ReadApikey",
    "method": "GET",
    "path": "/apikeys/{key_id}",
    "resource": "Authentication/API Key (Machine 2 Machine)",
    "summary": "Read Info on specific APIKey via Key ID",
    "description": "This action will show apikeys that have been generated by your current APIkey and that you have access to update or revoke as needed. \n\n> Note: # and anything after is NOT needed, its just to allow multiple examples for the same path/method. ",
    "parameters": [
      {
        "name": "key_id",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false
  },
  "UpdateApikey": {
    "id": "UpdateApikey",
    "method": "PUT",
    "path": "/apikeys/{key_id}",
    "resource": "Authentication/API Key (Machine 2 Machine)",
    "summary": "Update API Key",
    "description": "This is a limited action and will require special access to create API keys. The Update is even more limited only allowing the change of the description and IP restrictions. You will not be able to change the scope, access rights or any premissions. A new apikey would need to be created in those cases. ",
    "parameters": [
      {
        "name": "key_id",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true
  },
  "RevokeApikey": {
    "id": "RevokeApikey",
    "method": "DELETE",
    "path": "/apikeys/{key_id}",
    "resource": "Authentication/API Key (Machine 2 Machine)",
    "summary": "Revoke API Key",
    "description": "This is a limited action and will require special access to revoke API keys. Revoking the apikey will remove the key from the DB and any Cache stoping access immediately. ",
    "parameters": [
      {
        "name": "key_id",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false
  },
  "CreateApikey": {
    "id": "CreateApikey",
    "method": "POST",
    "path": "/apikeys",
    "resource": "Authentication/API Key (Machine 2 Machine)",
    "summary": "Create API Key",
    "description": "This is a limited action and will require special access to create API keys. ",
    "parameters": [],
    "hasRequestBody": true
  },
  "PostJwt": {
    "id": "PostJwt",
    "method": "POST",
    "path": "/jwt",
    "resource": "Authentication/JWT (JSON Web Token)",
    "summary": "Create JWT token From User/Pass",
    "description": "This API will accept username and password and generate a JWT token. ",
    "parameters": [],
    "hasRequestBody": true
  },
  "RevokeMyJWT": {
    "id": "RevokeMyJWT",
    "method": "DELETE",
    "path": "/jwt",
    "resource": "Authentication/JWT (JSON Web Token)",
    "summary": "Revoke current JWT ",
    "description": "This API requires a valid JWT and will revoke it by JTI of the current Token. It will then prevent its use moving forward. ",
    "parameters": [],
    "hasRequestBody": false
  },
  "GetJwt": {
    "id": "GetJwt",
    "method": "GET",
    "path": "/jwt",
    "resource": "Authentication/JWT (JSON Web Token)",
    "summary": "Read Current JWT",
    "description": "",
    "parameters": [],
    "hasRequestBody": false
  },
  "PostJwt_2": {
    "id": "PostJwt_2",
    "method": "POST",
    "path": "/jwt",
    "resource": "Authentication/JWT (JSON Web Token)",
    "summary": "Create JWT token from Refresh JWT",
    "description": "This API will accept a refresh token in JSON object to grant a new JWT and revoke the refresh token as used. \n\n> Note: # and anything after is NOT needed, its just to allow multiple examples for the same path/method. ",
    "parameters": [],
    "hasRequestBody": true
  },
  "PostJwt_3": {
    "id": "PostJwt_3",
    "method": "POST",
    "path": "/jwt",
    "resource": "Authentication/JWT (JSON Web Token)",
    "summary": "Create JWT token after MFA request",
    "description": "This API will accept username and password along with a passcode generated via a authenticator application and generate a JWT token. Please recall that on the endpoint notation here in the docs, the \"#2\" after \"/jwt\" should be removed and is only there to facilitate naming.",
    "parameters": [],
    "hasRequestBody": true
  },
  "PostJwt_4": {
    "id": "PostJwt_4",
    "method": "POST",
    "path": "/jwt",
    "resource": "Authentication/JWT (JSON Web Token)",
    "summary": "Create JWT token For Delegated  Access",
    "description": "This API will require valid access through APIKey and allows for generation of a JWT for a different user. \n\n> Note: # and anything after is NOT needed, its just to allow multiple examples for the same path/method. ",
    "parameters": [
      {
        "name": "Authorization",
        "in": "header",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true
  },
  "RevokeJWTbyUid": {
    "id": "RevokeJWTbyUid",
    "method": "DELETE",
    "path": "/jwt/{uid}",
    "resource": "Authentication/JWT (JSON Web Token)",
    "summary": "Revoke JWT(s) by UID (user@domain)",
    "description": "",
    "parameters": [
      {
        "name": "uid",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false
  },
  "RevokeJWTbyJti": {
    "id": "RevokeJWTbyJti",
    "method": "DELETE",
    "path": "/jwt/{jti}",
    "resource": "Authentication/JWT (JSON Web Token)",
    "summary": "Revoke JWT by JTI (JWT ID)",
    "description": "> Note: # and anything after is NOT needed, its just to allow multiple examples for the same path/method. ",
    "parameters": [
      {
        "name": "jti",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false
  },
  "ReadSubscriptions": {
    "id": "ReadSubscriptions",
    "method": "GET",
    "path": "/subscriptions",
    "resource": "Event Subscriptions",
    "summary": "Read Event Subscriptions",
    "description": "",
    "parameters": [],
    "hasRequestBody": false
  },
  "CreateSubscription": {
    "id": "CreateSubscription",
    "method": "POST",
    "path": "/subscriptions",
    "resource": "Event Subscriptions",
    "summary": "Create a Event Subscription",
    "description": "",
    "parameters": [],
    "hasRequestBody": true
  },
  "ReadSubscriptionsDomain": {
    "id": "ReadSubscriptionsDomain",
    "method": "GET",
    "path": "/domains/{domain}/subscriptions",
    "resource": "Event Subscriptions",
    "summary": "Read Event Subscriptions for Domain",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  "CreateSubscriptionDomain": {
    "id": "CreateSubscriptionDomain",
    "method": "POST",
    "path": "/domains/{domain}/subscriptions",
    "resource": "Event Subscriptions",
    "summary": "Create a Event Subscription for Domain",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": true,
    "minApiVersion": 45
  },
  "ReadSubscription": {
    "id": "ReadSubscription",
    "method": "GET",
    "path": "/subscriptions/{id}",
    "resource": "Event Subscriptions",
    "summary": "Read Event Subscription By Id",
    "description": "",
    "parameters": [
      {
        "name": "id",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false
  },
  "UpdateSubscription": {
    "id": "UpdateSubscription",
    "method": "PUT",
    "path": "/subscriptions/{id}",
    "resource": "Event Subscriptions",
    "summary": "Update an Event Subscription",
    "description": "",
    "parameters": [
      {
        "name": "id",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true
  },
  "DeleteSubscription": {
    "id": "DeleteSubscription",
    "method": "DELETE",
    "path": "/subscriptions/{id}",
    "resource": "Event Subscriptions",
    "summary": "Delete a subscription",
    "description": "",
    "parameters": [
      {
        "name": "id",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true
  },
  "UpdateSubscriptionDomain": {
    "id": "UpdateSubscriptionDomain",
    "method": "PUT",
    "path": "/domains/{domain}/subscriptions/{id}",
    "resource": "Event Subscriptions",
    "summary": "Update an Event Subscription for Domain",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "id",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true,
    "minApiVersion": 45
  },
  "DeleteSubscriptionDomain": {
    "id": "DeleteSubscriptionDomain",
    "method": "DELETE",
    "path": "/domains/{domain}/subscriptions/{id}",
    "resource": "Event Subscriptions",
    "summary": "Delete a subscription For Domain",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "id",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  "GetResellers": {
    "id": "GetResellers",
    "method": "GET",
    "path": "/resellers",
    "resource": "Resellers",
    "summary": "Get Resellers",
    "description": "",
    "parameters": [],
    "hasRequestBody": false
  },
  "CreateReseller": {
    "id": "CreateReseller",
    "method": "POST",
    "path": "/resellers",
    "resource": "Resellers",
    "summary": "Create Reseller",
    "description": "",
    "parameters": [],
    "hasRequestBody": true
  },
  "GetResellersCount": {
    "id": "GetResellersCount",
    "method": "GET",
    "path": "/resellers/count",
    "resource": "Resellers",
    "summary": "Count Resellers",
    "description": "",
    "parameters": [],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  "GetResellersByCount": {
    "id": "GetResellersByCount",
    "method": "GET",
    "path": "/resellers/{reseller}/count",
    "resource": "Resellers",
    "summary": "Check if Reseller Exists",
    "description": "",
    "parameters": [
      {
        "name": "reseller",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  "UpdateReseller": {
    "id": "UpdateReseller",
    "method": "PUT",
    "path": "/resellers/{reseller}",
    "resource": "Resellers",
    "summary": "Update Reseller",
    "description": "",
    "parameters": [
      {
        "name": "reseller",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true
  },
  "DeleteReseller": {
    "id": "DeleteReseller",
    "method": "DELETE",
    "path": "/resellers/{reseller}",
    "resource": "Resellers",
    "summary": "Delete Reseller",
    "description": "",
    "parameters": [
      {
        "name": "reseller",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false
  },
  "GetReseller": {
    "id": "GetReseller",
    "method": "GET",
    "path": "/resellers/{reseller}",
    "resource": "Resellers",
    "summary": "Get Specific Reseller",
    "description": "",
    "parameters": [
      {
        "name": "reseller",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false
  },
  "GetDomains": {
    "id": "GetDomains",
    "method": "GET",
    "path": "/domains",
    "resource": "Domains",
    "summary": "Get Domains ",
    "description": "This API is the same for both Super User and Reseller. If using Reseller scopped access there territory/reseller will be used from the access rights for the filter.  ",
    "parameters": [
      {
        "name": "start",
        "in": "query",
        "required": false,
        "description": ""
      },
      {
        "name": "limit",
        "in": "query",
        "required": false,
        "description": ""
      }
    ],
    "hasRequestBody": false
  },
  "CreateDomain": {
    "id": "CreateDomain",
    "method": "POST",
    "path": "/domains",
    "resource": "Domains",
    "summary": "Create a Domain",
    "description": "This API will allow a new domain to be created. Version 2 of the api will assist in creating some resources that previously were not auto created on api domain create inlcuding creating a \"domain\" subscriber  for the owner to hold the defaults and creating a dialplan with a name that matches the domain that is chained up to a system wide table. ",
    "parameters": [],
    "hasRequestBody": true
  },
  "CountDomains": {
    "id": "CountDomains",
    "method": "GET",
    "path": "/domains/count",
    "resource": "Domains",
    "summary": "Count Domains",
    "description": "This API is the same for both Super User and Reseller. If using Reseller scopped access there territory/reseller will be used from the access rights for the filter.  ",
    "parameters": [],
    "hasRequestBody": false
  },
  "GetDomain": {
    "id": "GetDomain",
    "method": "GET",
    "path": "/domains/{domain}",
    "resource": "Domains",
    "summary": "Get Specific Domain",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": "The Domain name for the resource being requested"
      }
    ],
    "hasRequestBody": false
  },
  "UpdateDomain": {
    "id": "UpdateDomain",
    "method": "PUT",
    "path": "/domains/{domain}",
    "resource": "Domains",
    "summary": "Update a Domain",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": "This is the main organization name. This is used to link resource to its group/tenant/organization/enterprise."
      }
    ],
    "hasRequestBody": true
  },
  "DeleteDomain": {
    "id": "DeleteDomain",
    "method": "DELETE",
    "path": "/domains/{domain}",
    "resource": "Domains",
    "summary": "Delete a Domain",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": "The Domain name for the resource being requested"
      }
    ],
    "hasRequestBody": false
  },
  "DomainBilling": {
    "id": "DomainBilling",
    "method": "GET",
    "path": "/domains/{domain}/billing",
    "resource": "Domains",
    "summary": "Get Specific Domain With Billing Summary",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": "The Domain name for the resource being requested"
      }
    ],
    "hasRequestBody": false
  },
  "GetMyDomain": {
    "id": "GetMyDomain",
    "method": "GET",
    "path": "/domains/~",
    "resource": "Domains",
    "summary": "Get My Domain Info",
    "description": "",
    "parameters": [],
    "hasRequestBody": false
  },
  "CountDomain": {
    "id": "CountDomain",
    "method": "GET",
    "path": "/domains/{domain}/count",
    "resource": "Domains",
    "summary": "Check if Domain Exists",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": "The Domain name for the resource being requested"
      }
    ],
    "hasRequestBody": false
  },
  "UpdatePhonenumberQueue": {
    "id": "UpdatePhonenumberQueue",
    "method": "PUT",
    "path": "/domains/{domain}/phonenumbers",
    "resource": "Phone Numbers/Use Cases",
    "summary": "Send Phonenumber to Call Queue",
    "description": "This API will allow updating of an existing number in a domain. ",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": true
  },
  "GetDomainPhonenumbers": {
    "id": "GetDomainPhonenumbers",
    "method": "GET",
    "path": "/domains/{domain}/phonenumbers",
    "resource": "Phone Numbers",
    "summary": "Get All Phone Numbers for Domain",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": false
  },
  "CreatePhonenumber": {
    "id": "CreatePhonenumber",
    "method": "POST",
    "path": "/domains/{domain}/phonenumbers",
    "resource": "Phone Numbers",
    "summary": "Add Phone Number in Domain",
    "description": "This will allow adding a phone number. ",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": true
  },
  "UpdatePhonenumberUser": {
    "id": "UpdatePhonenumberUser",
    "method": "PUT",
    "path": "/domains/{domain}/phonenumbers",
    "resource": "Phone Numbers/Use Cases",
    "summary": "Send Phonenumber to a User ",
    "description": "This API will allow updating of an existing number in a domain. ",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": true
  },
  "UpdatePhonenumberOffnet": {
    "id": "UpdatePhonenumberOffnet",
    "method": "PUT",
    "path": "/domains/{domain}/phonenumbers",
    "resource": "Phone Numbers/Use Cases",
    "summary": "Send Phonenumber to Offnet Number",
    "description": "This API example will forward a owned number to an offnet number. It shows ability to add a header and using a responder application that will keep call ownership with the domain for billing needs.  ",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": true
  },
  "UpdatePhonenumberAvailable": {
    "id": "UpdatePhonenumberAvailable",
    "method": "PUT",
    "path": "/domains/{domain}/phonenumbers",
    "resource": "Phone Numbers/Use Cases",
    "summary": "Move phonenumber back to Available in Inventory",
    "description": "This API example will move the number back to available in the domain's invenetory\n",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": true
  },
  "CountDomainPhonenumbers": {
    "id": "CountDomainPhonenumbers",
    "method": "GET",
    "path": "/domains/{domain}/phonenumbers/count",
    "resource": "Phone Numbers",
    "summary": "Count Phone Numbers for Domain",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  "GetPhonenumbers": {
    "id": "GetPhonenumbers",
    "method": "GET",
    "path": "/phonenumbers",
    "resource": "Phone Numbers",
    "summary": "Get All Phone Numbers for System or Reseller",
    "description": "This path will give you all Phonenumbers (DIDs) that are accessable based on the access rights of the Access Token or API Key used to make the requests. Super User or Reseller both supported, but for per domain lookups you should use /domains/{domain}/phonenumbers. ",
    "parameters": [
      {
        "name": "start",
        "in": "query",
        "required": false,
        "description": ""
      },
      {
        "name": "limit",
        "in": "query",
        "required": false,
        "description": ""
      }
    ],
    "hasRequestBody": false
  },
  "DeletePhonenumber": {
    "id": "DeletePhonenumber",
    "method": "DELETE",
    "path": "/domains/{domain}/phonenumbers/{phonenumber}",
    "resource": "Phone Numbers",
    "summary": "Remove Phone Number from Domain",
    "description": "This will allow adding a phone number. ",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "phonenumber",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false
  },
  "UpdatePhonenumber": {
    "id": "UpdatePhonenumber",
    "method": "PUT",
    "path": "/domains/{domain}/phonenumbers/{phonenumber}",
    "resource": "Phone Numbers",
    "summary": "Update Phone Number in Domain",
    "description": "This API will allow updating of an existing number in a domain. ",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "phonenumber",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true
  },
  "GetPhonenumber": {
    "id": "GetPhonenumber",
    "method": "GET",
    "path": "/domains/{domain}/phonenumbers/{phonenumber}",
    "resource": "Phone Numbers",
    "summary": "Get Specific Phone Number in Domain",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "phonenumber",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false
  },
  "GetUsers": {
    "id": "GetUsers",
    "method": "GET",
    "path": "/domains/{domain}/users",
    "resource": "Users",
    "summary": "Get Users in Domain",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "limit",
        "in": "query",
        "required": false,
        "description": ""
      },
      {
        "name": "start",
        "in": "query",
        "required": false,
        "description": ""
      }
    ],
    "hasRequestBody": false
  },
  "CreateUser": {
    "id": "CreateUser",
    "method": "POST",
    "path": "/domains/{domain}/users",
    "resource": "Users",
    "summary": "Create User in Domain",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": true
  },
  "CountUsers": {
    "id": "CountUsers",
    "method": "GET",
    "path": "/domains/{domain}/users/count",
    "resource": "Users",
    "summary": "Count users in Domain",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": false
  },
  "SearchUsers": {
    "id": "SearchUsers",
    "method": "GET",
    "path": "/domains/{domain}/users",
    "resource": "Users",
    "summary": "Search for Users in Domain",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "site",
        "in": "query",
        "required": false,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false
  },
  "DeleteUser": {
    "id": "DeleteUser",
    "method": "DELETE",
    "path": "/domains/{domain}/users/{user}",
    "resource": "Users",
    "summary": "Delete User in Domain",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": false
  },
  "UpdateUser": {
    "id": "UpdateUser",
    "method": "PUT",
    "path": "/domains/{domain}/users/{user}",
    "resource": "Users",
    "summary": "Update a User in Domain",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": true
  },
  "GetUser": {
    "id": "GetUser",
    "method": "GET",
    "path": "/domains/{domain}/users/{user}",
    "resource": "Users",
    "summary": "Get Specific User in Domain",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": false
  },
  "GetMyUser": {
    "id": "GetMyUser",
    "method": "GET",
    "path": "/domains/~/users/~",
    "resource": "Users",
    "summary": "Get My User ",
    "description": "",
    "parameters": [],
    "hasRequestBody": false
  },
  "ListUsers": {
    "id": "ListUsers",
    "method": "GET",
    "path": "/domains/{domain}/users/list",
    "resource": "Users",
    "summary": "List Basic Info on Users in Domain",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "fields",
        "in": "query",
        "required": false,
        "description": "Comma delimited string of specific return fields to list.",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  "GetDevices": {
    "id": "GetDevices",
    "method": "GET",
    "path": "/domains/{domain}/users/{user}/devices",
    "resource": "Devices",
    "summary": "Get Devices for User",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": false
  },
  "CreateDevice": {
    "id": "CreateDevice",
    "method": "POST",
    "path": "/domains/{domain}/users/{user}/devices",
    "resource": "Devices",
    "summary": "Create Device for User",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": true
  },
  "GetDomainsByDevicesCount": {
    "id": "GetDomainsByDevicesCount",
    "method": "GET",
    "path": "/domains/{domain}/devices/count",
    "resource": "Devices",
    "summary": "Count Devices for Domain",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "limit",
        "in": "query",
        "required": false,
        "description": ""
      },
      {
        "name": "start",
        "in": "query",
        "required": false,
        "description": ""
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  "GetResellersByDevicesCount": {
    "id": "GetResellersByDevicesCount",
    "method": "GET",
    "path": "/resellers/{reseller}/devices/count",
    "resource": "Devices",
    "summary": "Count Devices for Reseller",
    "description": "",
    "parameters": [
      {
        "name": "reseller",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      },
      {
        "name": "limit",
        "in": "query",
        "required": false,
        "description": ""
      },
      {
        "name": "start",
        "in": "query",
        "required": false,
        "description": ""
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  "CountDevices": {
    "id": "CountDevices",
    "method": "GET",
    "path": "/domains/{domain}/users/{user}/devices/count",
    "resource": "Devices",
    "summary": "Count Devices for User",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "limit",
        "in": "query",
        "required": false,
        "description": ""
      },
      {
        "name": "start",
        "in": "query",
        "required": false,
        "description": ""
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  "GetDomainsByDevicesByCount": {
    "id": "GetDomainsByDevicesByCount",
    "method": "GET",
    "path": "/domains/{domain}/devices/{device}/count",
    "resource": "Devices",
    "summary": "Count Devices by Device",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "device",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      },
      {
        "name": "limit",
        "in": "query",
        "required": false,
        "description": ""
      },
      {
        "name": "start",
        "in": "query",
        "required": false,
        "description": ""
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  "UpdateDevice": {
    "id": "UpdateDevice",
    "method": "PUT",
    "path": "/domains/{domain}/users/{user}/devices/{device}",
    "resource": "Devices",
    "summary": "Update Device for User",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "device",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true
  },
  "DeleteDevice": {
    "id": "DeleteDevice",
    "method": "DELETE",
    "path": "/domains/{domain}/users/{user}/devices/{device}",
    "resource": "Devices",
    "summary": "Delete Device for User",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "device",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false
  },
  "GetDevice": {
    "id": "GetDevice",
    "method": "GET",
    "path": "/domains/{domain}/users/{user}/devices/{device}",
    "resource": "Devices",
    "summary": "Get Specifc Device",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "device",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false
  },
  "GetDomainDevices": {
    "id": "GetDomainDevices",
    "method": "GET",
    "path": "/domains/{domain}/devices",
    "resource": "Devices",
    "summary": "Get Devices in Domain",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  "GetSupportedModels": {
    "id": "GetSupportedModels",
    "method": "GET",
    "path": "/phones/models",
    "resource": "Phones/Macs/Supported Models and Servers",
    "summary": "Get list of Supported/Provisionable Models",
    "description": "",
    "parameters": [],
    "hasRequestBody": false
  },
  "GetSupportedModelsByVendor": {
    "id": "GetSupportedModelsByVendor",
    "method": "GET",
    "path": "/phones/models",
    "resource": "Phones/Macs/Supported Models and Servers",
    "summary": "Get list of Supported/Provisionable by Vendor",
    "description": "",
    "parameters": [
      {
        "name": "brand",
        "in": "query",
        "required": false,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false
  },
  "GetSpecificModel": {
    "id": "GetSpecificModel",
    "method": "GET",
    "path": "/phones/models",
    "resource": "Phones/Macs/Supported Models and Servers",
    "summary": "Get details of Specific Model",
    "description": "",
    "parameters": [
      {
        "name": "brand",
        "in": "query",
        "required": false,
        "description": "",
        "schemaType": "string"
      },
      {
        "name": "model",
        "in": "query",
        "required": false,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false
  },
  "GetProvisionableServers": {
    "id": "GetProvisionableServers",
    "method": "GET",
    "path": "/phones/servers",
    "resource": "Phones/Macs/Supported Models and Servers",
    "summary": "Get list of Provisionable Server Profiles",
    "description": "",
    "parameters": [],
    "hasRequestBody": false
  },
  "GetProvisionableServer": {
    "id": "GetProvisionableServer",
    "method": "GET",
    "path": "/phones/servers/{server}",
    "resource": "Phones/Macs/Supported Models and Servers",
    "summary": "Read Provisionable Server Details",
    "description": "",
    "parameters": [
      {
        "name": "server",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false
  },
  "GetPhones": {
    "id": "GetPhones",
    "method": "GET",
    "path": "/phones",
    "resource": "Phones/Macs",
    "summary": "Read Mac Addresses",
    "description": "",
    "parameters": [
      {
        "name": "limit",
        "in": "query",
        "required": false,
        "description": ""
      }
    ],
    "hasRequestBody": false
  },
  "PostPhones": {
    "id": "PostPhones",
    "method": "POST",
    "path": "/phones",
    "resource": "Phones/Macs",
    "summary": "Add MAC address",
    "description": "",
    "parameters": [],
    "hasRequestBody": true
  },
  "PutPhones": {
    "id": "PutPhones",
    "method": "PUT",
    "path": "/phones",
    "resource": "Phones/Macs",
    "summary": "Update MAC address",
    "description": "",
    "parameters": [],
    "hasRequestBody": true
  },
  "DeletePhones": {
    "id": "DeletePhones",
    "method": "DELETE",
    "path": "/phones",
    "resource": "Phones/Macs",
    "summary": "Remove MAC address",
    "description": "",
    "parameters": [],
    "hasRequestBody": true
  },
  "GetPhonesCount": {
    "id": "GetPhonesCount",
    "method": "GET",
    "path": "/phones/count",
    "resource": "Phones/Macs",
    "summary": "Count Mac Addresses",
    "description": "",
    "parameters": [],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  "GetDomainsByPhones": {
    "id": "GetDomainsByPhones",
    "method": "GET",
    "path": "/domains/{domain}/phones",
    "resource": "Phones/Macs",
    "summary": "Read Mac Addresses in Domain",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "limit",
        "in": "query",
        "required": false,
        "description": ""
      }
    ],
    "hasRequestBody": false
  },
  "PostDomainsByPhones": {
    "id": "PostDomainsByPhones",
    "method": "POST",
    "path": "/domains/{domain}/phones",
    "resource": "Phones/Macs",
    "summary": "Add MAC address for Domain",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": true
  },
  "PutDomainsByPhones": {
    "id": "PutDomainsByPhones",
    "method": "PUT",
    "path": "/domains/{domain}/phones",
    "resource": "Phones/Macs",
    "summary": "Update MAC address in Domain",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": true
  },
  "DeleteDomainsByPhones": {
    "id": "DeleteDomainsByPhones",
    "method": "DELETE",
    "path": "/domains/{domain}/phones",
    "resource": "Phones/Macs",
    "summary": "Remove MAC address in Domain",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": true
  },
  "GetPhonesBy": {
    "id": "GetPhonesBy",
    "method": "GET",
    "path": "/phones/{mac}",
    "resource": "Phones/Macs",
    "summary": "Read Specific Mac Address",
    "description": "",
    "parameters": [
      {
        "name": "mac",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false
  },
  "GetDomainsByPhonesBy": {
    "id": "GetDomainsByPhonesBy",
    "method": "GET",
    "path": "/domains/{domain}/phones/{mac}",
    "resource": "Phones/Macs",
    "summary": "Read Specific Mac Addresses in Domain",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "mac",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      },
      {
        "name": "limit",
        "in": "query",
        "required": false,
        "description": ""
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  "GetDomainsBySitesList": {
    "id": "GetDomainsBySitesList",
    "method": "GET",
    "path": "/domains/{domain}/sites/list",
    "resource": "Sites",
    "summary": "List Sites in Domain",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  "GetDomainsBySites": {
    "id": "GetDomainsBySites",
    "method": "GET",
    "path": "/domains/{domain}/sites",
    "resource": "Sites",
    "summary": "Read Sites in Domain",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": false
  },
  "PostDomainsBySites": {
    "id": "PostDomainsBySites",
    "method": "POST",
    "path": "/domains/{domain}/sites",
    "resource": "Sites",
    "summary": "Create Site in Domain",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": true
  },
  "GetDomainsBySitesCount": {
    "id": "GetDomainsBySitesCount",
    "method": "GET",
    "path": "/domains/{domain}/sites/count",
    "resource": "Sites",
    "summary": "Count Sites in Domain",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  "PutDomainsBySitesBy": {
    "id": "PutDomainsBySitesBy",
    "method": "PUT",
    "path": "/domains/{domain}/sites/{site}",
    "resource": "Sites",
    "summary": "Update Site in Domain",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "site",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true
  },
  "GetDomainsBySitesBy": {
    "id": "GetDomainsBySitesBy",
    "method": "GET",
    "path": "/domains/{domain}/sites/{site}",
    "resource": "Sites",
    "summary": "Read Specific Site in Domain",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "site",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false
  },
  "ReadCallqueues": {
    "id": "ReadCallqueues",
    "method": "GET",
    "path": "/domains/{domain}/callqueues",
    "resource": "Call Center/Callqueues",
    "summary": "Read Call Queues in Domain",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": false
  },
  "CreateCallqueue": {
    "id": "CreateCallqueue",
    "method": "POST",
    "path": "/domains/{domain}/callqueues",
    "resource": "Call Center/Callqueues",
    "summary": "Create Call Queue in Domain",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": true
  },
  "UpdateCallqueue": {
    "id": "UpdateCallqueue",
    "method": "PUT",
    "path": "/domains/{domain}/callqueues/{callqueue}",
    "resource": "Call Center/Callqueues",
    "summary": "Update Call Queue in Domain",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "callqueue",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": true
  },
  "DeleteCallqueue": {
    "id": "DeleteCallqueue",
    "method": "DELETE",
    "path": "/domains/{domain}/callqueues/{callqueue}",
    "resource": "Call Center/Callqueues",
    "summary": "Delete Call Queue",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "callqueue",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": false
  },
  "ReadCallqueue": {
    "id": "ReadCallqueue",
    "method": "GET",
    "path": "/domains/{domain}/callqueues/{callqueue}",
    "resource": "Call Center/Callqueues",
    "summary": "Read Specific Call Queue",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "callqueue",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": false
  },
  "ListCallqueues": {
    "id": "ListCallqueues",
    "method": "GET",
    "path": "/domains/{domain}/callqueues/list",
    "resource": "Call Center/Callqueues",
    "summary": "Read Basic info on Call Queues in Domain",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  "ReadAgents": {
    "id": "ReadAgents",
    "method": "GET",
    "path": "/domains/{domain}/callqueues/{callqueue}/agents",
    "resource": "Call Center/Agents",
    "summary": "Read Agents in Call Queue",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "callqueue",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": false
  },
  "CreateAgent": {
    "id": "CreateAgent",
    "method": "POST",
    "path": "/domains/{domain}/callqueues/{callqueue}/agents",
    "resource": "Call Center/Agents",
    "summary": "Add Agent to Call Queue",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "callqueue",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": true
  },
  "GetDomainsByCallqueuesByAgentsCount": {
    "id": "GetDomainsByCallqueuesByAgentsCount",
    "method": "GET",
    "path": "/domains/{domain}/callqueues/{callqueue}/agents/count",
    "resource": "Call Center/Agents",
    "summary": "Count Agents in Call Queue",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "callqueue",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  "ReadAgentsDomain": {
    "id": "ReadAgentsDomain",
    "method": "GET",
    "path": "/domains/{domain}/agents",
    "resource": "Call Center/Agents",
    "summary": "Read Agents in Domain",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": false
  },
  "ReadAgent": {
    "id": "ReadAgent",
    "method": "GET",
    "path": "/domains/{domain}/callqueues/{callqueue}/agents/{callqueue-agent-id}",
    "resource": "Call Center/Agents",
    "summary": "Read Specific Agent in Call Queue",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "callqueue",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "callqueue-agent-id",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": false
  },
  "UpdateAgent": {
    "id": "UpdateAgent",
    "method": "PUT",
    "path": "/domains/{domain}/callqueues/{callqueue}/agents/{callqueue-agent-id}",
    "resource": "Call Center/Agents",
    "summary": "Update Agent in Call Queue",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "callqueue",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "callqueue-agent-id",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": true
  },
  "DeleteAgent": {
    "id": "DeleteAgent",
    "method": "DELETE",
    "path": "/domains/{domain}/callqueues/{callqueue}/agents/{callqueue-agent-id}",
    "resource": "Call Center/Agents",
    "summary": "Remove Agent from Call Queue",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "callqueue",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "callqueue-agent-id",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": false
  },
  "AgentLogin": {
    "id": "AgentLogin",
    "method": "PATCH",
    "path": "/domains/{domain}/callqueues/{callqueue}/agents/{callqueue-agent-id}/login",
    "resource": "Call Center/Agent Actions",
    "summary": "Agent Login ",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "callqueue",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "callqueue-agent-id",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": false
  },
  "AgentLogout": {
    "id": "AgentLogout",
    "method": "PATCH",
    "path": "/domains/{domain}/callqueues/{callqueue}/agents/{callqueue-agent-id}/logout",
    "resource": "Call Center/Agent Actions",
    "summary": "Agent Logout",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "callqueue",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "callqueue-agent-id",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": false
  },
  "AgentSingleCall": {
    "id": "AgentSingleCall",
    "method": "PATCH",
    "path": "/domains/{domain}/callqueues/{callqueue}/agents/{callqueue-agent-id}/onecall",
    "resource": "Call Center/Agent Actions",
    "summary": "Agent Single Call",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "callqueue",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "callqueue-agent-id",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": false
  },
  "AgentStatus": {
    "id": "AgentStatus",
    "method": "PATCH",
    "path": "/domains/{domain}/callqueues/all/agents/{callqueue-agent-id}/{status}",
    "resource": "Call Center/Agent Actions",
    "summary": "Agent Set Offline Status",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "callqueue-agent-id",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "status",
        "in": "path",
        "required": true,
        "description": "If you're going to use the custom status such as how you set it in the portal, you need to use \"cust1\" through \"cust8\" instead of the literal/actual status name you intend to use, and then alias/reference the \"custX\" status in your code.",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false
  },
  "GetDomainsByQueuedcallBy": {
    "id": "GetDomainsByQueuedcallBy",
    "method": "GET",
    "path": "/domains/{domain}/queuedcall/{queue}",
    "resource": "Call Center/QueuedCalls",
    "summary": "Read Queued Calls",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": "Domain containing Callqueue"
      },
      {
        "name": "queue",
        "in": "path",
        "required": true,
        "description": "Callqueue from which to read queued calls",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false
  },
  "PostDomainsByQueuedcallBy": {
    "id": "PostDomainsByQueuedcallBy",
    "method": "POST",
    "path": "/domains/{domain}/queuedcall/{callqueue}",
    "resource": "Call Center/QueuedCalls",
    "summary": "Add a Queued Call",
    "description": "Used to create a queue call between desginated Queue and destination.",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "callqueue",
        "in": "path",
        "required": true,
        "description": "When used in path the callqueue value will link to a extension id for a preconfigured callqueue."
      }
    ],
    "hasRequestBody": true,
    "minApiVersion": 45
  },
  "GetDomainsByStatisticsCallqueuesBy": {
    "id": "GetDomainsByStatisticsCallqueuesBy",
    "method": "GET",
    "path": "/domains/{domain}/statistics/callqueues/{callqueue}",
    "resource": "Call Center/Statistics",
    "summary": "Get Callqueue Statistics for a Specific Queue",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": "This is the main organization name. This is used to link resource to its group/tenant/organization/enterprise. "
      },
      {
        "name": "callqueue",
        "in": "path",
        "required": true,
        "description": "When used in path the callqueue value will link to a extension id for a preconfigured callqueue."
      },
      {
        "name": "datetime-start",
        "in": "query",
        "required": true,
        "description": "This is the start of the time window for a given query. The format is based on RFC3339 but also will support additonal params for use in providing a timezone which will allow the API to give the correct range for a given set of data and will be formated in respone using the same format.\n\nSupported formats include.\n\n2023-11-27 13:00:00\n2023-11-27T13:00:00Z\n2023-11-27T13:00:00-08:00\n2023-11-27T13:00:00-08:00[US/Pacific]\n2023-11-27T13:00:00Z[America/Phoenix]"
      },
      {
        "name": "datetime-end",
        "in": "query",
        "required": true,
        "description": "This is the end of the time window for a given query. The format is based on RFC3339 but also will support additonal params for use in providing a timezone which will allow the API to give the correct range for a given set of data and will be formated in respone using the same format. Allowed values same as datetime-start."
      },
      {
        "name": "fields",
        "in": "query",
        "required": false,
        "description": "Fields in order to fill and get particular statistics for. Separate multiple fields with \",\". Default value is VOL,CH,ATT,AC,AAS,SL",
        "schemaType": "string"
      },
      {
        "name": "remove_zeros",
        "in": "query",
        "required": false,
        "description": "Remove zeros from the results.",
        "schemaType": "string"
      },
      {
        "name": "queue_list",
        "in": "query",
        "required": false,
        "description": "Allows for a filter of certain queues. List can be comma separated for example 5202,5201",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  "GetDomainsByStatisticsCallqueuesAggregate": {
    "id": "GetDomainsByStatisticsCallqueuesAggregate",
    "method": "GET",
    "path": "/domains/{domain}/statistics/callqueues/aggregate",
    "resource": "Call Center/Statistics",
    "summary": "Get Callqueue Statistics for all Queues Aggregated",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": "This is the main organization name. This is used to link resource to its group/tenant/organization/enterprise. "
      },
      {
        "name": "datetime-start",
        "in": "query",
        "required": true,
        "description": "This is the start of the time window for a given query. The format is based on RFC3339 but also will support additonal params for use in providing a timezone which will allow the API to give the correct range for a given set of data and will be formated in respone using the same format.\n\nSupported formats include.\n\n2023-11-27 13:00:00\n2023-11-27T13:00:00Z\n2023-11-27T13:00:00-08:00\n2023-11-27T13:00:00-08:00[US/Pacific]\n2023-11-27T13:00:00Z[America/Phoenix]"
      },
      {
        "name": "datetime-end",
        "in": "query",
        "required": true,
        "description": "This is the end of the time window for a given query. The format is based on RFC3339 but also will support additonal params for use in providing a timezone which will allow the API to give the correct range for a given set of data and will be formated in respone using the same format. Allowed values same as datetime-start."
      },
      {
        "name": "fields",
        "in": "query",
        "required": false,
        "description": "Fields in order to fill and get particular statistics for. Separate multiple fields with \",\". Default value is VOL,CH,ATT,AC,AAS,SL",
        "schemaType": "string"
      },
      {
        "name": "remove_zeros",
        "in": "query",
        "required": false,
        "description": "Remove zeros from the results",
        "schemaType": "string"
      },
      {
        "name": "queue_list",
        "in": "query",
        "required": false,
        "description": "Allows for a filter of certain queues. List can be comma separated for example 5202,5201",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  "GetDomainsByStatisticsQueuePerQueue": {
    "id": "GetDomainsByStatisticsQueuePerQueue",
    "method": "GET",
    "path": "/domains/{domain}/statistics/queue/per-queue",
    "resource": "Call Center/Statistics",
    "summary": "Get Callqueue Statistics for all Queues by Queue",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": "This is the main organization name. This is used to link resource to its group/tenant/organization/enterprise. "
      },
      {
        "name": "datetime-start",
        "in": "query",
        "required": true,
        "description": "This is the start of the time window for a given query. The format is based on RFC3339 but also will support additonal params for use in providing a timezone which will allow the API to give the correct range for a given set of data and will be formated in respone using the same format.\n\nSupported formats include.\n\n2023-11-27 13:00:00\n2023-11-27T13:00:00Z\n2023-11-27T13:00:00-08:00\n2023-11-27T13:00:00-08:00[US/Pacific]\n2023-11-27T13:00:00Z[America/Phoenix]"
      },
      {
        "name": "datetime-end",
        "in": "query",
        "required": true,
        "description": "This is the end of the time window for a given query. The format is based on RFC3339 but also will support additonal params for use in providing a timezone which will allow the API to give the correct range for a given set of data and will be formated in respone using the same format. Allowed values same as datetime-start."
      },
      {
        "name": "fields",
        "in": "query",
        "required": false,
        "description": "Fields in order to fill and get particular statistics for. Separate multiple fields with \",\".Default value is VOL,CH,ATT,AC,AAS,SL",
        "schemaType": "string"
      },
      {
        "name": "remove_zeros",
        "in": "query",
        "required": false,
        "description": "Remove zeros from the results",
        "schemaType": "string"
      },
      {
        "name": "queue_list",
        "in": "query",
        "required": false,
        "description": "Alows for a filter of certain queues. List can be comma separated for example 421,425",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  "GetDomainsByStatisticsAgent": {
    "id": "GetDomainsByStatisticsAgent",
    "method": "GET",
    "path": "/domains/{domain}/statistics/agent",
    "resource": "Call Center/Statistics",
    "summary": "Get Agent Statistics for all Queues by Agent",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": "This is the main organization name. This is used to link resource to its group/tenant/organization/enterprise. "
      },
      {
        "name": "datetime-start",
        "in": "query",
        "required": true,
        "description": "This is the start of the time window for a given query. The format is based on RFC3339 but also will support additonal params for use in providing a timezone which will allow the API to give the correct range for a given set of data and will be formated in respone using the same format.\n\nSupported formats include.\n\n2023-11-27 13:00:00\n2023-11-27T13:00:00Z\n2023-11-27T13:00:00-08:00\n2023-11-27T13:00:00-08:00[US/Pacific]\n2023-11-27T13:00:00Z[America/Phoenix]"
      },
      {
        "name": "datetime-end",
        "in": "query",
        "required": true,
        "description": "This is the end of the time window for a given query. The format is based on RFC3339 but also will support additonal params for use in providing a timezone which will allow the API to give the correct range for a given set of data and will be formated in respone using the same format. Allowed values same as datetime-start."
      },
      {
        "name": "fields",
        "in": "query",
        "required": false,
        "description": "Fields in order to fill and get particular statistics for. Separate multiple fields with \",\" Default value is NAME,CH,ATT,AH,AHT,TT",
        "schemaType": "string"
      },
      {
        "name": "department",
        "in": "query",
        "required": false,
        "description": "This is the depertment that queue belongs to in the domain.",
        "schemaType": "string"
      },
      {
        "name": "remove_zeros",
        "in": "query",
        "required": false,
        "description": "Remove zeros from the results",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  "GetDomainsByStatisticsAgentCallqueuesBy": {
    "id": "GetDomainsByStatisticsAgentCallqueuesBy",
    "method": "GET",
    "path": "/domains/{domain}/statistics/agent/callqueues/{callqueue}",
    "resource": "Call Center/Statistics",
    "summary": "Get Agent Statistics for Single Queues by Agent",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": "This is the main organization name. This is used to link resource to its group/tenant/organization/enterprise. "
      },
      {
        "name": "callqueue",
        "in": "path",
        "required": true,
        "description": "When used in path the callqueue value will link to a extension id for a preconfigured callqueue"
      },
      {
        "name": "datetime-start",
        "in": "query",
        "required": true,
        "description": "This is the start of the time window for a given query. The format is based on RFC3339 but also will support additonal params for use in providing a timezone which will allow the API to give the correct range for a given set of data and will be formated in respone using the same format.\n\nSupported formats include.\n\n2023-11-27 13:00:00\n2023-11-27T13:00:00Z\n2023-11-27T13:00:00-08:00\n2023-11-27T13:00:00-08:00[US/Pacific]\n2023-11-27T13:00:00Z[America/Phoenix]"
      },
      {
        "name": "datetime-end",
        "in": "query",
        "required": true,
        "description": "This is the end of the time window for a given query. The format is based on RFC3339 but also will support additonal params for use in providing a timezone which will allow the API to give the correct range for a given set of data and will be formated in respone using the same format. Allowed values same as datetime-start."
      },
      {
        "name": "fields",
        "in": "query",
        "required": false,
        "description": "Fields in order to fill and get particular statistics for. Separate multiple fields with \",\" Default value is NAME,CH,ATT,AH,AHT,TT",
        "schemaType": "string"
      },
      {
        "name": "remove_zeros",
        "in": "query",
        "required": false,
        "description": "Remove zeros from the results",
        "schemaType": "string"
      },
      {
        "name": "department",
        "in": "query",
        "required": false,
        "description": "This is the depertment that user belongs to in the domain. Can be any string to group users, a department is not require to be setup before in order to set it for a user.",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  "GetDomainsByStatisticsAgentBy": {
    "id": "GetDomainsByStatisticsAgentBy",
    "method": "GET",
    "path": "/domains/{domain}/statistics/agent/{agent}",
    "resource": "Call Center/Statistics",
    "summary": "Get Agent Statistics for Single Agent",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": "This is the main organization name. This is used to link resource to its group/tenant/organization/enterprise. "
      },
      {
        "name": "agent",
        "in": "path",
        "required": true,
        "description": "When used in path the agent value will link to a extension id for a call center agent.",
        "schemaType": "string"
      },
      {
        "name": "datetime-start",
        "in": "query",
        "required": true,
        "description": "This is the start of the time window for a given query. The format is based on RFC3339 but also will support additonal params for use in providing a timezone which will allow the API to give the correct range for a given set of data and will be formated in respone using the same format.\n\nSupported formats include.\n\n2023-11-27 13:00:00\n2023-11-27T13:00:00Z\n2023-11-27T13:00:00-08:00\n2023-11-27T13:00:00-08:00[US/Pacific]\n2023-11-27T13:00:00Z[America/Phoenix]"
      },
      {
        "name": "datetime-end",
        "in": "query",
        "required": true,
        "description": "This is the end of the time window for a given query. The format is based on RFC3339 but also will support additonal params for use in providing a timezone which will allow the API to give the correct range for a given set of data and will be formated in respone using the same format. Allowed values same as datetime-start."
      },
      {
        "name": "fields",
        "in": "query",
        "required": false,
        "description": "Fields in order to fill and get particular statistics for. Separate multiple fields with \",\" Default value is NAME,CH,ATT,AH,AHT,TT",
        "schemaType": "string"
      },
      {
        "name": "remove_zeros",
        "in": "query",
        "required": false,
        "description": "Remove zeros from the results",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  "GetDomainsByStatisticsDNIS": {
    "id": "GetDomainsByStatisticsDNIS",
    "method": "GET",
    "path": "/domains/{domain}/statistics/DNIS",
    "resource": "Call Center/Statistics",
    "summary": "Get DNIS Statistics for all Queues",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": "This is the main organization name. This is used to link resource to its group/tenant/organization/enterprise. "
      },
      {
        "name": "datetime-start",
        "in": "query",
        "required": true,
        "description": "This is the start of the time window for a given query. The format is based on RFC3339 but also will support additonal params for use in providing a timezone which will allow the API to give the correct range for a given set of data and will be formated in respone using the same format.\n\nSupported formats include.\n\n2023-11-27 13:00:00\n2023-11-27T13:00:00Z\n2023-11-27T13:00:00-08:00\n2023-11-27T13:00:00-08:00[US/Pacific]\n2023-11-27T13:00:00Z[America/Phoenix]"
      },
      {
        "name": "datetime-end",
        "in": "query",
        "required": true,
        "description": "This is the end of the time window for a given query. The format is based on RFC3339 but also will support additonal params for use in providing a timezone which will allow the API to give the correct range for a given set of data and will be formated in respone using the same format. Allowed values same as datetime-start."
      },
      {
        "name": "fields",
        "in": "query",
        "required": false,
        "description": "Fields in order to fill and get particular statistics for. Separate multiple fields with \",\". Default value is NAME,VOL,CH,ATT,AH",
        "schemaType": "string"
      },
      {
        "name": "remove_zeros",
        "in": "query",
        "required": false,
        "description": "Remove zeros from the results",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  "GetDomainsByStatisticsDNISCallqueuesBy": {
    "id": "GetDomainsByStatisticsDNISCallqueuesBy",
    "method": "GET",
    "path": "/domains/{domain}/statistics/DNIS/callqueues/{callqueue}",
    "resource": "Call Center/Statistics",
    "summary": "Get DNIS Statistics for Single Queue",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": "This is the main organization name. This is used to link resource to its group/tenant/organization/enterprise. "
      },
      {
        "name": "callqueue",
        "in": "path",
        "required": true,
        "description": "When used in path the callqueue value will link to a extension id for a preconfigured callqueue"
      },
      {
        "name": "datetime-start",
        "in": "query",
        "required": true,
        "description": "This is the start of the time window for a given query. The format is based on RFC3339 but also will support additonal params for use in providing a timezone which will allow the API to give the correct range for a given set of data and will be formated in respone using the same format.\n\nSupported formats include.\n\n2023-11-27 13:00:00\n2023-11-27T13:00:00Z\n2023-11-27T13:00:00-08:00\n2023-11-27T13:00:00-08:00[US/Pacific]\n2023-11-27T13:00:00Z[America/Phoenix]"
      },
      {
        "name": "datetime-end",
        "in": "query",
        "required": true,
        "description": "This is the end of the time window for a given query. The format is based on RFC3339 but also will support additonal params for use in providing a timezone which will allow the API to give the correct range for a given set of data and will be formated in respone using the same format. Allowed values same as datetime-start."
      },
      {
        "name": "fields",
        "in": "query",
        "required": false,
        "description": "Fields in order to fill and get particular statistics for. Separate multiple fields with \",\". Default value is NAME,VOL,CH,ATT,AH",
        "schemaType": "string"
      },
      {
        "name": "remove_zeros",
        "in": "query",
        "required": false,
        "description": "Remove zeros from the results",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  "GetDomainsByStatisticsAgentLog": {
    "id": "GetDomainsByStatisticsAgentLog",
    "method": "GET",
    "path": "/domains/{domain}/statistics/agentLog",
    "resource": "Call Center/Statistics",
    "summary": "Get Agent Log",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": "This is the main organization name. This is used to link resource to its group/tenant/organization/enterprise."
      },
      {
        "name": "datetime-start",
        "in": "query",
        "required": true,
        "description": "This is the start of the time window for a given query. The format is based on RFC3339 but also will support additonal params for use in providing a timezone which will allow the API to give the correct range for a given set of data and will be formated in respone using the same format.\n\nSupported formats include.\n\n2023-11-27 13:00:00\n2023-11-27T13:00:00Z\n2023-11-27T13:00:00-08:00\n2023-11-27T13:00:00-08:00[US/Pacific]\n2023-11-27T13:00:00Z[America/Phoenix]"
      },
      {
        "name": "datetime-end",
        "in": "query",
        "required": true,
        "description": "This is the end of the time window for a given query. The format is based on RFC3339 but also will support additonal params for use in providing a timezone which will allow the API to give the correct range for a given set of data and will be formated in respone using the same format. Allowed values same as datetime-start."
      },
      {
        "name": "fields",
        "in": "query",
        "required": false,
        "description": "Fields in order to fill and get particular statistics for. Separate multiple fields with \",\".Default value is AM,UM,L,B",
        "schemaType": "string"
      },
      {
        "name": "remove_zeros",
        "in": "query",
        "required": false,
        "description": "Remove zeros from the results.",
        "schemaType": "string"
      },
      {
        "name": "department",
        "in": "query",
        "required": false,
        "description": "This is the depertment that user belongs to in the domain. Can be any string to group users, a department is not require to be setup before in order to set it for a user.",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  "SendEmail": {
    "id": "SendEmail",
    "method": "POST",
    "path": "/domains/{domain}/users/{user}/email",
    "resource": "Email",
    "summary": "Send Email using Template",
    "description": "This API will send a email to a specific user usign their email address configured on the account and obtained from the domain and user provided. A example email would be a welcome email with links to setup the new account. ",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": true
  },
  "GetDomainsByCallqueuereportAbandoned": {
    "id": "GetDomainsByCallqueuereportAbandoned",
    "method": "GET",
    "path": "/domains/{domain}/callqueuereport/abandoned",
    "resource": "Call Center/Statistics",
    "summary": "Get Abandoned Calls for all Queues",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": "This is the main organization name. This is used to link resource to its group/tenant/organization/enterprise."
      },
      {
        "name": "datetime-start",
        "in": "query",
        "required": true,
        "description": "This is the start of the time window for a given query. The format is based on RFC3339 but also will support additonal params for use in providing a timezone which will allow the API to give the correct range for a given set of data and will be formated in respone using the same format.\n\nSupported formats include.\n\n2023-11-27 13:00:00\n2023-11-27T13:00:00Z\n2023-11-27T13:00:00-08:00\n2023-11-27T13:00:00-08:00[US/Pacific]\n2023-11-27T13:00:00Z[America/Phoenix]"
      },
      {
        "name": "datetime-end",
        "in": "query",
        "required": true,
        "description": "This is the end of the time window for a given query. The format is based on RFC3339 but also will support additonal params for use in providing a timezone which will allow the API to give the correct range for a given set of data and will be formated in respone using the same format. Allowed values same as datetime-start."
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  "GetDomainsByCallqueuereportAbandonedBy": {
    "id": "GetDomainsByCallqueuereportAbandonedBy",
    "method": "GET",
    "path": "/domains/{domain}/callqueuereport/abandoned/{callqueue}",
    "resource": "Call Center/Statistics",
    "summary": "Get Abandoned Calls for a Specific Queue",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": "This is the main organization name. This is used to link resource to its group/tenant/organization/enterprise."
      },
      {
        "name": "callqueue",
        "in": "path",
        "required": true,
        "description": "When used in path the callqueue value will link to a extension id for a preconfigured callqueue."
      },
      {
        "name": "datetime-start",
        "in": "query",
        "required": true,
        "description": "This is the start of the time window for a given query. The format is based on RFC3339 but also will support additonal params for use in providing a timezone which will allow the API to give the correct range for a given set of data and will be formated in respone using the same format.\n\nSupported formats include.\n\n2023-11-27 13:00:00\n2023-11-27T13:00:00Z\n2023-11-27T13:00:00-08:00\n2023-11-27T13:00:00-08:00[US/Pacific]\n2023-11-27T13:00:00Z[America/Phoenix]"
      },
      {
        "name": "datetime-end",
        "in": "query",
        "required": true,
        "description": "This is the end of the time window for a given query. The format is based on RFC3339 but also will support additonal params for use in providing a timezone which will allow the API to give the correct range for a given set of data and will be formated in respone using the same format. Allowed values same as datetime-start."
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  "GetDomainsByDispositions": {
    "id": "GetDomainsByDispositions",
    "method": "GET",
    "path": "/domains/{domain}/dispositions",
    "resource": "Call Center/Call Dispositions",
    "summary": "Read Call Dispostions",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  "PostDomainsByDispositions": {
    "id": "PostDomainsByDispositions",
    "method": "POST",
    "path": "/domains/{domain}/dispositions",
    "resource": "Call Center/Call Dispositions",
    "summary": "Create Call Disposition in Domain",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": true,
    "minApiVersion": 45
  },
  "GetDomainsByUsersByAnswerrules": {
    "id": "GetDomainsByUsersByAnswerrules",
    "method": "GET",
    "path": "/domains/{domain}/users/{user}/answerrules",
    "resource": "Answer Rules",
    "summary": "Read Answerrules for a User",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": false
  },
  "PostDomainsByUsersByAnswerrules": {
    "id": "PostDomainsByUsersByAnswerrules",
    "method": "POST",
    "path": "/domains/{domain}/users/{user}/answerrules",
    "resource": "Answer Rules",
    "summary": "Add a Answerrule for a User",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": true
  },
  "GetDomainsByUsersByAnswerrulesCount": {
    "id": "GetDomainsByUsersByAnswerrulesCount",
    "method": "GET",
    "path": "/domains/{domain}/users/{user}/answerrules/count",
    "resource": "Answer Rules",
    "summary": "Count Answerrules for a User",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  "GetDomainsUsersAnswerrules": {
    "id": "GetDomainsUsersAnswerrules",
    "method": "GET",
    "path": "/domains/~/users/~/answerrules",
    "resource": "Answer Rules",
    "summary": "Read Answerrules for my  User",
    "description": "",
    "parameters": [],
    "hasRequestBody": false
  },
  "GetDomainsByUsersByAnswerrulesBy": {
    "id": "GetDomainsByUsersByAnswerrulesBy",
    "method": "GET",
    "path": "/domains/{domain}/users/{user}/answerrules/{timeframe}",
    "resource": "Answer Rules",
    "summary": "Read Specifc Timeframe Answerrule for User",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "timeframe",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false
  },
  "DeleteDomainsByUsersByAnswerrulesBy": {
    "id": "DeleteDomainsByUsersByAnswerrulesBy",
    "method": "DELETE",
    "path": "/domains/{domain}/users/{user}/answerrules/{timeframe}",
    "resource": "Answer Rules",
    "summary": "Delete a Answerrule for a User ",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "timeframe",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false
  },
  "PutDomainsByUsersByAnswerrulesBy": {
    "id": "PutDomainsByUsersByAnswerrulesBy",
    "method": "PUT",
    "path": "/domains/{domain}/users/{user}/answerrules/{timeframe}",
    "resource": "Answer Rules",
    "summary": "Update a Answerrule for a User",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "timeframe",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true
  },
  "PutDomainsByUsersByAnswerrulesReorder": {
    "id": "PutDomainsByUsersByAnswerrulesReorder",
    "method": "PUT",
    "path": "/domains/{domain}/users/{user}/answerrules/reorder",
    "resource": "Answer Rules",
    "summary": "Reorder Answerrules for my User",
    "description": "To reorder the answerrules, give an array of time frames used in the user's current answerrules in the order desired. Please be sure to include all time frames and no extraneous ones. Be sure to include \"Default\" when necessary which is named \"*\".",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": true
  },
  "GetDomainsByNumberFilters": {
    "id": "GetDomainsByNumberFilters",
    "method": "GET",
    "path": "/domains/{domain}/number-filters",
    "resource": "Call Blocking",
    "summary": "Read blocked numbers for a Domain",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  "PostDomainsByNumberFilters": {
    "id": "PostDomainsByNumberFilters",
    "method": "POST",
    "path": "/domains/{domain}/number-filters",
    "resource": "Call Blocking",
    "summary": "Add blocked numbers for a Domain",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": true,
    "minApiVersion": 45
  },
  "DeleteDomainsByNumberFilters": {
    "id": "DeleteDomainsByNumberFilters",
    "method": "DELETE",
    "path": "/domains/{domain}/number-filters",
    "resource": "Call Blocking",
    "summary": "Delete blocked numbers for a Domain",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": true,
    "minApiVersion": 45
  },
  "GetDomainsByUsersBynumberFilters": {
    "id": "GetDomainsByUsersBynumberFilters",
    "method": "GET",
    "path": "/domains/{domain}/users/{user}number-filters",
    "resource": "Call Blocking",
    "summary": "Read blocked numbers for a User",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  "PostDomainsByUsersByNumberFilters": {
    "id": "PostDomainsByUsersByNumberFilters",
    "method": "POST",
    "path": "/domains/{domain}/users/{user}/number-filters",
    "resource": "Call Blocking",
    "summary": "Add blocked numbers for a User",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": true,
    "minApiVersion": 45
  },
  "DeleteDomainsByUsersByNumberFilters": {
    "id": "DeleteDomainsByUsersByNumberFilters",
    "method": "DELETE",
    "path": "/domains/{domain}/users/{user}/number-filters",
    "resource": "Call Blocking",
    "summary": "Delete blocked numbers for a User",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": true,
    "minApiVersion": 45
  },
  "PostDomainsByAutoattendants": {
    "id": "PostDomainsByAutoattendants",
    "method": "POST",
    "path": "/domains/{domain}/autoattendants",
    "resource": "Auto Attendant",
    "summary": "Create Auto Attendant",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": true
  },
  "GetDomainsByAutoattendants": {
    "id": "GetDomainsByAutoattendants",
    "method": "GET",
    "path": "/domains/{domain}/autoattendants",
    "resource": "Auto Attendant",
    "summary": "Read Auto Attendants",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": false
  },
  "GetDomainsByUsersByAutoattendantsBy": {
    "id": "GetDomainsByUsersByAutoattendantsBy",
    "method": "GET",
    "path": "/domains/{domain}/users/{user}/autoattendants/{prompt}",
    "resource": "Auto Attendant",
    "summary": "Read Specific Auto Attendant",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "prompt",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false
  },
  "PutDomainsByUsersByAutoattendantsBy": {
    "id": "PutDomainsByUsersByAutoattendantsBy",
    "method": "PUT",
    "path": "/domains/{domain}/users/{user}/autoattendants/{prompt}",
    "resource": "Auto Attendant",
    "summary": "Update Specific Auto Attendant",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "prompt",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true
  },
  "DeleteDomainsByUsersByAutoattendantsBy": {
    "id": "DeleteDomainsByUsersByAutoattendantsBy",
    "method": "DELETE",
    "path": "/domains/{domain}/users/{user}/autoattendants/{prompt}",
    "resource": "Auto Attendant",
    "summary": "Delete Specific Auto Attendant",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "prompt",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  "ReadVoicemails": {
    "id": "ReadVoicemails",
    "method": "GET",
    "path": "/domains/{domain}/users/{user}/voicemails/{folder}",
    "resource": "Media/Voicemail",
    "summary": "Read Voicemail for User by Folder",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "folder",
        "in": "path",
        "required": true,
        "description": "Options include new, save, and trash",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false
  },
  "GetDomainsByUsersByVoicemailsByCount": {
    "id": "GetDomainsByUsersByVoicemailsByCount",
    "method": "GET",
    "path": "/domains/{domain}/users/{user}/voicemails/{folder}/count",
    "resource": "Media/Voicemail",
    "summary": "Count Voicemail for User by Folder",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "folder",
        "in": "path",
        "required": true,
        "description": "Options include new, save, and trash",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  "ReadVoicemail": {
    "id": "ReadVoicemail",
    "method": "GET",
    "path": "/domains/{domain}/users/{user}/voicemails/{folder}/{filename}",
    "resource": "Media/Voicemail",
    "summary": "Read Specific Voicemail for User ",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "folder",
        "in": "path",
        "required": true,
        "description": "Options include new, save, and trash",
        "schemaType": "string"
      },
      {
        "name": "filename",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false
  },
  "DeleteVoicemail": {
    "id": "DeleteVoicemail",
    "method": "DELETE",
    "path": "/domains/{domain}/users/{user}/voicemails/{folder}/{filename}",
    "resource": "Media/Voicemail",
    "summary": "Delete Voicemail ",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "folder",
        "in": "path",
        "required": true,
        "description": "Options include new, save, and trash",
        "schemaType": "string"
      },
      {
        "name": "filename",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false
  },
  "SaveVoicemail": {
    "id": "SaveVoicemail",
    "method": "PATCH",
    "path": "/domains/{domain}/users/{user}/voicemails/{folder}/{filename}/save",
    "resource": "Media/Voicemail",
    "summary": "Move Voicemail to save folder",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "folder",
        "in": "path",
        "required": true,
        "description": "Options include new, save, and trash",
        "schemaType": "string"
      },
      {
        "name": "filename",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false
  },
  "ForwardVoicemail": {
    "id": "ForwardVoicemail",
    "method": "PATCH",
    "path": "/domains/{domain}/users/{user}/voicemails/{folder}/{filename}/forward",
    "resource": "Media/Voicemail",
    "summary": "Forward Voicemail to another user",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "folder",
        "in": "path",
        "required": true,
        "description": "Options include new, save, and trash",
        "schemaType": "string"
      },
      {
        "name": "filename",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true
  },
  "ReadGreetings": {
    "id": "ReadGreetings",
    "method": "GET",
    "path": "/domains/{domain}/users/{user}/greetings",
    "resource": "Media/Greetings",
    "summary": "Read Greetings for User",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": false
  },
  "CreateGreetingTTS": {
    "id": "CreateGreetingTTS",
    "method": "POST",
    "path": "/domains/{domain}/users/{user}/greetings",
    "resource": "Media/Greetings",
    "summary": "Create a new Greeting from TTS",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": true
  },
  "GetDomainsByUsersByGreetingsCount": {
    "id": "GetDomainsByUsersByGreetingsCount",
    "method": "GET",
    "path": "/domains/{domain}/users/{user}/greetings/count",
    "resource": "Media/Greetings",
    "summary": "Count Greetings for User",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  "ReadGreeting": {
    "id": "ReadGreeting",
    "method": "GET",
    "path": "/domains/{domain}/users/{user}/greetings/{index}",
    "resource": "Media/Greetings",
    "summary": "Read Specific Greeting for User",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "index",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false
  },
  "DeleteGreeting": {
    "id": "DeleteGreeting",
    "method": "DELETE",
    "path": "/domains/{domain}/users/{user}/greetings/{index}",
    "resource": "Media/Greetings",
    "summary": "Delete Specific Greeting for User",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "index",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false
  },
  "UpdateGreetingTTS": {
    "id": "UpdateGreetingTTS",
    "method": "PUT",
    "path": "/domains/{domain}/users/{user}/greetings/{index}",
    "resource": "Media/Greetings",
    "summary": "Update Greeting with TTS script",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "index",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true
  },
  "CreateGreetingBase64": {
    "id": "CreateGreetingBase64",
    "method": "POST",
    "path": "/domains/{domain}/users/{user}/greetings",
    "resource": "Media/Greetings",
    "summary": "Create a new Greeting from Upload (JSON + Base64 File)",
    "description": "> Note: # and anything after is NOT needed, its just to allow multiple examples for the same path/method. ",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": true
  },
  "UpdateGreetingBase64": {
    "id": "UpdateGreetingBase64",
    "method": "PUT",
    "path": "/domains/{domain}/users/{user}/greetings/{index}",
    "resource": "Media/Greetings",
    "summary": "Update Greeting from Upload (JSON + Base64 File)",
    "description": "> Note: # and anything after is NOT needed, its just to allow multiple examples for the same path/method. ",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "index",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true
  },
  "CreateGreetingFileUpload": {
    "id": "CreateGreetingFileUpload",
    "method": "POST",
    "path": "/domains/{domain}/users/{user}/greetings",
    "resource": "Media/Greetings",
    "summary": "Create a new Greeting from Upload (Multipart/Mixed Post)",
    "description": "> Note: # and anything after is NOT needed, its just to allow multiple examples for the same path/method. ",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": true
  },
  "UpdateGreetingFileUpload": {
    "id": "UpdateGreetingFileUpload",
    "method": "PUT",
    "path": "/domains/{domain}/users/{user}/greetings/{index}",
    "resource": "Media/Greetings",
    "summary": "Update Greeting from Upload (Multipart/Mixed Post)",
    "description": "> Note: # and anything after is NOT needed, its just to allow multiple examples for the same path/method. ",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "index",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true
  },
  "ReadMohDomain": {
    "id": "ReadMohDomain",
    "method": "GET",
    "path": "/domains/{domain}/moh",
    "resource": "Media/Music on Hold/Domain",
    "summary": "Read MOH for Domain",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": false
  },
  "CreateMohDomainTTS": {
    "id": "CreateMohDomainTTS",
    "method": "POST",
    "path": "/domains/{domain}/moh",
    "resource": "Media/Music on Hold/Domain",
    "summary": "Create a new MOH for Domain from TTS",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": true
  },
  "GetDomainsByMohCount": {
    "id": "GetDomainsByMohCount",
    "method": "GET",
    "path": "/domains/{domain}/moh/count",
    "resource": "Media/Music on Hold/Domain",
    "summary": "Count MOH for Domain",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  "UpdateMohDomainTTS": {
    "id": "UpdateMohDomainTTS",
    "method": "PUT",
    "path": "/domains/{domain}/moh/{index}",
    "resource": "Media/Music on Hold/Domain",
    "summary": "Update MOH for Domain from TTS",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "index",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true
  },
  "DeleteMohDomain": {
    "id": "DeleteMohDomain",
    "method": "DELETE",
    "path": "/domains/{domain}/moh/{index}",
    "resource": "Media/Music on Hold/Domain",
    "summary": "Delete MOH for Domain",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "index",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false
  },
  "CreateMohDomainBase64": {
    "id": "CreateMohDomainBase64",
    "method": "POST",
    "path": "/domains/{domain}/moh",
    "resource": "Media/Music on Hold/Domain",
    "summary": "Create a new MOH for Domain from Upload (JSON + Base64 File)",
    "description": "> Note: # and anything after is NOT needed, its just to allow multiple examples for the same path/method. ",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": true
  },
  "UpdateMohDomainBase64": {
    "id": "UpdateMohDomainBase64",
    "method": "PUT",
    "path": "/domains/{domain}/moh/{index}",
    "resource": "Media/Music on Hold/Domain",
    "summary": "Update MOH for Domain from Upload (JSON + Base64 File)",
    "description": "> Note: # and anything after is NOT needed, its just to allow multiple examples for the same path/method. ",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "index",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true
  },
  "CreateMohDomainFileUpload": {
    "id": "CreateMohDomainFileUpload",
    "method": "POST",
    "path": "/domains/{domain}/moh",
    "resource": "Media/Music on Hold/Domain",
    "summary": "Create a new MOH for Domain from Upload (Multipart/Mixed Post)",
    "description": "> Note: # and anything after is NOT needed, its just to allow multiple examples for the same path/method. ",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": true
  },
  "UpdateMohDomainFileUpload": {
    "id": "UpdateMohDomainFileUpload",
    "method": "PUT",
    "path": "/domains/{domain}/moh/{index}",
    "resource": "Media/Music on Hold/Domain",
    "summary": "Update MOH for Domain from Upload (Multipart/Mixed Post)",
    "description": "> Note: # and anything after is NOT needed, its just to allow multiple examples for the same path/method. ",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "index",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true
  },
  "ReadMohUser": {
    "id": "ReadMohUser",
    "method": "GET",
    "path": "/domains/{domain}/users/{user}/moh",
    "resource": "Media/Music on Hold/User",
    "summary": "Read MOH for User",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": false
  },
  "CreateMohUserTTS": {
    "id": "CreateMohUserTTS",
    "method": "POST",
    "path": "/domains/{domain}/users/{user}/moh",
    "resource": "Media/Music on Hold/User",
    "summary": "Create a new MOH for Domain from TTS",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": true
  },
  "GetDomainsByUsersByMohCount": {
    "id": "GetDomainsByUsersByMohCount",
    "method": "GET",
    "path": "/domains/{domain}/users/{user}/moh/count",
    "resource": "Media/Music on Hold/User",
    "summary": "Count MOH for User",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  "CreateMohUserBase64": {
    "id": "CreateMohUserBase64",
    "method": "POST",
    "path": "/domains/{domain}/users/{user}/moh",
    "resource": "Media/Music on Hold/User",
    "summary": "Create a new MOH for User from Upload (JSON + Base64 File)",
    "description": "> Note: # and anything after is NOT needed, its just to allow multiple examples for the same path/method. ",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": true
  },
  "UpdateMohUserBase64": {
    "id": "UpdateMohUserBase64",
    "method": "PUT",
    "path": "/domains/{domain}/users/{user}/moh/{index}/",
    "resource": "Media/Music on Hold/User",
    "summary": "Update MOH for User from Upload (JSON + Base64 File)",
    "description": "> Note: # and anything after is NOT needed, its just to allow multiple examples for the same path/method. ",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "index",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true
  },
  "UpdateMohUserTTS": {
    "id": "UpdateMohUserTTS",
    "method": "PUT",
    "path": "/domains/{domain}/users/{user}/moh/{index}",
    "resource": "Media/Music on Hold/User",
    "summary": "Update MOH for Domain from TTS",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "index",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true
  },
  "DeleteMohUser": {
    "id": "DeleteMohUser",
    "method": "DELETE",
    "path": "/domains/{domain}/users/{user}/moh/{index}",
    "resource": "Media/Music on Hold/User",
    "summary": "Delete MOH for User ",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "index",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false
  },
  "CreateMohUserFileUpload": {
    "id": "CreateMohUserFileUpload",
    "method": "POST",
    "path": "/domains/{domain}/users/{user}/moh",
    "resource": "Media/Music on Hold/User",
    "summary": "Create a new MOH for User from Upload (Multipart/Mixed Post)",
    "description": "> Note: # and anything after is NOT needed, its just to allow multiple examples for the same path/method. ",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": true
  },
  "UpdateMohUserFileUpload": {
    "id": "UpdateMohUserFileUpload",
    "method": "PUT",
    "path": "/domains/{domain}/users/{user}/moh/{index}",
    "resource": "Media/Music on Hold/User",
    "summary": "Update a MOH for User from Upload (Multipart/Mixed Post)",
    "description": "> Note: # and anything after is NOT needed, its just to allow multiple examples for the same path/method. ",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "index",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true
  },
  "ReadMsgDomain": {
    "id": "ReadMsgDomain",
    "method": "GET",
    "path": "/domains/{domain}/msg",
    "resource": "Media/Hold Messages/Domain",
    "summary": "Read Hold Messages for Domain",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": false
  },
  "CreateMsgDomainFileUpload": {
    "id": "CreateMsgDomainFileUpload",
    "method": "POST",
    "path": "/domains/{domain}/msg",
    "resource": "Media/Hold Messages/Domain",
    "summary": "Create a new Hold Messge for Domain from Upload (Multipart/Mixed Post)",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": true
  },
  "GetDomainsByMsgCount": {
    "id": "GetDomainsByMsgCount",
    "method": "GET",
    "path": "/domains/{domain}/msg/count",
    "resource": "Media/Hold Messages/Domain",
    "summary": "Count Hold Messages for Domain",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  "UpdateMsgDomainFileUpload": {
    "id": "UpdateMsgDomainFileUpload",
    "method": "PUT",
    "path": "/domains/{domain}/msg/{index}",
    "resource": "Media/Hold Messages/Domain",
    "summary": "Update Hold Messge for Domain from Upload (Multipart/Mixed Post)",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "index",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true
  },
  "DeleteMsgDomain": {
    "id": "DeleteMsgDomain",
    "method": "DELETE",
    "path": "/domains/{domain}/msg/{index}",
    "resource": "Media/Hold Messages/Domain",
    "summary": "Delete Hold Messge for Domain",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "index",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false
  },
  "ReadMsgUser": {
    "id": "ReadMsgUser",
    "method": "GET",
    "path": "/domains/{domain}/users/{user}/msg",
    "resource": "Media/Hold Messages/User",
    "summary": "Read Hold Messages for User",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": false
  },
  "PostDomainsByUsersByMsg": {
    "id": "PostDomainsByUsersByMsg",
    "method": "POST",
    "path": "/domains/{domain}/users/{user}/msg",
    "resource": "Media/Hold Messages/User",
    "summary": "Create a new Hold Messge for User from Upload (Multipart/Mixed Post)",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": true
  },
  "CountMsgUser": {
    "id": "CountMsgUser",
    "method": "GET",
    "path": "/domains/{domain}/users/{user}/msg/count",
    "resource": "Media/Hold Messages/User",
    "summary": "Count Hold Messages for User",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  "UpdateMsgUserFileUpload": {
    "id": "UpdateMsgUserFileUpload",
    "method": "PUT",
    "path": "/domains/{domain}/users/{user}/msg/{index}",
    "resource": "Media/Hold Messages/User",
    "summary": "Update Hold Messge for User from Upload (Multipart/Mixed Post)",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "index",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true
  },
  "DeleteMsgUser": {
    "id": "DeleteMsgUser",
    "method": "DELETE",
    "path": "/domains/{domain}/users/{user}/msg/{index}",
    "resource": "Media/Hold Messages/User",
    "summary": "Delete Hold Messge for User ",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "index",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false
  },
  "GetDomainsByUsersByVoicesBy": {
    "id": "GetDomainsByUsersByVoicesBy",
    "method": "GET",
    "path": "/domains/{domain}/users/{user}/voices/{language}",
    "resource": "Media/Text to Speech",
    "summary": "Get Available Voices",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "language",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      },
      {
        "name": "gender",
        "in": "query",
        "required": false,
        "description": "",
        "schemaType": "string"
      },
      {
        "name": "vendor",
        "in": "query",
        "required": false,
        "description": "",
        "schemaType": "string"
      },
      {
        "name": "id",
        "in": "query",
        "required": false,
        "description": "",
        "schemaType": "string"
      },
      {
        "name": "name",
        "in": "query",
        "required": false,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false
  },
  "PostDomainsByUsersByVoices": {
    "id": "PostDomainsByUsersByVoices",
    "method": "POST",
    "path": "/domains/{domain}/users/{user}/voices",
    "resource": "Media/Text to Speech",
    "summary": "Synthesize Voice (Text to Speech) ",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": true
  },
  "GetDomainsByUsersByVoices": {
    "id": "GetDomainsByUsersByVoices",
    "method": "GET",
    "path": "/domains/{domain}/users/{user}/voices",
    "resource": "Media/Text to Speech",
    "summary": "Synthesize Voice (Text to Speech)  via GET",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "script",
        "in": "query",
        "required": false,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false
  },
  "GetCdrs": {
    "id": "GetCdrs",
    "method": "GET",
    "path": "/cdrs",
    "resource": "CDR (Call History)",
    "summary": "Read CDRs",
    "description": "",
    "parameters": [
      {
        "name": "datetime-start",
        "in": "query",
        "required": true,
        "description": ""
      },
      {
        "name": "datetime-end",
        "in": "query",
        "required": true,
        "description": ""
      },
      {
        "name": "start",
        "in": "query",
        "required": false,
        "description": ""
      },
      {
        "name": "limit",
        "in": "query",
        "required": false,
        "description": ""
      },
      {
        "name": "type",
        "in": "query",
        "required": false,
        "description": "Options include Inbound, Outbound, On-net, Off-net, Missed, Received, or integer type 0,1,2,3",
        "schemaType": "string"
      },
      {
        "name": "orig_callid",
        "in": "query",
        "required": false,
        "description": "Optional and legacy ability to lookup a specific call by orig_callid . Only available for top level without specific domain set. \n",
        "schemaType": "string"
      },
      {
        "name": "term_callid",
        "in": "query",
        "required": false,
        "description": "Optional and legacy ability to lookup a specific call by term_callid. Only available for top level without specific domain set. ",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false
  },
  "GetDomainsByCdrs": {
    "id": "GetDomainsByCdrs",
    "method": "GET",
    "path": "/domains/{domain}/cdrs",
    "resource": "CDR (Call History)",
    "summary": "Read CDRs for Domain",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "datetime-start",
        "in": "query",
        "required": true,
        "description": ""
      },
      {
        "name": "datetime-end",
        "in": "query",
        "required": true,
        "description": ""
      },
      {
        "name": "start",
        "in": "query",
        "required": false,
        "description": ""
      },
      {
        "name": "limit",
        "in": "query",
        "required": false,
        "description": ""
      },
      {
        "name": "type",
        "in": "query",
        "required": false,
        "description": "Options include Inbound, Outbound, On-net, Off-net, Missed, Received, or integer type 0,1,2,3",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false
  },
  "GetDomainsByUsersByCdrs": {
    "id": "GetDomainsByUsersByCdrs",
    "method": "GET",
    "path": "/domains/{domain}/users/{user}/cdrs",
    "resource": "CDR (Call History)",
    "summary": " Read CDRs for Specific User",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "datetime-start",
        "in": "query",
        "required": true,
        "description": ""
      },
      {
        "name": "datetime-end",
        "in": "query",
        "required": true,
        "description": ""
      },
      {
        "name": "start",
        "in": "query",
        "required": false,
        "description": ""
      },
      {
        "name": "limit",
        "in": "query",
        "required": false,
        "description": ""
      },
      {
        "name": "type",
        "in": "query",
        "required": false,
        "description": "Options include Inbound, Outbound, On-net, Off-net, Missed, Received, or integer type 0,1,2,3",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false
  },
  "GetDomainsByCdrs_2": {
    "id": "GetDomainsByCdrs_2",
    "method": "GET",
    "path": "/domains/{domain}/cdrs",
    "resource": "CDR (Call History)",
    "summary": "Search CDRs for Domain",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "datetime-start",
        "in": "query",
        "required": true,
        "description": ""
      },
      {
        "name": "datetime-end",
        "in": "query",
        "required": true,
        "description": ""
      },
      {
        "name": "dialled",
        "in": "query",
        "required": false,
        "description": "The dialed number for the call. Can be a paritial match. ",
        "schemaType": "string"
      },
      {
        "name": "caller",
        "in": "query",
        "required": false,
        "description": "The callerid number for the call. Can be a paritial match. ",
        "schemaType": "string"
      },
      {
        "name": "site",
        "in": "query",
        "required": false,
        "description": "Use if wanting to seach for calls in a certain \"site\".",
        "schemaType": "string"
      },
      {
        "name": "group",
        "in": "query",
        "required": false,
        "description": "Use if wanting to seach for calls in a certain \"department\".",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false
  },
  "GetDomainsByCdrs_3": {
    "id": "GetDomainsByCdrs_3",
    "method": "GET",
    "path": "/domains/{domain}/cdrs",
    "resource": "CDR (Call History)",
    "summary": "Read CDRs for Site in Domain",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "datetime-start",
        "in": "query",
        "required": false,
        "description": ""
      },
      {
        "name": "datetime-end",
        "in": "query",
        "required": false,
        "description": ""
      },
      {
        "name": "site",
        "in": "query",
        "required": false,
        "description": "Use if wanting to seach for calls in a certain \"site\".",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false
  },
  "GetCdrsCount": {
    "id": "GetCdrsCount",
    "method": "GET",
    "path": "/cdrs/count",
    "resource": "CDR (Call History)",
    "summary": "Count CDRs and SUM minutes",
    "description": "",
    "parameters": [
      {
        "name": "datetime-start",
        "in": "query",
        "required": true,
        "description": ""
      },
      {
        "name": "datetime-end",
        "in": "query",
        "required": true,
        "description": ""
      },
      {
        "name": "type",
        "in": "query",
        "required": false,
        "description": "Options include Inbound, Outbound, On-net, Off-net, Missed, Received, or integer type 0,1,2,3",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false
  },
  "GetDomainsByCdrsCount": {
    "id": "GetDomainsByCdrsCount",
    "method": "GET",
    "path": "/domains/{domain}/cdrs/count",
    "resource": "CDR (Call History)",
    "summary": "Count CDRs and SUM minutes for Domain",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "datetime-start",
        "in": "query",
        "required": true,
        "description": ""
      },
      {
        "name": "datetime-end",
        "in": "query",
        "required": true,
        "description": ""
      },
      {
        "name": "type",
        "in": "query",
        "required": false,
        "description": "Options include Inbound, Outbound, On-net, Off-net, Missed, Received, or integer type 0,1,2,3",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false
  },
  "GetDomainsByUsersByCdrsCount": {
    "id": "GetDomainsByUsersByCdrsCount",
    "method": "GET",
    "path": "/domains/{domain}/users/{user}/cdrs/count",
    "resource": "CDR (Call History)",
    "summary": "Count CDRs and SUM minutes for Specifc User",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "datetime-start",
        "in": "query",
        "required": true,
        "description": ""
      },
      {
        "name": "datetime-end",
        "in": "query",
        "required": true,
        "description": ""
      },
      {
        "name": "type",
        "in": "query",
        "required": false,
        "description": "Options include Inbound, Outbound, On-net, Off-net, Missed, Received, or integer type 0,1,2,3",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false
  },
  "GetDomainsByScheduleCount": {
    "id": "GetDomainsByScheduleCount",
    "method": "GET",
    "path": "/domains/{domain}/schedule/count",
    "resource": "CDR Schedule",
    "summary": "Count CDR Schedules for Domain",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  "GetResellersByScheduleCount": {
    "id": "GetResellersByScheduleCount",
    "method": "GET",
    "path": "/resellers/{reseller}/schedule/count",
    "resource": "CDR Schedule",
    "summary": "Count CDR Schedules for Reseller",
    "description": "",
    "parameters": [
      {
        "name": "reseller",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  "GetDomainsByScheduleByCount": {
    "id": "GetDomainsByScheduleByCount",
    "method": "GET",
    "path": "/domains/{domain}/schedule/{schedule_name}/count",
    "resource": "CDR Schedule",
    "summary": "Count CDR Schedules by Name",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "schedule_name",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  "GetSipFlow": {
    "id": "GetSipFlow",
    "method": "GET",
    "path": "/sipflow",
    "resource": "Call Traces & Cradle to Grave",
    "summary": "Get Call Trace (SIPFlow) For Call",
    "description": "",
    "parameters": [
      {
        "name": "start_time",
        "in": "query",
        "required": false,
        "description": "",
        "schemaType": "string"
      },
      {
        "name": "end_time",
        "in": "query",
        "required": false,
        "description": "",
        "schemaType": "string"
      },
      {
        "name": "callids",
        "in": "query",
        "required": false,
        "description": "",
        "schemaType": "string"
      },
      {
        "name": "servers",
        "in": "query",
        "required": true,
        "description": "",
        "schemaType": "string"
      },
      {
        "name": "type",
        "in": "query",
        "required": true,
        "description": "call_trace,cradle_to_grave,csv",
        "schemaType": "string"
      },
      {
        "name": "download",
        "in": "query",
        "required": false,
        "description": "Set to yes to download the file instead of getting base64 data in JSON. ",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false
  },
  "GetCradle2Grave": {
    "id": "GetCradle2Grave",
    "method": "GET",
    "path": "/sipflow",
    "resource": "Call Traces & Cradle to Grave",
    "summary": "Get Cradle to Grave Info For Call",
    "description": "",
    "parameters": [
      {
        "name": "start_time",
        "in": "query",
        "required": false,
        "description": "",
        "schemaType": "string"
      },
      {
        "name": "end_time",
        "in": "query",
        "required": false,
        "description": "",
        "schemaType": "string"
      },
      {
        "name": "callids",
        "in": "query",
        "required": false,
        "description": "",
        "schemaType": "string"
      },
      {
        "name": "servers",
        "in": "query",
        "required": true,
        "description": "",
        "schemaType": "string"
      },
      {
        "name": "type",
        "in": "query",
        "required": true,
        "description": "call_trace,cradle_to_grave,csv",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false
  },
  "GetCallTrace": {
    "id": "GetCallTrace",
    "method": "GET",
    "path": "/sipflow",
    "resource": "Call Traces & Cradle to Grave",
    "summary": "Get CSV of call trace For Call",
    "description": "",
    "parameters": [
      {
        "name": "start_time",
        "in": "query",
        "required": false,
        "description": "",
        "schemaType": "string"
      },
      {
        "name": "end_time",
        "in": "query",
        "required": false,
        "description": "",
        "schemaType": "string"
      },
      {
        "name": "callids",
        "in": "query",
        "required": false,
        "description": "",
        "schemaType": "string"
      },
      {
        "name": "servers",
        "in": "query",
        "required": true,
        "description": "",
        "schemaType": "string"
      },
      {
        "name": "type",
        "in": "query",
        "required": true,
        "description": "call_trace,cradle_to_grave,csv",
        "schemaType": "string"
      },
      {
        "name": "download",
        "in": "query",
        "required": false,
        "description": "Set to yes to download the file instead of getting base64 data in JSON. ",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false
  },
  "GetDomainsByTranscriptions": {
    "id": "GetDomainsByTranscriptions",
    "method": "GET",
    "path": "/domains/{domain}/transcriptions",
    "resource": "Transcriptions & Sentiment",
    "summary": "Read Transcription for Specific Call",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "id",
        "in": "query",
        "required": true,
        "description": "The Job Id of the recording transcription. Required to be given on request. ID can be found in CDR read when available using field \"call-intelligence-job-id\"",
        "schemaType": "number"
      },
      {
        "name": "date",
        "in": "query",
        "required": true,
        "description": "The date will help identify the year and month of the call to limit the search down. The format will be YYYYMM",
        "schemaType": "string"
      },
      {
        "name": "callid",
        "in": "query",
        "required": true,
        "description": "One callid_id needs to be provided that can be linked to the domain of the call> you can use any of the fields orig_callid, term_callid, by_callid or if you dont know which one you have just callid though callid might have additional DB lookups. ",
        "schemaType": "string"
      },
      {
        "name": "orig_callid",
        "in": "query",
        "required": false,
        "description": "One callid_id needs to be provided that can be linked to the domain of the call> you can use any of the fields orig_callid, term_callid, by_callid or if you dont know which one you have just callid though callid might have additional DB lookups. ",
        "schemaType": "string"
      },
      {
        "name": "term_callid",
        "in": "query",
        "required": false,
        "description": "One callid_id needs to be provided that can be linked to the domain of the call> you can use any of the fields orig_callid, term_callid, by_callid or if you dont know which one you have just callid though callid might have additional DB lookups. ",
        "schemaType": "string"
      },
      {
        "name": "by_callid",
        "in": "query",
        "required": false,
        "description": "One callid_id needs to be provided that can be linked to the domain of the call> you can use any of the fields orig_callid, term_callid, by_callid or if you dont know which one you have just callid though callid might have additional DB lookups. ",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  "GetDomainsByCalls": {
    "id": "GetDomainsByCalls",
    "method": "GET",
    "path": "/domains/{domain}/calls",
    "resource": "Calls (live/active calls)",
    "summary": "Read Active Calls In Domain",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": false
  },
  "GetDomainsByCallsCount": {
    "id": "GetDomainsByCallsCount",
    "method": "GET",
    "path": "/domains/{domain}/calls/count",
    "resource": "Calls (live/active calls)",
    "summary": "Count Active Calls In Domain",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": false
  },
  "GetDomainsByUsersByCalls": {
    "id": "GetDomainsByUsersByCalls",
    "method": "GET",
    "path": "/domains/{domain}/users/{user}/calls",
    "resource": "Calls (live/active calls)",
    "summary": "Read Active Calls for User",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": false
  },
  "PostDomainsByUsersByCalls": {
    "id": "PostDomainsByUsersByCalls",
    "method": "POST",
    "path": "/domains/{domain}/users/{user}/calls",
    "resource": "Calls (live/active calls)",
    "summary": "Make a new Call",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": true
  },
  "GetDomainsByUsersByCallsBy": {
    "id": "GetDomainsByUsersByCallsBy",
    "method": "GET",
    "path": "/domains/{domain}/users/{user}/calls/{callid}",
    "resource": "Calls (live/active calls)",
    "summary": "Read Specific Active Call",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "callid",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false
  },
  "DeleteDomainsByUsersByCallsBy": {
    "id": "DeleteDomainsByUsersByCallsBy",
    "method": "DELETE",
    "path": "/domains/{domain}/users/{user}/calls/{call_id}",
    "resource": "Calls (live/active calls)",
    "summary": "Disconnect Call",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "call_id",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false
  },
  "PatchDomainsByUsersByCallsByTransferPeer": {
    "id": "PatchDomainsByUsersByCallsByTransferPeer",
    "method": "PATCH",
    "path": "/domains/{domain}/users/{user}/calls/{call_id}/transferPeer",
    "resource": "Calls (live/active calls)",
    "summary": "Transfer Peer Call",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "call_id",
        "in": "path",
        "required": true,
        "description": "This will be the callid for the requested call. This should be a random string generated by your application per call session.",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true,
    "minApiVersion": 45
  },
  "PatchDomainsByUsersByCallsByTransfer": {
    "id": "PatchDomainsByUsersByCallsByTransfer",
    "method": "PATCH",
    "path": "/domains/{domain}/users/{user}/calls/{call_id}/transfer",
    "resource": "Calls (live/active calls)",
    "summary": "Transfer Call",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "call_id",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true
  },
  "PatchDomainsByUsersByCallsByAnswer": {
    "id": "PatchDomainsByUsersByCallsByAnswer",
    "method": "PATCH",
    "path": "/domains/{domain}/users/{user}/calls/{call_id}/answer",
    "resource": "Calls (live/active calls)",
    "summary": "Answer Call",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "call_id",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true
  },
  "PatchDomainsByUsersByCallsByHold": {
    "id": "PatchDomainsByUsersByCallsByHold",
    "method": "PATCH",
    "path": "/domains/{domain}/users/{user}/calls/{call_id}/hold",
    "resource": "Calls (live/active calls)",
    "summary": "Hold Active Call",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "call_id",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false
  },
  "PatchDomainsByUsersByCallsByUnhold": {
    "id": "PatchDomainsByUsersByCallsByUnhold",
    "method": "PATCH",
    "path": "/domains/{domain}/users/{user}/calls/{call_id}/unhold",
    "resource": "Calls (live/active calls)",
    "summary": "Un-Hold Active Call",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "call_id",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false
  },
  "DeleteDomainsByUsersByCallsByReject": {
    "id": "DeleteDomainsByUsersByCallsByReject",
    "method": "DELETE",
    "path": "/domains/{domain}/users/{user}/calls/{call_id}/reject",
    "resource": "Calls (live/active calls)",
    "summary": "Reject Call",
    "description": "Reject a call with orig call ID. This would cancel a \"ringing\" call prior to any answer event. If you're looking to disconnect an active call then, reference DELETE on /domains/{domain}/users/{user}/calls/{call_id}",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "call_id",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  "PostCallsReport": {
    "id": "PostCallsReport",
    "method": "POST",
    "path": "/calls/report",
    "resource": "Calls (live/active calls)",
    "summary": "Report Active Calls",
    "description": "",
    "parameters": [],
    "hasRequestBody": true,
    "minApiVersion": 45
  },
  "GetDomainsByContacts": {
    "id": "GetDomainsByContacts",
    "method": "GET",
    "path": "/domains/{domain}/contacts",
    "resource": "Contacts/Shared Contacts",
    "summary": "Get Domain Contacts",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": false
  },
  "PostDomainsByContacts": {
    "id": "PostDomainsByContacts",
    "method": "POST",
    "path": "/domains/{domain}/contacts",
    "resource": "Contacts/Shared Contacts",
    "summary": "Create Shared Contact",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": true
  },
  "GetDomainsByContactsBy": {
    "id": "GetDomainsByContactsBy",
    "method": "GET",
    "path": "/domains/{domain}/contacts/{contact_id}",
    "resource": "Contacts/Shared Contacts",
    "summary": "Get Specific Domain Contact",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "contact_id",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false
  },
  "PutDomainsByContactsBy": {
    "id": "PutDomainsByContactsBy",
    "method": "PUT",
    "path": "/domains/{domain}/contacts/{contact_id}",
    "resource": "Contacts/Shared Contacts",
    "summary": "Update Shared Contact",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "contact_id",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true
  },
  "DeleteDomainsByContactsBy": {
    "id": "DeleteDomainsByContactsBy",
    "method": "DELETE",
    "path": "/domains/{domain}/contacts/{contact_id}",
    "resource": "Contacts/Shared Contacts",
    "summary": "Delete Shared Contact",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "contact_id",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false
  },
  "GetDomainsByUsersByContacts": {
    "id": "GetDomainsByUsersByContacts",
    "method": "GET",
    "path": "/domains/{domain}/users/{user}/contacts",
    "resource": "Contacts",
    "summary": "Get Contacts for User",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "includeDomain",
        "in": "query",
        "required": false,
        "description": "Whether to include onnet domain users, will also match the users to contact details. (values: \"yes\"/\"no\", default \"no\")",
        "schemaType": "boolean"
      }
    ],
    "hasRequestBody": false
  },
  "PostDomainsByUsersByContacts": {
    "id": "PostDomainsByUsersByContacts",
    "method": "POST",
    "path": "/domains/{domain}/users/{user}/contacts",
    "resource": "Contacts",
    "summary": "Create Contact",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": true
  },
  "GetDomainsByUsersByContactsBy": {
    "id": "GetDomainsByUsersByContactsBy",
    "method": "GET",
    "path": "/domains/{domain}/users/{user}/contacts/{contact_id}",
    "resource": "Contacts",
    "summary": "Get Specific Contact for User",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "contact_id",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false
  },
  "PutDomainsByUsersByContactsBy": {
    "id": "PutDomainsByUsersByContactsBy",
    "method": "PUT",
    "path": "/domains/{domain}/users/{user}/contacts/{contact_id}",
    "resource": "Contacts",
    "summary": "Update Contact",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "contact_id",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true
  },
  "DeleteDomainsByUsersByContactsBy": {
    "id": "DeleteDomainsByUsersByContactsBy",
    "method": "DELETE",
    "path": "/domains/{domain}/users/{user}/contacts/{contact_id}",
    "resource": "Contacts",
    "summary": "Delete Contact",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "contact_id",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false
  },
  "GetDomainsByUsersByContactsCount": {
    "id": "GetDomainsByUsersByContactsCount",
    "method": "GET",
    "path": "/domains/{domain}/users/{user}/contacts/count",
    "resource": "Contacts",
    "summary": "Count Contacts for User",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": false
  },
  "GetDomainsUsersContacts": {
    "id": "GetDomainsUsersContacts",
    "method": "GET",
    "path": "/domains/~/users/~/contacts",
    "resource": "Contacts",
    "summary": "Get My Contacts",
    "description": "",
    "parameters": [],
    "hasRequestBody": false
  },
  "GetAddressesForDomain": {
    "id": "GetAddressesForDomain",
    "method": "GET",
    "path": "/domains/{domain}/addresses",
    "resource": "Addresses",
    "summary": "Get Addresses for Domain",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": false
  },
  "CreateAddressForDomain": {
    "id": "CreateAddressForDomain",
    "method": "POST",
    "path": "/domains/{domain}/addresses",
    "resource": "Addresses",
    "summary": "Create Address for Domain",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": true
  },
  "ValidateAddress": {
    "id": "ValidateAddress",
    "method": "POST",
    "path": "/domains/{domain}/addresses/validate",
    "resource": "Addresses",
    "summary": "Validate Address",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": true
  },
  "UpdateAddressForDomain": {
    "id": "UpdateAddressForDomain",
    "method": "PUT",
    "path": "/domains/{domain}/addresses/{emergency-address-id}",
    "resource": "Addresses",
    "summary": "Update Address for Domain",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "emergency-address-id",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true
  },
  "DeleteAddressForDomain": {
    "id": "DeleteAddressForDomain",
    "method": "DELETE",
    "path": "/domains/{domain}/addresses/{emergency-address-id}",
    "resource": "Addresses",
    "summary": "Delete Address For Domain",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "emergency-address-id",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false
  },
  "UpdateAddressForUser": {
    "id": "UpdateAddressForUser",
    "method": "PUT",
    "path": "/domains/{domain}/users/{user}/addresses/{emergency-address-id}",
    "resource": "Addresses",
    "summary": "Update Address for User",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "emergency-address-id",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true
  },
  "GetAddressUsingAddressID": {
    "id": "GetAddressUsingAddressID",
    "method": "GET",
    "path": "/domains/{domain}/users/{user}/addresses/{emergency-address-id}",
    "resource": "Addresses",
    "summary": "Get Address Using Address ID",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "emergency-address-id",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false
  },
  "UpdateAddressEndpoint": {
    "id": "UpdateAddressEndpoint",
    "method": "PUT",
    "path": "/domains/{domain}/addresses/endpoints/{endpoint}",
    "resource": "Addresses",
    "summary": "Update Address Endpoint",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "endpoint",
        "in": "path",
        "required": true,
        "description": "The callback number of the address.",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true
  },
  "DeleteAddressEndpoint": {
    "id": "DeleteAddressEndpoint",
    "method": "DELETE",
    "path": "/domains/{domain}/addresses/endpoints/{endpoint}",
    "resource": "Addresses",
    "summary": "Delete Address Endpoint",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "endpoint",
        "in": "path",
        "required": true,
        "description": "The callback number of the address.",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true
  },
  "CreateAddressForUser": {
    "id": "CreateAddressForUser",
    "method": "POST",
    "path": "/domains/{domain}/users/{user}/addresses",
    "resource": "Addresses",
    "summary": "Create Address for User",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": true
  },
  "GetAddressesForUser": {
    "id": "GetAddressesForUser",
    "method": "GET",
    "path": "/domains/{domain}/users/{user}/addresses",
    "resource": "Addresses",
    "summary": "Get Addresses for User",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "limit",
        "in": "query",
        "required": false,
        "description": ""
      },
      {
        "name": "show_all_personal",
        "in": "query",
        "required": false,
        "description": "Set to \"yes\" and do not set user in order to show all addresses in domain regardless of user identity. Requires Office Manager or above",
        "schemaType": "string"
      },
      {
        "name": "show_only_personal",
        "in": "query",
        "required": false,
        "description": "Set to \"yes\" to show only the personal addresses. Default to \"no\" which would also showing all the domain-level addreses",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false
  },
  "DeleteAddressForUser": {
    "id": "DeleteAddressForUser",
    "method": "DELETE",
    "path": "/domains/{domain}/users/{user}/addresses/{address_id}",
    "resource": "Addresses",
    "summary": "Delete Address For User",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "address_id",
        "in": "path",
        "required": true,
        "description": "Address ID to delete",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false
  },
  "CreateAddressEndpoint": {
    "id": "CreateAddressEndpoint",
    "method": "POST",
    "path": "/domains/{domain}/addresses/endpoints",
    "resource": "Addresses",
    "summary": "Create Address Endpoint",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": true
  },
  "GetAddressEndpointsForDomain": {
    "id": "GetAddressEndpointsForDomain",
    "method": "GET",
    "path": "/domains/{domain}/addresses/endpoints",
    "resource": "Addresses",
    "summary": "Get Address Endpoints for a Domain",
    "description": "Emergency Address Endpoints are different than Emergency Addresses. Endpoints contain the Emergency Caller ID Number and the address associated with it should be the billing address. Emergency Addresses are what is passed in to the PIDFLO object. ",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "limit",
        "in": "query",
        "required": false,
        "description": ""
      }
    ],
    "hasRequestBody": false
  },
  "GetAddressesCountForDomain": {
    "id": "GetAddressesCountForDomain",
    "method": "GET",
    "path": "/domains/{domain}/addresses/count",
    "resource": "Addresses",
    "summary": "Get Addresses Count for Domain",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": false
  },
  "GetDomainsByUsersByVmailnag": {
    "id": "GetDomainsByUsersByVmailnag",
    "method": "GET",
    "path": "/domains/{domain}/users/{user}/vmailnag",
    "resource": "Voicemail Reminders",
    "summary": "Get Voicemail Reminders for Specific User",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": false
  },
  "DeleteDomainsByUsersByVmailnag": {
    "id": "DeleteDomainsByUsersByVmailnag",
    "method": "DELETE",
    "path": "/domains/{domain}/users/{user}/vmailnag",
    "resource": "Voicemail Reminders",
    "summary": "Delete Voicemail Reminders for Specific User",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": false
  },
  "PostDomainsByUsersByVmailnag": {
    "id": "PostDomainsByUsersByVmailnag",
    "method": "POST",
    "path": "/domains/{domain}/users/{user}/vmailnag",
    "resource": "Voicemail Reminders",
    "summary": "Create Voicemail Reminder",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": true
  },
  "PutDomainsByUsersByVmailnag": {
    "id": "PutDomainsByUsersByVmailnag",
    "method": "PUT",
    "path": "/domains/{domain}/users/{user}/vmailnag",
    "resource": "Voicemail Reminders",
    "summary": "Update Voicemail Reminders for Specific User",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": true
  },
  "GetDomainsByUsersByVmailnagCount": {
    "id": "GetDomainsByUsersByVmailnagCount",
    "method": "GET",
    "path": "/domains/{domain}/users/{user}/vmailnag/count",
    "resource": "Voicemail Reminders",
    "summary": "Count Voicemail Reminders for Specific User",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  "ReadDialrules": {
    "id": "ReadDialrules",
    "method": "GET",
    "path": "/domains/{domain}/dialplans/{dialplan}/dialrules",
    "resource": "Dialrule",
    "summary": "Read Dialrules in a Dialplan",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "dialplan",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false
  },
  "CreateDialrule": {
    "id": "CreateDialrule",
    "method": "POST",
    "path": "/domains/{domain}/dialplans/{dialplan}/dialrules",
    "resource": "Dialrule",
    "summary": "Add a new dial rule into a dial plan",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "dialplan",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true
  },
  "GetDomainsByDialplansByDialrulesCount": {
    "id": "GetDomainsByDialplansByDialrulesCount",
    "method": "GET",
    "path": "/domains/{domain}/dialplans/{dialplan}/dialrules/count",
    "resource": "Dialrule",
    "summary": "Count Dialrules in a Dialplan",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "dialplan",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  "ReadDialrule": {
    "id": "ReadDialrule",
    "method": "GET",
    "path": "/domains/{domain}/dialplans/{dialplan}/dialrules/{dialrule}",
    "resource": "Dialrule",
    "summary": "Read Specific Dialrule in a Dialplan",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "dialplan",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      },
      {
        "name": "dialrule",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false
  },
  "UpdateDialrule": {
    "id": "UpdateDialrule",
    "method": "PUT",
    "path": "/domains/{domain}/dialplans/{dialplan}/dialrules/{dialrule}",
    "resource": "Dialrule",
    "summary": "Update a dial rule by ID in a dial plan",
    "description": "Note you cannot update any fields starting with dial-rule-matching (like dial-rule-matching-to-uri and dial-rule-matching-from-uri) , any modification there should be a delete and create new. ",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "dialplan",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      },
      {
        "name": "dialrule",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true
  },
  "DeleteDialrule": {
    "id": "DeleteDialrule",
    "method": "DELETE",
    "path": "/domains/{domain}/dialplans/{dialplan}/dialrules/{dialrule}",
    "resource": "Dialrule",
    "summary": "Delete a dial rule by ID in a dial plan",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "dialplan",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      },
      {
        "name": "dialrule",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false
  },
  "GetDialplans": {
    "id": "GetDialplans",
    "method": "GET",
    "path": "/dialplans",
    "resource": "Dialrule",
    "summary": "Read Dialplans",
    "description": "",
    "parameters": [],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  "PostDialplans": {
    "id": "PostDialplans",
    "method": "POST",
    "path": "/dialplans",
    "resource": "Dialrule",
    "summary": "Create Dialplan Global",
    "description": "",
    "parameters": [],
    "hasRequestBody": true,
    "minApiVersion": 45
  },
  "PostDomainsByDialplans": {
    "id": "PostDomainsByDialplans",
    "method": "POST",
    "path": "/domains/{domain}/dialplans",
    "resource": "Dialrule",
    "summary": "Create Dialplan for Domain",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": true,
    "minApiVersion": 45
  },
  "PutDomainsByDialplansBy": {
    "id": "PutDomainsByDialplansBy",
    "method": "PUT",
    "path": "/domains/{domain}/dialplans/{dialplan}",
    "resource": "Dialrule",
    "summary": "Update Dialplan for Domain",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "dialplan",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true,
    "minApiVersion": 45
  },
  "DeleteDomainsByDialplansBy": {
    "id": "DeleteDomainsByDialplansBy",
    "method": "DELETE",
    "path": "/domains/{domain}/dialplans/{dialplan}",
    "resource": "Dialrule",
    "summary": "Delete Dialplan for Domain",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "dialplan",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  "GetDialpolicy": {
    "id": "GetDialpolicy",
    "method": "GET",
    "path": "/dialpolicy",
    "resource": "Dial Permisions",
    "summary": "Read Policies",
    "description": "",
    "parameters": [],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  "PostDialpolicy": {
    "id": "PostDialpolicy",
    "method": "POST",
    "path": "/dialpolicy",
    "resource": "Dial Permisions",
    "summary": "Create Dialpolicy Table",
    "description": "",
    "parameters": [],
    "hasRequestBody": true,
    "minApiVersion": 45
  },
  "GetDialpolicyBy": {
    "id": "GetDialpolicyBy",
    "method": "GET",
    "path": "/dialpolicy/{policy}",
    "resource": "Dial Permisions",
    "summary": "Read Specific Policy",
    "description": "",
    "parameters": [
      {
        "name": "policy",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  "PutDialpolicyBy": {
    "id": "PutDialpolicyBy",
    "method": "PUT",
    "path": "/dialpolicy/{policy}",
    "resource": "Dial Permisions",
    "summary": "Update Dialpolicy ",
    "description": "",
    "parameters": [
      {
        "name": "policy",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true,
    "minApiVersion": 45
  },
  "DeleteDialpolicyBy": {
    "id": "DeleteDialpolicyBy",
    "method": "DELETE",
    "path": "/dialpolicy/{policy}",
    "resource": "Dial Permisions",
    "summary": "Delete Dialpolicy ",
    "description": "",
    "parameters": [
      {
        "name": "policy",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  "GetDomainsByDialpolicyBy": {
    "id": "GetDomainsByDialpolicyBy",
    "method": "GET",
    "path": "/domains/{domain}/dialpolicy/{policy}",
    "resource": "Dial Permisions",
    "summary": "Read Specific Policy in Domain",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "policy",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  "PutDomainsByDialpolicyBy": {
    "id": "PutDomainsByDialpolicyBy",
    "method": "PUT",
    "path": "/domains/{domain}/dialpolicy/{policy}",
    "resource": "Dial Permisions",
    "summary": "Update Dialpolicy  in Domain",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "policy",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true,
    "minApiVersion": 45
  },
  "DeleteDomainsByDialpolicyBy": {
    "id": "DeleteDomainsByDialpolicyBy",
    "method": "DELETE",
    "path": "/domains/{domain}/dialpolicy/{policy}",
    "resource": "Dial Permisions",
    "summary": "Delete Dialpolicy  in Domain",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "policy",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  "GetDialpolicyByPermission": {
    "id": "GetDialpolicyByPermission",
    "method": "GET",
    "path": "/dialpolicy/{policy}/permission",
    "resource": "Dial Permisions",
    "summary": "Read Permissions in a DialPolicy",
    "description": "",
    "parameters": [
      {
        "name": "policy",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  "CreatePermission": {
    "id": "CreatePermission",
    "method": "POST",
    "path": "/dialpolicy/{policy}/permission",
    "resource": "Dial Permisions",
    "summary": "Add a new permission to a dialpolicy table",
    "description": "",
    "parameters": [
      {
        "name": "policy",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true,
    "minApiVersion": 45
  },
  "GetDomainsByDialpolicyByPermission": {
    "id": "GetDomainsByDialpolicyByPermission",
    "method": "GET",
    "path": "/domains/{domain}/dialpolicy/{policy}/permission",
    "resource": "Dial Permisions",
    "summary": "Read Permissions in a DialPolicy in Domain",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "policy",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  "CreatePermissionDomain": {
    "id": "CreatePermissionDomain",
    "method": "POST",
    "path": "/domains/{domain}/dialpolicy/{policy}/permission",
    "resource": "Dial Permisions",
    "summary": "Add a new permission to a dialpolicy table in Domain",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "policy",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true,
    "minApiVersion": 45
  },
  "ReadPermission": {
    "id": "ReadPermission",
    "method": "GET",
    "path": "/dialpolicy/{policy}/permission/{id}",
    "resource": "Dial Permisions",
    "summary": "Read Specific Permission in a Dialpolicy",
    "description": "",
    "parameters": [
      {
        "name": "policy",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      },
      {
        "name": "id",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  "UpdatePermission": {
    "id": "UpdatePermission",
    "method": "PUT",
    "path": "/dialpolicy/{policy}/permission/{id}",
    "resource": "Dial Permisions",
    "summary": "Update a permission in a dialpolicy table",
    "description": "",
    "parameters": [
      {
        "name": "policy",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      },
      {
        "name": "id",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true,
    "minApiVersion": 45
  },
  "DeletePermission": {
    "id": "DeletePermission",
    "method": "DELETE",
    "path": "/dialpolicy/{policy}/permission/{id}",
    "resource": "Dial Permisions",
    "summary": "Delete a permission by ID in a dialpolicy",
    "description": "",
    "parameters": [
      {
        "name": "policy",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      },
      {
        "name": "id",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  "ReadPermissionDomain": {
    "id": "ReadPermissionDomain",
    "method": "GET",
    "path": "/domains/{domain}/dialpolicy/{policy}/permission/{id}",
    "resource": "Dial Permisions",
    "summary": "Read Specific Permission in a Dialpolicy in Domain",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "policy",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      },
      {
        "name": "id",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  "UpdatePermissionDomain": {
    "id": "UpdatePermissionDomain",
    "method": "PUT",
    "path": "/domains/{domain}/dialpolicy/{policy}/permission/{id}",
    "resource": "Dial Permisions",
    "summary": "Update a permission in a dialpolicy table in Domain",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "policy",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      },
      {
        "name": "id",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true,
    "minApiVersion": 45
  },
  "DeletePermissionDomain": {
    "id": "DeletePermissionDomain",
    "method": "DELETE",
    "path": "/domains/{domain}/dialpolicy/{policy}/permission/{id}",
    "resource": "Dial Permisions",
    "summary": "Delete a permission by ID in a dialpolicy in Domain",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "policy",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      },
      {
        "name": "id",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  "GetMessageSessionsForDomain": {
    "id": "GetMessageSessionsForDomain",
    "method": "GET",
    "path": "/domains/{domain}/messagesessions",
    "resource": "Messages",
    "summary": "Get Messagesessions for Domain",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "limit",
        "in": "query",
        "required": false,
        "description": ""
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  "startSession": {
    "id": "startSession",
    "method": "POST",
    "path": "/domains/{domain}/users/{user}/messages",
    "resource": "Messages",
    "summary": "Start a new Message Session",
    "description": "This is a good place to start with messaging if you do not already have a message session ID. ",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": true,
    "minApiVersion": 45
  },
  "GetMessageSessionsForUser": {
    "id": "GetMessageSessionsForUser",
    "method": "GET",
    "path": "/domains/{domain}/users/{user}/messagesessions",
    "resource": "Messages",
    "summary": "Get Messagesessions for User",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "limit",
        "in": "query",
        "required": false,
        "description": ""
      }
    ],
    "hasRequestBody": false
  },
  "GetMessageSessionForUser": {
    "id": "GetMessageSessionForUser",
    "method": "GET",
    "path": "/domains/{domain}/users/{user}/messagesessions/{messagesession}",
    "resource": "Messages",
    "summary": "Get Messagesession for User",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "messagesession",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  "updateMessageSessionParticipants": {
    "id": "updateMessageSessionParticipants",
    "method": "PUT",
    "path": "/domains/{domain}/users/{user}/messagesessions/{messagesession}",
    "resource": "Messages",
    "summary": "Update Messagesession (Participants)",
    "description": "This is how you add or remove participants from a chat message session. You cannot add or remove from a group MMS session, in that case you must start a new session.",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "messagesession",
        "in": "path",
        "required": true,
        "description": "ID of the message session to send in (when changing participants, do not change the session ID)",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true
  },
  "deleteMessagesession": {
    "id": "deleteMessagesession",
    "method": "DELETE",
    "path": "/domains/{domain}/users/{user}/messagesessions/{messagesession}",
    "resource": "Messages",
    "summary": "Delete Messagesession",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "messagesession",
        "in": "path",
        "required": true,
        "description": "ID of the message session to delete",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false
  },
  "GetMessagesForMessagesession": {
    "id": "GetMessagesForMessagesession",
    "method": "GET",
    "path": "/domains/{domain}/users/{user}/messagesessions/{messagesession}/messages",
    "resource": "Messages",
    "summary": "Get Messages for Messagesession",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "messagesession",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      },
      {
        "name": "limit",
        "in": "query",
        "required": false,
        "description": ""
      }
    ],
    "hasRequestBody": false
  },
  "sendMessageChat": {
    "id": "sendMessageChat",
    "method": "POST",
    "path": "/domains/{domain}/users/{user}/messagesessions/{messagesession}/messages",
    "resource": "Messages",
    "summary": "Send a message (Chat)",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "messagesession",
        "in": "path",
        "required": true,
        "description": "ID of the message session to send in. Needs to be at least 32 characters long and random. Only alphanumeric chracters and underscore are allowed.",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true
  },
  "sendMessageGroupChat": {
    "id": "sendMessageGroupChat",
    "method": "POST",
    "path": "/domains/{domain}/users/{user}/messagesessions/{messagesession}/messages",
    "resource": "Messages",
    "summary": "Send a message (Group Chat)",
    "description": "> Note: # and anything after is NOT needed, its just to allow multiple examples for the same path/method. ",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "messagesession",
        "in": "path",
        "required": true,
        "description": "ID of the message session to send in. Needs to be at least 32 characters long and random. Only alphanumeric chracters and underscore are allowed.",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true
  },
  "sendMessageMediaChat": {
    "id": "sendMessageMediaChat",
    "method": "POST",
    "path": "/domains/{domain}/users/{user}/messagesessions/{messagesession}/messages",
    "resource": "Messages",
    "summary": "Send a message (Media Chat)",
    "description": "> Note: # and anything after is NOT needed, its just to allow multiple examples for the same path/method. ",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "messagesession",
        "in": "path",
        "required": true,
        "description": "ID of the message session to send in. Needs to be at least 32 characters long and random. Only alphanumeric chracters and underscore are allowed.",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true
  },
  "sendMessageSMS": {
    "id": "sendMessageSMS",
    "method": "POST",
    "path": "/domains/{domain}/users/{user}/messagesessions/{messagesession}/messages",
    "resource": "Messages",
    "summary": "Send a message (SMS)",
    "description": "> Note: # and anything after is NOT needed, its just to allow multiple examples for the same path/method. ",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "messagesession",
        "in": "path",
        "required": true,
        "description": "ID of the message session to send in. Needs to be at least 32 characters long and random. Only alphanumeric chracters and underscore are allowed.",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true
  },
  "sendMessageGroupSMS": {
    "id": "sendMessageGroupSMS",
    "method": "POST",
    "path": "/domains/{domain}/users/{user}/messagesessions/{messagesession}/messages",
    "resource": "Messages",
    "summary": "Send a message (Group SMS)",
    "description": "> Note: # and anything after is NOT needed, its just to allow multiple examples for the same path/method. ",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "messagesession",
        "in": "path",
        "required": true,
        "description": "ID of the message session to send in. Needs to be at least 32 characters long and random. Only alphanumeric chracters and underscore are allowed.",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true
  },
  "sendMessageMMS": {
    "id": "sendMessageMMS",
    "method": "POST",
    "path": "/domains/{domain}/users/{user}/messagesessions/{messagesession}/messages",
    "resource": "Messages",
    "summary": "Send a message (MMS)",
    "description": "> Note: # and anything after is NOT needed, its just to allow multiple examples for the same path/method. ",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "messagesession",
        "in": "path",
        "required": true,
        "description": "ID of the message session to send in. Needs to be at least 32 characters long and random. Only alphanumeric chracters and underscore are allowed.",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true
  },
  "updateMessageSessionSessionName": {
    "id": "updateMessageSessionSessionName",
    "method": "PUT",
    "path": "/domains/{domain}/users/{user}/messagesessions/{messagesession}",
    "resource": "Messages",
    "summary": "Update Messagesession (Session Name)",
    "description": "This is how you change the chat session name. You cannot name or rename an MMS group session.\n\n> Note: # and anything after is NOT needed, its just to allow multiple examples for the same path/method. ",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "messagesession",
        "in": "path",
        "required": true,
        "description": "ID of the message session to send in (when changing participants, do not change the session ID)",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true
  },
  "leaveMessagesession": {
    "id": "leaveMessagesession",
    "method": "PUT",
    "path": "/domains/{domain}/users/{user}/messagesessions/{messagesession}/leave",
    "resource": "Messages",
    "summary": "Update Messagesession (Leave)",
    "description": "This is how you leave a chat conversation.",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "messagesession",
        "in": "path",
        "required": true,
        "description": "ID of the message session to send in (when changing participants, do not change the session ID)",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false
  },
  "GetSmsNumbersForDomain": {
    "id": "GetSmsNumbersForDomain",
    "method": "GET",
    "path": "/domains/{domain}/smsnumbers",
    "resource": "SMS Numbers",
    "summary": "Get SMS Numbers for Domain",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": false
  },
  "CreateSMSNumber": {
    "id": "CreateSMSNumber",
    "method": "POST",
    "path": "/domains/{domain}/smsnumbers",
    "resource": "SMS Numbers",
    "summary": "Create SMS Number",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": true
  },
  "GetAllSMSNumbersSystem": {
    "id": "GetAllSMSNumbersSystem",
    "method": "GET",
    "path": "/smsnumbers",
    "resource": "SMS Numbers",
    "summary": "Get All SMS Numbers for System",
    "description": "",
    "parameters": [],
    "hasRequestBody": false
  },
  "UpdateSMSNumber": {
    "id": "UpdateSMSNumber",
    "method": "PUT",
    "path": "/domains/{domain}/smsnumbers/{smsnumber}",
    "resource": "SMS Numbers",
    "summary": "Update SMS Number",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "smsnumber",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true
  },
  "DeleteSMSNumber": {
    "id": "DeleteSMSNumber",
    "method": "DELETE",
    "path": "/domains/{domain}/smsnumbers/{smsnumber}",
    "resource": "SMS Numbers",
    "summary": "Delete an SMS Number",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "smsnumber",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false
  },
  "GetSmsNumbersForUser": {
    "id": "GetSmsNumbersForUser",
    "method": "GET",
    "path": "/domains/{domain}/users/{user}/smsnumbers",
    "resource": "SMS Numbers",
    "summary": "Get SMS Numbers for User",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": false
  },
  "CountSmsNumbers": {
    "id": "CountSmsNumbers",
    "method": "GET",
    "path": "/domains/{domain}/users/{user}/smsnumbers/count",
    "resource": "SMS Numbers",
    "summary": "Count SMS Numbers for User",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": false
  },
  "GetDomainsByUsersByRecordingsBy": {
    "id": "GetDomainsByUsersByRecordingsBy",
    "method": "GET",
    "path": "/domains/{domain}/users/{user}/recordings/{callid}",
    "resource": "Recordings",
    "summary": "Get Specific Recording by Callid for User",
    "description": "A user who is a party to a call may request the recording data for that call.",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "callid",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false
  },
  "GetDomainsByRecordingsBy": {
    "id": "GetDomainsByRecordingsBy",
    "method": "GET",
    "path": "/domains/{domain}/recordings/{callid}",
    "resource": "Recordings",
    "summary": "Get Specific Recording by Callid for Domain",
    "description": "A user with sufficient scope may request recording data for calls to which they were not a party - but which are within their purview - using the domain and callid.",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "callid",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false
  },
  "VerifyEmail": {
    "id": "VerifyEmail",
    "method": "POST",
    "path": "/domains/{domain}/users/{user}/email/verify/{token}",
    "resource": "Email",
    "summary": "Verify Email",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "token",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  "GetConnections": {
    "id": "GetConnections",
    "method": "GET",
    "path": "/connections",
    "resource": "Connections",
    "summary": "Get All Connections",
    "description": "",
    "parameters": [
      {
        "name": "device-sip-registration-uri",
        "in": "query",
        "required": false,
        "description": "",
        "schemaType": "string"
      },
      {
        "name": "termination-match",
        "in": "query",
        "required": false,
        "description": "",
        "schemaType": "string"
      },
      {
        "name": "domain",
        "in": "query",
        "required": false,
        "description": ""
      },
      {
        "name": "reseller",
        "in": "query",
        "required": false,
        "description": "",
        "schemaType": "string"
      },
      {
        "name": "route-chain",
        "in": "query",
        "required": false,
        "description": "",
        "schemaType": "string"
      },
      {
        "name": "user-scope",
        "in": "query",
        "required": false,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false
  },
  "CreateConnection": {
    "id": "CreateConnection",
    "method": "POST",
    "path": "/connections",
    "resource": "Connections",
    "summary": "Create a Connection",
    "description": "",
    "parameters": [],
    "hasRequestBody": true
  },
  "CountAllConnections": {
    "id": "CountAllConnections",
    "method": "GET",
    "path": "/connections/count",
    "resource": "Connections",
    "summary": "Count All Conections",
    "description": "",
    "parameters": [
      {
        "name": "device-sip-registration-uri",
        "in": "query",
        "required": false,
        "description": "",
        "schemaType": "string"
      },
      {
        "name": "termination-match",
        "in": "query",
        "required": false,
        "description": "",
        "schemaType": "string"
      },
      {
        "name": "domain",
        "in": "query",
        "required": false,
        "description": ""
      },
      {
        "name": "reseller",
        "in": "query",
        "required": false,
        "description": "",
        "schemaType": "string"
      },
      {
        "name": "route-chain",
        "in": "query",
        "required": false,
        "description": "",
        "schemaType": "string"
      },
      {
        "name": "user-scope",
        "in": "query",
        "required": false,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false
  },
  "GetDomainsByConnections": {
    "id": "GetDomainsByConnections",
    "method": "GET",
    "path": "/domains/{domain}/connections",
    "resource": "Connections",
    "summary": "Get All Connections for a Domain",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "device-sip-registration-uri",
        "in": "query",
        "required": false,
        "description": "",
        "schemaType": "string"
      },
      {
        "name": "termination-match",
        "in": "query",
        "required": false,
        "description": "",
        "schemaType": "string"
      },
      {
        "name": "reseller",
        "in": "query",
        "required": false,
        "description": "",
        "schemaType": "string"
      },
      {
        "name": "route-chain",
        "in": "query",
        "required": false,
        "description": "",
        "schemaType": "string"
      },
      {
        "name": "user-scope",
        "in": "query",
        "required": false,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false
  },
  "GetDomainsByConnectionsBy": {
    "id": "GetDomainsByConnectionsBy",
    "method": "GET",
    "path": "/domains/{domain}/connections/{connection-orig-match-pattern}",
    "resource": "Connections",
    "summary": "Get Specific Connection for a Domain",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "connection-orig-match-pattern",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false
  },
  "DeleteDomainsByConnectionsBy": {
    "id": "DeleteDomainsByConnectionsBy",
    "method": "DELETE",
    "path": "/domains/{domain}/connections/{connection-orig-match-pattern}",
    "resource": "Connections",
    "summary": "Delete a Specific Connection for a Domain",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "connection-orig-match-pattern",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false
  },
  "UpdateConnection": {
    "id": "UpdateConnection",
    "method": "PUT",
    "path": "/domains/{domain}/connections/{connection-orig-match-pattern}",
    "resource": "Connections",
    "summary": "Update a Connection",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "connection-orig-match-pattern",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true
  },
  "GetRoutes": {
    "id": "GetRoutes",
    "method": "GET",
    "path": "/routes",
    "resource": "Routes",
    "summary": "Read Routes",
    "description": "",
    "parameters": [
      {
        "name": "route-destination-match-pattern",
        "in": "query",
        "required": false,
        "description": "",
        "schemaType": "string"
      },
      {
        "name": "route-source-match-pattern",
        "in": "query",
        "required": false,
        "description": "",
        "schemaType": "string"
      },
      {
        "name": "route-class",
        "in": "query",
        "required": false,
        "description": "",
        "schemaType": "string"
      },
      {
        "name": "route-match-server-hostname",
        "in": "query",
        "required": false,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false
  },
  "PostRoutes": {
    "id": "PostRoutes",
    "method": "POST",
    "path": "/routes",
    "resource": "Routes",
    "summary": "Create a Route",
    "description": "",
    "parameters": [],
    "hasRequestBody": true
  },
  "CountRoutes": {
    "id": "CountRoutes",
    "method": "GET",
    "path": "/routes/count",
    "resource": "Routes",
    "summary": "Count All Routes",
    "description": "",
    "parameters": [
      {
        "name": "forward_request_matchrule",
        "in": "query",
        "required": false,
        "description": "",
        "schemaType": "string"
      },
      {
        "name": "route-source-match-pattern",
        "in": "query",
        "required": false,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false
  },
  "GetRoutesByRoutecon": {
    "id": "GetRoutesByRoutecon",
    "method": "GET",
    "path": "/routes/{route-id}/routecon",
    "resource": "Routes",
    "summary": "Read Route Connections for Route",
    "description": "",
    "parameters": [
      {
        "name": "route-id",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  "PostRoutesByRoutecon": {
    "id": "PostRoutesByRoutecon",
    "method": "POST",
    "path": "/routes/{route-id}/routecon",
    "resource": "Routes",
    "summary": "Create a Route Connection",
    "description": "",
    "parameters": [
      {
        "name": "route-id",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true,
    "minApiVersion": 45
  },
  "GetRouteconCount": {
    "id": "GetRouteconCount",
    "method": "GET",
    "path": "/routecon/count",
    "resource": "Routes",
    "summary": "Count All Route Connections",
    "description": "",
    "parameters": [
      {
        "name": "route-destination-match-pattern",
        "in": "query",
        "required": false,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false
  },
  "PutRoutesBy": {
    "id": "PutRoutesBy",
    "method": "PUT",
    "path": "/routes/{route-id}",
    "resource": "Routes",
    "summary": "Update A Specific Route",
    "description": "",
    "parameters": [
      {
        "name": "route-id",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true,
    "minApiVersion": 45
  },
  "DeleteRoute": {
    "id": "DeleteRoute",
    "method": "DELETE",
    "path": "/routes/{route-id}",
    "resource": "Routes",
    "summary": "Delete A Specific Route",
    "description": "",
    "parameters": [
      {
        "name": "route-id",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  "PutRoutesByRouteconBy": {
    "id": "PutRoutesByRouteconBy",
    "method": "PUT",
    "path": "/routes/{route-id}/routecon/{index}",
    "resource": "Routes",
    "summary": "Update A Specific Route Connection",
    "description": "",
    "parameters": [
      {
        "name": "route-id",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      },
      {
        "name": "index",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true,
    "minApiVersion": 45
  },
  "DeleteRouteCon": {
    "id": "DeleteRouteCon",
    "method": "DELETE",
    "path": "/routes/{route-id}/routecon/{index}",
    "resource": "Routes",
    "summary": "Delete A Specific Route connection",
    "description": "",
    "parameters": [
      {
        "name": "route-id",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      },
      {
        "name": "index",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  "PostDomainsByUsersByMeetingsByInstanceByLog": {
    "id": "PostDomainsByUsersByMeetingsByInstanceByLog",
    "method": "POST",
    "path": "/domains/{domain}/users/{user}/meetings/{id}/instance/{instance}/log",
    "resource": "Meetings/Event Logs",
    "summary": "Create a Meeting Log Event",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "id",
        "in": "path",
        "required": true,
        "description": "Meeting Id",
        "schemaType": "string"
      },
      {
        "name": "instance",
        "in": "path",
        "required": true,
        "description": "Meeting Instance Id",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true
  },
  "GetDomainsByUsersByMeetingsByInstanceByLog": {
    "id": "GetDomainsByUsersByMeetingsByInstanceByLog",
    "method": "GET",
    "path": "/domains/{domain}/users/{user}/meetings/{id}/instance/{instance}/log",
    "resource": "Meetings/Event Logs",
    "summary": "Read Meeting Events",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "id",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      },
      {
        "name": "instance",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false
  },
  "GetVideoResellers": {
    "id": "GetVideoResellers",
    "method": "GET",
    "path": "/video/resellers",
    "resource": "Meetings/Iotum",
    "summary": "Read Iotum Video Domain Resellers",
    "description": "Read a Iotum Company (domain)",
    "parameters": [],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  "GetDomainsByUsersByVideo": {
    "id": "GetDomainsByUsersByVideo",
    "method": "GET",
    "path": "/domains/{domain}/users/{user}/video",
    "resource": "Meetings/Iotum",
    "summary": "Read Iotum Video Host",
    "description": "Read a Iotum Host",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  "GetDomainsByVideoHosts": {
    "id": "GetDomainsByVideoHosts",
    "method": "GET",
    "path": "/domains/{domain}/video/hosts",
    "resource": "Meetings/Iotum",
    "summary": "Read All Iotum Video Hosts in a Domain",
    "description": "Read All Iotum Video Hosts in a Domain",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  "GetDomainsByUsersByVideoConference": {
    "id": "GetDomainsByUsersByVideoConference",
    "method": "GET",
    "path": "/domains/{domain}/users/{user}/video/conference",
    "resource": "Meetings/Iotum",
    "summary": "Read Iotum Video Host Conferences",
    "description": "Read a Iotum Host",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  "PostDomainsByUsersByVideoConference": {
    "id": "PostDomainsByUsersByVideoConference",
    "method": "POST",
    "path": "/domains/{domain}/users/{user}/video/conference",
    "resource": "Meetings/Iotum",
    "summary": "Create a Ad-hoc Conference",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": true,
    "minApiVersion": 45
  },
  "GetDomainsByUsersByVideoContacts": {
    "id": "GetDomainsByUsersByVideoContacts",
    "method": "GET",
    "path": "/domains/{domain}/users/{user}/video/contacts",
    "resource": "Meetings/Iotum",
    "summary": "Read Iotum Video Host Contacts",
    "description": "Read a Iotum Host",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  "GetDomainsByVideo": {
    "id": "GetDomainsByVideo",
    "method": "GET",
    "path": "/domains/{domain}/video",
    "resource": "Meetings/Iotum",
    "summary": "Read Iotum Video Company",
    "description": "Read a Iotum Company (domain)",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  "PutDomainsByVideo": {
    "id": "PutDomainsByVideo",
    "method": "PUT",
    "path": "/domains/{domain}/video",
    "resource": "Meetings/Iotum",
    "summary": "Update Domain's Iotum Company",
    "description": "Update the details of a Domain's Iotum Company",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": true,
    "minApiVersion": 45
  },
  "PostDomainsByVideo": {
    "id": "PostDomainsByVideo",
    "method": "POST",
    "path": "/domains/{domain}/video",
    "resource": "Meetings/Iotum",
    "summary": "Create Iotum Video Company",
    "description": "Read a Iotum Company (domain)",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": true,
    "minApiVersion": 45
  },
  "DeleteDomainsByVideo": {
    "id": "DeleteDomainsByVideo",
    "method": "DELETE",
    "path": "/domains/{domain}/video",
    "resource": "Meetings/Iotum",
    "summary": "Delete a Video Company",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  "GetDomainsByVideoProducts": {
    "id": "GetDomainsByVideoProducts",
    "method": "GET",
    "path": "/domains/{domain}/video/products",
    "resource": "Meetings/Iotum",
    "summary": "Read Iotum Video Company Products",
    "description": "Read the products (plans and add-ons) a domain's company is currently using",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  "GetDomainsByVideoAvailableproducts": {
    "id": "GetDomainsByVideoAvailableproducts",
    "method": "GET",
    "path": "/domains/{domain}/video/availableproducts",
    "resource": "Meetings/Iotum",
    "summary": "Read Iotum Video Available Products",
    "description": "Read all available products for the company via the reseller",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  "PostDomainsByUsersByHost": {
    "id": "PostDomainsByUsersByHost",
    "method": "POST",
    "path": "/domains/{domain}/users/{user}/host",
    "resource": "Meetings/Iotum",
    "summary": "Create a Host",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": true,
    "minApiVersion": 45
  },
  "PutDomainsByUsersByHost": {
    "id": "PutDomainsByUsersByHost",
    "method": "PUT",
    "path": "/domains/{domain}/users/{user}/host",
    "resource": "Meetings/Iotum",
    "summary": "Update User's Iotum Host",
    "description": "Update a user's Iotum Host.",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": true,
    "minApiVersion": 45
  },
  "DeleteDomainsByUsersByHost": {
    "id": "DeleteDomainsByUsersByHost",
    "method": "DELETE",
    "path": "/domains/{domain}/users/{user}/host",
    "resource": "Meetings/Iotum",
    "summary": "Delete a Host",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  "PostDomainsByUsersByHostContacts": {
    "id": "PostDomainsByUsersByHostContacts",
    "method": "POST",
    "path": "/domains/{domain}/users/{user}/host/contacts",
    "resource": "Meetings/Iotum",
    "summary": "Create Host Contacts",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": true,
    "minApiVersion": 45
  },
  "PostDomainsByVideoSubscriptionBy": {
    "id": "PostDomainsByVideoSubscriptionBy",
    "method": "POST",
    "path": "/domains/{domain}/video/subscription/{slug}",
    "resource": "Meetings/Iotum",
    "summary": "Create Iotum Video Subscription",
    "description": "Create a Iotum video subscription to one of the available Iotum products for that company",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "slug",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true,
    "minApiVersion": 45
  },
  "DeleteDomainsByVideoSubscriptionBy": {
    "id": "DeleteDomainsByVideoSubscriptionBy",
    "method": "DELETE",
    "path": "/domains/{domain}/video/subscription/{slug}",
    "resource": "Meetings/Iotum",
    "summary": "Delete Iotum Video Subscription",
    "description": "Delete a subscription to a product for the domain's company.",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "slug",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  "PutDomainsByVideoSubscriptions": {
    "id": "PutDomainsByVideoSubscriptions",
    "method": "PUT",
    "path": "/domains/{domain}/video/subscriptions",
    "resource": "Meetings/Iotum",
    "summary": "Update Domain's Iotum Subscriptions",
    "description": "Update the plans and add-ons a domain's Iotum company is subscribed to.",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": true,
    "minApiVersion": 45
  },
  "PostDomainsByUsersByMeetingsBy": {
    "id": "PostDomainsByUsersByMeetingsBy",
    "method": "POST",
    "path": "/domains/{domain}/users/{user}/meetings/{id}",
    "resource": "Meetings",
    "summary": "Create a Meeting with Id",
    "description": "API v1 create meeting passing in newly requested meeting Id",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "id",
        "in": "path",
        "required": true,
        "description": "Meeting Id to create",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true
  },
  "GetDomainsByUsersByMeetingsBy": {
    "id": "GetDomainsByUsersByMeetingsBy",
    "method": "GET",
    "path": "/domains/{domain}/users/{user}/meetings/{id}",
    "resource": "Meetings",
    "summary": "Read Meeting",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "id",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false
  },
  "PostDomainsByUsersByMeetings": {
    "id": "PostDomainsByUsersByMeetings",
    "method": "POST",
    "path": "/domains/{domain}/users/{user}/meetings",
    "resource": "Meetings",
    "summary": "Create a Meeting",
    "description": "Create a new meeting wit",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": true
  },
  "GetDomainsByUsersByMeetings": {
    "id": "GetDomainsByUsersByMeetings",
    "method": "GET",
    "path": "/domains/{domain}/users/{user}/meetings",
    "resource": "Meetings",
    "summary": "Read Meetings for User",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": false
  },
  "GetDomainsByUsersByMeetingsCount": {
    "id": "GetDomainsByUsersByMeetingsCount",
    "method": "GET",
    "path": "/domains/{domain}/users/{user}/meetings/count",
    "resource": "Meetings",
    "summary": "Count Domains Meetings",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": false
  },
  "GetDomainsByUsersByMeetingsByCount": {
    "id": "GetDomainsByUsersByMeetingsByCount",
    "method": "GET",
    "path": "/domains/{domain}/users/{user}/meetings/{meeting_id}/count",
    "resource": "Meetings",
    "summary": "Count Meeting",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "meeting_id",
        "in": "path",
        "required": true,
        "description": "Meeting Id which to query meeting total",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false
  },
  "PostMeetingsRegisterBy": {
    "id": "PostMeetingsRegisterBy",
    "method": "POST",
    "path": "/meetings/register/{meeting_registration_id}",
    "resource": "Meetings",
    "summary": "Register Meeting",
    "description": "",
    "parameters": [
      {
        "name": "meeting_registration_id",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true
  },
  "PutDomainsByUsersByMeetingsBy": {
    "id": "PutDomainsByUsersByMeetingsBy",
    "method": "PUT",
    "path": "/domains/{domain}/users/{user}/meetings/{meeting}",
    "resource": "Meetings",
    "summary": "Update a Meeting",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "meeting",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true
  },
  "DeleteDomainsByUsersByMeetingsBy": {
    "id": "DeleteDomainsByUsersByMeetingsBy",
    "method": "DELETE",
    "path": "/domains/{domain}/users/{user}/meetings/{meeting}",
    "resource": "Meetings",
    "summary": "Delete a Meeting",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "meeting",
        "in": "path",
        "required": true,
        "description": "the meeting id to perfom the delete on",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true
  },
  "PostDomainsByUsersByMeetingsGetId": {
    "id": "PostDomainsByUsersByMeetingsGetId",
    "method": "POST",
    "path": "/domains/{domain}/users/{user}/meetings/getId",
    "resource": "Meetings",
    "summary": "Request a Meeting ID",
    "description": "API v1 request Id prior to create meeting",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": false
  },
  "PostDomainsByBackup": {
    "id": "PostDomainsByBackup",
    "method": "POST",
    "path": "/domains/{domain}/backup",
    "resource": "Backup & Restore",
    "summary": "Manually Backup a Domain",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": false
  },
  "PostBackup": {
    "id": "PostBackup",
    "method": "POST",
    "path": "/backup",
    "resource": "Backup & Restore",
    "summary": "Request a Full System backup",
    "description": "",
    "parameters": [],
    "hasRequestBody": false
  },
  "GetRestore": {
    "id": "GetRestore",
    "method": "GET",
    "path": "/restore",
    "resource": "Backup & Restore",
    "summary": "Read Available Restore Points",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "query",
        "required": true,
        "description": ""
      },
      {
        "name": "hostname",
        "in": "query",
        "required": false,
        "description": "",
        "schemaType": "string"
      },
      {
        "name": "index",
        "in": "query",
        "required": false,
        "description": "",
        "schemaType": "string"
      },
      {
        "name": "type",
        "in": "query",
        "required": false,
        "description": "",
        "schemaType": "string"
      },
      {
        "name": "show-file-details",
        "in": "query",
        "required": false,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false
  },
  "PutRestore": {
    "id": "PutRestore",
    "method": "PUT",
    "path": "/restore",
    "resource": "Backup & Restore",
    "summary": "Restore a Specifc Domain Backup",
    "description": "",
    "parameters": [],
    "hasRequestBody": true
  },
  "UpdateNsApiConfiguration": {
    "id": "UpdateNsApiConfiguration",
    "method": "PUT",
    "path": "/nsconfigs",
    "resource": "Configs/Configurations/NS Configs",
    "summary": "Update a NS API Configuration",
    "description": "",
    "parameters": [],
    "hasRequestBody": true,
    "minApiVersion": 45
  },
  "CreateNsApiConfiguration": {
    "id": "CreateNsApiConfiguration",
    "method": "POST",
    "path": "/nsconfigs",
    "resource": "Configs/Configurations/NS Configs",
    "summary": "Create a NS API Configuration",
    "description": "Create a configuration for API or Portal nsconfig file",
    "parameters": [],
    "hasRequestBody": true,
    "minApiVersion": 45
  },
  "ReadAllNsApiConfigurations": {
    "id": "ReadAllNsApiConfigurations",
    "method": "GET",
    "path": "/nsconfigs",
    "resource": "Configs/Configurations/NS Configs",
    "summary": "Read all NS Api Configurations",
    "description": "",
    "parameters": [
      {
        "name": "local-only",
        "in": "query",
        "required": false,
        "description": "",
        "schemaType": "boolean"
      },
      {
        "name": "include-api",
        "in": "query",
        "required": false,
        "description": "",
        "schemaType": "boolean"
      },
      {
        "name": "include-portals",
        "in": "query",
        "required": false,
        "description": "",
        "schemaType": "boolean"
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  "DeleteNsApiConfiguration": {
    "id": "DeleteNsApiConfiguration",
    "method": "DELETE",
    "path": "/nsconfigs",
    "resource": "Configs/Configurations/NS Configs",
    "summary": "Delete a NS API Configuration Copy",
    "description": "Delete a configuration for API or Portal nsconfig file",
    "parameters": [],
    "hasRequestBody": true,
    "minApiVersion": 45
  },
  "ReadSpecificConfiguration": {
    "id": "ReadSpecificConfiguration",
    "method": "GET",
    "path": "/configurations/{config-name}",
    "resource": "Configs/Configurations",
    "summary": "Read a Specific Configuration",
    "description": "",
    "parameters": [
      {
        "name": "config-name",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      },
      {
        "name": "domain",
        "in": "query",
        "required": false,
        "description": "This is the domain this configuration applies to. Defaults to search for \"*\""
      },
      {
        "name": "reseller",
        "in": "query",
        "required": false,
        "description": "This is the reseller or territory this configuration applies to. Defaults to search for \"*\"",
        "schemaType": "string"
      },
      {
        "name": "user",
        "in": "query",
        "required": false,
        "description": "This is the user this configuration applies to. Defaults to search for \"*\""
      },
      {
        "name": "core-server",
        "in": "query",
        "required": false,
        "description": "This is the hostname this configuration applies to. Defaults to search for \"*\"",
        "schemaType": "string"
      },
      {
        "name": "user-scope",
        "in": "query",
        "required": false,
        "description": "This is the user scope this configuration applies to. Defaults to search for \"*\"",
        "schemaType": "string"
      },
      {
        "name": "admin-ui-account-type",
        "in": "query",
        "required": false,
        "description": "This is the admin UI account this configuration applies to. Defaults to search for \"*\"",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false
  },
  "DeleteConfiguration": {
    "id": "DeleteConfiguration",
    "method": "DELETE",
    "path": "/configurations/{config-name}",
    "resource": "Configs/Configurations",
    "summary": "Delete a Configuration",
    "description": "",
    "parameters": [
      {
        "name": "config-name",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true
  },
  "ReadAllConfigurations": {
    "id": "ReadAllConfigurations",
    "method": "GET",
    "path": "/configurations",
    "resource": "Configs/Configurations",
    "summary": "Read all Configurations",
    "description": "",
    "parameters": [],
    "hasRequestBody": false
  },
  "CreateConfiguration": {
    "id": "CreateConfiguration",
    "method": "POST",
    "path": "/configurations",
    "resource": "Configs/Configurations",
    "summary": "Create a Configuration",
    "description": "",
    "parameters": [],
    "hasRequestBody": true
  },
  "UpdateConfiguration": {
    "id": "UpdateConfiguration",
    "method": "PUT",
    "path": "/configurations",
    "resource": "Configs/Configurations",
    "summary": "Update a Configuration",
    "description": "Update a configurution, must already exist or will get a 404. ",
    "parameters": [],
    "hasRequestBody": true
  },
  "GetConfigurationsCount": {
    "id": "GetConfigurationsCount",
    "method": "GET",
    "path": "/configurations/count",
    "resource": "Configs/Configurations",
    "summary": "Count Configurations",
    "description": "",
    "parameters": [
      {
        "name": "hostname",
        "in": "query",
        "required": false,
        "description": "Identify UI Configuration to count by its hostname",
        "schemaType": "string"
      },
      {
        "name": "reseller",
        "in": "query",
        "required": false,
        "description": "Identify UI Configuration to count by its reseller",
        "schemaType": "string"
      },
      {
        "name": "domain",
        "in": "query",
        "required": false,
        "description": "Identify UI Configuration to count by its domain"
      },
      {
        "name": "user",
        "in": "query",
        "required": false,
        "description": "Identify UI Configuration to count by its user"
      },
      {
        "name": "role",
        "in": "query",
        "required": false,
        "description": "Identify UI Configuration to count by its role",
        "schemaType": "string"
      },
      {
        "name": "login_type",
        "in": "query",
        "required": false,
        "description": "Identify UI Configuration to count by its login type",
        "schemaType": "string"
      },
      {
        "name": "config_name",
        "in": "query",
        "required": false,
        "description": "Identify UI Configuration to count by its name",
        "schemaType": "string"
      },
      {
        "name": "include_wildcards",
        "in": "query",
        "required": false,
        "description": "Set to true to also include wildcard (*) matches in the query results",
        "schemaType": "boolean"
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  "GetConfigDefinitions": {
    "id": "GetConfigDefinitions",
    "method": "GET",
    "path": "/config-definitions",
    "resource": "Configs/Configuration Definitions",
    "summary": "Read all Configuration Definitions",
    "description": "",
    "parameters": [],
    "hasRequestBody": false
  },
  "PostConfigDefinitions": {
    "id": "PostConfigDefinitions",
    "method": "POST",
    "path": "/config-definitions",
    "resource": "Configs/Configuration Definitions",
    "summary": "Create a Configuration Definition",
    "description": "",
    "parameters": [],
    "hasRequestBody": true
  },
  "GetConfigDefinitionsBy": {
    "id": "GetConfigDefinitionsBy",
    "method": "GET",
    "path": "/config-definitions/{config-name}",
    "resource": "Configs/Configuration Definitions",
    "summary": "Read a Specific Configuration Definition",
    "description": "",
    "parameters": [
      {
        "name": "config-name",
        "in": "path",
        "required": true,
        "description": "To read definitions for all configurations, use \"*\"",
        "schemaType": "string"
      },
      {
        "name": "tags",
        "in": "query",
        "required": false,
        "description": "An optional comma seperated list of tags the definition to search has. To search all configs with the tags, set config-name to \"*\"",
        "schemaType": "string"
      },
      {
        "name": "start",
        "in": "query",
        "required": false,
        "description": ""
      },
      {
        "name": "limit",
        "in": "query",
        "required": false,
        "description": "Default to 100"
      },
      {
        "name": "sort",
        "in": "query",
        "required": false,
        "description": "Defaults to \"code_version desc,config_name asc\"",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false
  },
  "PutConfigDefinitionsBy": {
    "id": "PutConfigDefinitionsBy",
    "method": "PUT",
    "path": "/config-definitions/{config-name}",
    "resource": "Configs/Configuration Definitions",
    "summary": "Update a Configuration Definition",
    "description": "",
    "parameters": [
      {
        "name": "config-name",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true
  },
  "DeleteConfigDefinitionsBy": {
    "id": "DeleteConfigDefinitionsBy",
    "method": "DELETE",
    "path": "/config-definitions/{config-name}",
    "resource": "Configs/Configuration Definitions",
    "summary": "Delete Configuration Definition",
    "description": "This will delete the configuration definition and all configurations that match the name.",
    "parameters": [
      {
        "name": "config-name",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false
  },
  "ReadImage": {
    "id": "ReadImage",
    "method": "GET",
    "path": "/images/{filename}",
    "resource": "Images",
    "summary": "Read Image",
    "description": "Read an image file",
    "parameters": [
      {
        "name": "filename",
        "in": "path",
        "required": true,
        "description": "The name of the image file.",
        "schemaType": "string"
      },
      {
        "name": "reseller",
        "in": "query",
        "required": true,
        "description": "",
        "schemaType": "string"
      },
      {
        "name": "domain",
        "in": "query",
        "required": true,
        "description": ""
      },
      {
        "name": "server",
        "in": "query",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false
  },
  "CreateImageBase64": {
    "id": "CreateImageBase64",
    "method": "POST",
    "path": "/images/{filename}",
    "resource": "Images",
    "summary": "Create Image from Upload (JSON + Base64 File)",
    "description": "Create an image file",
    "parameters": [
      {
        "name": "filename",
        "in": "path",
        "required": true,
        "description": "The name of the image file.",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true
  },
  "DeleteImage": {
    "id": "DeleteImage",
    "method": "DELETE",
    "path": "/images/{filename}",
    "resource": "Images",
    "summary": "Delete an Image",
    "description": "Delete an image file",
    "parameters": [
      {
        "name": "filename",
        "in": "path",
        "required": true,
        "description": "The name of the image file.",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true
  },
  "UpdateImageFileUpload": {
    "id": "UpdateImageFileUpload",
    "method": "PUT",
    "path": "/images/{filename}",
    "resource": "Images",
    "summary": "Update Image from Upload (Multipart/Mixed Post)",
    "description": "Update an image file",
    "parameters": [
      {
        "name": "filename",
        "in": "path",
        "required": true,
        "description": "The name of the image file.",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true
  },
  "CreateImageFileUpload": {
    "id": "CreateImageFileUpload",
    "method": "POST",
    "path": "/images/{filename}",
    "resource": "Images",
    "summary": "Create Image from Upload (Multipart/Mixed Post)",
    "description": "Create an image file",
    "parameters": [
      {
        "name": "filename",
        "in": "path",
        "required": true,
        "description": "The name of the image file.",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true
  },
  "UpdateImageBase64": {
    "id": "UpdateImageBase64",
    "method": "PUT",
    "path": "/images/{filename}",
    "resource": "Images",
    "summary": "Update Image from Upload (JSON + Base64 File)",
    "description": "Update an image file",
    "parameters": [
      {
        "name": "filename",
        "in": "path",
        "required": true,
        "description": "The name of the image file.",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true
  },
  "ReadTemplate": {
    "id": "ReadTemplate",
    "method": "GET",
    "path": "/templates/{filename}",
    "resource": "Templates",
    "summary": "Read Template",
    "description": "Read a template file",
    "parameters": [
      {
        "name": "filename",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      },
      {
        "name": "reseller",
        "in": "query",
        "required": false,
        "description": "The reseller or territory the template file applies to. Defaults to \"*\"",
        "schemaType": "string"
      },
      {
        "name": "domain",
        "in": "query",
        "required": false,
        "description": "The domain the template file applies to. Defaults to \"*\""
      },
      {
        "name": "server",
        "in": "query",
        "required": false,
        "description": "The server the template file applies to. Defaults to \"*\"",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false
  },
  "CreateTemplateBase64": {
    "id": "CreateTemplateBase64",
    "method": "POST",
    "path": "/templates/{filename}",
    "resource": "Templates",
    "summary": "Create Template from Upload (JSON + Base64 File)",
    "description": "Create a template file",
    "parameters": [
      {
        "name": "filename",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true
  },
  "DeleteTemplate": {
    "id": "DeleteTemplate",
    "method": "DELETE",
    "path": "/templates/{filename}",
    "resource": "Templates",
    "summary": "Delete a Template",
    "description": "Delete a template file",
    "parameters": [
      {
        "name": "filename",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true
  },
  "UpdateTemplateBase64": {
    "id": "UpdateTemplateBase64",
    "method": "PUT",
    "path": "/templates/{filename}",
    "resource": "Templates",
    "summary": "Update Template from Upload (JSON + Base64 File)",
    "description": "Update a template file",
    "parameters": [
      {
        "name": "filename",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true
  },
  "PostDomainsByTimeframes": {
    "id": "PostDomainsByTimeframes",
    "method": "POST",
    "path": "/domains/{domain}/timeframes",
    "resource": "Timeframes/Domain (Shared)/Always",
    "summary": "Create Always Timeframe",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": true
  },
  "GetDomainsByTimeframes": {
    "id": "GetDomainsByTimeframes",
    "method": "GET",
    "path": "/domains/{domain}/timeframes",
    "resource": "Timeframes/Domain (Shared)",
    "summary": "Read All Timeframes for Domain (Shared)",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": false
  },
  "PostDomainsByTimeframes_2": {
    "id": "PostDomainsByTimeframes_2",
    "method": "POST",
    "path": "/domains/{domain}/timeframes",
    "resource": "Timeframes/Domain (Shared)/Specific Dates",
    "summary": "Create Specific Dates Timeframe",
    "description": "When creating a Specific Dates timeframe it is not necessary to supply a ```timeframe-id``` for the timeframe or for the date ranges within that timeframe. These ```timeframe-id```s will be generated automatically.",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": true
  },
  "PostDomainsByTimeframesBy": {
    "id": "PostDomainsByTimeframesBy",
    "method": "POST",
    "path": "/domains/{domain}/timeframes/{id}",
    "resource": "Timeframes/Domain (Shared)/Specific Dates",
    "summary": "Create Additional Date Ranges within Specific Dates Timeframe",
    "description": "When creating additional date ranges within a Specific Dates timeframe it is not necessary to supply a ```timeframe-id``` for the new date ranges. These ```timeframe-id```s will be generated automatically.",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "id",
        "in": "path",
        "required": true,
        "description": "```timeframe-id``` for the timeframe to modify",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true,
    "minApiVersion": 45
  },
  "PutDomainsByTimeframesBy": {
    "id": "PutDomainsByTimeframesBy",
    "method": "PUT",
    "path": "/domains/{domain}/timeframes/{id}",
    "resource": "Timeframes/Domain (Shared)/Specific Dates",
    "summary": "Replace All Date Ranges in Specific Dates Timeframe",
    "description": "If a new array of specific date ranges is supplied in the update request for a Specific Dates timeframe, it will replace all existing specific date ranges in the timeframe, meaning that any existing specific date ranges in that timeframe will be removed. To update individual specific date ranges within a Specific Dates timeframe, refer to \"Update Date Ranges within Specific Dates Timeframe.\" It is not necessary to supply a ```timeframe-id``` for the new date ranges. These ```timeframe-id```s will be generated automatically.",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "id",
        "in": "path",
        "required": true,
        "description": "```timeframe-id``` of the timeframe to modify",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true,
    "minApiVersion": 45
  },
  "DeleteDomainsByTimeframesBy": {
    "id": "DeleteDomainsByTimeframesBy",
    "method": "DELETE",
    "path": "/domains/{domain}/timeframes/{id}",
    "resource": "Timeframes/Domain (Shared)/Specific Dates",
    "summary": "Delete Date Range within Specific Dates Timeframe",
    "description": "In order to delete a date range within a Specific Dates timeframe, supply the ```timeframe-id``` of the particular range to be deleted as the parameter ```child_id``` within the request.",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "id",
        "in": "path",
        "required": true,
        "description": "```timeframe-id``` of the timeframe to modify",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true,
    "minApiVersion": 45
  },
  "GetDomainsByTimeframesBy": {
    "id": "GetDomainsByTimeframesBy",
    "method": "GET",
    "path": "/domains/{domain}/timeframes/{id}",
    "resource": "Timeframes/Domain (Shared)",
    "summary": "Read Specific Timeframe for Domain (Shared)",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "id",
        "in": "path",
        "required": true,
        "description": "```timeframe-id``` of the timeframe to read",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  "PutDomainsByTimeframesBy_2": {
    "id": "PutDomainsByTimeframesBy_2",
    "method": "PUT",
    "path": "/domains/{domain}/timeframes/{id}",
    "resource": "Timeframes/Domain (Shared)/Specific Dates",
    "summary": "Update Date Ranges within Specific Dates Timeframe",
    "description": "In order to update date ranges within a Specific Dates timeframe, include the parameter ```update_only``` and provide within the array ```timeframe-specific-dates-array``` the new values for the date ranges you intend to update, including in each date range the associated ```timeframe-id``` for that range. If any date ranges are missing the ```timeframe-id``` parameter, it may result in undesired behavior.\n\n\nThe value for ```update-only``` must be set to ```yes``` for this operation to succeed as desired. If any other value is supplied or the parameter ```update-only``` is omitted, it will result in the behavior described in \"Replace All Date Ranges in Specific Dates Timeframe\" - see examples for more information.",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "id",
        "in": "path",
        "required": true,
        "description": "```timeframe-id``` of the timeframe to modify",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true,
    "minApiVersion": 45
  },
  "PostDomainsByTimeframesBy_2": {
    "id": "PostDomainsByTimeframesBy_2",
    "method": "POST",
    "path": "/domains/{domain}/timeframes/{id}",
    "resource": "Timeframes/Domain (Shared)/Holiday",
    "summary": "Create Additional Holidays within Holiday Timeframe",
    "description": "When creating additional holidays within a Holiday timeframe it is not necessary to supply a ```timeframe-id``` for the new holidays. These ```timeframe-id```s will be generated automatically.",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "id",
        "in": "path",
        "required": true,
        "description": "```timeframe-id``` of the timeframe to modify",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true,
    "minApiVersion": 45
  },
  "DeleteDomainsByTimeframesBy_2": {
    "id": "DeleteDomainsByTimeframesBy_2",
    "method": "DELETE",
    "path": "/domains/{domain}/timeframes/{id}",
    "resource": "Timeframes/Domain (Shared)/Holiday",
    "summary": "Delete Holiday within Holiday Timeframe",
    "description": "In order to delete a holiday within a Holidays timeframe, supply the ```timeframe-id``` of the particular holiday to be deleted as the parameter ```child_id``` within the request.",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "id",
        "in": "path",
        "required": true,
        "description": "```timeframe-id``` of the timeframe to modify",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true,
    "minApiVersion": 45
  },
  "PostDomainsByTimeframes_3": {
    "id": "PostDomainsByTimeframes_3",
    "method": "POST",
    "path": "/domains/{domain}/timeframes",
    "resource": "Timeframes/Domain (Shared)/Days of Week",
    "summary": "Create Days of Week Timeframe",
    "description": "A Days of Week timeframe consists of a single Days of Week entry within the ```timeframe-day-of-week-array``` array inside the timeframe. In order to create a Days of Week timeframe, supply a single new Days of Week entry object within the ```timeframe-day-of-week-array``` array in the create request. See examples for more information.\n\nWhen creating a Days of Week timeframe it is not necessary to supply a ```timeframe-id``` for the timeframe or for the Days of Week entry within that timeframe. These ```timeframe-id```s will be generated automatically.",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": true
  },
  "PutDomainsByTimeframesBy_3": {
    "id": "PutDomainsByTimeframesBy_3",
    "method": "PUT",
    "path": "/domains/{domain}/timeframes/{id}",
    "resource": "Timeframes/Domain (Shared)/Days of Week",
    "summary": "Update Days of Week Timeframe",
    "description": "A Days of Week timeframe consists of a single Days of Week entry within the ```timeframe-day-of-week-array``` array inside the timeframe. In order to update a Days of Week timeframe, supply a single new Days of Week entry object within the ```timeframe-day-of-week-array``` array in the update request. It is not necessary to supply a ```timeframe-id``` for the new Days of Week entry. The ```timeframe-id``` will be generated automatically. See examples for more information.\n\nThe value for ```update-only``` must be set to ```yes``` for this operation to succeed as desired. If any other value is supplied or the parameter ```update-only``` is omitted, undesired behavior will occur.",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "id",
        "in": "path",
        "required": true,
        "description": "```timeframe-id``` of the timeframe to modify",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true,
    "minApiVersion": 45
  },
  "PostDomainsByTimeframesBy_3": {
    "id": "PostDomainsByTimeframesBy_3",
    "method": "POST",
    "path": "/domains/{domain}/timeframes/{id}",
    "resource": "Timeframes/Domain (Shared)/Custom",
    "summary": "Create Additional Entries within Custom Timeframe",
    "description": "When creating additional entries within a Custom timeframe it is not necessary to supply a ```timeframe-id``` for the new entries. These ```timeframe-id```s will be generated automatically.",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "id",
        "in": "path",
        "required": true,
        "description": "```timeframe-id``` of the timeframe to modify",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true,
    "minApiVersion": 45
  },
  "DeleteDomainsByTimeframesBy_3": {
    "id": "DeleteDomainsByTimeframesBy_3",
    "method": "DELETE",
    "path": "/domains/{domain}/timeframes/{id}",
    "resource": "Timeframes/Domain (Shared)/Custom",
    "summary": "Delete Entry within Custom Timeframe",
    "description": "In order to delete an entry within a Custom timeframe, supply the ```timeframe-id``` of the particular entry to be deleted as the parameter ```child_id``` within the request.",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "id",
        "in": "path",
        "required": true,
        "description": "```timeframe-id``` of the timeframe to modify",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true,
    "minApiVersion": 45
  },
  "PostDomainsByTimeframes_4": {
    "id": "PostDomainsByTimeframes_4",
    "method": "POST",
    "path": "/domains/{domain}/timeframes",
    "resource": "Timeframes/Domain (Shared)/Holiday",
    "summary": "Create Holidays Timeframe",
    "description": "When creating a Holiday timeframe it is not necessary to supply a ```timeframe-id``` for the timeframe or for the holidays within that timeframe. These ```timeframe-id```s will be generated automatically.",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": true
  },
  "PutDomainsByTimeframesBy_4": {
    "id": "PutDomainsByTimeframesBy_4",
    "method": "PUT",
    "path": "/domains/{domain}/timeframes/{id}",
    "resource": "Timeframes/Domain (Shared)/Holiday",
    "summary": "Replace All Holidays in Holiday Timeframe",
    "description": "If a new array of holiday objects is supplied in the update request for a Holidays timeframe, it will replace all existing holidays in the timeframe, meaning that any existing holidays in that timeframe will be removed. To update individual holidays within a Holiday timeframe, refer to \"Update Holidays within Holiday Timeframe.\" It is not necessary to supply a ```timeframe-id``` for the new holidays. These ```timeframe-id```s will be generated automatically.",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "id",
        "in": "path",
        "required": true,
        "description": "```timeframe-id``` of the timeframe to modify",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true,
    "minApiVersion": 45
  },
  "DeleteDomainsByTimeframesBy_4": {
    "id": "DeleteDomainsByTimeframesBy_4",
    "method": "DELETE",
    "path": "/domains/{domain}/timeframes/{id}",
    "resource": "Timeframes/Domain (Shared)",
    "summary": "Delete Specific Timeframe for Domain (Shared)",
    "description": "A timeframe can be deleted via its ID. Any answering rules will become invalid upon deleting their associated timeframe and will cease to function.",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "id",
        "in": "path",
        "required": true,
        "description": "```timeframe-id``` of the timeframe to delete",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  "PutDomainsByTimeframesBy_5": {
    "id": "PutDomainsByTimeframesBy_5",
    "method": "PUT",
    "path": "/domains/{domain}/timeframes/{id}",
    "resource": "Timeframes/Domain (Shared)/Holiday",
    "summary": "Update Holidays within Holiday Timeframe",
    "description": "In order to update holidays within a Holiday timeframe, include the parameter ```update_only``` and provide within the array ```timeframe-holiday-array``` the new values for the holidays you intend to update, including in each holiday object the associated ```timeframe-id``` for that holiday. If any holidays are missing the ```timeframe-id``` parameter, it may result in undesired behavior.\n\nThe value for ```update-only``` must be set to ```yes``` for this operation to succeed as desired. If any other value is supplied or the parameter ```update-only``` is omitted, it will result in the behavior described in \"Replace All Holidays in Holiday Timeframe\" - see examples for more information.\n\nIMPORTANT:\nUpdates to holidays are limited to workweek, observance configurations, time-of-day configurations, and recurrence. To add a different holiday, remove the existing holiday and then create the desired holiday.",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "id",
        "in": "path",
        "required": true,
        "description": "```timeframe-id``` of the timeframe to modify",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true,
    "minApiVersion": 45
  },
  "PostDomainsByTimeframes_5": {
    "id": "PostDomainsByTimeframes_5",
    "method": "POST",
    "path": "/domains/{domain}/timeframes",
    "resource": "Timeframes/Domain (Shared)/Custom",
    "summary": "Create Custom Timeframe",
    "description": "When creating a Custom timeframe it is not necessary to supply a ```timeframe-id``` for the timeframe or for the entries within that timeframe. These ```timeframe-id```s will be generated automatically.",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": true
  },
  "PutDomainsByTimeframesBy_6": {
    "id": "PutDomainsByTimeframesBy_6",
    "method": "PUT",
    "path": "/domains/{domain}/timeframes/{id}",
    "resource": "Timeframes/Domain (Shared)/Custom",
    "summary": "Replace All Entries in Custom Timeframe",
    "description": "If a new array of entries is supplied in the update request for a Custom timeframe, it will replace all existing entries in the timeframe, meaning that any existing entries in that timeframe will be removed. To update individual entries within a Custom timeframe, refer to \"Update Entries within Custom Timeframe.\" It is not necessary to supply a ```timeframe-id``` for the new holidays. These ```timeframe-id```s will be generated automatically.",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "id",
        "in": "path",
        "required": true,
        "description": "```timeframe-id``` of the timeframe to modify",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true,
    "minApiVersion": 45
  },
  "PutDomainsByTimeframesBy_7": {
    "id": "PutDomainsByTimeframesBy_7",
    "method": "PUT",
    "path": "/domains/{domain}/timeframes/{id}",
    "resource": "Timeframes/Domain (Shared)/Custom",
    "summary": "Update Entries within Custom Timeframe",
    "description": "In order to update entries within a Custom timeframe, include the parameter ```update_only``` and provide within the arrays ```timeframe-specific-dates-array```, ```timeframe-day-of-week-array```, and/or ```timeframe-holiday-array``` the new values for the entries you intend to update, including in each entry the associated ```timeframe-id``` for that entry. If any entries are missing the ```timeframe-id``` parameter, it may result in undesired behavior.\n\nThe value for ```update-only``` must be set to ```yes``` for this operation to succeed as desired. If any other value is supplied or the parameter ```update-only``` is omitted, it will result in the behavior described in \"Replace All Entries in Custom Timeframe\" - see examples for more information.",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "id",
        "in": "path",
        "required": true,
        "description": "```timeframe-id``` of the timeframe to modify",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true,
    "minApiVersion": 45
  },
  "PutDomainsByTimeframesBy_8": {
    "id": "PutDomainsByTimeframesBy_8",
    "method": "PUT",
    "path": "/domains/{domain}/timeframes/{id}",
    "resource": "Timeframes/Domain (Shared)",
    "summary": "Convert Timeframe to Another Type",
    "description": "It is possible to convert a timeframe from one type to another, e.g. from Holiday to Specific Dates or from Days of Week to Custom.\n\nIt is not possible to convert a Custom timeframe to any other type.\n \nConverting Specific Dates, Days of Week, or Holiday to Custom will result in a Custom timeframe which contains any entries which existed in the time frame before conversion.\n \nConverting Always to Custom will result in an empty Custom timeframe to which desired entries can then be added.\n \nConverting between any non-Custom types will result in losing those entries (for instance, converting Specific Dates to Days of Week will delete any date ranges in the timeframe)",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "id",
        "in": "path",
        "required": true,
        "description": "```timeframe-id``` of the timeframe to convert the type of",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true,
    "minApiVersion": 45
  },
  "PostDomainsByUsersByTimeframes": {
    "id": "PostDomainsByUsersByTimeframes",
    "method": "POST",
    "path": "/domains/{domain}/users/{user}/timeframes",
    "resource": "Timeframes/User/Always",
    "summary": "Create Always Timeframe",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": true
  },
  "GetDomainsByUsersByTimeframes": {
    "id": "GetDomainsByUsersByTimeframes",
    "method": "GET",
    "path": "/domains/{domain}/users/{user}/timeframes",
    "resource": "Timeframes/User",
    "summary": "Read All Timeframes for User",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": false
  },
  "PostDomainsByUsersByTimeframes_2": {
    "id": "PostDomainsByUsersByTimeframes_2",
    "method": "POST",
    "path": "/domains/{domain}/users/{user}/timeframes",
    "resource": "Timeframes/User/Specific Dates",
    "summary": "Create Specific Dates Timeframe",
    "description": "When creating a Specific Dates timeframe it is not necessary to supply a ```timeframe-id``` for the timeframe or for the date ranges within that timeframe. These ```timeframe-id```s will be generated automatically.",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": true
  },
  "PostDomainsByUsersByTimeframesBy": {
    "id": "PostDomainsByUsersByTimeframesBy",
    "method": "POST",
    "path": "/domains/{domain}/users/{user}/timeframes/{id}",
    "resource": "Timeframes/User/Specific Dates",
    "summary": "Create Additional Date Ranges within Specific Dates Timeframe",
    "description": "When creating additional date ranges within a Specific Dates timeframe it is not necessary to supply a ```timeframe-id``` for the new date ranges. These ```timeframe-id```s will be generated automatically.",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "id",
        "in": "path",
        "required": true,
        "description": "```timeframe-id``` for the timeframe to modify",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true,
    "minApiVersion": 45
  },
  "PutDomainsByUsersByTimeframesBy": {
    "id": "PutDomainsByUsersByTimeframesBy",
    "method": "PUT",
    "path": "/domains/{domain}/users/{user}/timeframes/{id}",
    "resource": "Timeframes/User/Specific Dates",
    "summary": "Replace All Date Ranges in Specific Dates Timeframe",
    "description": "If a new array of specific date ranges is supplied in the update request for a Specific Dates timeframe, it will replace all existing specific date ranges in the timeframe, meaning that any existing specific date ranges in that timeframe will be removed. To update individual specific date ranges within a Specific Dates timeframe, refer to \"Update Date Ranges within Specific Dates Timeframe.\" It is not necessary to supply a ```timeframe-id``` for the new date ranges. These ```timeframe-id```s will be generated automatically.",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "id",
        "in": "path",
        "required": true,
        "description": "```timeframe-id``` of the timeframe to modify",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true,
    "minApiVersion": 45
  },
  "DeleteDomainsByUsersByTimeframesBy": {
    "id": "DeleteDomainsByUsersByTimeframesBy",
    "method": "DELETE",
    "path": "/domains/{domain}/users/{user}/timeframes/{id}",
    "resource": "Timeframes/User/Specific Dates",
    "summary": "Delete Date Range within Specific Dates Timeframe",
    "description": "In order to delete a date range within a Specific Dates timeframe, supply the ```timeframe-id``` of the particular range to be deleted as the parameter ```child_id``` within the request.",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "id",
        "in": "path",
        "required": true,
        "description": "```timeframe-id``` of the timeframe to modify",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true,
    "minApiVersion": 45
  },
  "GetDomainsByUsersByTimeframesBy": {
    "id": "GetDomainsByUsersByTimeframesBy",
    "method": "GET",
    "path": "/domains/{domain}/users/{user}/timeframes/{id}",
    "resource": "Timeframes/User",
    "summary": "Read Specific Timeframe for User",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "id",
        "in": "path",
        "required": true,
        "description": "```timeframe-id``` of the timeframe to read",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  "PutDomainsByUsersByTimeframesBy_2": {
    "id": "PutDomainsByUsersByTimeframesBy_2",
    "method": "PUT",
    "path": "/domains/{domain}/users/{user}/timeframes/{id}",
    "resource": "Timeframes/User/Specific Dates",
    "summary": "Update Date Ranges within Specific Dates Timeframe",
    "description": "In order to update date ranges within a Specific Dates timeframe, include the parameter ```update_only``` and provide within the array ```timeframe-specific-dates-array``` the new values for the date ranges you intend to update, including in each date range the associated ```timeframe-id``` for that range. If any date ranges are missing the ```timeframe-id``` parameter, it may result in undesired behavior.\n\n\nThe value for ```update-only``` must be set to ```yes``` for this operation to succeed as desired. If any other value is supplied or the parameter ```update-only``` is omitted, it will result in the behavior described in \"Replace All Date Ranges in Specific Dates Timeframe\" - see examples for more information.",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "id",
        "in": "path",
        "required": true,
        "description": "```timeframe-id``` of the timeframe to modify",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true,
    "minApiVersion": 45
  },
  "PostDomainsByUsersByTimeframesBy_2": {
    "id": "PostDomainsByUsersByTimeframesBy_2",
    "method": "POST",
    "path": "/domains/{domain}/users/{user}/timeframes/{id}",
    "resource": "Timeframes/User/Holiday",
    "summary": "Create Additional Holidays within Holiday Timeframe",
    "description": "When creating additional holidays within a Holiday timeframe it is not necessary to supply a ```timeframe-id``` for the new holidays. These ```timeframe-id```s will be generated automatically.",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "id",
        "in": "path",
        "required": true,
        "description": "```timeframe-id``` of the timeframe to modify",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true,
    "minApiVersion": 45
  },
  "DeleteDomainsByUsersByTimeframesBy_2": {
    "id": "DeleteDomainsByUsersByTimeframesBy_2",
    "method": "DELETE",
    "path": "/domains/{domain}/users/{user}/timeframes/{id}",
    "resource": "Timeframes/User/Holiday",
    "summary": "Delete Holiday within Holiday Timeframe",
    "description": "In order to delete a holiday within a Holidays timeframe, supply the ```timeframe-id``` of the particular holiday to be deleted as the parameter ```child_id``` within the request.",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "id",
        "in": "path",
        "required": true,
        "description": "```timeframe-id``` of the timeframe to modify",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true,
    "minApiVersion": 45
  },
  "PostDomainsByUsersByTimeframes_3": {
    "id": "PostDomainsByUsersByTimeframes_3",
    "method": "POST",
    "path": "/domains/{domain}/users/{user}/timeframes",
    "resource": "Timeframes/User/Days of Week",
    "summary": "Create Days of Week Timeframe",
    "description": "A Days of Week timeframe consists of a single Days of Week entry within the ```timeframe-day-of-week-array``` array inside the timeframe. In order to create a Days of Week timeframe, supply a single new Days of Week entry object within the ```timeframe-day-of-week-array``` array in the create request. See examples for more information.\n\nWhen creating a Days of Week timeframe it is not necessary to supply a ```timeframe-id``` for the timeframe or for the Days of Week entry within that timeframe. These ```timeframe-id```s will be generated automatically.",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": true
  },
  "PutDomainsByUsersByTimeframesBy_3": {
    "id": "PutDomainsByUsersByTimeframesBy_3",
    "method": "PUT",
    "path": "/domains/{domain}/users/{user}/timeframes/{id}",
    "resource": "Timeframes/User/Days of Week",
    "summary": "Update Days of Week Timeframe",
    "description": "A Days of Week timeframe consists of a single Days of Week entry within the ```timeframe-day-of-week-array``` array inside the timeframe. In order to update a Days of Week timeframe, supply a single new Days of Week entry object within the ```timeframe-day-of-week-array``` array in the update request. It is not necessary to supply a ```timeframe-id``` for the new Days of Week entry. The ```timeframe-id``` will be generated automatically. See examples for more information.\n\nThe value for ```update-only``` must be set to ```yes``` for this operation to succeed as desired. If any other value is supplied or the parameter ```update-only``` is omitted, undesired behavior will occur.",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "id",
        "in": "path",
        "required": true,
        "description": "```timeframe-id``` of the timeframe to modify",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true,
    "minApiVersion": 45
  },
  "PostDomainsByUsersByTimeframesBy_3": {
    "id": "PostDomainsByUsersByTimeframesBy_3",
    "method": "POST",
    "path": "/domains/{domain}/users/{user}/timeframes/{id}",
    "resource": "Timeframes/User/Custom",
    "summary": "Create Additional Entries within Custom Timeframe",
    "description": "When creating additional entries within a Custom timeframe it is not necessary to supply a ```timeframe-id``` for the new entries. These ```timeframe-id```s will be generated automatically.",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "id",
        "in": "path",
        "required": true,
        "description": "```timeframe-id``` of the timeframe to modify",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true,
    "minApiVersion": 45
  },
  "DeleteDomainsByUsersByTimeframesBy_3": {
    "id": "DeleteDomainsByUsersByTimeframesBy_3",
    "method": "DELETE",
    "path": "/domains/{domain}/users/{user}/timeframes/{id}",
    "resource": "Timeframes/User/Custom",
    "summary": "Delete Entry within Custom Timeframe",
    "description": "In order to delete an entry within a Custom timeframe, supply the ```timeframe-id``` of the particular entry to be deleted as the parameter ```child_id``` within the request.",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "id",
        "in": "path",
        "required": true,
        "description": "```timeframe-id``` of the timeframe to modify",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true,
    "minApiVersion": 45
  },
  "PostDomainsByUsersByTimeframes_4": {
    "id": "PostDomainsByUsersByTimeframes_4",
    "method": "POST",
    "path": "/domains/{domain}/users/{user}/timeframes",
    "resource": "Timeframes/User/Holiday",
    "summary": "Create Holidays Timeframe",
    "description": "When creating a Holiday timeframe it is not necessary to supply a ```timeframe-id``` for the timeframe or for the holidays within that timeframe. These ```timeframe-id```s will be generated automatically.",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": true
  },
  "PutDomainsByUsersByTimeframesBy_4": {
    "id": "PutDomainsByUsersByTimeframesBy_4",
    "method": "PUT",
    "path": "/domains/{domain}/users/{user}/timeframes/{id}",
    "resource": "Timeframes/User/Holiday",
    "summary": "Update Holidays within Holiday Timeframe",
    "description": "In order to update holidays within a Holiday timeframe, include the parameter ```update_only``` and provide within the array ```timeframe-holiday-array``` the new values for the holidays you intend to update, including in each holiday object the associated ```timeframe-id``` for that holiday. If any holidays are missing the ```timeframe-id``` parameter, it may result in undesired behavior.\n\nThe value for ```update-only``` must be set to ```yes``` for this operation to succeed as desired. If any other value is supplied or the parameter ```update-only``` is omitted, it will result in the behavior described in \"Replace All Holidays in Holiday Timeframe\" - see examples for more information.\n\nIMPORTANT:\nUpdates to holidays are limited to workweek, observance configurations, time-of-day configurations, and recurrence. To add a different holiday, remove the existing holiday and then create the desired holiday.",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "id",
        "in": "path",
        "required": true,
        "description": "```timeframe-id``` of the timeframe to modify",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true,
    "minApiVersion": 45
  },
  "DeleteDomainsByUsersByTimeframesBy_4": {
    "id": "DeleteDomainsByUsersByTimeframesBy_4",
    "method": "DELETE",
    "path": "/domains/{domain}/users/{user}/timeframes/{id}",
    "resource": "Timeframes/User",
    "summary": "Delete Specific Timeframe for User",
    "description": "A timeframe can be deleted via its ID. Any answering rules will become invalid upon deleting their associated timeframe and will cease to function.",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "id",
        "in": "path",
        "required": true,
        "description": "```timeframe-id``` of the timeframe to delete",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  "PutDomainsByUsersByTimeframesBy_5": {
    "id": "PutDomainsByUsersByTimeframesBy_5",
    "method": "PUT",
    "path": "/domains/{domain}/users/{user}/timeframes/{id}",
    "resource": "Timeframes/User/Holiday",
    "summary": "Replace All Holidays in Holiday Timeframe",
    "description": "If a new array of holiday objects is supplied in the update request for a Holidays timeframe, it will replace all existing holidays in the timeframe, meaning that any existing holidays in that timeframe will be removed. To update individual holidays within a Holiday timeframe, refer to \"Update Holidays within Holiday Timeframe.\" It is not necessary to supply a ```timeframe-id``` for the new holidays. These ```timeframe-id```s will be generated automatically.",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "id",
        "in": "path",
        "required": true,
        "description": "```timeframe-id``` of the timeframe to modify",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true,
    "minApiVersion": 45
  },
  "PostDomainsByUsersByTimeframes_5": {
    "id": "PostDomainsByUsersByTimeframes_5",
    "method": "POST",
    "path": "/domains/{domain}/users/{user}/timeframes",
    "resource": "Timeframes/User/Custom",
    "summary": "Create Custom Timeframe",
    "description": "When creating a Custom timeframe it is not necessary to supply a ```timeframe-id``` for the timeframe or for the entries within that timeframe. These ```timeframe-id```s will be generated automatically.",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": true
  },
  "PutDomainsByUsersByTimeframesBy_6": {
    "id": "PutDomainsByUsersByTimeframesBy_6",
    "method": "PUT",
    "path": "/domains/{domain}/users/{user}/timeframes/{id}",
    "resource": "Timeframes/User/Custom",
    "summary": "Update Entries within Custom Timeframe",
    "description": "In order to update entries within a Custom timeframe, include the parameter ```update_only``` and provide within the arrays ```timeframe-specific-dates-array```, ```timeframe-day-of-week-array```, and/or ```timeframe-holiday-array``` the new values for the entries you intend to update, including in each entry the associated ```timeframe-id``` for that entry. If any entries are missing the ```timeframe-id``` parameter, it may result in undesired behavior.\n\nThe value for ```update-only``` must be set to ```yes``` for this operation to succeed as desired. If any other value is supplied or the parameter ```update-only``` is omitted, it will result in the behavior described in \"Replace All Entries in Custom Timeframe\" - see examples for more information.",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "id",
        "in": "path",
        "required": true,
        "description": "```timeframe-id``` of the timeframe to modify",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true,
    "minApiVersion": 45
  },
  "PutDomainsByUsersByTimeframesBy_7": {
    "id": "PutDomainsByUsersByTimeframesBy_7",
    "method": "PUT",
    "path": "/domains/{domain}/users/{user}/timeframes/{id}",
    "resource": "Timeframes/User/Custom",
    "summary": "Replace All Entries in Custom Timeframe",
    "description": "If a new array of entries is supplied in the update request for a Custom timeframe, it will replace all existing entries in the timeframe, meaning that any existing entries in that timeframe will be removed. To update individual entries within a Custom timeframe, refer to \"Update Entries within Custom Timeframe.\" It is not necessary to supply a ```timeframe-id``` for the new holidays. These ```timeframe-id```s will be generated automatically.",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "id",
        "in": "path",
        "required": true,
        "description": "```timeframe-id``` of the timeframe to modify",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true,
    "minApiVersion": 45
  },
  "Delete": {
    "id": "Delete",
    "method": "DELETE",
    "path": "/",
    "resource": "Timeframes/User",
    "summary": "Delete All Timeframes for User",
    "description": "",
    "parameters": [],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  "PutDomainsByUsersByTimeframesBy_8": {
    "id": "PutDomainsByUsersByTimeframesBy_8",
    "method": "PUT",
    "path": "/domains/{domain}/users/{user}/timeframes/{id}",
    "resource": "Timeframes/User",
    "summary": "Convert Timeframe to Another Type",
    "description": "It is possible to convert a timeframe from one type to another, e.g. from Holiday to Specific Dates or from Days of Week to Custom.\n\nIt is not possible to convert a Custom timeframe to any other type.\n \nConverting Specific Dates, Days of Week, or Holiday to Custom will result in a Custom timeframe which contains any entries which existed in the time frame before conversion.\n \nConverting Always to Custom will result in an empty Custom timeframe to which desired entries can then be added.\n \nConverting between any non-Custom types will result in losing those entries (for instance, converting Specific Dates to Days of Week will delete any date ranges in the timeframe)",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "id",
        "in": "path",
        "required": true,
        "description": "```timeframe-id``` of the timeframe to convert the type of",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true,
    "minApiVersion": 45
  },
  "GetHolidaysCountries": {
    "id": "GetHolidaysCountries",
    "method": "GET",
    "path": "/holidays/countries",
    "resource": "Timeframes/Holiday Information",
    "summary": "Read List of Supported Countries",
    "description": "Retrieve a list of supported country codes to be used when reading holiday information.",
    "parameters": [],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  "GetHolidaysRegions": {
    "id": "GetHolidaysRegions",
    "method": "GET",
    "path": "/holidays/regions",
    "resource": "Timeframes/Holiday Information",
    "summary": "Read List of Supported Regions",
    "description": "Retrieve a list of supported region codes by country, to be used when reading holiday information.",
    "parameters": [],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  "GetHolidaysByBy": {
    "id": "GetHolidaysByBy",
    "method": "GET",
    "path": "/holidays/{country}/{year}",
    "resource": "Timeframes/Holiday Information",
    "summary": "Read Holiday Information by Country",
    "description": "In order to create holidays in a Holiday timeframe or a Custom timeframe, it is necessary to supply a series of parameters for each holiday that can be obtained via this endpoint.",
    "parameters": [
      {
        "name": "country",
        "in": "path",
        "required": true,
        "description": "The country from which to read holidays - format: ISO-3166 A-2",
        "schemaType": "string"
      },
      {
        "name": "year",
        "in": "path",
        "required": true,
        "description": "The year in which to read holidays - format: YYYY",
        "schemaType": "string"
      },
      {
        "name": "language",
        "in": "query",
        "required": false,
        "description": "Language formatted according to ISO 639-1",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true,
    "minApiVersion": 45
  },
  "GetHolidaysByByBy": {
    "id": "GetHolidaysByByBy",
    "method": "GET",
    "path": "/holidays/{country}/{region}/{year}",
    "resource": "Timeframes/Holiday Information",
    "summary": "Read Holiday Information by Country and Region",
    "description": "",
    "parameters": [
      {
        "name": "country",
        "in": "path",
        "required": true,
        "description": "The country from which to read holidays - format: ISO-3166 A-2 e.g.: US, MX",
        "schemaType": "string"
      },
      {
        "name": "region",
        "in": "path",
        "required": true,
        "description": "The region within the ```country``` from which to read holidays - format: ISO 3166-2 e.g.: US-NY, MX-ZAC",
        "schemaType": "string"
      },
      {
        "name": "year",
        "in": "path",
        "required": true,
        "description": "The year in which to read holidays",
        "schemaType": "string"
      },
      {
        "name": "language",
        "in": "query",
        "required": false,
        "description": "Language formatted according to ISO 639-1",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  "GetFirebase": {
    "id": "GetFirebase",
    "method": "GET",
    "path": "/firebase",
    "resource": "Firebase",
    "summary": "Read firebase service accounts",
    "description": "",
    "parameters": [],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  "PostFirebase": {
    "id": "PostFirebase",
    "method": "POST",
    "path": "/firebase",
    "resource": "Firebase",
    "summary": "Add firebase service account",
    "description": "",
    "parameters": [],
    "hasRequestBody": true,
    "minApiVersion": 45
  },
  "GetCertificates": {
    "id": "GetCertificates",
    "method": "GET",
    "path": "/certificates",
    "resource": "SSL Certificates",
    "summary": "Read SSL certificates for CertManager",
    "description": "",
    "parameters": [],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  "PostCertificates": {
    "id": "PostCertificates",
    "method": "POST",
    "path": "/certificates",
    "resource": "SSL Certificates",
    "summary": "Create SSL certificate for CertManager",
    "description": "",
    "parameters": [],
    "hasRequestBody": true,
    "minApiVersion": 45
  },
  "GetCertificatesBy": {
    "id": "GetCertificatesBy",
    "method": "GET",
    "path": "/certificates/{name}",
    "resource": "SSL Certificates",
    "summary": "Read SSL certificate by Common Name",
    "description": "",
    "parameters": [
      {
        "name": "name",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  "PutCertificatesBy": {
    "id": "PutCertificatesBy",
    "method": "PUT",
    "path": "/certificates/{name}",
    "resource": "SSL Certificates",
    "summary": "Update SSL certificate for CertManager",
    "description": "",
    "parameters": [
      {
        "name": "name",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true,
    "minApiVersion": 45
  },
  "DeleteCertificatesBy": {
    "id": "DeleteCertificatesBy",
    "method": "DELETE",
    "path": "/certificates/{name}",
    "resource": "SSL Certificates",
    "summary": "Delete SSL certificate for CertManager",
    "description": "",
    "parameters": [
      {
        "name": "name",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  "GetCodeBy": {
    "id": "GetCodeBy",
    "method": "GET",
    "path": "/code/{hostname}",
    "resource": "Manage Code",
    "summary": "View Code Packages on Hostname",
    "description": "",
    "parameters": [
      {
        "name": "hostname",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  "GetInsightBy": {
    "id": "GetInsightBy",
    "method": "GET",
    "path": "/insight/{label}",
    "resource": "iNSight",
    "summary": "Query Data from iNSight",
    "description": "",
    "parameters": [
      {
        "name": "label",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      },
      {
        "name": "range",
        "in": "query",
        "required": false,
        "description": "The range to use in the query, using this option will avoid the need to calculate start, end and step. \n",
        "schemaType": "string"
      },
      {
        "name": "aggregated",
        "in": "query",
        "required": false,
        "description": "Select Eiterh aggregated data or by server. ",
        "schemaType": "string"
      },
      {
        "name": "start",
        "in": "query",
        "required": false,
        "description": "The timestamp to start the range. Optional and will override range values. "
      },
      {
        "name": "end",
        "in": "query",
        "required": false,
        "description": "The timestamp to end the range. Optional and will override range values. ",
        "schemaType": "integer"
      },
      {
        "name": "step",
        "in": "query",
        "required": false,
        "description": "The interval to use in the query. Optional and will override range values. ",
        "schemaType": "string"
      },
      {
        "name": "query",
        "in": "query",
        "required": false,
        "description": "advanced use only, will override full query if label set to \"custom\" you can use to provide full promQL query",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  "GetDomainsByConferences": {
    "id": "GetDomainsByConferences",
    "method": "GET",
    "path": "/domains/{domain}/conferences",
    "resource": "Conference/Conferences",
    "summary": "Get Conferences in Domain",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  "PostDomainsByConferences": {
    "id": "PostDomainsByConferences",
    "method": "POST",
    "path": "/domains/{domain}/conferences",
    "resource": "Conference/Conferences",
    "summary": "Create Conference for Domain",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": true,
    "minApiVersion": 45
  },
  "GetDomainsByConferencesBy": {
    "id": "GetDomainsByConferencesBy",
    "method": "GET",
    "path": "/domains/{domain}/conferences/{conference}",
    "resource": "Conference/Conferences",
    "summary": "Get Conference in Domain",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "conference",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  "PutDomainsByConferencesBy": {
    "id": "PutDomainsByConferencesBy",
    "method": "PUT",
    "path": "/domains/{domain}/conferences/{conference}",
    "resource": "Conference/Conferences",
    "summary": "Update Conference in Domain",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "conference",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true,
    "minApiVersion": 45
  },
  "DeleteDomainsByConferencesBy": {
    "id": "DeleteDomainsByConferencesBy",
    "method": "DELETE",
    "path": "/domains/{domain}/conferences/{conference}",
    "resource": "Conference/Conferences",
    "summary": "Delete Conference in Domain",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "conference",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  "GetDomainsByConferencesCount": {
    "id": "GetDomainsByConferencesCount",
    "method": "GET",
    "path": "/domains/{domain}/conferences/count",
    "resource": "Conference/Conferences",
    "summary": "Count Conferences in Domain",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  "GetDomainsByConferencesByCdr": {
    "id": "GetDomainsByConferencesByCdr",
    "method": "GET",
    "path": "/domains/{domain}/conferences/{conference}/cdr",
    "resource": "Conference/Conferences",
    "summary": "Get Conference CDR from Domain",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "conference",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      },
      {
        "name": "from",
        "in": "query",
        "required": false,
        "description": "",
        "schemaType": "string"
      },
      {
        "name": "to",
        "in": "query",
        "required": false,
        "description": "",
        "schemaType": "string"
      },
      {
        "name": "include_participants",
        "in": "query",
        "required": false,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  "GetDomainsByConferencesByParticipants": {
    "id": "GetDomainsByConferencesByParticipants",
    "method": "GET",
    "path": "/domains/{domain}/conferences/{conference}/participants",
    "resource": "Conference/Participants",
    "summary": "Get Participants from Conference",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "conference",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  "PostDomainsByConferencesByParticipants": {
    "id": "PostDomainsByConferencesByParticipants",
    "method": "POST",
    "path": "/domains/{domain}/conferences/{conference}/participants",
    "resource": "Conference/Participants",
    "summary": "Create Participant for Conference",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "conference",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true,
    "minApiVersion": 45
  },
  "PutDomainsByConferencesByParticipantsBy": {
    "id": "PutDomainsByConferencesByParticipantsBy",
    "method": "PUT",
    "path": "/domains/{domain}/conferences/{conference}/participants/{participant}",
    "resource": "Conference/Participants",
    "summary": "Update Participant for Conference",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "conference",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      },
      {
        "name": "participant",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true,
    "minApiVersion": 45
  },
  "DeleteDomainsByConferencesByParticipantsBy": {
    "id": "DeleteDomainsByConferencesByParticipantsBy",
    "method": "DELETE",
    "path": "/domains/{domain}/conferences/{conference}/participants/{participant}",
    "resource": "Conference/Participants",
    "summary": "Delete Participant from Conference",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "conference",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "number"
      },
      {
        "name": "participant",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "number"
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  "GetDomainsByPhonetemplates": {
    "id": "GetDomainsByPhonetemplates",
    "method": "GET",
    "path": "/domains/{domain}/phonetemplates",
    "resource": "SnapBuilder/Phone Templates",
    "summary": "Read Phone Templates available to a Domain",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  "PostDomainsByPhonetemplates": {
    "id": "PostDomainsByPhonetemplates",
    "method": "POST",
    "path": "/domains/{domain}/phonetemplates",
    "resource": "SnapBuilder/Phone Templates",
    "summary": "Create Phone Template  in domain",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": true,
    "minApiVersion": 45
  },
  "GetDomainsByPhonetemplatesBy": {
    "id": "GetDomainsByPhonetemplatesBy",
    "method": "GET",
    "path": "/domains/{domain}/phonetemplates/{name}",
    "resource": "SnapBuilder/Phone Templates",
    "summary": "Read Specific Phone Templates by name ",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "name",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  "PutDomainsByPhonetemplatesBy": {
    "id": "PutDomainsByPhonetemplatesBy",
    "method": "PUT",
    "path": "/domains/{domain}/phonetemplates/{name}",
    "resource": "SnapBuilder/Phone Templates",
    "summary": "Update Phone Template  in domain",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "name",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true,
    "minApiVersion": 45
  },
  "DeleteDomainsByPhonetemplatesBy": {
    "id": "DeleteDomainsByPhonetemplatesBy",
    "method": "DELETE",
    "path": "/domains/{domain}/phonetemplates/{name}",
    "resource": "SnapBuilder/Phone Templates",
    "summary": "Delete Phone Template  in domain",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "name",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  "GetDeviceprofiles": {
    "id": "GetDeviceprofiles",
    "method": "GET",
    "path": "/deviceprofiles",
    "resource": "SnapBuilder",
    "summary": "Read Device Profiles",
    "description": "",
    "parameters": [],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  "GetDeviceprofilesCount": {
    "id": "GetDeviceprofilesCount",
    "method": "GET",
    "path": "/deviceprofiles/count",
    "resource": "SnapBuilder",
    "summary": "Count Device Profiles",
    "description": "",
    "parameters": [],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  "GetDeviceprofilesByBy": {
    "id": "GetDeviceprofilesByBy",
    "method": "GET",
    "path": "/deviceprofiles/{make}/{model}",
    "resource": "SnapBuilder",
    "summary": "Get specific Device Profile for Model of Phone",
    "description": "",
    "parameters": [
      {
        "name": "make",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      },
      {
        "name": "model",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  "GetDomainsByPhoneconfigurationCount": {
    "id": "GetDomainsByPhoneconfigurationCount",
    "method": "GET",
    "path": "/domains/{domain}/phoneconfiguration/count",
    "resource": "SnapBuilder",
    "summary": "Count Phone Configurations",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  "GetDomainsByPhoneconfigurationBy": {
    "id": "GetDomainsByPhoneconfigurationBy",
    "method": "GET",
    "path": "/domains/{domain}/phoneconfiguration/{mac}",
    "resource": "SnapBuilder",
    "summary": "Get Phone Configuration for specific Mac",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "mac",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  "PutDomainsByPhoneconfigurationBy": {
    "id": "PutDomainsByPhoneconfigurationBy",
    "method": "PUT",
    "path": "/domains/{domain}/phoneconfiguration/{mac}",
    "resource": "SnapBuilder",
    "summary": "Update Phone Configuration for Specific Mac Address",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "mac",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": true,
    "minApiVersion": 45
  },
  "DeleteDomainsByPhoneconfigurationBy": {
    "id": "DeleteDomainsByPhoneconfigurationBy",
    "method": "DELETE",
    "path": "/domains/{domain}/phoneconfiguration/{mac}",
    "resource": "SnapBuilder",
    "summary": "Delete Phone Configuration for Specific Mac Address",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "mac",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  "PostDomainsByPhoneconfiguration": {
    "id": "PostDomainsByPhoneconfiguration",
    "method": "POST",
    "path": "/domains/{domain}/phoneconfiguration",
    "resource": "SnapBuilder",
    "summary": "Create Phone Configuration for Specific Mac Address",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": true,
    "minApiVersion": 45
  },
  "GetDomainsByChartsByCount": {
    "id": "GetDomainsByChartsByCount",
    "method": "GET",
    "path": "/domains/{domain}/charts/{dashboard_id}/count",
    "resource": "Charts",
    "summary": "Count Charts",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "dashboard_id",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "number"
      },
      {
        "name": "type",
        "in": "query",
        "required": false,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  "GetDomainsByChartsByList": {
    "id": "GetDomainsByChartsByList",
    "method": "GET",
    "path": "/domains/{domain}/charts/{dashboard_id}/list",
    "resource": "Charts",
    "summary": "Get Chart List",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "dashboard_id",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "number"
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  "GetDomainsByUsersByDashboardsCount": {
    "id": "GetDomainsByUsersByDashboardsCount",
    "method": "GET",
    "path": "/domains/{domain}/users/{user}/dashboards/count",
    "resource": "Dashboards",
    "summary": "Count Dashboards for a User",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "owner_id",
        "in": "query",
        "required": false,
        "description": "",
        "schemaType": "number"
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  "GetDomainsByUsersByDashboardsList": {
    "id": "GetDomainsByUsersByDashboardsList",
    "method": "GET",
    "path": "/domains/{domain}/users/{user}/dashboards/list",
    "resource": "Dashboards",
    "summary": "Get Dashboard List for a User",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "user",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "owner_id",
        "in": "query",
        "required": false,
        "description": "",
        "schemaType": "number"
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  "GetDomainsByQuotas": {
    "id": "GetDomainsByQuotas",
    "method": "GET",
    "path": "/domains/{domain}/quotas",
    "resource": "Quotas",
    "summary": "Get Quota for Domain",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  "GetResellersByQuotas": {
    "id": "GetResellersByQuotas",
    "method": "GET",
    "path": "/resellers/{reseller}/quotas",
    "resource": "Quotas",
    "summary": "Get Quota for Domains in Reseller",
    "description": "",
    "parameters": [
      {
        "name": "reseller",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  "GetDomainsByQuotasCount": {
    "id": "GetDomainsByQuotasCount",
    "method": "GET",
    "path": "/domains/{domain}/quotas/count",
    "resource": "Quotas",
    "summary": "Count Quotas for Domain",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  "GetResellersByQuotasCount": {
    "id": "GetResellersByQuotasCount",
    "method": "GET",
    "path": "/resellers/{reseller}/quotas/count",
    "resource": "Quotas",
    "summary": "Count Quotas for Reseller",
    "description": "",
    "parameters": [
      {
        "name": "reseller",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  "GetDomainsByDepartmentsList": {
    "id": "GetDomainsByDepartmentsList",
    "method": "GET",
    "path": "/domains/{domain}/departments/list",
    "resource": "Departments",
    "summary": "List Departments in a Domain",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  "GetDomainsByPresenceList": {
    "id": "GetDomainsByPresenceList",
    "method": "GET",
    "path": "/domains/{domain}/presence/list",
    "resource": "Presence",
    "summary": "List Presence in a Domain",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "last_update",
        "in": "query",
        "required": false,
        "description": "",
        "schemaType": "string"
      },
      {
        "name": "limit",
        "in": "query",
        "required": false,
        "description": ""
      },
      {
        "name": "order",
        "in": "query",
        "required": false,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  "GetDomainsByDepartmentsByPresenceList": {
    "id": "GetDomainsByDepartmentsByPresenceList",
    "method": "GET",
    "path": "/domains/{domain}/departments/{department}/presence/list",
    "resource": "Presence",
    "summary": "List Presence in a Department",
    "description": "",
    "parameters": [
      {
        "name": "domain",
        "in": "path",
        "required": true,
        "description": ""
      },
      {
        "name": "department",
        "in": "path",
        "required": true,
        "description": "",
        "schemaType": "string"
      },
      {
        "name": "last_update",
        "in": "query",
        "required": false,
        "description": "",
        "schemaType": "string"
      },
      {
        "name": "limit",
        "in": "query",
        "required": false,
        "description": ""
      },
      {
        "name": "order",
        "in": "query",
        "required": false,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  "GetAuditlog": {
    "id": "GetAuditlog",
    "method": "GET",
    "path": "/auditlog",
    "resource": "Aduit Log",
    "summary": "Read Audit Log",
    "description": "",
    "parameters": [
      {
        "name": "datetime-start",
        "in": "query",
        "required": false,
        "description": ""
      },
      {
        "name": "datetime-end",
        "in": "query",
        "required": false,
        "description": ""
      },
      {
        "name": "by-ip",
        "in": "query",
        "required": false,
        "description": "",
        "schemaType": "string"
      },
      {
        "name": "action-type",
        "in": "query",
        "required": false,
        "description": "",
        "schemaType": "string"
      },
      {
        "name": "target-domain",
        "in": "query",
        "required": false,
        "description": "",
        "schemaType": "string"
      },
      {
        "name": "target-object",
        "in": "query",
        "required": false,
        "description": "",
        "schemaType": "string"
      },
      {
        "name": "target-host",
        "in": "query",
        "required": false,
        "description": "",
        "schemaType": "string"
      },
      {
        "name": "target-user",
        "in": "query",
        "required": false,
        "description": "",
        "schemaType": "string"
      },
      {
        "name": "by-client",
        "in": "query",
        "required": false,
        "description": "",
        "schemaType": "string"
      },
      {
        "name": "by-domain",
        "in": "query",
        "required": false,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  },
  "GetAccesslog": {
    "id": "GetAccesslog",
    "method": "GET",
    "path": "/accesslog",
    "resource": "Access Log",
    "summary": "Read Accesslog",
    "description": "",
    "parameters": [
      {
        "name": "datetime-start",
        "in": "query",
        "required": false,
        "description": ""
      },
      {
        "name": "datetime-end",
        "in": "query",
        "required": false,
        "description": ""
      },
      {
        "name": "by-ip",
        "in": "query",
        "required": false,
        "description": "",
        "schemaType": "string"
      },
      {
        "name": "action-type",
        "in": "query",
        "required": false,
        "description": "",
        "schemaType": "string"
      },
      {
        "name": "target-domain",
        "in": "query",
        "required": false,
        "description": "",
        "schemaType": "string"
      },
      {
        "name": "target-object",
        "in": "query",
        "required": false,
        "description": "",
        "schemaType": "string"
      },
      {
        "name": "target-host",
        "in": "query",
        "required": false,
        "description": "",
        "schemaType": "string"
      },
      {
        "name": "target-user",
        "in": "query",
        "required": false,
        "description": "",
        "schemaType": "string"
      },
      {
        "name": "by-client",
        "in": "query",
        "required": false,
        "description": "",
        "schemaType": "string"
      },
      {
        "name": "by-domain",
        "in": "query",
        "required": false,
        "description": "",
        "schemaType": "string"
      }
    ],
    "hasRequestBody": false,
    "minApiVersion": 45
  }
};
