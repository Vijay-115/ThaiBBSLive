import React, { useState } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const Register = () => {

    const [userData, setUserData] = useState({ name: '', email: '', phone: '', password: '' });
    const [errors, setErrors] = useState({});

    const validateRegister = () => {
        let formErrors = {};
        if (!userData.name) formErrors.name = "Name is required";
        if (!userData.email) formErrors.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(userData.email)) formErrors.email = "Email is invalid";
        if (!userData.phone) formErrors.phone = "Phone is required";
        if (!userData.password) formErrors.password = "Password is required";
        else if (userData.password.length < 6) formErrors.password = "Password must be at least 6 characters";

        return formErrors;
    };

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateRegister();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            toast.error("Please fix the errors and try again.");
            return;
        }

        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/register`, userData);
            toast.success('User registered successfully');
            setUserData({ name: '', email: '', phone: '', password: '' });
            setErrors({});
        } catch (error) {
            if (error.response) {
                if (error.response.status === 400) {
                    toast.error(error.response.data.msg);
                } else {
                    toast.error('Registration failed. Please try again.');
                }
            } else {
                toast.error('Registration failed. Please try again.');
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
                                Sign up
                            </h1>
                            <form className="space-y-4" onSubmit={handleRegisterSubmit}>
                                <div>
                                    <label htmlFor="name" className="mb-2  dark:text-gray-400 text-lg">Name</label>
                                    <input
                                        id="name"
                                        name="name"
                                        className={`border p-3 dark:bg-indigo-700 dark:text-gray-300  dark:border-gray-700 shadow-md placeholder:text-base focus:scale-105 ease-in-out duration-300 border-gray-300 rounded-lg w-full placeholder-gray-300 ${errors.name ? 'border-red-700' : ''}`}
                                        type="text"
                                        placeholder="John Deo"
                                        onChange={handleChange}
                                        value={userData.name}
                                    />
                                    {errors.name && <div className="text-red-800">{errors.name}</div>}
                                </div>
                                <div>
                                    <label htmlFor="email" className="mb-2  dark:text-gray-400 text-lg">Email</label>
                                    <input
                                        id="email"
                                        name="email"
                                        className={`border p-3 dark:bg-indigo-700 dark:text-gray-300  dark:border-gray-700 shadow-md placeholder:text-base focus:scale-105 ease-in-out duration-300 border-gray-300 rounded-lg w-full placeholder-gray-300 ${errors.email ? 'border-red-700' : ''}`}
                                        type="email"
                                        placeholder="example@abc.com"
                                        onChange={handleChange}
                                        value={userData.email}
                                    />
                                    {errors.email && <div className="text-red-800">{errors.email}</div>}
                                </div>
                                <div>
                                    <label htmlFor="phone" className="mb-2 dark:text-gray-400 text-lg">Phone</label>
                                    <input
                                        id="phone"
                                        name="phone"
                                        className={`border p-3 shadow-md dark:bg-indigo-700 dark:text-gray-300  dark:border-gray-700 placeholder:text-base focus:scale-105 ease-in-out duration-300 border-gray-300 rounded-lg w-full placeholder-gray-300 ${errors.phone ? 'border-red-700' : ''}`}
                                        type="text"
                                        placeholder="88888 88888"
                                        onChange={handleChange}
                                        value={userData.phone}
                                    />
                                    {errors.phone && <div className="text-red-800">{errors.phone}</div>}
                                </div>
                                <div>
                                    <label htmlFor="password" className="mb-2 dark:text-gray-400 text-lg">Password</label>
                                    <input
                                        id="password"
                                        name="password"
                                        className={`border p-3 shadow-md dark:bg-indigo-700 dark:text-gray-300 dark:border-gray-700 placeholder:text-base focus:scale-105 ease-in-out duration-300 border-gray-300 rounded-lg w-full placeholder-gray-300 ${errors.email ? 'border-red-700' : ''}`}
                                        type="password"
                                        placeholder="********"
                                        onChange={handleChange}
                                        value={userData.password}
                                    />
                                    {errors.password && <div className="text-red-800">{errors.password}</div>}
                                </div>
                                {/* <div>
                                    <label htmlFor="confirm-password" className="mb-2 dark:text-gray-400 text-lg">Confirm Password</label>
                                    <input
                                        id="password"
                                        className="border p-3 shadow-md dark:bg-indigo-700 dark:text-gray-300  dark:border-gray-700 placeholder:text-base focus:scale-105 ease-in-out duration-300 border-gray-300 rounded-lg w-full placeholder-gray-300"
                                        type="password"
                                        placeholder="********"
                                        required
                                    />
                                </div> */}
                                <button
                                    className="bg-gradient-to-r dark:text-gray-300 from-logoSecondary to-logoPrimary shadow-lg mt-6 p-2 text-white rounded-lg w-full hover:scale-105 hover:from-logoPrimary hover:to-logoSecondary transition duration-300 ease-in-out"
                                    type="submit"
                                >
                                    REGISTER
                                </button>
                            </form>

                            <div className="flex flex-col mt-4 items-center justify-center text-sm">
                                <h3 className="dark:text-gray-300">
                                    Already have an account?
                                    <Link
                                        className="group text-blue-400 transition-all duration-100 ease-in-out"
                                        to="/login"
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
                                    <a
                                        className="group text-blue-400 transition-all duration-100 ease-in-out"
                                        href="#"
                                    >
                                        <span
                                            className="cursor-pointer bg-left-bottom bg-gradient-to-r from-blue-400 to-blue-400 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out mx-1"
                                        >
                                            Terms
                                        </span>
                                    </a>
                                    and
                                    <a
                                        className="group text-blue-400 transition-all duration-100 ease-in-out"
                                        href="#"
                                    >
                                        <span
                                            className="cursor-pointer bg-left-bottom bg-gradient-to-r from-blue-400 to-blue-400 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out mx-1"
                                        >
                                            Privacy Policy
                                        </span>
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Register;