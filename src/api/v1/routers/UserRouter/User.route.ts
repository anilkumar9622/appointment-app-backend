import express, { Request, Response } from "express";
import { AccessTokenService, ResponseHandler, validateDtoMiddleware } from "../../../../core/helper/validationMiddleware";
import { UsersListService } from "../../Controllers/UsersController/Users.controller";
import {  RequestHandler } from "../../../../core/helper/RequestHander";
import { DeleteUser, GetUsers, inputRole, IUser, UpdateUser } from "../../../../core/types/AuthService/AuthService";
import { JwtTokenTypes, UserRole } from "../../../../core/types/Constant/common";

const router = express.Router();


router.get('/list',  AccessTokenService.validateTokenMiddleware!(JwtTokenTypes.AUTH_TOKEN), async (req: Request, res: Response) => {
    try {
        const payload: IUser = RequestHandler.Custom.getUser(req);
        const input: inputRole = RequestHandler.Defaults.getQuery<inputRole>(req, inputRole);
         const { role } = input;
        const usersListService = new UsersListService();
        const data = await usersListService.getUsersList(payload, role);
        ResponseHandler.sendResponse(res, data);
    } catch (error) {
        ResponseHandler.sendErrorResponse(res, error);
    }
});


router.get('/userDetails/:userId', AccessTokenService.validateTokenMiddleware!(JwtTokenTypes.AUTH_TOKEN), async (req: Request, res: Response) => {
    try {
        const input: GetUsers = RequestHandler.Defaults.getParams<GetUsers>(req, GetUsers);
        const usersListService = new UsersListService();
        const data = await usersListService.getUserDetails(input);
        ResponseHandler.sendResponse(res, data);
    } catch (error) {
        ResponseHandler.sendErrorResponse(res, error);
    }
});

router.post('/update', validateDtoMiddleware(UpdateUser), AccessTokenService.validateTokenMiddleware!(JwtTokenTypes.AUTH_TOKEN), async (req: Request, res: Response) => {
    try {
        const input: UpdateUser = RequestHandler.Defaults.getBody<UpdateUser>(req, UpdateUser);
        const payload: IUser = RequestHandler.Custom.getUser(req);
        const brandService = new UsersListService();
        const data = await brandService.updateUser(payload, input);
        ResponseHandler.sendResponse(res, data);
    } catch (error) {
        ResponseHandler.sendErrorResponse(res, error);
    }
});


router.delete('/delete/:userId', validateDtoMiddleware(DeleteUser), AccessTokenService.validateTokenMiddleware!(JwtTokenTypes.AUTH_TOKEN, [UserRole.ADMIN]),  async (req: Request, res: Response) => {
    try {
        const input: DeleteUser = RequestHandler.Defaults.getParams<DeleteUser>(req, DeleteUser);
        // const payload: IUser = RequestHandler.Custom.getUser(req);
         const currentUser = RequestHandler.Custom.getUser(req);

      // Role check
      if (currentUser.role !== UserRole.ADMIN) {
        return res.status(403).json({ message: 'Only admin can delete users.' });
      }
        const sevice = new UsersListService();
        const data = await sevice.deleteUser(input);
        ResponseHandler.sendResponse(res, data);
    } catch (error) {
        ResponseHandler.sendErrorResponse(res, error);
    }
});






export { router as UserRoute };