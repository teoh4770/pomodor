import UserWhite from "/user-solid-white.png";
import LogoutWhite from "/logout-solid-white.png";

import { useAuth } from "@/hooks";
import { logout } from "@/services/authService.ts";
import { Link } from "react-router-dom";

export const Auth = () => {
  const user = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <>
      {user ? (
        <button
          type="button"
          className="button"
          data-type="secondary"
          data-size="sm"
          onClick={handleLogout}
        >
          <div className="flex items-center gap-1">
            <img className="aspect-square h-4 w-4" src={LogoutWhite} alt="" />
            <span className="hidden md:inline">Log Out</span>
          </div>
        </button>
      ) : (
        <div>
          <Link to="/pomodor/login">
            <button
              type="button"
              className="button"
              data-type="secondary"
              data-size="sm"
            >
              <div className="flex items-center gap-1">
                <img className="aspect-square h-4 w-4" src={UserWhite} alt="" />
                <span className="hidden md:inline">Sign In</span>
              </div>
            </button>
          </Link>
        </div>
      )}
    </>
  );
};
