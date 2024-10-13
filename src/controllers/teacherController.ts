import { Request, Response } from "express";
import Teacher, { ITeacher } from "../models/teacherModel";
import { createTeacher } from "../servises/teacherService";


export const register = async (req: Request, res: Response) => {
    const {username, email, password, className, role} = req.body;
    try {
        const newTeacher = await createTeacher({
          username, email, password, className,role});
        if(newTeacher){
            res.status(201).json({message: `${newTeacher.username} You have successfully registered`});
        }
        res.status(500).json({message: "user no provied!"});
        return;
        
      } catch (error) {
        console.log(error);     
        res.status(400).json({message:"server error"});
        return;
        
      }  
}