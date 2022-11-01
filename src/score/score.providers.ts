import { Connection } from 'mongoose';
import { ScoreSchema } from './score.schema';

export const scoreProviders = [
  {
    provide: 'SCORE_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Score', ScoreSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];