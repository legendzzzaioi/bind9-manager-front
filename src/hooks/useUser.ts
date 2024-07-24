import {ref} from 'vue';
import {
    createUser,
    CreateUserReq,
    deleteUser,
    GetUserResp,
    getUsers,
    updateUser,
    updateUserPassword,
    UpdateUserPasswordReq,
    UpdateUserReq
} from '../api/users';
import {message} from 'ant-design-vue';


export function useUser() {
    const createuser = ref<CreateUserReq>({ username: '', password: '', role: '' });
    const updateuser = ref<UpdateUserReq>({ username: '', role: '' });
    const updatepassword = ref<UpdateUserPasswordReq>({ username: '', password: '' });
    const user = ref<GetUserResp[]>([]);

    const fetchUser = async () => {
        try {
            user.value = await getUsers();
        } catch (error) {
            user.value = [];
            if (error.response?.status === 400 && error.response.data.trim() === 'no users found') {
                // message.warning('No users found.');
                return
            }
            message.error('Failed to fetch users: ' + error.response.data.trim());
        }
    };

    const refreshUserList = async () => {
        try {
            user.value = await getUsers();
            message.success('User list refreshed successfully', 5);
        } catch (error) {
            user.value = [];
            if (error.response?.status === 400 && error.response.data.trim() === 'no users found') {
                message.success('User list refreshed successfully', 5);
                return
            }
            message.error('Failed to refresh user list: ' + error.response.data.trim());
        }
    }

    const createUserData = async (user: CreateUserReq): Promise<{ success: boolean }> => {
        try {
            if (!user.role || !user.password || !user.username){
                message.error('username or password or role is empty');
                return { success: false };
            }
            const response = await createUser(user);
            if (response.code === 400) {
                message.error('Failed to create user: ' + response.context);
                return { success: false };
            } else {
                message.success('User created successfully', 5);
                return { success: true };
            }
        } catch (error) {
            message.error('Failed to create user: ' + error.response.data.trim());
            return { success: false };
        }
    };

    const updateUserData = async (user: UpdateUserReq): Promise<{ success: boolean }> => {
        try {
            if (!user.username || !user.role){
                message.error('role is empty');
                return { success: false };
            }
            const response = await updateUser(user);
            if (response.code === 400) {
                message.error('Failed to update user role: ' + response.context);
                return { success: false };
            } else {
                message.success('User role updated successfully', 5);
                return { success: true };
            }
        } catch (error) {
            message.error('Failed to update user role: ' + error.response.data.trim());
            return { success: false };
        }
    };

    const updateUserPasswordData = async (user: UpdateUserPasswordReq): Promise<{ success: boolean }> => {
        try {
            if (!user.username || !user.password){
                message.error('password is empty');
                return { success: false };
            }
            const response = await updateUserPassword(user);
            if (response.code === 400) {
                message.error('Failed to update user password: ' + response.context);
                return { success: false };
            } else {
                message.success('User password updated successfully', 5);
                return { success: true };
            }
        } catch (error) {
            message.error('Failed to update user password: ' + error.response.data.trim());
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
            message.error('Failed to delete user: ' + error.response.data.trim());
            return { success: false };
        }
    };

    return { user, createuser, updateuser, updatepassword, fetchUser, createUserData, updateUserData, updateUserPasswordData, deleteUserByName, refreshUserList };


}