import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

interface Subscription {
  id: number;
  name: string;
  category: string;
  cost: number;
  billingDate: string;
  status: string;
  logo: string;
  description: string;
}

@Component({
  selector: 'app-dashboard',
  imports: [MatCardModule, MatIconModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  protected subscriptions: Subscription[] = [
    {
      id: 1,
      name: 'Netflix',
      category: 'Entertainment',
      cost: 15.99,
      billingDate: '2025-09-15',
      status: 'active',
      logo: '🎬',
      description: 'Streaming service',
    },
    {
      id: 2,
      name: 'Spotify',
      category: 'Entertainment',
      cost: 9.99,
      billingDate: '2025-09-08',
      status: 'expiring',
      logo: '🎵',
      description: 'Music streaming',
    },
    {
      id: 3,
      name: 'Adobe Creative Cloud',
      category: 'Software',
      cost: 52.99,
      billingDate: '2025-09-22',
      status: 'active',
      logo: '🎨',
      description: 'Design software suite',
    },
    {
      id: 4,
      name: 'Microsoft 365',
      category: 'Software',
      cost: 6.99,
      billingDate: '2025-09-03',
      status: 'expiring',
      logo: '📄',
      description: 'Office productivity suite',
    },
    {
      id: 5,
      name: 'New York Times',
      category: 'News',
      cost: 4.25,
      billingDate: '2025-09-18',
      status: 'active',
      logo: '📰',
      description: 'Digital newspaper',
    },
    {
      id: 6,
      name: 'GitHub Pro',
      category: 'Software',
      cost: 4.0,
      billingDate: '2025-09-12',
      status: 'active',
      logo: '💻',
      description: 'Code repository hosting',
    },
  ];
}
