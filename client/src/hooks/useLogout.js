import axios from "axios";
import { useEffect } from "react";
const useLogout = history => {
  const logout = axios.get("/api/users/logout").then(response => {
    if (response.status === 200) {
      history.push("/");
    } else {
      alert("로그아웃에 실패했습니다.");
    }
  });
  console.log(logout);
  useEffect(() => {}, [logout]);
};

export default useLogout;
