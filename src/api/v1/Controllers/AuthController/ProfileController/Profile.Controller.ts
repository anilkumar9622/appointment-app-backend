import { STATUSCODES } from "../../../../../core/types/Constant/common";
import { UserRepository } from "../../../../../core/DB/Entities/User.entity";
import { IApiResponse } from "../../../../../core/types/Constant/commonService";
import { DeleteUserProfile, IUser, UpdateUserProfile } from "../../../../../core/types/AuthService/AuthService";

class ProfileController {
    private getUserRepositry = UserRepository();
   

    constructor() { }

    async getProfile(payload: IUser): Promise<IApiResponse> {
        try {
            const { userId } = payload;
            const user: IUser | null = await this.getUserRepositry.findOne({ where: { userId } });
            if (!user) {
                return { status: STATUSCODES.NOT_FOUND, message: "User Not Found." };
            }

          
            return { status: STATUSCODES.SUCCESS, message: "Success.", data: user }
        } catch (error) {
            throw error;
        }
    }

    convertTimestamptoDate(date: Date): string {
        const inputDate = new Date(date);
        const day = inputDate.getDate().toString().padStart(2, '0');
        const month = (inputDate.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
        const year = inputDate.getFullYear();
        const formattedDateString = `${day}-${month}-${year}`;
        return formattedDateString;
    }

    async updateImage(payload: IUser, input: UpdateUserProfile): Promise<IApiResponse> {
        try {
            const { userId } = payload;
            const { image } = input;
            console.log({payload})
            await this.getUserRepositry.createQueryBuilder().update({ image }).where({ userId: Number(userId) }).execute();
            return { message: "Success.", status: STATUSCODES.SUCCESS }
        } catch (error) {
            throw error;
        }
    }

    async deleteProfile(payload: IUser, input: DeleteUserProfile): Promise<IApiResponse> {
        try {
            const { userId } = payload;
            // const { id } = input
            await this.getUserRepositry.createQueryBuilder().update({ image: null }).where({ userId: Number(userId) }).execute();
            return { message: "Success.", status: STATUSCODES.SUCCESS }
        } catch (error) {
            throw error;
        }
    }

  
}

export { ProfileController as profileService }

