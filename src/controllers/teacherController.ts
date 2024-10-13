import { Request, Response } from "express";
import teacherModel, { ITeacher } from "../models/teacherModel";
import { createTeacher ,loginTeacher,addGradeToStudent} from "../servises/teacherService";
import { AuthRequest } from "../middleware/authMiddleware";
import { generateToken } from "../utils/auth";
import { log } from "console";


export const register = async (req: Request, res: Response) => {
  if(!req.body){
    res.status(500).json({message: "user no provied!"});
    return;
  }
    const {username, email, password, className ,role} = req.body;
    try {

        const newTeacher = await createTeacher({
          username, email, password, className,role});
        if(newTeacher){
            res.status(201).json({message: `the ID of the new class is: ${newTeacher}, and You have successfully registered`});
        }
        res.status(500).json({message: "user no provied!"});
        return;
        
      } catch (error) {
        console.log(error);     
        res.status(400).json({message:"server error"});
        return;
        
      }  
}

export const login = async (req: Request, res: Response) => {
  // חילוץ שם משתמש וסיסמה מגוף הבקשה
  const { email, password } = req.body;

  try {
    const token = await loginTeacher(email, password);
    
    if (token) {
      // אם ההתחברות הצליחה והמשתמש קיבל טוקן
      res.cookie('authToken', token, {
        httpOnly: true,  
        secure: true,    
        maxAge: 4 * 60 * 60 * 1000,
        sameSite: 'strict'
      });
      
      // שליחת תגובה עם סטטוס 201 וטוקן
      res.status(201).json({ token });
    } else {
      // אם ההתחברות לא הצליחה ואין טוקן
      res.status(400).json({ message: "Login failed. Invalid username or password." });
    }
  } catch (error) {
    // טיפול בשגיאה אם משהו השתבש בשרת
    console.error("Login error:", error);
    res.status(500).json({ message: "An error occurred during login." });
  }
};

export const addGrade = async (req: AuthRequest, res: Response):Promise <void> => {
  const studentId = req.params.id;  
  const { subject, note , grade }   = req.body; 
  console.log(req.body);
  
  const teacherId = req.user?.userId; 

  if (!teacherId) {
      res.status(401).json({ message: 'User not authenticated' });
      return;
  }

  try {
    const updatestudentGreades = await addGradeToStudent(studentId, req.body, teacherId);    

    if (!updatestudentGreades) {
       res.status(404).json({ message: 'student not found' });
       return;
    }

      res.status(200).json(updatestudentGreades);

  } catch (error) {    
    console.log(error);
    
    // טיפול בשגיאות כלליות אחרות
      res.status(500).json({ message: 'Error adding grades', error });
  }
};

