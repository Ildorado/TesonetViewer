import React from "react";
import { createContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "@/hooks";
import { ConfigType, PostTokenType } from "@/types";
import { apiCaller } from "./api";

type ValueType = {
  user: ConfigType;
  login: (data: PostTokenType) => Promise<{
    success: boolean;
  }>;
  logout: () => void;
};

export const AuthContext = createContext<ValueType | null>(null);

interface IAuthProvider {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: IAuthProvider) => {
  const [config, setConfig] = useLocalStorage("config", null);
  const navigate = useNavigate();

  // call this function when you want to authenticate the user
  const value: ValueType = useMemo(() => {
    const login = async (data: PostTokenType) => {
      try {
        const { result, success } = await apiCaller({
          type: "postToken",
          params: data,
        });

        if (success) {
          setConfig({ token: result?.token });
          navigate("/");
          console.log("Success:", result);
          return { success };
        } else {
          return { success };
        }
      } catch (error) {
        console.error("Error:", error);
        return { success: false };
      }
    };

    // call this function to sign out logged in user
    const logout = () => {
      setConfig(null);
      navigate("/", { replace: true });
    };

    return {
      user: config,
      login,
      logout,
    };
  }, [navigate, setConfig]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
