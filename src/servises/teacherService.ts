import teacherModel, { ITeacher } from "../models/teacherModel";
import studentModel, { IStudent, IGrade } from "../models/studentModel";
import classModel, { IClass } from "../models/classModel";
import { generateToken } from "../utils/auth";


export const createTeacher = async (teacherData: Partial<ITeacher>): Promise<ITeacher> => {    
        
    const teacher = new teacherModel(
        teacherData
  );
  const newClass = new classModel({
    className: teacher.className,
    teacher: teacher.id,
    students: [],
    createdAt: new Date(),
  })
    await newClass.save();
     await teacher.save();
     return newClass.id;
};
  

export const loginTeacher = async (email:string , password:string): Promise<string> => {

    const user = await teacherModel.findOne({email});
  
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
  
  export const addGradeToStudent = async (studentId: string, subject: string): Promise<IStudent | null> => {    
    const grade: IGrade = {
      subject: subject,
      grade: 0,
    };
    
    const updatedGrades = await studentModel.findByIdAndUpdate(
      studentId,
      { $push: { grades: grade } }, 
      { new: true } 
    )

     await updatedGrades?.save();
    return updatedGrades;
  };
  