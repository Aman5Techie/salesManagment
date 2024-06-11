import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const useCheckToken = (bool) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.userreducer.userinfo);
  useEffect(() => {
    if (bool) {
      // login
      if (user !== null) {
        navigate("/");
      }
    } else {
      // homepage
      if (user === null) {
        navigate("/login");
      }
    }
  }, [user, navigate, bool]);
};
// login

export { useCheckToken };
