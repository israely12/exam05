import { Request, Response } from "express";
import teacherModel, { ITeacher } from "../models/teacherModel";
import { createTeacher ,loginTeacher} from "../servises/teacherService";
import { generateToken } from "../utils/auth";


export const register = async (req: Request, res: Response) => {
  if(!req.body){
    res.status(500).json({message: "user no provied!"});
    return;
  }
    const {username, email, password, className ,role} = req.body;
    try {
      console.log({className});
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
