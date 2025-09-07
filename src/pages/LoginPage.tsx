import { Link, useNavigate } from "react-router-dom";
import { login } from "@/services/authService.ts";
import { FormEvent, useState } from "react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      setError("");
      navigate("/pomodor");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[var(--primary-color)] text-white">
      <div className="w-full max-w-sm rounded-lg bg-white p-8 text-center text-black shadow-lg">
        <h1 className="mb-2 text-2xl font-bold">Pomodor</h1>
        <h2 className="mb-6 text-lg">Login</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="text-left">
            <label
              htmlFor="email"
              className="mb-1 block text-xs font-bold uppercase text-gray-600"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="example@email.com"
              className="mb-4 w-full rounded border border-gray-300 bg-gray-100 p-2 focus:outline-none focus:ring-2 focus:ring-red-400"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            <label
              htmlFor="password"
              className="mb-1 block text-xs font-bold uppercase text-gray-600"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="********"
              className="w-full rounded border border-gray-300 bg-gray-100 p-2 focus:outline-none focus:ring-2 focus:ring-red-400"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="mt-6 w-full rounded bg-gray-800 py-2 font-bold text-white hover:bg-gray-700"
          >
            Log in with Email
          </button>
        </form>
      </div>
      <p className="mt-6 text-sm">
        Do not have an account?{" "}
        <Link to="/pomodor/signup" className="font-bold underline">
          Create account
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;