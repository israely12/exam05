import mongoose, { Schema, Document, Types } from "mongoose";

export interface IClass {
    className: string;
    teacher: Types.ObjectId;
    students: Types.ObjectId[];
    createdAt: Date;
}

const ClassSchema = new Schema<IClass>({
    className: { type: String, required: [true, "Class name is required"], minlength: [3, "Class name must be at least 3 characters long"], maxlength: [30, "Class name cannot exceed 30 characters"] },
    teacher: { type: Schema.Types.ObjectId, ref: "teachers", required: true },
    students: [{ type: Schema.Types.ObjectId, ref: "students" }],
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IClass>("classes", ClassSchema);
  