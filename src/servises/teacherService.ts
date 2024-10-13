import teacherModel, { ITeacher } from "../models/teacherModel";
import classModel, { IClass } from "../models/classModel";
import { generateToken } from "../utils/auth";


export const createTeacher = async (teacherData: Partial<ITeacher>): Promise<ITeacher> => {    
        const teacher = new teacherModel(
        teacherData
  );
  const newClass = new classModel({
    teacher: teacher.id,
    students: [],
    createdAt: new Date(),
  })
    await newClass.save();
    return await teacher.save();
};
  