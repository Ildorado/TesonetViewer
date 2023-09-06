import { useAuth } from "@/hooks";
import { useCallback } from "react";
import { Logo } from "@/assets";

export const Header = () => {
  const auth = useAuth();

  const onClick = useCallback(() => {
    auth?.logout();
  }, [auth]);

  return (
    <nav className="flex fixed p-4 left-0 top-0 w-full justify-between bg-gray-50 py-2 text-neutral-500 shadow-lg hover:text-neutral-700 focus:text-neutral-700 lg:flex-wrap lg:py-4">
      <Logo />
      <button onClick={onClick}>Logout</button>
    </nav>
  );
};
