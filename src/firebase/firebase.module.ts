import { Module } from '@nestjs/common';
import { FirebaseProvider } from './firebase.providers';

@Module({
  providers: [FirebaseProvider],
  exports: [FirebaseProvider],
})
export class FirebaseModule {}
