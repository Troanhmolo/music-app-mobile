import {create} from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {API_URL} from "../constants/api";
import { getErrorMessage } from "../helpers/miscellaneous";
import type { User } from "../types";

type AuthResult = {success: true} | {success: false; error: string};

interface AuthStore {
    user: User | null;
    token: string | null;
    isLoading: boolean;
    signup: (username: string, email: string, password: string) => Promise<AuthResult>;
    login: (email: string, password: string) => Promise<AuthResult>;
    checkAuth: () => Promise<void>;
    logout: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set) => ({
    user: null,
    token: null,
    isLoading: false,
    
    signup: async (username: string, email: string, password: string) => {
        set({isLoading: true});
        try {
            const response = await fetch(`${API_URL}/api/auth/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({username, email, password}),
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || "Something went wrong");

            await AsyncStorage.setItem('user', JSON.stringify(data.user));
            await AsyncStorage.setItem('token', data.token);

            set({user: data.user, token: data.token, isLoading: false});

            return {success: true};
             
        } catch (error) {
            return {success: false, error: getErrorMessage(error)};
        } finally{ 
            set({isLoading: false});
        }
    },

    login: async (email: string, password: string) => {
        set({isLoading: true});
        try {
            const response = await fetch(`${API_URL}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({email, password}),
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || "Something went wrong");

            await AsyncStorage.setItem('user', JSON.stringify(data.user));
            await AsyncStorage.setItem('token', data.token);

            set({user: data.user, token: data.token, isLoading: false});

            return {success: true};
             
        } catch (error) {
            return {success: false, error: getErrorMessage(error)};
        } finally{ 
            set({isLoading: false});
        }
    },


    checkAuth: async () => {
        set({isLoading: true});
        try {
            const token = await AsyncStorage.getItem('token');
            const userJson = await AsyncStorage.getItem('user');
            const user = userJson? JSON.parse(userJson) : null;

            set({user, token});

        } catch (error) {
            console.log("Error in checkAuth", error);
        }   
        finally {
            set({isLoading: false});
        }
    },

    logout: async () => {
        set({isLoading: true});
        try {
            await AsyncStorage.removeItem('token');
            await AsyncStorage.removeItem('user');
            set({user: null, token: null, isLoading: false});
        } catch (error) {
            console.log("Error in logout", error);
        } finally {
            set({isLoading: false});
        }
    },


            
}));