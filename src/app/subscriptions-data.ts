import { computed, Injectable, signal } from '@angular/core';
import { Subscription } from './subscription.model';

@Injectable({
  providedIn: 'root',
})
export class Subscriptions {
  private subscriptions = signal<Subscription[]>([
    {
      id: 1,
      name: 'Netflix',
      category: 'Streaming Video',
      cost: 15.99,
      billingDate: '2025-09-15',
      status: 'active',
      logo: 'video_library',
      description: 'Streaming service',
    },
    {
      id: 2,
      name: 'Spotify',
      category: 'Streaming Music',
      cost: 9.99,
      billingDate: '2025-09-08',
      status: 'expiring',
      logo: 'music_note',
      description: 'Music streaming',
    },
    {
      id: 3,
      name: 'Adobe Creative Cloud',
      category: 'Software',
      cost: 52.99,
      billingDate: '2025-09-22',
      status: 'active',
      logo: 'developer_mode',
      description: 'Design software suite',
    },
    {
      id: 4,
      name: 'Microsoft 365',
      category: 'Software',
      cost: 6.99,
      billingDate: '2025-09-03',
      status: 'expiring',
      logo: 'developer_mode',
      description: 'Office productivity suite',
    },
    {
      id: 5,
      name: 'New York Times',
      category: 'News & Magazines',
      cost: 4.25,
      billingDate: '2025-09-18',
      status: 'active',
      logo: 'article',
      description: 'Digital newspaper',
    },
    {
      id: 6,
      name: 'GitHub Pro',
      category: 'Software',
      cost: 4.0,
      billingDate: '2025-09-12',
      status: 'active',
      logo: 'developer_mode',
      description: 'Code repository hosting',
    },
  ]);

  subscriptionsData = computed(() => this.subscriptions());

  totalCost = computed(() => this.subscriptions().reduce((sum, sub) => sum + sub.cost, 0));

  removeSubscription(id: number): void {
    this.subscriptions.update((subs) => subs.filter((sub) => sub.id !== id));
  }

  updateSubscription(updatedSub: Subscription): void {
    this.subscriptions.update((subs) =>
      subs.map((sub) => (sub.id === updatedSub.id ? updatedSub : sub)),
    );
  }

  addSubscription(newSub: Subscription): void {
    this.subscriptions.update((subs) => [...subs, newSub]);
  }
}
