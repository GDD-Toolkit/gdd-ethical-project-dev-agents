import { useState } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { OneLineInput } from "@/components/OneLineInput";
import Button from "@/components/Button";
import { Link } from "react-router-dom";

const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = () => {
    alert(`Account created for ${email}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <Card className="w-full max-w-sm border border-gray-200 shadow-md rounded-xl p-8">
        <CardHeader className="text-center pb-3">
          <CardTitle className="text-xl font-semibold text-[#7B61FF]">
            Welcome User
          </CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col gap-3">
          <OneLineInput placeholder="Email" value={email} onChange={setEmail} />
          <OneLineInput
            placeholder="Password"
            value={password}
            onChange={setPassword}
          />

          <Button
            label="Create Account"
            onClick={handleSignUp}
            className="w-full py-2 mt-5 rounded-md text-white text-sm"
          />

          <div className="flex items-center justify-center my-2">
            <span className="h-px bg-gray-300 w-16 mr-2"></span>
            <span className="text-xs text-gray-400">or</span>
            <span className="h-px bg-gray-300 w-16 ml-2"></span>
          </div>

          <button
            onClick={() => alert("Continue with Google")}
            className="flex items-center justify-center w-full border border-gray-300 rounded-md py-2 text-xs hover:bg-gray-50 transition text-gray-700 font-medium"
            style={{
              backgroundColor: "white",
              color: "#374151",
            }}
          >
            <img
              src="https://www.svgrepo.com/show/355037/google.svg"
              alt="Google"
              className="w-4 h-4 mr-2"
            />
            Continue with Google
          </button>

          <p className="text-center text-xs mt-4 text-gray-600">
            Already have an account?{" "}
            <Link to="/signin" className="text-[#7B61FF] hover:underline">
              Sign in
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUpPage;
