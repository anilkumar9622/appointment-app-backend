// 📁 Controllers/AvailabilityController/Availability.controller.ts
import { STATUSCODES } from "../../../../core/types/Constant/common";
import { IApiResponse } from "../../../../core/types/Constant/commonService";
import {
    CreateAvailabilityDTO,
    DeleteAvailabilityDTO,
    GetAvailabilityDTO,
    IAvailability,
    UpdateAvailabilityDTO
} from "../../../../core/types/availableService";
import { IUser } from "../../../../core/types/AuthService/AuthService";
import { Availability, AvailabilityRepository } from "../../../../core/DB/Entities/availability.entity";

class AvailabilityController {
    private availability = AvailabilityRepository();

    constructor() {}

    async add(input: CreateAvailabilityDTO, payload: IUser): Promise<IApiResponse> {
        try {
            const { doctorId, date, startTime, endTime, isAvailable } = input;
            const newAvailability = new Availability();
            newAvailability.doctorId = doctorId;
            newAvailability.date = date;
            newAvailability.startTime = startTime;
            newAvailability.endTime = endTime;
            newAvailability.isAvailable = isAvailable ?? true;

            await this.availability.save(newAvailability);

            return { message: "Availability added successfully.", status: STATUSCODES.SUCCESS };
        } catch (error) {
            throw error;
        }
    }

    async list(payload: IUser): Promise<IApiResponse> {
        try {
            const availabilityList: IAvailability[] = await this.availability.find({
                where: { isDeleted: false },
                order: {
                    updatedAt: "DESC",
                    createdAt: "DESC"
                }
            });

            return { message: "Success.", status: STATUSCODES.SUCCESS, data: availabilityList };
        } catch (error) {
            throw error;
        }
    }

    async getById(payload: IUser, input: GetAvailabilityDTO): Promise<IApiResponse> {
        try {
            const { availabilityId } = input;
            const availability = await this.availability.findOne({ where: { availabilityId: Number(availabilityId) } });

            if (!availability) {
                return { message: "Availability not found.", status: STATUSCODES.NOT_FOUND };
            }

            return { message: "Success.", status: STATUSCODES.SUCCESS, data: availability };
        } catch (error) {
            throw error;
        }
    }

    async update(payload: IUser, input: UpdateAvailabilityDTO): Promise<IApiResponse> {
        try {
            const { availabilityId, date, startTime, endTime, isAvailable } = input;

            await this.availability.createQueryBuilder()
                .update({ date, startTime, endTime, isAvailable })
                .where({ availabilityId })
                .execute();

            return { message: "Availability updated.", status: STATUSCODES.SUCCESS };
        } catch (error) {
            throw error;
        }
    }

    async delete(payload: IUser, input: DeleteAvailabilityDTO): Promise<IApiResponse> {
        try {
            const { availabilityId } = input;
            await this.availability.createQueryBuilder()
                .update({ isDeleted: true })
                .where({ availabilityId: Number(availabilityId) })
                .execute();

            return { message: "Availability deleted.", status: STATUSCODES.SUCCESS };
        } catch (error) {
            throw error;
        }
    }
}

export { AvailabilityController as AvailabilityService };
