export interface Subscription {
  id: number;
  name: string;
  category: SubscriptionCategory;
  cost: number;
  billingDate: string;
  status: SubscriptionStatus;
  logo: string;
  description: string;
}

export type SubscriptionStatus = 'active' | 'expiring' | 'expired' | 'cancelled' | 'paused';

export type SubscriptionCategory =
  | 'Streaming Video'
  | 'Streaming Music'
  | 'Gaming'
  | 'Cloud Storage'
  | 'Productivity'
  | 'News & Magazines'
  | 'Food & Meal Kits'
  | 'Health & Fitness'
  | 'Software'
  | 'Shopping'
  | 'Education'
  | 'Finance'
  | 'Utilities'
  | 'Transportation'
  | 'Books & Audiobooks';
