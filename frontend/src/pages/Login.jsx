import React from "react";

const LoginPage = () => {
  return (
    <div className="flex h-screen">
      <div className="hidden lg:block bg-blue-800 w-1/3 xl:w-1/2 p-8">
        <div className="text-white text-xl flex items-center">
          <img
            src="/enlight_logo.svg"
            alt="Enlite Prime"
            className="w-8 mr-3"
          />
          <h3>Enlite Prime</h3>
        </div>
        <h1 className="text-white text-5xl  mb-4 mt-[240px]">
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

      <div className="flex flex-col justify-center items-center w-full p-8">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold mb-8 text-center text-[#3F51B5]">Sign in</h2>

          <form className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Your Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="john.doe@mail.com"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Your Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="••••••••"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <button
                    type="button"
                    className="text-gray-500 hover:text-gray-700"
                  >
                    👁
                  </button>
                </div>
              </div>
            </div>

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
              className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition duration-200"
            >
              CONTINUE →
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">Or sign in with</p>
            <div className="flex justify-center space-x-3 mt-3">
              <button className="bg-red-500 text-white p-3 rounded-md hover:bg-red-600 transition duration-200">
                Google
              </button>
              <button className="bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition duration-200">
                Twitter
              </button>
              <button className="bg-gray-800 text-white p-3 rounded-md hover:bg-gray-900 transition duration-200">
                GitHub
              </button>
            </div>
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
