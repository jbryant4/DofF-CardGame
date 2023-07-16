import Card from '~/constants/CardType';

const defaultCard: Card = {
  blankUrl: '',
  cardUrl: '',
  class: [],
  description: '',
  effectText: '',
  fileName: '',
  foundation: [],
  lesson: {
    mediaLinks: [],
    quickNotes: []
  },
  location: '',
  primaryClass: undefined,
  secondaryClass: undefined,
  preReqs: [],
  quiz: [],
  hp: 0,
  atk: 0,
  def: 0,
  title: '',
  type: '',
  yearStart: 0,
  yearEnd: 0
};

export default defaultCard;
