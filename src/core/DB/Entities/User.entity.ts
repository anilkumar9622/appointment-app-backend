import { UserRole } from "../../types/Constant/common";
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn, Repository, DeleteDateColumn } from "typeorm";
import { DbConnections } from "../postgresdb";
import { IUser } from "../../../core/types/AuthService/AuthService";


@Entity({ name: "user" })
export class User extends BaseEntity implements IUser {

    @PrimaryGeneratedColumn({ name: 'user_id' })
    userId: number;

    @Column()
    name: string

    @Column()
    phone: string

    @Column({ nullable: true })
    email: string

    @Column()
    password: string

    @Column({ nullable: true })
    image: string;

    @Column({ default: false })
    emailVerified: boolean;

    @Column({ nullable: true })
    verifyToken: string;

    @Column({ type: 'json', nullable: true })
    security: {
        passwordReset?: {
            token: string;
            provisionalPassword: string | null;
            expires: Date;
        };
    };


    @Column({
        type: 'enum',
        enum: UserRole,
        default: UserRole.PATIENT, // Set default role to USER  
    })
    role: UserRole

    @Column({ name: 'is_deleted', default: false })
    isDeleted: boolean

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP', name: 'updated_at' })
    updatedAt: Date;

    @DeleteDateColumn({ type: 'timestamp', nullable: true })
    deleted_at: Date;
}

export const UserRepository = (): Repository<any> => {
    const connection = DbConnections.AppDbConnection.getConnection();
    return connection.getRepository(User);
}
