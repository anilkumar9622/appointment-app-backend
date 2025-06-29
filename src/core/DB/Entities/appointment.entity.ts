import { UserRole } from "../../types/Constant/common";
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn, Repository, DeleteDateColumn, ManyToOne, JoinColumn, OneToMany, OneToOne } from "typeorm";
import { DbConnections } from "../postgresdb";
import { IUser } from "../../types/AuthService/AuthService";
import { User } from "./User.entity";

export enum AppointmentStatus {
    PENDING = "PENDING",
    CONFIRMED = "CONFIRMED",
    CANCELLED = "CANCELLED"
}

@Entity("appointment")
export class Appointment extends BaseEntity {
    @PrimaryGeneratedColumn({ name: 'appointment_id' })
    appointmentId: number;

    @Column({ name: 'patient_id' })
    patientId: number

    @ManyToOne(() => User, (user) => user.userId)
    @JoinColumn({ name: "patient_id" })
    patient: User;

    @Column({ name: 'doctor_id' })
    doctorId: number

    @ManyToOne(() => User, (user) => user.userId)
    @JoinColumn({ name: "doctor_id" })
    doctor: User;

    @Column()
    date: Date;

    @Column()
    time: string;

    @Column({ type: "enum", enum: AppointmentStatus, default: AppointmentStatus.PENDING })
    status: AppointmentStatus;

    @Column({ name: 'is_deleted', default: false })
    isDeleted: boolean

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP', name: 'updated_at' })
    updatedAt: Date;

    @DeleteDateColumn({ type: 'timestamp', nullable: true })
    deleted_at: Date;
}

export const AppointmentRepository = (): Repository<any> => {
    const connection = DbConnections.AppDbConnection.getConnection();
    return connection.getRepository(Appointment);
}