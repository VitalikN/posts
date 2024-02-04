"use client";
import Login from "@/components/Login";
import authSelector from "@/redux/auth/authSelector";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

const LoginOrHome = () => {
  const jwt = useSelector(authSelector.selectJwt);

  //   const router = useRouter();
  //   if (jwt) {
  //     router.push("/");
  //   }

  return <Login />;
};
export default LoginOrHome;
