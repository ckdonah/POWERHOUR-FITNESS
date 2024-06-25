import  {Schema, model } from "mongoose";

const courseSchema = new Schema({
  name: { type: String, required: true },
  picture: { type: String },
  description: { type: String, required: true },
  trainerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  capacity: { type: Number, required: true },
  date: { type: String, required: true },
  duration: { type: String, required: true } 
}, { timestamps: true });

const Course = model('Course', courseSchema);

export default Course;
