import mongoose, { Schema, model, models, Document } from "mongoose";

interface ICounter extends Document {
  _id: string;
  seq: number;
}

const CounterSchema = new Schema<ICounter>({
  _id: { type: String, required: true },
  seq: { type: Number, default: 211549 }, // Start one less so first increment gives 211550
});

const Counter = models.Counter || model<ICounter>("Counter", CounterSchema);

export default Counter;
