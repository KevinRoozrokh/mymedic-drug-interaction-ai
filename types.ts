
export enum Theme {
  LIGHT = 'light',
  DARK = 'dark',
}

export enum View {
  CHAT = 'chat',
  DASHBOARD = 'dashboard',
  MEDICATIONS = 'medications',
  COMPARE = 'compare',
  INTERACTION_CHECKER = 'interaction_checker',
  BOOKMARKS = 'bookmarks',
  ACCOUNT = 'account',
  HEALTH_PROFILE = 'health_profile',
  SETTINGS = 'settings',
  HELP = 'help',
}

export enum Sender {
  USER = 'user',
  AI = 'ai',
}

export interface Message {
  id: string;
  text: string;
  sender: Sender;
  timestamp: string;
}

export interface MedicationInteraction {
  drug: string;
  severity: 'Critical' | 'Moderate' | 'Minor';
  description: string;
}

export interface Medication {
  id: string;
  brandNames: string[];
  genericName: string;
  drugClass: string;
  category: string;
  description: string;
  uses: string[];
  dosage: {
    forms: string[];
    administration: string;
    adult?: string;
    pediatric?: string;
  };
  sideEffects: {
    common: string[];
    serious: string[];
  };
  contraindications: string[];
  warnings: string[];
  interactions: MedicationInteraction[];
  pregnancyCategory: string;
  storage: string;
}

export interface InteractionResult {
    severity: 'Critical' | 'Moderate' | 'Minor' | 'None';
    summary: string;
    details: string[];
}
