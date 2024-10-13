import studentModel, { IStudent } from "../models/studentModel";
import classModel, { IClass } from "../models/classModel";
import { generateToken } from "../utils/auth";


export const createStudent = async (studentData: Partial<IStudent>): Promise<IStudent> => {    
        const student = new studentModel(
        studentData
  );
  const classToAdd = await classModel.find(name:studentData.className);
  
  
    return await student.save();
};
  
