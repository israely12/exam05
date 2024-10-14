import teacherModel, { ITeacher } from "../models/teacherModel";
import studentModel, { IStudent, IGrade } from "../models/studentModel";
import classModel, { IClass } from "../models/classModel";
import { generateToken } from "../utils/auth";

//פונקצייה להרשמת מורה
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

//פןנקצייה להתחברות מורה
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
  
  //פונקצייה להוספת ציונים לסטודנט
  export const addGradeToStudent = async (studentId: string, gradeObj :IGrade, teacherId: string): Promise<IStudent | null> => {    

    //למצוא את המורה והתלמיד כדי לדעת שהם באותה כיתה
    const teacher = await teacherModel.findById(teacherId);
    const student = await studentModel.findById(studentId);
    if (teacher?.className !== student?.className) {
        throw new Error("Student and teacher are not in the same class");
    }
    const updatedGrades = await studentModel.findByIdAndUpdate(
      studentId,
      { $push: { grades: gradeObj } }, 
      { new: true } 
    );
     await updatedGrades?.save();
    return updatedGrades;
  };
  