import mongoose, { Schema, Types, Document } from 'mongoose';

export interface ITree extends Document {
  name: string;
  fruit: string;
  location: { latitude: number; longitude: number };
  /** Can be populated ObjectId OR just the string value */
  createdBy: Types.ObjectId | string;
}

const treeSchema = new Schema<ITree>({
  name: { type: String, required: true },
  fruit: { type: String, required: true },
  location: {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

export const Tree = mongoose.model<ITree>('Tree', treeSchema);
