import * as admin from 'firebase-admin';
import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export const FirebaseProvider: Provider = {
  provide: 'FIREBASE_ADMIN',
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId: configService.get<string>('FIREBASE_PROJECT_ID'),
          clientEmail: configService.get<string>('FIREBASE_CLIENT_EMAIL'),
          privateKey: configService
            .get<string>('FIREBASE_PRIVATE_KEY')
            ?.replace(/\\n/g, '\n'),
        }),
      });
    }

    return admin.firestore();
  },
};
