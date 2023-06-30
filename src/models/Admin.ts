// eslint-disable-next-line @typescript-eslint/no-redeclare
import mongoose, { Document, Model, Schema } from 'mongoose';

export type AdminDocument = Document & {
  title: string;
  codePhrase: string;
};

const AdminSchema = new Schema<AdminDocument>({
  title: { type: String, required: true },
  codePhrase: { type: String, required: true }
});

const Admin: Model<AdminDocument> =
  mongoose.models.Admin ||
  mongoose.model<AdminDocument>('Admin', AdminSchema, 'admin');

export default Admin;
