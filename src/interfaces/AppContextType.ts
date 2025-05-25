import User from "./User.ts";

interface AppContextType{
    user: User | null;
    setUser: (user: User | null) => void;
}

export default AppContextType;