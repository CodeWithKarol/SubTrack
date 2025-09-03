import {
  computed,
  inject,
  Injectable,
  Injector,
  runInInjectionContext,
  signal,
} from '@angular/core';
import {
  collection,
  deleteDoc,
  doc,
  Firestore,
  getDocs,
  setDoc,
  updateDoc,
  query,
  where,
} from '@angular/fire/firestore';
import { Auth, signInWithEmailAndPassword, user } from '@angular/fire/auth';
import { Subscription, SubscriptionDto } from './subscription.model';

@Injectable({
  providedIn: 'root',
})
export class FirestoreApi {
  private injector = inject(Injector);
  private readonly firestore = inject(Firestore);
  private readonly auth = inject(Auth);

  // Get current user
  private user$ = user(this.auth);
  currentUserId = signal<string | null>(null);

  subscriptions = signal<Subscription[]>([]);
  totalCost = computed(() => this.subscriptions().reduce((acc, sub) => acc + sub.cost, 0));

  constructor() {
    // Listen to auth state changes
    this.user$.subscribe((user) => {
      this.currentUserId.set(user?.uid || null);
      if (user) {
        runInInjectionContext(this.injector, () => {
          this.getSubscriptions();
        });
      } else {
        this.subscriptions.set([]);
      }
    });
  }

  async getSubscriptions(): Promise<void> {
    const userId = this.currentUserId();

    if (!userId) return;

    const subscriptionsRef = collection(this.firestore, 'subscriptions');
    const q = query(subscriptionsRef, where('userId', '==', userId));

    const data = await getDocs(q);
    const subscriptions = data.docs.map((doc) => doc.data() as Subscription);
    this.subscriptions.set(subscriptions);
  }

  async addSubscription(subscription: SubscriptionDto): Promise<void> {
    const userId = this.currentUserId();

    if (!userId) throw new Error('User not authenticated');

    const subscriptionsCollection = collection(this.firestore, 'subscriptions');
    const docRef = doc(subscriptionsCollection);

    const newSubscription = {
      id: docRef.id,
      userId,
      ...subscription,
    };

    await setDoc(docRef, newSubscription);
    this.subscriptions.update((subs) => [...subs, newSubscription]);
  }

  async updateSubscription(subscription: Subscription): Promise<void> {
    const userId = this.currentUserId();

    if (!userId) throw new Error('User not authenticated');

    const docRef = doc(this.firestore, `subscriptions/${subscription.id}`);

    await updateDoc(docRef, {
      ...subscription,
      userId, // Ensure userId is maintained
    });

    this.subscriptions.update((subs) =>
      subs.map((sub) => (sub.id === subscription.id ? subscription : sub)),
    );
  }

  async removeSubscription(id: string): Promise<void> {
    const userId = this.currentUserId();

    if (!userId) throw new Error('User not authenticated');

    const docRef = doc(this.firestore, `subscriptions/${id}`);
    await deleteDoc(docRef);

    this.subscriptions.update((subs) => subs.filter((sub) => sub.id !== id));
  }

  async logout(): Promise<void> {
    await this.auth.signOut();
  }

  async login(): Promise<void> {
    runInInjectionContext(this.injector, async () => {
      await signInWithEmailAndPassword(this.auth, 'kmodelski93@gmail.com', 'test123');
    });
  }
}
