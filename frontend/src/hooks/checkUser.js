import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkUserToken } from "../utils/userToken";

export const useCheckUser = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const verifyAuth = async () => {
      const { authenticated, user } = await checkUserToken();

      if (!authenticated && !user) {
        navigate("/login");
      } else {
        setIsAuthenticated(true);
      }
    };

    verifyAuth();
  }, [navigate]);

  return isAuthenticated;
};
