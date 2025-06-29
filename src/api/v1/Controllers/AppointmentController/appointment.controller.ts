// 📁 Controllers/AppointmentController/Appointment.controller.ts
import { STATUSCODES, UserRole } from "../../../../core/types/Constant/common";
import { IApiResponse } from "../../../../core/types/Constant/commonService";
import {
    AppointmentStatus,
    CreateAppointmentDTO,
    DeleteAppointmentDTO,
    GetAppointmentDTO,
    IAppointment,
    UpdateAppointmentDTO
} from "../../../../core/types/appointmentService";
import { IUser } from "../../../../core/types/AuthService/AuthService";
import { Appointment, AppointmentRepository } from "../../../../core/DB/Entities/appointment.entity";

class AppointmentController {
    private appointment = AppointmentRepository();

    constructor() {}

    async add(input: CreateAppointmentDTO, payload: IUser): Promise<IApiResponse> {
        try {
            const { patientId, doctorId, date, time, status   } = input;
            const newAppointment = new Appointment();
            newAppointment.patientId = patientId;
            newAppointment.doctorId = doctorId;
            newAppointment.date = date;
            newAppointment.time = time;
            newAppointment.status = status;

            await this.appointment.save(newAppointment);

            return { message: "Appointment booked successfully.", status: STATUSCODES.SUCCESS };
        } catch (error) {
            throw error;
        }
    }

   async list(payload: IUser): Promise<IApiResponse> {
    try {
        const queryBuilder = this.appointment.createQueryBuilder("appointment")
            .leftJoinAndSelect("appointment.doctor", "doctor")
            .leftJoinAndSelect("appointment.patient", "patient")
            .where("appointment.isDeleted = :isDeleted", { isDeleted: false });

        // Role-based filtering
        if (payload.role === UserRole.DOCTOR) {
            queryBuilder.andWhere("appointment.doctorId = :doctorId", { doctorId: payload.userId });
        } else if (payload.role === UserRole.PATIENT) {
            queryBuilder.andWhere("appointment.patientId = :patientId", { patientId: payload.userId });
        }

        const appointments = await queryBuilder
            .orderBy("appointment.updatedAt", "DESC")
            .addOrderBy("appointment.createdAt", "DESC")
            .getMany();

        return {
            message: "Success.",
            status: STATUSCODES.SUCCESS,
            data: appointments
        };
    } catch (error) {
        throw error;
    }
}


    async getById(payload: IUser, input: GetAppointmentDTO): Promise<IApiResponse> {
        try {
            const { appointmentId } = input;
            const appointment = await this.appointment.findOne({ where: { appointmentId: Number(appointmentId) } });

            if (!appointment) {
                return { message: "Appointment not found.", status: STATUSCODES.NOT_FOUND };
            }

            return { message: "Success.", status: STATUSCODES.SUCCESS, data: appointment };
        } catch (error) {
            throw error;
        }
    }

    async update(payload: IUser, input: UpdateAppointmentDTO): Promise<IApiResponse> {
        try {
            const { appointmentId, date, time, status } = input;

            await this.appointment.createQueryBuilder()
                .update({ date, time, status })
                .where({ appointmentId })
                .execute();

            return { message: "Appointment updated.", status: STATUSCODES.SUCCESS };
        } catch (error) {
            throw error;
        }
    }

    async delete(payload: IUser, input: DeleteAppointmentDTO): Promise<IApiResponse> {
        try {
            const { appointmentId } = input;
            await this.appointment.createQueryBuilder()
                .update({ isDeleted: true })
                .where({ appointmentId: Number(appointmentId) })
                .execute();

            return { message: "Appointment deleted.", status: STATUSCODES.SUCCESS };
        } catch (error) {
            throw error;
        }
    }
}

export { AppointmentController as AppointmentService };
