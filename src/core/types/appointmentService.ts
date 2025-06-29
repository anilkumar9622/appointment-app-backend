import { IsNotEmpty, IsNumber, IsOptional, IsString, IsEnum } from "class-validator";

export enum AppointmentStatus {
    PENDING = "PENDING",
    CONFIRMED = "CONFIRMED",
    CANCELLED = "CANCELLED"
}

export interface IAppointment {
    appointmentId: number;
    patientId: number;
    doctorId: number;
    date: string;         // format: YYYY-MM-DD
    time: string;         // format: HH:mm
    status: AppointmentStatus;
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
}

// DTO: POST /add
export class CreateAppointmentDTO {
    @IsNotEmpty()
    @IsNumber()
    patientId: number;

    @IsNotEmpty()
    @IsNumber()
    doctorId: number;

    @IsNotEmpty()
    @IsString()
    date: Date;

    @IsNotEmpty()
    @IsString()
    time: string;

    @IsOptional()
    @IsEnum(AppointmentStatus)
    status: AppointmentStatus.PENDING;
}

// DTO: POST /update
export class UpdateAppointmentDTO {
    @IsNotEmpty()
    @IsNumber()
    appointmentId: number;

    @IsOptional()
    @IsString()
    date?: string;

    @IsOptional()
    @IsString()
    time?: string;

    @IsOptional()
    @IsEnum(AppointmentStatus)
    status?: AppointmentStatus;
}

// DTO: GET /getById/:appointmentId
export class GetAppointmentDTO {
    @IsNotEmpty()
    @IsString()
    appointmentId: string;
}

// DTO: DELETE /delete/:appointmentId
export class DeleteAppointmentDTO {
    @IsNotEmpty()
    @IsString()
    appointmentId: string;
}
