import { Request, Response, NextFunction } from "express"
import zod from "zod";
import { ExpressError } from "../utils/ExpressError";
import statusCodes from "../utils/statusCodes";
import { School } from "../models/schoolModel";

const addSchoolBody = zod.object({
    name : zod.string().nonempty(),
    address : zod.string().nonempty(),
    latitude : zod.number().refine(n => n % 1 !== 0, {
        message: "Must be a floating-point number",
    }),
    longitude : zod.number().refine(n => n % 1 !== 0, {
        message: "Must be a floating-point number",
    })
});

const addSchool = async (req: Request, res : Response, next: NextFunction) => {
    try {
        const {name, address, latitude, longitude} = req.body;
        const {success, data} = addSchoolBody.safeParse(req.body);
        if(!success) return next(new ExpressError("Incorrect input sent", statusCodes["Bad Request"], "Zod deemed invalid: /addSchool"));
        const school = await School.create({
            data : {
                name: name.trim(),
                address: address.trim(),
                longitude,
                latitude,
            },
            select : {
                id: true,
                name: true,
            }
        });
        if(!school) return next(new ExpressError("Error during school creation from database", statusCodes["Server Error"], "Database error in school creation"));
        console.log(`School ${school.name} with id ${school.id} created successfully`);
        return res.status(statusCodes.Ok).json({
            msg :`School ${school.name} created successfully`,
            success: true,
        });
    } catch (err) {
        console.error(`Error during addSchool is: `, err);
        next(err);
    }
    
}

const listSchoolBody = zod.object({
    latitude : zod.number().refine(n => n % 1 !== 0, {
        message: "Must be a floating-point number",
    }),
    longitude : zod.number().refine(n => n % 1 !== 0, {
        message: "Must be a floating-point number",
    })
})

const listSchools = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const {latitude, longitude} = req.body;
        const {success, data} = listSchoolBody.safeParse(req.body);
        if(!success) return next(new ExpressError("Incorrect input sent", statusCodes["Bad Request"], "Zod deemed invalid: /listSchool"));
        const schools = await School.findMany({});
        if(!schools) return next(new ExpressError("Error fetching school list from database", statusCodes["Server Error"], "Database error in fetching schools"));
        
    } catch (err) {
        console.error(`Error during listSchool is: `, err);
        next(err);
    }
}

export {
    addSchool, listSchools
}