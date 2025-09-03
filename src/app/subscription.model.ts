export interface Subscription {
  id: string;
  name: string;
  category: SubscriptionCategory;
  cost: number;
  billingDate: string;
  status: SubscriptionStatus;
  logo: SubscriptionIcon;
  description: string;
}

export type SubscriptionDto = Omit<Subscription, 'id'>;

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

export const subscriptionIcons: SubscriptionIcon[] = [
  'video_library', // Streaming Video
  'music_note', // Streaming Music
  'sports_esports', // Gaming
  'cloud_queue', // Cloud Storage
  'work_outline', // Productivity
  'article', // News & Magazines
  'restaurant_menu', // Food & Meal Kits
  'fitness_center', // Health & Fitness
  'developer_mode', // Software
  'shopping_cart', // Shopping
  'school', // Education
  'account_balance_wallet', // Finance
  'build', // Utilities
  'directions_car', // Transportation
  'menu_book', // Books & Audiobooks
];

export type SubscriptionIcon =
  | 'video_library'
  | 'music_note'
  | 'sports_esports'
  | 'cloud_queue'
  | 'work_outline'
  | 'article'
  | 'restaurant_menu'
  | 'fitness_center'
  | 'developer_mode'
  | 'shopping_cart'
  | 'school'
  | 'account_balance_wallet'
  | 'build'
  | 'directions_car'
  | 'menu_book';
