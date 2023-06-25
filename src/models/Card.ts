import mongoose, { Document, Model, Schema } from 'mongoose';

export type Foundation = 'desert' | 'earth' | 'ocean';
export type PreReq = '1a' | '1c' | '2a' | '2c' | '3a' | '2f' | Foundation;
export type Trait =
  | 'divine'
  | 'explorer'
  | 'fighter'
  | 'nobility'
  | 'revolutionist'
  | 'scholar';

export type CardType = '' | 'resource' | 'foundation' | 'army' | 'champion';

export type LessonType = {
  mediaLinks: string[];
  quickNotes: string[];
};

export type Question = {
  prompt: string;
  options: string[];
  answer: string;
};
export interface CardDocument extends Document {
  blankUrl?: string;
  cardUrl?: string;
  class?: Trait[];
  description?: string;
  effectText?: string;
  fileName: string;
  foundation?: Foundation[];
  lesson?: LessonType;
  location?: string;
  primaryClass?: Trait;
  secondaryClass?: Trait;
  preReqs?: PreReq[];
  quiz?: Question[];
  hp?: number;
  atk?: number;
  def?: number;
  title: string;
  type: CardType;
  yearStart: number;
  yearEnd: number;
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
  lesson: {
    mediaLinks: [{ type: String }],
    quickNotes: [{ type: String }]
  },
  location: { type: String },
  quiz: [
    {
      prompt: { type: String },
      options: [{ type: String }],
      answer: { type: String }
    }
  ],
  primaryClass: {
    type: String,
    enum: [
      'divine',
      'explorer',
      'fighter',
      'nobility',
      'revolutionist',
      'scholar'
    ]
  },
  secondaryClass: {
    type: String,
    enum: [
      'divine',
      'explorer',
      'fighter',
      'nobility',
      'revolutionist',
      'scholar'
    ]
  },
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
  },
  yearStart: { type: Number },
  yearEnd: { type: Number }
});

const Card: Model<CardDocument> =
  mongoose.models.Card ||
  mongoose.model<CardDocument>('Card', CardSchema, 'cards');

export default Card;
