import { createContext, useState, useContext } from "react";
import AppContextType from "../interfaces/AppContextType.ts";
import * as React from "react";
import AppProviderProps from "../interfaces/AppProviderProps.ts";
import User from "../interfaces/User.ts";

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider :  React.FC<AppProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    return (
        <AppContext.Provider value={{ user, setUser }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = (): AppContextType => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("useAppContext must be used within an AppProvider");
    }
    return context;
};