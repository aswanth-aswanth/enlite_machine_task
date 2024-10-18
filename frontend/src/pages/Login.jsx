import { useState } from "react";
import apiClient from "../config/apiClient";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      const response = await apiClient.post(`/login`, {
        email,
        password,
      });

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }
    } catch (error) {
      setLoading(false);
      setErrorMessage(
        error.response?.data?.message || "Login failed, please try again."
      );
    }
  };

  return (
    <div className="flex h-screen">
      <div className="hidden lg:block bg-[#3F51B5] w-3/5 xl:w-1/2 p-8">
        <div className="text-white text-xl flex items-center">
          <img
            src="/enlight_logo.svg"
            alt="Enlite Prime"
            className="w-8 mr-3"
          />
          <h3>Enlite Prime</h3>
        </div>
        <h1 className="text-white text-5xl mb-4 mt-[240px]">
          Welcome to Enlite Prime
        </h1>
        <p className="text-white text-lg font-bold">
          Please sign in to continue
        </p>
        <a
          href="/"
          className="mt-[100px] inline-block text-blue-300 hover:underline"
        >
          ← back to site
        </a>
      </div>

      <div className="flex flex-col  items-center w-full p-8">
        <div className="lg:hidden text-xl flex items-center pt-3 pb-6">
          <img
            src="/enlight_logo.svg"
            alt="Enlite Prime"
            className="w-8 mr-3"
          />
          <h3>Enlite Prime</h3>
        </div>
        <div className="w-full xl:max-w-md">
          <div className="flex justify-between items-center mb-6 border-b pb-2">
            <h2 className="text-2xl font-bold text-[#3F51B5]">Sign in</h2>
            <a
              href="/register"
              className="text-blue-600 text-sm hover:underline flex items-center"
            >
              Create new account
            </a>
          </div>

          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="john.doe@mail.com"
              />
            </div>

            <div>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="••••••••"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <button
                    type="button"
                    className="text-gray-500 hover:text-gray-700"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "🫣" : "👁️"}{" "}
                  </button>
                </div>
              </div>
            </div>

            {errorMessage && (
              <p className="text-red-500 text-sm text-center">{errorMessage}</p>
            )}

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">Remember</span>
              </label>
              <a href="/" className="text-sm text-blue-600 hover:underline">
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#3442af] text-white p-2 rounded-md font-bold text-sm hover:bg-[#1b2469] transition duration-200"
            >
              {loading ? "Load..." : "CONTINUE"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">Or sign in with</p>
            <section className="flex justify-center space-x-3 mt-3 bg-[#F2F2F2] p-[24px] rounded-full">
              <button className="bg-red-500 text-white p-2 px-3 rounded-md hover:bg-red-600 transition duration-200">
                Google
              </button>
              <button className="bg-blue-500 text-white p-2 px-3 rounded-md hover:bg-blue-600 transition duration-200">
                Twitter
              </button>
              <button className="bg-gray-800 text-white p-2 px-3 rounded-md hover:bg-gray-900 transition duration-200">
                GitHub
              </button>
            </section>
          </div>

          <div className="mt-6 text-center">
            <a href="/register" className="text-blue-600 hover:underline">
              Create new account
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
