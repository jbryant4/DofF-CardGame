import bcrypt from 'bcrypt';
import mongoose, { Document, Model, ObjectId, Schema } from 'mongoose';

export interface UserDocument extends Document {
  userName: string;
  password: string;
  email: string;
  cards: string[];
  decks: string[];
}

export type UserModel = Model<UserDocument>;

const UserSchema = new Schema<UserDocument, UserModel>({
  _id: {
    type: Schema.Types.ObjectId,
    auto: true
  },
  userName: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  cards: [String],
  decks: [String]
});

// Hash and salt the user's password before storing it in the database
UserSchema.pre<UserDocument>('save', function (next) {
  const user = this;
  if (!user.isModified('password')) {
    return next();
  }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
  });
});

const User: UserModel =
  mongoose.models.User ||
  mongoose.model<UserDocument, UserModel>('User', UserSchema, 'users');

export default User;
