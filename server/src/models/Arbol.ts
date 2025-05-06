import { Schema, model } from 'mongoose';

interface ITree {
  name: string;
  fruit: string;
  location: {
    latitude: number;
    longitude: number;
  };
  createdBy: Schema.Types.ObjectId; // User ID
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

export const Tree = model<ITree>('Tree', treeSchema);
