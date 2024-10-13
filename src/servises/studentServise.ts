import studentModel, { IStudent } from "../models/studentModel";
import classModel, { IClass } from "../models/classModel";
import { generateToken } from "../utils/auth";


export const createStudent = async (studentData: Partial<IStudent>): Promise<IStudent> => {    
        const student = new studentModel({
        studentData,
        grades: [],
    
});
  //find the cllas to add the student
  const newClass = await classModel.findOneAndUpdate(
    { className: studentData.className },
    { $push: { students: student._id } },
    { new: true }
  );
  if (!newClass) {
    throw new Error("Class not found");
  }
  await newClass.save();

  
    return await student.save();
};
  
export const loginStudent = async (email:string , password:string): Promise<string> => {

    const user = await studentModel.findOne({email});
  
    // בדיקה אם המשתמש קיים והסיסמה נכונה
    if (!user || !(await user.comparePassword(password))) {
      // אם הפרטים לא תקינים, שליחת תגובת שגיאה
      throw new Error("Incorrect username or password");
         
    }
    await user.save();
    
    // יצירת טוקן עבור המשתמש
    const token = generateToken(user.id, user.role);
  
    // שליחת הטוקן בתגובה
     return token;
  }

  export const getAllStudents = async (): Promise<IStudent[]> => {

    const AllStudents = await studentModel.find().select(
       '-password'
      )
      .lean();
      
      return AllStudents;
};
