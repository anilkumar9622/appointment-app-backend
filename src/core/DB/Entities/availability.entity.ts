import { UserRole } from "../../types/Constant/common";
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn, Repository, DeleteDateColumn, ManyToOne, JoinColumn, OneToMany, OneToOne } from "typeorm";
import { DbConnections } from "../postgresdb";
import { IUser } from "../../../core/types/AuthService/AuthService";
import { User } from "./User.entity";

@Entity("availability")
export class Availability extends BaseEntity {
    @PrimaryGeneratedColumn({ name: 'availability_id' })
    availabilityId: number;

    @Column({ name: 'doctor_id' })
    doctorId: number

    @ManyToOne(() => User, (user) => user.userId)
    @JoinColumn({ name: "doctor_id" })
    doctor: User;

    @Column()
    date: Date;

    @Column()
    startTime: string;

    @Column()
    endTime: string;

    @Column({ default: true })
    isAvailable: boolean;

    @Column({ name: 'is_deleted', default: false })
    isDeleted: boolean

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP', name: 'updated_at' })
    updatedAt: Date;

    @DeleteDateColumn({ type: 'timestamp', nullable: true })
    deleted_at: Date;
}

export const AvailabilityRepository = (): Repository<any> => {
    const connection = DbConnections.AppDbConnection.getConnection();
    return connection.getRepository(Availability);
}