import { Link } from "react-router-dom";

import { useState } from "react";
import useSignup from "../hooks/useSignup";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";

const SignUp = () => {
  const [inputs, setInputs] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const { loading, signup } = useSignup();

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    signup(inputs);
  };

  return (
    <div className="flex flex-col items-center justify-center mx-auto shadow-lg rounded-xl min-w-96 bg-slate-800">
      <div className="w-full p-6 bg-gray-400 bg-opacity-0 rounded-lg shadow-md bg-clip-padding backdrop-filter backdrop-blur-lg">
        <h1 className="mb-10 text-3xl font-semibold text-center text-white">
          Sign Up
        </h1>

        <form onSubmit={handleSubmitForm}>
          <div>
            <label className="p-2 label">
              <span className="text-base label-text">Full Name</span>
            </label>
            <Input
              className="h-10 mt-1 text-white border-gray-500 m bg-zinc-800 placeholder:text-gray-200"
              disabled={loading}
              value={inputs.fullName}
              placeholder="John Doe"
              type="text"
              onChange={(e) =>
                setInputs({ ...inputs, fullName: e.target.value })
              }
            />
          </div>

          <div className="mt-6">
            <label className="p-2 label ">
              <span className="text-base label-text">Username</span>
            </label>
            <Input
              className="h-10 mt-1 text-white border-gray-500 m bg-zinc-800 placeholder:text-gray-200"
              disabled={loading}
              placeholder="johndoe"
              type="text"
              value={inputs.username}
              onChange={(e) =>
                setInputs({ ...inputs, username: e.target.value })
              }
            />
          </div>

          <div className="mt-6">
            <label className="pl-2 label">
              <span className="text-base label-text">Password</span>
            </label>
            <Input
              className="h-10 mt-1 text-white border-gray-500 m bg-zinc-800 placeholder:text-gray-200"
              disabled={loading}
              value={inputs.password}
              placeholder="********"
              type="password"
              onChange={(e) =>
                setInputs({ ...inputs, password: e.target.value })
              }
            />
          </div>

          <div className="mt-6">
            <label className="pl-2 label">
              <span className="text-base label-text">Confirm Password</span>
            </label>
            <Input
              className="h-10 mt-1 text-white border-gray-500 m bg-zinc-800 placeholder:text-gray-200"
              disabled={loading}
              value={inputs.confirmPassword}
              placeholder="********"
              type="password"
              onChange={(e) =>
                setInputs({ ...inputs, confirmPassword: e.target.value })
              }
            />
          </div>

          <Link
            to={"/login"}
            className="inline-block pl-2 mt-2 text-sm text-white hover:underline hover:text-blue-600"
          >
            Already have an account?
          </Link>

          <div className="mt-6">
            <Button type="submit" disabled={loading} variant="auth" size="lg">
              {loading ? "Loading..." : "Sign Up"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default SignUp;