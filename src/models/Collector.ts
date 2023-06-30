// eslint-disable-next-line @typescript-eslint/no-redeclare
import mongoose, { Document, Model, Schema } from 'mongoose';

export interface Deck {
  title: string;
  cards: string[];
}
export interface CollectorDocument extends Document {
  userName: string;
  email: string;
  cards: string[];
  decks: Deck[];
}

const DeckSchema = new Schema<Deck>({
  title: {
    type: String,
    required: true
  },
  cards: {
    type: [String],
    default: []
  }
});

const CollectorSchema = new Schema<CollectorDocument>({
  _id: {
    type: Schema.Types.ObjectId,
    auto: true
  },
  userName: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  cards: {
    type: [String],
    default: []
  },
  decks: {
    type: [DeckSchema],
    default: []
  }
});

const Collector: Model<CollectorDocument> =
  mongoose.models.Collector ||
  mongoose.model<CollectorDocument>('Collector', CollectorSchema, 'collectors');

export default Collector;
