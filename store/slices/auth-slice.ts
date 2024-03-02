import { User } from "@/types/type";
import { StateCreator } from "zustand";

export interface AuthSlice {
    userInfo: undefined | User;
    setUserInfo: (userInfo: User) => void;
}

export const createAuthSlice: StateCreator<AuthSlice> = (set) => ({
    userInfo: undefined,
    setUserInfo: (userInfo: User) => set({ userInfo })
})