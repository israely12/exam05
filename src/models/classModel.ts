import mongoose, { Schema, Document, Types } from "mongoose";

export interface IClass {
    teacher: Types.ObjectId;
    students: Types.ObjectId[];
    createdAt: Date;
}

const ClassSchema = new Schema<IClass>({
    teacher: { type: Schema.Types.ObjectId, ref: "teachers", required: true },
    students: [{ type: Schema.Types.ObjectId, ref: "students" }],
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IClass>("classes", ClassSchema);
  