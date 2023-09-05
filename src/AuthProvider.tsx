import React from "react";
import { createContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "@/hooks";
import { GetTokenDataType, UserType } from "@/types";

type ValueType = {
  user: UserType;
  login: (data: GetTokenDataType) => Promise<void>;
  logout: () => void;
};

export const AuthContext = createContext<ValueType | null>(null);

interface IAuthProvider {
  children: React.ReactNode;
}

const userData = window.localStorage.getItem("user");

export const AuthProvider = ({ children }: IAuthProvider) => {
  const [user, setUser] = useLocalStorage("user", userData);
  const navigate = useNavigate();

  // call this function when you want to authenticate the user
  const value: ValueType = useMemo(() => {
    const login = async (data: GetTokenDataType) => {
      try {
        const response = await fetch(
          "https://playground.tesonet.lt/v1/tokens",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
          }
        );

        const result = await response.json();

        setUser({ ...data, token: result?.token });
        navigate("/");
        console.log("Success:", result);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    // call this function to sign out logged in user
    const logout = () => {
      setUser(null);
      navigate("/", { replace: true });
    };

    return {
      user,
      login,
      logout,
    };
  }, [navigate, setUser, user]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
