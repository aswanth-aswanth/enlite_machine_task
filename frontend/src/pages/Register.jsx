import { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../config/apiClient";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);

    if (password !== retypePassword) {
      setLoading(false);
      setErrorMessage("Passwords do not match!");
      return;
    }

    try {
      await apiClient.post(`/register`, {
        username,
        email,
        password,
      });

      navigate("/login");
    } catch (error) {
      setLoading(false);
      setErrorMessage(
        error.response?.data?.message ||
          "Registration failed, please try again."
      );
    }
  };

  return (
    <div className="flex h-screen">
      <div className="hidden lg:block bg-[#3F51B5] w-3/5 xl:w-1/2 p-8">
        <div className="text-white text-xl flex items-center pt-10">
          <img
            src="/enlight_logo.svg"
            alt="Enlite Prime"
            className="w-8 mr-3"
          />
          <h3>Enlite Prime</h3>
        </div>
        <h1 className="text-white text-4xl xl:text-5xl leading-[3.6rem]  mb-4 mt-[200px] text-[3rem]">
          Hello, nice to meet you
        </h1>
        <p className="text-white text-lg font-bold">
          Just register to join with us
        </p>
        <a
          href="/"
          className="mt-[100px] inline-block text-[#BAC0E4] hover:underline"
        >
          ← back to site
        </a>
      </div>

      <div className="flex flex-col items-center w-full  p-8">
        <div className="lg:hidden text-xl flex items-center pt-3 pb-6">
          <img
            src="/enlight_logo.svg"
            alt="Enlite Prime"
            className="w-8 mr-3"
          />
          <h3 >Enlite Prime</h3>
        </div>
        <div className="w-full xl:max-w-md">
          <div className="flex justify-between items-center mb-6 border-b pb-2">
            <h2 className="text-3xl font-bold text-[#3F51B5]">Register</h2>
            <a
              href="/login"
              className="text-blue-600 text-sm hover:underline flex items-center"
            >
              Already have an account?
            </a>
          </div>

          {errorMessage && (
            <div className="text-red-600 mb-4 text-center">{errorMessage}</div>
          )}

          <form onSubmit={handleRegister} className="space-y-6">
            <div>
              <input
                id="username"
                name="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Username"
              />
            </div>

            <div>
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your Email"
              />
            </div>

            <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
              <div className="w-full md:w-1/2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your Password"
                  value=""
                />
              </div>
              <div className="w-full md:w-1/2">
                <input
                  id="retype-password"
                  name="retype-password"
                  type="password"
                  required
                  className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Re-type password"
                  value=""
                />
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                required
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="terms" className="ml-2 text-sm text-gray-700">
                Agree with{" "}
                <a href="#" className="text-blue-600 hover:underline">
                  Terms & Condition
                </a>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#3442af] text-white p-2 rounded-md font-bold text-sm hover:bg-[#1b2469] transition duration-200"
            >
              {loading ? "Registering..." : "CONTINUE"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">Or register in with</p>
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
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
