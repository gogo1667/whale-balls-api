import { Inject, Injectable } from '@nestjs/common';
import { Firestore } from 'firebase-admin/firestore';
import * as admin from 'firebase-admin';

@Injectable()
export class ScoresService {
    constructor(
        @Inject('FIREBASE_ADMIN')
        private readonly firestore: Firestore,
    ) { }

    async getAllScores() {
        const snapshot = await this.firestore
            .collection('scores')
            .orderBy('score', 'desc')
            .get();

        return snapshot.docs.map(doc => {
            const data = doc.data();

            return {
                id: doc.id,
                name: data.name,
                score: data.score,
                date: data.date?.toDate?.() ?? null,
            };
        });
    }

    async createScore(body: { name: string; score: number }) {
        const { name, score } = body;

        const newScore = {
            name: name || 'Anonymous',
            score: score ?? 0,
            date: admin.firestore.FieldValue.serverTimestamp(),
        };

        const docRef = await this.firestore.collection('scores').add(newScore);

        return {
            id: docRef.id,
            ...newScore,
        };
    }
}
