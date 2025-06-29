import { IsNotEmpty, IsNumber, IsOptional, IsString, IsBoolean } from "class-validator";

export interface IAvailability {
    availabilityId: number;
    doctorId: number;
    date: string;         // format: YYYY-MM-DD
    startTime: string;    // format: HH:mm
    endTime: string;      // format: HH:mm
    isAvailable: boolean;
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
}

// DTO: POST /add
export class CreateAvailabilityDTO {
    @IsNotEmpty()
    @IsNumber()
    doctorId: number;

    @IsNotEmpty()
    @IsString()
    date: Date;

    @IsNotEmpty()
    @IsString()
    startTime: string;

    @IsNotEmpty()
    @IsString()
    endTime: string;

    @IsOptional()
    @IsBoolean()
    isAvailable?: boolean = true;
}

// DTO: POST /update
export class UpdateAvailabilityDTO {
    @IsNotEmpty()
    @IsNumber()
    availabilityId: number;

    @IsOptional()
    @IsString()
    date?: string;

    @IsOptional()
    @IsString()
    startTime?: string;

    @IsOptional()
    @IsString()
    endTime?: string;

    @IsOptional()
    @IsBoolean()
    isAvailable?: boolean;
}

// DTO: GET /getById/:availabilityId
export class GetAvailabilityDTO {
    @IsNotEmpty()
    @IsString()
    availabilityId: string;
}

// DTO: DELETE /delete/:availabilityId
export class DeleteAvailabilityDTO {
    @IsNotEmpty()
    @IsString()
    availabilityId: string;
}
