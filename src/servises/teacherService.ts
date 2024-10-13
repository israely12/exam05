import teacherModel, { ITeacher } from "../models/teacherModel";
import classModel, { IClass } from "../models/classModel";
import { generateToken } from "../utils/auth";


export const createTeacher = async (teacherData: Partial<ITeacher>): Promise<ITeacher> => {    
    console.log({teacherData});
        
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
    const token = generateToken(user.id);
  
    // שליחת הטוקן בתגובה
     return token;
  }
  