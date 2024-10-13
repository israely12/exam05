import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

 export interface AuthRequest extends Request {
    user?: { userId: string; userRole: string };}

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    res.status(401).json({ message: "אין טוקן, הגישה נדחתה" });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      userId: string;
      userRole: string;
    };
    req.user = decoded;
    
    next();
  } catch (error) {
    res.status(401).json({ message: "הטוקן אינו תקף" });
  }
};


export const managerAuthMiddleware = (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    if (req.user?.userRole !== "teacher") {
      res.status(403).json({ message: "Access denied. teacher role required." });
    } else {
      next();
    }
  };
  