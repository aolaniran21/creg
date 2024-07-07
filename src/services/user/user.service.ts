import Admin from "../../entity/users/user.admin.entity";
import User from "../../entity/users/user.entity";
import {
    IUpdateUser
} from "../../entity/users/user.interface";

export class UserService {


    public async updateUser(
        userId: string,
        userData: IUpdateUser
    ): Promise<User> {
        try {
            const user = await User.findByPk(userId);
            if (!user) {
                throw new Error("User not found");
            }

            // Exclude UserID and Name from the update operation
            const { ...updateData } = userData;

            // Update the organization with the remaining fields
            const updatedUser = await user.update(updateData);
            return updatedUser;
        } catch (error) {
            throw new Error("Unable to update organization: " + error.message);
        }
    }

    public async listUsers(): Promise<any> {
        try {
            const users = await User.findAll({});

            if (!users) {
                throw new Error("Users not found");
            }

            return users;
        } catch (error) {
            throw new Error("Unable to find users: " + error.message);
        }
    }
    public async listUser(userId: string): Promise<any> {
        try {
            const users = await User.findAll({
                where: {
                    user_id: userId,
                },
            });

            if (!users) {
                throw new Error("User not found");
            }

            return users;
        } catch (error) {
            throw new Error("Unable to find users: " + error.message);
        }
    }


}
