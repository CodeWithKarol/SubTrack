import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'subtrack-ecffe',
        appId: '1:312125759209:web:a9379e52b3d229ab739a78',
        storageBucket: 'subtrack-ecffe.firebasestorage.app',
        apiKey: 'AIzaSyBG5ts-f9MvJynAgM2I2S7HArcy-whDAzg',
        authDomain: 'subtrack-ecffe.firebaseapp.com',
        messagingSenderId: '312125759209',
        measurementId: 'G-R2YVF4R3M2',
      }),
    ),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ],
};
