import express, { Request, Response } from "express";
import catchAsync from '../../../../../core/utils/catch-async';
import { AccessTokenService, ResponseHandler, validateDtoMiddleware } from "../../../../../core/helper/validationMiddleware";
import { DashboardFilter, DeleteUserProfile, IUser,  UpdateUserProfile } from "../../../../../core/types/AuthService/AuthService";
import { RequestHandler } from "../../../../../core/helper/RequestHander";
import { JwtTokenTypes } from "../../../../../core/types/Constant/common";
import { profileService } from "../../../Controllers/AuthController/ProfileController/Profile.Controller";

const router = express.Router();

router.get('/get', AccessTokenService.validateTokenMiddleware!(JwtTokenTypes.AUTH_TOKEN), catchAsync(async (req: Request, res: Response) => {
    try {
        const payload: IUser = RequestHandler.Custom.getUser(req);
        const profileController = new profileService();
        const data = await profileController.getProfile(payload);
        ResponseHandler.sendResponse(res, data);
    } catch (error) {
        ResponseHandler.sendErrorResponse(res, error);
    }
}));

router.put('/updateProfileImg', validateDtoMiddleware(UpdateUserProfile), AccessTokenService.validateTokenMiddleware!(JwtTokenTypes.AUTH_TOKEN), catchAsync(async (req: Request, res: Response) => {
    try {
        const input: UpdateUserProfile = RequestHandler.Defaults.getBody<UpdateUserProfile>(req, UpdateUserProfile);
        const payload: IUser = RequestHandler.Custom.getUser(req);
        const profileController = new profileService();
        const data = await profileController.updateImage(payload, input);
        ResponseHandler.sendResponse(res, data);
    } catch (error) {
        ResponseHandler.sendErrorResponse(res, error);
    }
}));



router.put('/deleteProfilePic/:userId', validateDtoMiddleware(DeleteUserProfile), AccessTokenService.validateTokenMiddleware!(JwtTokenTypes.AUTH_TOKEN), catchAsync(async (req: Request, res: Response) => {
    try {
        const input: DeleteUserProfile = RequestHandler.Defaults.getParams<DeleteUserProfile>(req, DeleteUserProfile);
        const payload: IUser = RequestHandler.Custom.getUser(req);
        const profileController = new profileService();
        const data = await profileController.deleteProfile(payload, input);
        ResponseHandler.sendResponse(res, data);
    } catch (error) {
        ResponseHandler.sendErrorResponse(res, error);
    }
}));



export { router as ProfileRoute };