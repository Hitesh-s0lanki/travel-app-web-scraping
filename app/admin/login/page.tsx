"use client";

import ApiClient from "@/lib/api-client";
import { ADMIN_API_ROUTES } from "@/lib/utils";
import { useAppStore } from "@/store/store";
import {
  CardFooter,
  Button,
  Input,
  Card,
  CardHeader,
  CardBody,
} from "@nextui-org/react";
import { Architects_Daughter } from "next/font/google";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

const ArchitectsDaughter = Architects_Daughter({
  weight: "400",
  style: "normal",
  subsets: ["latin"],
});

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { setUserInfo } = useAppStore();

  const router = useRouter();

  const handleLogin = async () => {
    try {
      const response = await ApiClient.post(ADMIN_API_ROUTES.LOGIN, {
        email,
        password,
      });
      if (response.data.userInfo) {
        setUserInfo(response.data.userInfo);
        router.push("/admin");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-full w-full flex justify-center items-center bg-cover bg-center bg-no-repeat bg-[url('/home/home-bg.png')]">
      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-2xl"></div>
      <Card className="shadow-2xl bg-opacity-20 w-[480px]">
        <CardHeader className="flex flex-col gap-1 capitalize text-3xl items-center">
          <div className=" flex flex-col items-center justify-center">
            <Image
              src="/logo.png"
              alt="logo"
              height={80}
              width={80}
              className="cursor-pointer"
              onClick={() => router.push("/admin/dashboard")}
            />
            <span className="text-xl uppercase font-medium italic text-white">
              <span className={ArchitectsDaughter.className}>Admin Login</span>
            </span>
          </div>
        </CardHeader>
        <CardBody className="flex flex-col items-center w-full justify-center">
          <div className="flex flex-col gap-2 w-full p-5">
            <Input
              className=" rounded-lg"
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              color="danger"
            />
            <Input
              className=" rounded-lg"
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              color="danger"
            />
          </div>
        </CardBody>
        <CardFooter className="flex flex-col gap-2 items-center justify-center pb-5">
          <Button
            color="danger"
            variant="shadow"
            onClick={handleLogin}
            className="w-1/2 capitalize"
          >
            Login
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
