import { Request, Response } from "express";
import Student, { IStudent } from "../models/studentModel";
import { createStudent} from "../servises/studentServise";


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