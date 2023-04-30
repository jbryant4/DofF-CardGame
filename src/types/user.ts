type User = {
  _id?: string;
  userName: string;
  password: string;
  email: string;
  cards: string[];
  decks: [string[] | null];
};

export default User;
