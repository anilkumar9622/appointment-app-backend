// 📁 routes/availability.route.ts
import express, { Request, Response } from "express";
import { AccessTokenService, ResponseHandler, validateDtoMiddleware } from "../../../../core/helper/validationMiddleware";
import { RequestHandler } from "../../../../core/helper/RequestHander";
import { JwtTokenTypes } from "../../../../core/types/Constant/common";
import { IUser } from "../../../../core/types/AuthService/AuthService";
import { CreateAvailabilityDTO, UpdateAvailabilityDTO, GetAvailabilityDTO, DeleteAvailabilityDTO } from "../../../../core/types/availableService";
import { AvailabilityService } from "../../Controllers/AvailablityController/Availablity.controller";

const router = express.Router();

router.post('/add', validateDtoMiddleware(CreateAvailabilityDTO), AccessTokenService.validateTokenMiddleware!(JwtTokenTypes.AUTH_TOKEN), async (req: Request, res: Response) => {
    try {
        const input = RequestHandler.Defaults.getBody<CreateAvailabilityDTO>(req, CreateAvailabilityDTO);
        const payload: IUser = RequestHandler.Custom.getUser(req);
        const service = new AvailabilityService();
        const data = await service.add(input, payload);
        ResponseHandler.sendResponse(res, data);
    } catch (error) {
        ResponseHandler.sendErrorResponse(res, error);
    }
});

router.get('/list', AccessTokenService.validateTokenMiddleware!(JwtTokenTypes.AUTH_TOKEN), async (req: Request, res: Response) => {
    try {
        const payload: IUser = RequestHandler.Custom.getUser(req);
        const service = new AvailabilityService();
        const data = await service.list(payload);
        ResponseHandler.sendResponse(res, data);
    } catch (error) {
        ResponseHandler.sendErrorResponse(res, error);
    }
});

router.post('/update', validateDtoMiddleware(UpdateAvailabilityDTO), AccessTokenService.validateTokenMiddleware!(JwtTokenTypes.AUTH_TOKEN), async (req: Request, res: Response) => {
    try {
        const input = RequestHandler.Defaults.getBody<UpdateAvailabilityDTO>(req, UpdateAvailabilityDTO);
        const payload: IUser = RequestHandler.Custom.getUser(req);
        const service = new AvailabilityService();
        const data = await service.update(payload, input);
        ResponseHandler.sendResponse(res, data);
    } catch (error) {
        ResponseHandler.sendErrorResponse(res, error);
    }
});

router.get('/getById/:availabilityId', validateDtoMiddleware(GetAvailabilityDTO), AccessTokenService.validateTokenMiddleware!(JwtTokenTypes.AUTH_TOKEN), async (req: Request, res: Response) => {
    try {
        const input = RequestHandler.Defaults.getParams<GetAvailabilityDTO>(req, GetAvailabilityDTO);
        const payload: IUser = RequestHandler.Custom.getUser(req);
        const service = new AvailabilityService();
        const data = await service.getById(payload, input);
        ResponseHandler.sendResponse(res, data);
    } catch (error) {
        ResponseHandler.sendErrorResponse(res, error);
    }
});

router.delete('/delete/:availabilityId', validateDtoMiddleware(DeleteAvailabilityDTO), AccessTokenService.validateTokenMiddleware!(JwtTokenTypes.AUTH_TOKEN), async (req: Request, res: Response) => {
    try {
        const input = RequestHandler.Defaults.getParams<DeleteAvailabilityDTO>(req, DeleteAvailabilityDTO);
        const payload: IUser = RequestHandler.Custom.getUser(req);
        const service = new AvailabilityService();
        const data = await service.delete(payload, input);
        ResponseHandler.sendResponse(res, data);
    } catch (error) {
        ResponseHandler.sendErrorResponse(res, error);
    }
});

export { router as AvailabilityRouter };
