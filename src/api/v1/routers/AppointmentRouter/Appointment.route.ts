// 📁 routes/appointment.route.ts
import express, { Request, Response } from "express";
import { AccessTokenService, ResponseHandler, validateDtoMiddleware } from "../../../../core/helper/validationMiddleware";
import { RequestHandler } from "../../../../core/helper/RequestHander";
import { JwtTokenTypes } from "../../../../core/types/Constant/common";
import { IUser } from "../../../../core/types/AuthService/AuthService";
import {
    CreateAppointmentDTO,
    UpdateAppointmentDTO,
    GetAppointmentDTO,
    DeleteAppointmentDTO
} from "../../../../core/types/appointmentService";
import { AppointmentService } from "../../Controllers/AppointmentController/appointment.controller";

const router = express.Router();

// POST /appointment/add
router.post('/add', validateDtoMiddleware(CreateAppointmentDTO), AccessTokenService.validateTokenMiddleware!(JwtTokenTypes.AUTH_TOKEN), async (req: Request, res: Response) => {
    try {
        const input = RequestHandler.Defaults.getBody<CreateAppointmentDTO>(req, CreateAppointmentDTO);
        const payload: IUser = RequestHandler.Custom.getUser(req);
        const service = new AppointmentService();
        const data = await service.add(input, payload);
        ResponseHandler.sendResponse(res, data);
    } catch (error) {
        ResponseHandler.sendErrorResponse(res, error);
    }
});

// GET /appointment/list
router.get('/list', AccessTokenService.validateTokenMiddleware!(JwtTokenTypes.AUTH_TOKEN), async (req: Request, res: Response) => {
    try {
        const payload: IUser = RequestHandler.Custom.getUser(req);
        const service = new AppointmentService();
        const data = await service.list(payload);
        ResponseHandler.sendResponse(res, data);
    } catch (error) {
        ResponseHandler.sendErrorResponse(res, error);
    }
});

// POST /appointment/update
router.post('/update', validateDtoMiddleware(UpdateAppointmentDTO), AccessTokenService.validateTokenMiddleware!(JwtTokenTypes.AUTH_TOKEN), async (req: Request, res: Response) => {
    try {
        const input = RequestHandler.Defaults.getBody<UpdateAppointmentDTO>(req, UpdateAppointmentDTO);
        const payload: IUser = RequestHandler.Custom.getUser(req);
        const service = new AppointmentService();
        const data = await service.update(payload, input);
        ResponseHandler.sendResponse(res, data);
    } catch (error) {
        ResponseHandler.sendErrorResponse(res, error);
    }
});

// GET /appointment/getById/:appointmentId
router.get('/getById/:appointmentId', validateDtoMiddleware(GetAppointmentDTO), AccessTokenService.validateTokenMiddleware!(JwtTokenTypes.AUTH_TOKEN), async (req: Request, res: Response) => {
    try {
        const input = RequestHandler.Defaults.getParams<GetAppointmentDTO>(req, GetAppointmentDTO);
        const payload: IUser = RequestHandler.Custom.getUser(req);
        const service = new AppointmentService();
        const data = await service.getById(payload, input);
        ResponseHandler.sendResponse(res, data);
    } catch (error) {
        ResponseHandler.sendErrorResponse(res, error);
    }
});

// DELETE /appointment/delete/:appointmentId
router.delete('/delete/:appointmentId', validateDtoMiddleware(DeleteAppointmentDTO), AccessTokenService.validateTokenMiddleware!(JwtTokenTypes.AUTH_TOKEN), async (req: Request, res: Response) => {
    try {
        const input = RequestHandler.Defaults.getParams<DeleteAppointmentDTO>(req, DeleteAppointmentDTO);
        const payload: IUser = RequestHandler.Custom.getUser(req);
        const service = new AppointmentService();
        const data = await service.delete(payload, input);
        ResponseHandler.sendResponse(res, data);
    } catch (error) {
        ResponseHandler.sendErrorResponse(res, error);
    }
});

export { router as AppointmentRouter };