import { Request, Response } from "express";
import Student, { IStudent } from "../models/studentModel";
import { createStudent,loginStudent,getAllStudents} from "../servises/studentServise";
import { AuthRequest } from "../middleware/authMiddleware";


export const register = async (req: Request, res: Response) => {
    const {username, email, password, className, role} = req.body;
    try {
        const newStudent = await createStudent({
          username, email, password, className,role});
        if(newStudent){
            res.status(201).json({message: `${newStudent.username} You have successfully registered`});
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
      const token = await loginStudent(email, password);
      
      if (token) {
        // אם ההתחברות הצליחה והמשתמש קיבל טוקן
        res.cookie('authToken', token, {
          httpOnly: true,  // רק השרת יכול לגשת לקוקי (לא JS בצד לקוח)
          secure: true,    // רק חיבורי HTTPS (בפיתוח אפשר להוריד את זה)
          maxAge: 4 * 60 * 60 * 1000, // תוקף של 4 שעות (במילישניות)
          sameSite: 'strict' // למניעת CSRF (Cross-Site Request Forgery)
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
  
  export const getStudents = async (req: AuthRequest,res: Response) => {
    const teacherId = req.user?.userId; 
    if (!teacherId) {
        res.status(401).json({ message: 'User not authenticated' });
        return;
    }
    try {
  
      const students = await getAllStudents();
      console.log(students);
      
      if (!students) {
        res.status(404).json({ messege: "students not found" });
      }
      res.status(201).json(students);
  
      
    } catch (error) {
        console.log(error);
        
      res.status(500).json({ messege: "server error" });
      
    }
   
  };
  