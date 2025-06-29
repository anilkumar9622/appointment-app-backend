import { STATUSCODES, UserRole } from "../../../../core/types/Constant/common";
import { IApiResponse } from "../../../../core/types/Constant/commonService";
import { DeleteUser, GetUsers, IUser, SignUp, UpdateUser } from "../../../../core/types/AuthService/AuthService";
import { User, UserRepository } from "../../../../core/DB/Entities/User.entity";
import { Not } from "typeorm";

class UsersController {
    private userListRepositry = UserRepository();

    constructor() { }

    async getUsersList(payload: IUser, inputRole?: string): Promise<IApiResponse> {
        try {
            console.log({ payload })
            const queryBuilder = this.userListRepositry
                .createQueryBuilder('user')
                .select([
                    'user.userId',
                    'user.name',
                    'user.role',
                    'user.image',
                    'user.phone',
                    'user.email',
                    'user.emailVerified',
                    'user.isDeleted',
                    'user.security'
                ])
                .orderBy('user.updatedAt', 'DESC')
                .addOrderBy('user.createdAt', 'DESC');

            if (payload.role !== UserRole.ADMIN) {
                queryBuilder.where('user.isDeleted = false');
            }

            // ✅ If inputRole is provided, filter by it
            if (inputRole) {
                console.log("Applying role filter:", inputRole);
                queryBuilder.andWhere('user.role = :role', { role: inputRole });
            } else {
                // ✅ Default: exclude ADMINs
                queryBuilder.andWhere('user.role != :adminRole', { adminRole: UserRole.ADMIN });
            }

            const users = await queryBuilder.getMany();

            return {
                message: "Success.",
                status: STATUSCODES.SUCCESS,
                data: users
            };
        } catch (error) {
            throw error;
        }
    }



    async getUserDetails(input: GetUsers): Promise<IApiResponse> {
        const { userId } = input;
        try {
            const userDetails: IUser | null = await this.userListRepositry.findOne({
                where: { userId: Number(userId) }, // Ensure userId is number if necessary
            });

            return {
                message: "Success.",
                status: STATUSCODES.SUCCESS,
                data: userDetails
            };
        } catch (error) {
            throw error;
        }
    }


    async updateUser(payload: IUser, input: UpdateUser): Promise<IApiResponse> {
        try {
            const { userId } = payload;
            const {
                name,
                phone,
                email,
                role
            } = input;

            await this.userListRepositry
                .createQueryBuilder()
                .update()
                .set({
                    name,
                    phone,
                    email,
                    role
                })
                .where({ userId }) // Target user by empId from input
                .execute();

            return {
                message: "User updated successfully.",
                status: STATUSCODES.SUCCESS
            };
        } catch (error) {
            throw error;
        }
    }


    async deleteUser(input: DeleteUser): Promise<IApiResponse> {
        try {
            const { userId } = input;
            await this.userListRepositry.createQueryBuilder().update({ isDeleted: true }).where({ userId }).execute();
            return { message: "Deleted Successfully.", status: STATUSCODES.SUCCESS }
        } catch (error) {
            throw error;
        }
    }



}

export { UsersController as UsersListService }
