import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';

const Login = () => {

    const [loginData, setLoginData] = useState({ lemail: '', lpassword: '' });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    // Validation function for login
    const validateLogin = () => {
        let formErrors = {};
        if (!loginData.lemail) formErrors.lemail = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(loginData.lemail)) formErrors.lemail = "Email is invalid";
        if (!loginData.lpassword) formErrors.lpassword = "Password is required";
        else if (loginData.lpassword.length < 6) formErrors.lpassword = "Password must be at least 6 characters";

        return formErrors;
    };

    // Handle input change for both login and registration
    const handleChange = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    };


    // Handle login form submit
    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateLogin();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            toast.error("Please fix the errors and try again.");
            return;
        }

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
                email: loginData.lemail,
                password: loginData.lpassword
            });

            const { role } = response.data.user; // Access 'role' from 'user' object
            const { token } = response.data;
            localStorage.setItem('userRole', role);
            localStorage.setItem('token', token);

            toast.success('Login successful');
            setLoginData({ lemail: '', lpassword: '' });
            setErrors({});

            if (role === 'admin') {
                navigate('/admin');
            } else {
                navigate('/');
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                toast.error(error.response.data.message);
            } else {
                toast.error('Login failed. Please try again.');
            }
        }
    };

    return (
        <>
            <div className="h-100 w-screen flex justify-center items-center dark:bg-gray-900 py-10">
                <div className="grid gap-8">
                    <div
                        id="back-div"
                        className="bg-gradient-to-r from-logoSecondary to-logoPrimary rounded-[26px] m-4"
                    >
                        <div
                            className="border-[20px] border-transparent rounded-[20px] dark:bg-gray-900 bg-white shadow-lg xl:p-10 2xl:p-10 lg:p-10 md:p-10 sm:p-2 m-2"
                        >
                            <h1 className="pt-8 pb-6 font-bold dark:text-gray-400 text-5xl text-center cursor-default">
                                Log in
                            </h1>
                            <form onSubmit={handleLoginSubmit} className="space-y-4">
                                <div>
                                    <label htmlFor="email" className="mb-2  dark:text-gray-400 text-lg">Email</label>
                                    <input
                                        id="email"
                                        name="lemail"
                                        className={`border p-3 dark:bg-indigo-700 dark:text-gray-300  dark:border-gray-700 shadow-md placeholder:text-base focus:scale-105 ease-in-out duration-300 border-gray-300 rounded-lg w-full placeholder-gray-300 ${errors.lemail ? 'border-red-700' : ''}`}
                                        type="email"
                                        placeholder="example@abc.com"
                                        onChange={handleChange}
                                        value={loginData.lemail}
                                    />
                                    {errors.lemail && <div className="text-red-800">{errors.lemail}</div>}
                                </div>
                                <div>
                                    <label htmlFor="password" className="mb-2 dark:text-gray-400 text-lg">Password</label>
                                    <input
                                        id="password"
                                        name="lpassword"
                                        className={`border p-3 shadow-md dark:bg-indigo-700 dark:text-gray-300  dark:border-gray-700 placeholder:text-base focus:scale-105 ease-in-out duration-300 border-gray-300 rounded-lg w-full placeholder-gray-300 ${errors.lpassword ? 'border-red-700' : ''}`}
                                        type="password"
                                        placeholder="********"
                                        onChange={handleChange}
                                        value={loginData.lpassword}
                                    />
                                    {errors.lpassword && <div className="text-red-800">{errors.lpassword}</div>}
                                </div>
                                <Link
                                    className="group text-blue-400 transition-all duration-100 ease-in-out"
                                    to="/forgot-password"
                                >
                                    <span
                                        className="bg-left-bottom bg-gradient-to-r text-sm from-blue-400 to-blue-400 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out"
                                    >
                                        Forgot your password?
                                    </span>
                                </Link>
                                <button
                                    className="bg-gradient-to-r dark:text-gray-300 from-logoSecondary to-logoPrimary shadow-lg mt-6 p-2 text-white rounded-lg w-full hover:scale-105 hover:from-logoPrimary hover:to-logoSecondary transition duration-300 ease-in-out"
                                    type="submit"
                                >
                                    LOG IN
                                </button>
                            </form>
                            <div className="flex flex-col mt-4 items-center justify-center text-sm">
                                <h3 className="dark:text-gray-300">
                                    Don't have an account?
                                    <Link
                                        className="group text-blue-400 transition-all duration-100 ease-in-out"
                                        to="/register"
                                    >
                                        <span
                                            className="bg-left-bottom bg-gradient-to-r from-blue-400 to-blue-400 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out mx-2"
                                        >
                                            Sign Up
                                        </span>
                                    </Link>
                                </h3>
                            </div>
                            <div
                                id="third-party-auth"
                                className="flex items-center justify-center mt-5 flex-wrap"
                            >
                                <button
                                    href="#"
                                    className="hover:scale-105 ease-in-out duration-300 shadow-lg p-2 rounded-lg m-1"
                                >
                                    <img
                                        className="max-w-[25px]"
                                        src="https://ucarecdn.com/8f25a2ba-bdcf-4ff1-b596-088f330416ef/"
                                        alt="Google"
                                    />
                                </button>
                                <button
                                    href="#"
                                    className="hover:scale-105 ease-in-out duration-300 shadow-lg p-2 rounded-lg m-1"
                                >
                                    <img
                                        className="max-w-[25px]"
                                        src="https://ucarecdn.com/95eebb9c-85cf-4d12-942f-3c40d7044dc6/"
                                        alt="Linkedin"
                                    />
                                </button>
                                <button
                                    href="#"
                                    className="hover:scale-105 ease-in-out duration-300 shadow-lg p-2 rounded-lg m-1"
                                >
                                    <img
                                        className="max-w-[25px] filter dark:invert"
                                        src="https://ucarecdn.com/be5b0ffd-85e8-4639-83a6-5162dfa15a16/"
                                        alt="Github"
                                    />
                                </button>
                                <button
                                    href="#"
                                    className="hover:scale-105 ease-in-out duration-300 shadow-lg p-2 rounded-lg m-1"
                                >
                                    <img
                                        className="max-w-[25px]"
                                        src="https://ucarecdn.com/6f56c0f1-c9c0-4d72-b44d-51a79ff38ea9/"
                                        alt="Facebook"
                                    />
                                </button>
                                <button
                                    href="#"
                                    className="hover:scale-105 ease-in-out duration-300 shadow-lg p-2 rounded-lg m-1"
                                >
                                    <img
                                        className="max-w-[25px] dark:gray-100"
                                        src="https://ucarecdn.com/82d7ca0a-c380-44c4-ba24-658723e2ab07/"
                                        alt="twitter"
                                    />
                                </button>

                                <button
                                    href="#"
                                    className="hover:scale-105 ease-in-out duration-300 shadow-lg p-2 rounded-lg m-1"
                                >
                                    <img
                                        className="max-w-[25px]"
                                        src="https://ucarecdn.com/3277d952-8e21-4aad-a2b7-d484dad531fb/"
                                        alt="apple"
                                    />
                                </button>
                            </div>

                            <div
                                className="text-gray-500 flex text-center flex-col mt-4 items-center text-sm"
                            >
                                <p className="cursor-default">
                                    By signing in, you agree to our
                                    <Link
                                        className="group text-blue-400 transition-all duration-100 ease-in-out"
                                        to="/terms"
                                    >
                                        <span
                                            className="cursor-pointer bg-left-bottom bg-gradient-to-r from-blue-400 to-blue-400 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out mx-1"
                                        >
                                            Terms
                                        </span>
                                    </Link>
                                    and
                                    <Link
                                        className="group text-blue-400 transition-all duration-100 ease-in-out"
                                        to="/privacy-policy"
                                    >
                                        <span
                                            className="cursor-pointer bg-left-bottom bg-gradient-to-r from-blue-400 to-blue-400 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out mx-1"
                                        >
                                            Privacy Policy
                                        </span>
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
};

export default Login;