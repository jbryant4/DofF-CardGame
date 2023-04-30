import mongoose, { Document, Model, Schema } from 'mongoose';

export type Foundation = 'desert' | 'earth' | 'ocean';
export type PreReq = '1A' | '1C' | '2A' | '2C' | '3A' | '2F' | Foundation;
export type Trait =
  | 'divine'
  | 'explorer'
  | 'fighter'
  | 'nobility'
  | 'revolutionist'
  | 'scholar';

export type CardType = '' | 'resource' | 'foundation' | 'army' | 'champion';

export interface CardDocument extends Document {
  blankUrl?: string;
  cardUrl?: string;
  class?: Trait[];
  description?: string;
  effectText?: string;
  fileName: string;
  foundation?: Foundation[];
  preReqs?: PreReq[];
  hp?: number;
  atk?: number;
  def?: number;
  title: string;
  type: CardType;
}

const CardSchema = new mongoose.Schema({
  _id: {
    type: Schema.Types.ObjectId,
    auto: true
  },
  blankUrl: { type: String },
  cardUrl: { type: String },
  class: [{ type: String }],
  description: { type: String },
  effectText: { type: String },
  fileName: { type: String, required: true },
  foundation: [{ type: String, enum: ['desert', 'earth', 'ocean'] }],
  preReqs: [
    {
      type: String,
      enum: ['1A', '1C', '2A', '2C', '3A', '2F', 'desert', 'earth', 'ocean']
    }
  ],
  hp: { type: Number },
  atk: { type: Number },
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
