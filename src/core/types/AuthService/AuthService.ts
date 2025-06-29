import { IsArray, IsDateString, IsEmail, IsEmpty, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { UserRole } from "../Constant/common";

export interface IUser {
    userId: number;
    name: string;
    email: string;
    password: string;
    role: UserRole;
    emailVerified: boolean;
    verifyToken?: string | null;
    createdAt: Date;
    updatedAt: Date;
}

export class Login {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;
}

export class ForgetPassword {
    @IsNotEmpty()
    @IsEmail()
    emailId: string;

}

export class ResetPassword {
    @IsNotEmpty()
    @IsString()
    userId: string

    @IsNotEmpty()
    @IsString()
    token: string
}

export class ResetConfirmPassword {
    @IsNotEmpty()
    @IsString()
    password: string

    @IsNotEmpty()
    @IsString()
    confirmPassword: string

    @IsNotEmpty()
    @IsNumber()
    userId: string
}
export class SignUp {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    phone: string;

    @IsString()
    @IsOptional()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;


    @IsNotEmpty()
    @IsEnum(UserRole)
    role: UserRole;

    


}

export class UpdateUserProfile {
    @IsNotEmpty()
    @IsString()
    image: string

    // @IsNotEmpty()
    // @IsString()
    // id: string
}

export class DeleteUserProfile {
    @IsNotEmpty()
    @IsString()
    userId: string
}
export class DashboardFilter {
    @IsOptional()
    @IsArray()
    timePeriod: string
}

export class GetUsers {
    @IsNotEmpty()
    @IsString()
    userId: string
}

export class UpdateUser {

    @IsNotEmpty()
    @IsNumber()
    userId: number

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    phone: string;

    @IsString()
    @IsOptional()
    email: string;

    @IsNotEmpty()
    @IsEnum(UserRole)
    role: UserRole;
}

export class DeleteUser {
    @IsNotEmpty()
    @IsString()
    userId: string
}

export class inputRole {
    @IsOptional()
    @IsString()
    role?: UserRole;
}
