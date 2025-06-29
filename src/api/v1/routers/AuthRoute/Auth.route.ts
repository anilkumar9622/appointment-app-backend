import express, { Request, Response } from "express";
import * as response from '../../../../core/utils/response';
import { userController } from '../../Controllers/AuthController/auth.controller';
import catchAsync from '../../../../core/utils/catch-async';
import { authentication, verifyRefreshToken, verifyEmailToken } from '../../../../core/helper/verifyToken';
import { ResponseHandler, validateDtoMiddleware } from "../../../../core/helper/validationMiddleware";
import { Login, SignUp } from "../../../../core/types/AuthService/AuthService";
import { RequestHandler } from "../../../../core/helper/RequestHander";
import { UserRepository } from "../../../../core/DB/Entities/User.entity";

const router = express.Router();

// Register new user (verification email sent)
router.post('/signup', validateDtoMiddleware(SignUp), async (req: Request, res: Response) => {
    try {
        const data = await userController.createUser(req.body);
        res.status(data.status).json(data);
    } catch (error) {
        res.status(500).json({ status: 500, message: 'Internal Server Error', error });
    }
});

// Login
router.post('/login', validateDtoMiddleware(Login), async (req: Request, res: Response) => {
    try {
        const data = await userController.login(req.body);
        res.status(data.status).json(data);
    } catch (error) {
        res.status(500).json({ status: 500, message: 'Internal Server Error', error });
    }
});

// Email Verification
router.get('/verify-email/:token', async (req: Request, res: Response) => {
    try {
        const { token } = req.params;
        const user = await UserRepository().findOne({ where: { verifyToken: token } });
        if (!user) {
            return res.status(404).json({ status: 404, message: 'Invalid verification token' });
        }

        const result = await userController.verifyEmail(user.userId);
        res.status(result.status).json(result);
    } catch (error) {
        res.status(500).json({ status: 500, message: 'Verification failed', error });
    }
});

// Forgot Password
router.post('/forgot-password', async (req: Request, res: Response) => {
    try {
        const data = await userController.forgotPassword(req.body);
        res.status(data.status).json(data);
    } catch (error) {
        res.status(500).json({ status: 500, message: 'Forgot password failed', error });
    }
});

// Reset Password
router.post('/reset-password', async (req: Request, res: Response) => {
    try {
        const data = await userController.resetPasswordConfirm(req.body);
        res.status(data.status).json(data);
    } catch (error) {
        res.status(500).json({ status: 500, message: 'Reset password failed', error });
    }
});

export { router as AuthRoutes };
