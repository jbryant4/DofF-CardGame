import {
  CardType,
  LessonType,
  PreReq,
  Question,
  Trait,
  Foundation
} from '~/models/Card';

type Card = {
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
  type: Omit<CardType, ''>;
  yearStart?: number;
  yearEnd?: number;
};

export default Card;
