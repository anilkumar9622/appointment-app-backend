// 📁 Controllers/UserController/user.controller.ts
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import { generateToken, generateVerifyEmailToken } from '../../../../core/helper/verifyToken';
import { emailGenerator } from '../../../../core/helper/sendEmail';
import { UserRepository, User } from '../../../../core/DB/Entities/User.entity';
import { IUser, Login, SignUp } from '../../../../core/types/AuthService/AuthService';
import { IApiResponse } from '../../../../core/types/Constant/commonService';
import { STATUSCODES } from '../../../../core/types/Constant/common';
import { resetPassword } from '../../../../core/emailTemplate/template';

const salt = bcrypt.genSaltSync(10);

const userController = {
    login: async (input: Login): Promise<IApiResponse> => {
        try {
            const { email, password } = input;
            const user = await UserRepository().findOne({ where: { email } });
            if (!user) return { status: STATUSCODES.NOT_FOUND, message: 'User not found.' };
            if (user.isDeleted) {
                return { status: STATUSCODES.ACCESS_DENIED, message: 'Account is deactivated. Please contact admin.' };
            }
            // ✅ Check if email is verified
            if (!user.emailVerified) {
                return { status: STATUSCODES.ACCESS_DENIED, message: 'Please verify your email before logging in.' };
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return { status: STATUSCODES.BAD_REQUEST, message: 'Password mismatch.' };

            const token = await generateToken(JSON.parse(JSON.stringify({ id: user.userId, email: user.email, role: user.role })));
            return { status: STATUSCODES.SUCCESS, message: 'Login successful.', data: { accessToken: token } };
        } catch (error) {
            throw error;
        }
    },

    createUser: async (input: SignUp): Promise<IApiResponse> => {
        try {
            const { name, email, password, phone, role } = input;
            const existingUser = await UserRepository().findOne({ where: { email } });
            if (existingUser) return { status: STATUSCODES.DATABASE_DUPLICATE_ERROR_CODE, message: 'User already exists.' };

            const hashedPassword = bcrypt.hashSync(password, salt);

            // Generate email verification token
            const verifyToken = await generateVerifyEmailToken({ email });

            // Send verification email
            const verificationUrl = `${process.env.HOST}/auth/verify-email/${verifyToken}`;
            const emailContent = `<p>Hello ${name},</p><p>Please verify your email by clicking <a href="${verificationUrl}">here</a>.</p>`;
            await emailGenerator(email, 'Verify your email', emailContent);

            // Store user with emailVerified = false
            const newUser = new User();
            newUser.name = name;
            newUser.email = email;
            newUser.password = hashedPassword;
            newUser.phone = phone;
            newUser.role = role;
            newUser.emailVerified = false;
            newUser.verifyToken = verifyToken;
            await UserRepository().save(newUser);

            return { message: `Verification email sent. Please check your inbox.`, status: STATUSCODES.SUCCESS, data: `Copy and paste the token on the postman: ${verificationUrl}` };
        } catch (error) {
            throw error;
        }
    },

    forgotPassword: async (input: { email: string }) => {
        try {
            const { email } = input;
            const user = await UserRepository().findOne({ where: { email } });
            if (!user) throw 'User not found.';

            const passwordResetToken = uuidv4();
            const expiresIn = moment().add(30, 'minutes').toISOString();

            user.security = {
                passwordReset: {
                    token: passwordResetToken,
                    provisionalPassword: null,
                    expires: expiresIn,
                },
            };
            await UserRepository().save(user);

            const resetUrl = `${process.env.HOST}/auth/reset-password/${passwordResetToken}`;
            const html = await resetPassword(resetUrl, user.name);
            await emailGenerator(email, 'Password Reset ✔', html);

            return { status: STATUSCODES.SUCCESS, message: 'Reset email sent.' };
        } catch (error) {
            throw error;
        }
    },

    resetPasswordConfirm: async (input: { email: string; password: string }) => {
        try {
            const { email, password } = input;
            const user = await UserRepository().findOne({ where: { email } });
            console.log({user})
            if (!user || !user.security?.passwordReset?.token) throw 'Invalid or expired reset request.';

            const now = Date.now();
            const expiry = new Date(user.security.passwordReset.expires).getTime();

            if (now > expiry) throw 'Reset token expired.';

            user.password = bcrypt.hashSync(password, salt);
            user.security.passwordReset = { token: null, provisionalPassword: null, expires: null };
            await UserRepository().save(user);

            return { status: STATUSCODES.SUCCESS, message: 'Password updated successfully.' };
        } catch (error) {
            throw error;
        }
    },

    verifyEmail: async (userId: number) => {
        try {
            const user = await UserRepository().findOne({ where: { userId } });
            if (!user) return { status: STATUSCODES.NOT_FOUND, message: 'User not found.' };

            user.emailVerified = true;
            user.verifyToken = null;
            await UserRepository().save(user);

            return { status: STATUSCODES.SUCCESS, message: 'Email verified.' };
        } catch (error) {
            throw error;
        }
    },
};

export { userController };
