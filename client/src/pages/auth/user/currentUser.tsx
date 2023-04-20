import React, { createContext, useContext, useState } from "react";

interface User {
  id: string;
  email: string;
  photoURL: string;
}

interface CurrentUserContextValue {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export const CurrentUserContext = createContext<CurrentUserContextValue>({
  user: null,
  setUser: () => {},
});

const CurrentUserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(
    JSON.parse(localStorage.getItem("user")!) || null
  );

  return (
    <CurrentUserContext.Provider value={{ user, setUser }}>
      {children}
    </CurrentUserContext.Provider>
  );
};

export default CurrentUserProvider;

export const useUser = () => {
  const { user, setUser } = useContext(CurrentUserContext);
  return { user, setUser };
};
