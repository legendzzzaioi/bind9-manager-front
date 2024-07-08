import { ref } from 'vue';
import { CreateUserReq, GetUserResp, UpdateUserReq, UpdateUserPasswordReq, getUsers, deleteUser, updateUser, createUser, updateUserPassword } from '../api/users';
import { message } from 'ant-design-vue';
import { refresh } from 'less';


export function useUser() {
    const createuser = ref<CreateUserReq>({ username: '', password: '', role: '' });
    const updateuser = ref<UpdateUserReq>({ username: '', role: '' });
    const updatepassword = ref<UpdateUserPasswordReq>({ username: '', password: '' });
    const user = ref<GetUserResp[]>([]);

    const fetchUser = async () => {
        try {
            const response = await getUsers();
            user.value = response;
        } catch (error) {
            user.value = [];
            message.error('Failed to fetch users: ' + error);
        }
    };

    const refreshUserList = async () => {
        try {
            const response = await getUsers();
            user.value = response;
        } catch (error) {
            message.error('Failed to refresh user list: ' + error);
            return
        }
        message.success('User list refreshed successfully', 5);
    }

    const createUserData = async (user: CreateUserReq): Promise<{ success: boolean }> => {
        try {
            const response = await createUser(user);
            if (response.code === 400) {
                message.error('Failed to create user: ' + response.context);
                return { success: false };
            } else {
                message.success('User created successfully', 5);
                return { success: true };
            }
        } catch (error) {
            message.error('Failed to create user: ' + error);
            return { success: false };
        }
    };

    const updateUserData = async (user: UpdateUserReq): Promise<{ success: boolean }> => {
        try {
            const response = await updateUser(user);
            if (response.code === 400) {
                message.error('Failed to update user role: ' + response.context);
                return { success: false };
            } else {
                message.success('User role updated successfully', 5);
                return { success: true };
            }
        } catch (error) {
            message.error('Failed to update user role: ' + error);
            return { success: false };
        }
    };

    const updateUserPasswordData = async (user: UpdateUserPasswordReq): Promise<{ success: boolean }> => {
        try {
            const response = await updateUserPassword(user);
            if (response.code === 400) {
                message.error('Failed to update user password: ' + response.context);
                return { success: false };
            } else {
                message.success('User password updated successfully', 5);
                return { success: true };
            }
        } catch (error) {
            message.error('Failed to update user password: ' + error);
            return { success: false };
        }
    };

    const deleteUserByName = async (username: string): Promise<{ success: boolean }> => {
        try {
            const response = await deleteUser(username);
            if (response.code === 400) {
                message.error('Failed to delete user: ' + response.context);
                return { success: false };
            } else {
                message.success('User deleted successfully', 5);
                return { success: true };
            }
        } catch (error) {
            message.error('Failed to delete user: ' + error);
            return { success: false };
        }
    };

    return { user, createuser, updateuser, updatepassword, fetchUser, createUserData, updateUserData, updateUserPasswordData, deleteUserByName, refreshUserList };


}