import { computed, inject, Injectable, signal } from '@angular/core';
import {
  collection,
  deleteDoc,
  doc,
  Firestore,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where
} from '@angular/fire/firestore';
import { Subscription, SubscriptionDto } from './subscription.model';
import { AuthApi } from './auth-api';

@Injectable({
  providedIn: 'root',
})
export class FirestoreApi {
  private readonly firestore = inject(Firestore);
  private readonly userId = inject(AuthApi).currentUserId() ?? '';
  subscriptions = signal<Subscription[]>([]);
  totalCost = computed(() => this.subscriptions().reduce((acc, sub) => acc + sub.cost, 0));

  async getSubscriptions(): Promise<void> {
    const subscriptionsRef = collection(this.firestore, 'subscriptions');
    const q = query(subscriptionsRef, where('userId', '==', this.userId));

    const data = await getDocs(q);
    const subscriptions = data.docs.map((doc) => doc.data() as Subscription);
    this.subscriptions.set(subscriptions);
  }

  async addSubscription(subscription: SubscriptionDto): Promise<void> {
    const subscriptionsCollection = collection(this.firestore, 'subscriptions');
    const docRef = doc(subscriptionsCollection);

    const newSubscription = {
      id: docRef.id,
      userId: '',
      ...subscription,
    };

    await setDoc(docRef, newSubscription);
    this.subscriptions.update((subs) => [...subs, newSubscription]);
  }

  async updateSubscription(subscription: Subscription): Promise<void> {
    const docRef = doc(this.firestore, `subscriptions/${subscription.id}`);

    await updateDoc(docRef, {
      ...subscription,
    });

    this.subscriptions.update((subs) =>
      subs.map((sub) => (sub.id === subscription.id ? subscription : sub)),
    );
  }

  async removeSubscription(id: string): Promise<void> {
    const docRef = doc(this.firestore, `subscriptions/${id}`);
    await deleteDoc(docRef);

    this.subscriptions.update((subs) => subs.filter((sub) => sub.id !== id));
  }
}
