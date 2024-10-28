import { useNavigate } from "react-router-dom";
import  BottomWarning  from "../Components/BottomWarning";
import  Button  from "../Components/Button";
import  Heading  from "../Components/Heading";
import  InputBox  from "../Components/InputBox";
import  SubHeading  from "../Components/SubHeading";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Signin () {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const userToken = localStorage.getItem("token");

    // Check if token exists in local storage
    if (userToken) {
      navigate("/dashboard"); // Redirect to sign-in page if token doesn't exist
    }
  }, []);

  return (
    <div className="bg-[#2b3245] h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Sign in"} />
          <SubHeading label={"Enter your credentials to access your account"} />
          <InputBox
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            placeholder="Email"
            label={"Email"}
          />
          <InputBox
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="Password"
            label={"Password"}
          />
          <div className="pt-4">
            <Button
              onClick={async () => {
                const response = await axios.post(
                  import.meta.env.VITE_SERVER_URL + "/api/v1/user/signin",
                  {
                    username,
                    password,
                  }
                );
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("userId", response.data.userId);
                navigate("/dashboard");
              }}
              label={"Sign in"}
            />
          </div>
          <BottomWarning
            label={"Don't have an account?"}
            buttonText={"Sign up"}
            to={"/signup"}
          />
        </div>
      </div>
    </div>
  );
};
