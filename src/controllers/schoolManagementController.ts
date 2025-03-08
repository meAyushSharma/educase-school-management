import { Request, Response, NextFunction } from "express"
import zod from "zod";
import { ExpressError } from "../utils/ExpressError";
import statusCodes from "../utils/statusCodes";
import { School } from "../models/schoolModel";
import getDistance from "../helper/getDistance";

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

type SchoolDistance = {
    school : {
        id: number,
        name: String,
        latitude: number,
        longitude: number,
        address: String,
    }
    dist : number;
}

const listSchools = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const {latitude, longitude} = req.body;
        const {success, data} = listSchoolBody.safeParse(req.body);
        if(!success) return next(new ExpressError("Incorrect input sent", statusCodes["Bad Request"], "Zod deemed invalid: /listSchool"));
        const schools = await School.findMany({});
        if(!schools) return next(new ExpressError("Error fetching school list from database", statusCodes["Server Error"], "Database error in fetching schools"));
        const schoolProximity : SchoolDistance[] = schools.map(school => {
            const dist = getDistance(latitude, longitude, school.latitude, school.longitude);
            console.log(`dist for ${school.id} is ${dist}`);
            return {
                school,
                dist,
            }
        });
        const sortedProximity = schoolProximity.sort((a,b) => a.dist - b.dist).map(sortedList => sortedList.school);
        console.log(`Sorted based on proximity of user: `, sortedProximity);
        return res.status(statusCodes.Ok).json({
            msg: "Fetched all the schools sorted according to proximity of each from user",
            schools: sortedProximity,
            success: false,
        })
    } catch (err) {
        console.error(`Error during listSchool is: `, err);
        next(err);
    }
}

const healthCheck = (req: Request, res: Response, next: NextFunction) : void => {
    try {
        res.status(statusCodes.Ok).json({
            msg: "Server is in healthy state",
            success: true,
        });
    } catch (err) {
        console.error("Error in health check route is: ", err);
        next(err);
    }
}

const handleInvalidRoutes = (req: Request, res: Response, next: NextFunction) : void => {
    next(new ExpressError("Route not exist", statusCodes["Bad Request"], "invalid route"));
}


const crashTest = (req: Request, res: Response, next: NextFunction) : void => {
    console.log("Crashing the application...");
    process.exit(1);
}

export {
    addSchool, listSchools, healthCheck, handleInvalidRoutes, crashTest
}