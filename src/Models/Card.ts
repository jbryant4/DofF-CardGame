import mongoose, { Document, Model, Schema } from 'mongoose';

type Foundation = 'desert' | 'earth' | 'ocean';
type Trait =
  | 'divine'
  | 'explorer'
  | 'fighter'
  | 'nobility'
  | 'revolutionist'
  | 'scholar';

type CardType = 'resource' | 'foundation' | 'army' | 'champion';

export interface CardDocument extends Document {
  class?: [Trait];
  foundation?: Foundation;
  preReqs?: string[];
  hp?: number;
  att?: number;
  def?: number;
  title: string;
  type: CardType;
}

const CardSchema = new mongoose.Schema({
  _id: {
    type: Schema.Types.ObjectId,
    auto: true
  },
  class: [{ type: String }],
  foundation: { type: String, enum: ['desert', 'earth', 'ocean'] },
  preReqs: [{ type: String }],
  hp: { type: Number },
  att: { type: Number },
  def: { type: Number },
  title: { type: String, required: true },
  type: {
    type: String,
    enum: ['resource', 'foundation', 'army', 'champion'],
    required: true
  }
});

const Card: Model<CardDocument> =
  mongoose.models.Card ||
  mongoose.model<CardDocument>('Card', CardSchema, 'cards');

export default Card;
