export enum Channel {
    Glasius = 'Glasius',
    Playground = 'playground_poc_config',
    Demo = 'Glasius Demo 1',
    WhatsApp = 'WhatsApp',
    Instagram = 'Instagram',
    TikTok = 'TikTok',
}

export enum Subject {
    CustomerCombined = 'Customer Combined',
    Agent = 'Agent',
    UnservedCustomer = 'Unserved Customer',
    ServedCustomer = 'Served Customer',
}

export enum ActionType {
    Message = 'Message',
    Webhook = 'Webhook',
}

export enum Division {
    Sales = 'Sales',
    Support = 'Support',
    Billing = 'Billing',
    Technical = 'Technical',
}

export enum KnowledgeBase {
    ProductFAQ = 'Product FAQ',
    TroubleshootingGuides = 'Troubleshooting Guides',
    BillingPolicies = 'Billing Policies',
    APIDocumentation = 'API Documentation',
}


export interface PromptMessagePair {
  id: string;
  prompt: string;
  message: string;
  imageUrl: string;
  isHandoverAgent: boolean;
  isResolved: boolean;
  isExactMessage: boolean;
  getHistoryChat: boolean;
  getKnowledgeBase: boolean;
  knowledgeBases: KnowledgeBase[];
  assignedDivision?: Division;
}

export interface MessageActionDetails {
  prompts: PromptMessagePair[];
}

export interface WebhookActionDetails {
  url: string;
}

export interface FollowUp {
  id: string;
  name: string;
  channels: Channel[];
  subject: Subject;
  duration: number; // in minutes
  maxRecurring: number;
  actionType: ActionType;
  actionDetails: MessageActionDetails | WebhookActionDetails;
  isActive: boolean;
}