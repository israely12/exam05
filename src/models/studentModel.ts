import mongoose, { Schema, Document, Types } from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

export interface IGrade {
    
    subject: string;
    grade: number;  
}

const GradeSchema = new Schema<IGrade>({
    subject: { type: String, required: [true, "Subject is required"], minlength: [3, "Subject must be at least 3 characters long"], maxlength: [30, "Subject cannot exceed 30 characters"] },
    grade: { type: Number, required: [true, "Grade is required"], min: [0, "Grade must be at least 0"], max: [100, "Grade cannot exceed 100"] },
})
export interface IStudent extends Document {
  username: string;
  email: string;
  password: string;
  className: string;
  role: string;
  grades: IGrade[];
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const StudentSchema = new Schema<IStudent>({
  username: {
    type: String,
    required: [true, "Teachername is required"],
    unique: true,
    minlength: [3, "Teachername must be at least 3 characters long"],
    maxlength: [30, "Teacername cannot exceed 30 characters"],
    match: [/^[a-zA-Z0-9_]+$/, "Teachername can only contain letters, numbers, and underscores"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    validate: {
      validator: function (value: string) {
        return validator.isEmail(value);
      },
      message: "Please provide a valid email address",
    },
  },
  password: { type: String, required: [true, "Password is Required!"] },
  className: { type: String, required: [true, "Class is Required!"] },
  role: { type: String, required: [true, "Role is Required!"] },
  grades: [GradeSchema]
});
  
StudentSchema.pre<IStudent>("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

StudentSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

StudentSchema.index({ username: 1 });
StudentSchema.index({ email: 1 });


export default mongoose.model<IStudent>("students", StudentSchema);
