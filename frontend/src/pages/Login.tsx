import { useState } from "react";
import { Link } from "react-router-dom";
import useLogin from "../hooks/useLogin";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";

const Login = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });

  const { loading, login } = useLogin();

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    login(inputs.username, inputs.password);
  };

  return (
    <div className="flex flex-col items-center justify-center mx-auto shadow-lg rounded-xl min-w-96 bg-slate-800">
      <div className="w-full p-6 bg-gray-400 bg-opacity-0 rounded-lg shadow-md bg-clip-padding backdrop-filter backdrop-blur-lg">
        <h1 className="mb-10 text-3xl font-semibold text-center text-white">
          Login
        </h1>

        <form onSubmit={handleSubmitForm}>
          <div>
            <label className="p-2 label">
              <span className="text-base label-text">Benutzername</span>
            </label>
            <Input
              className="h-10 mt-1 text-white border-gray-500 m bg-zinc-800 placeholder:text-gray-400"
              disabled={loading}
              value={inputs.username}
              placeholder="johndoe"
              type="text"
              onChange={(e) =>
                setInputs({ ...inputs, username: e.target.value })
              }
            />
          </div>

          <div className="mt-6">
            <label className="p-2 label">
              <span className="text-base label-text">Passwort</span>
            </label>
            <Input
              className="h-10 mt-1 text-white border-gray-500 m bg-zinc-800 placeholder:text-gray-400"
              disabled={loading}
              value={inputs.password}
              placeholder="********"
              type="password"
              onChange={(e) =>
                setInputs({ ...inputs, password: e.target.value })
              }
            />
          </div>
          <Link
            to="/signup"
            className="inline-block pl-2 mt-2 text-sm text-white hover:underline hover:text-blue-600"
          >
            Sie haben noch kein Konto?
          </Link>

          <div className="mt-6">
            <Button type="submit" disabled={loading} variant="auth" size="lg">
              {loading ? "Loading..." : "Login"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Login;
