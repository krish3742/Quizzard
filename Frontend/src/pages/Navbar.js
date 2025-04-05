import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import axios from 'axios';

import Style from './Navbar.module.css';

function Navbar(props) {
    const token = props.token;
    const message = props.message;
    const headers = props.headers;
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const handleSignOutClick = (evt) => {
        evt.preventDefault();
        setIsLoading(true);
        axios
            .post(`${process.env.REACT_APP_BACKEND_URL}/user/logout`, {}, { headers })
            .then(() => {
                setIsLoading(false);
                navigate('/auth/login');
            })
            .catch((error) => {
                setIsLoading(false);
                navigate('/auth/register');
            })
    }
    return (
        <>
            <nav className={Style.navbar}>
                <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                    <div className="relative flex h-16 items-center justify-between">
                        <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                            <button type="button" className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                                <span className="absolute -inset-0.5"></span>
                                <span className="sr-only">Open main menu</span>
                                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                </svg>
                                <svg className="hidden h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-between sm:overflow-hidden">
                            <div className="flex items-center justify-center text-2xl">
                                <h1 className="font-bold text-white">Quizzard</h1>
                            </div>
                            <div className="hidden sm:ml-6 sm:block">
                                <div className="flex space-x-4">
                                    <button className={`rounded-md px-3 py-2 text-base font-medium ${message === 'Quiz' ? 'bg-slate-50 text-[#0F0C2C]': 'text-gray-300 hover:bg-gray-700 hover:text-white'}`} onClick={() => navigate('/auth/quiz', { state: { token }})}>Home</button>
                                    <button className={`rounded-md px-3 py-2 text-base font-medium ${message === 'Quizzes' ? 'bg-slate-50 text-[#0F0C2C]': 'text-gray-300 hover:bg-gray-700 hover:text-white'}`} onClick={() => navigate('/auth/published-quiz', { state: { token }})}>Quizzes</button>
                                    <button className={`rounded-md px-3 py-2 text-base font-medium ${message === 'Favourite' ? 'bg-slate-50 text-[#0F0C2C]': 'text-gray-300 hover:bg-gray-700 hover:text-white'}`} onClick={() => navigate('/auth/user/fav-ques', { state: { token }})}>Favourite Questions</button>
                                    <button className={`rounded-md px-3 py-2 text-base font-medium ${message === 'MyQuiz' ? 'bg-slate-50 text-[#0F0C2C]': 'text-gray-300 hover:bg-gray-700 hover:text-white'}`} onClick={() => navigate('/auth/quiz/myquiz', { state: { token }})}>My Quiz</button>
                                </div>
                            </div>
                        </div>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                            <div className="relative mr-1">
                                <div>
                                    <button type="button" className="relative flex rounded-full bg-gray-800 text-sm ring-1 ring-white ring-offset-1" id="user-menu-button" aria-expanded="false" aria-haspopup="true" onClick={() => setIsProfileOpen(!isProfileOpen)}>
                                        <span className="absolute -inset-1.5"></span>
                                        <span className="sr-only">Open user menu</span>
                                        <img className="h-8 w-8 rounded-full" src={require('../components/Pictures/profile.jpg')} alt="" />
                                    </button>
                                </div>
                                {isProfileOpen && 
                                    <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabIndex="-1">
                                        <button className={Style.button} role="menuitem" tabIndex="-1" id="user-menu-item-0" onClick={() => navigate('/auth/user/my-account', { state: { token }})}>Your Profile</button>
                                        <button className={Style.button} role="menuitem" tabIndex="-1" id="user-menu-item-2" onClick={(evt) => handleSignOutClick(evt)}>Sign out</button>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                {isMenuOpen &&
                    <div className="absolute bg-[#0F0C2C] w-[calc(100vw-20px)] sm:hidden" id="mobile-menu">
                        <div className="space-y-1 px-2 pb-3 pt-2">
                            <button className={`block rounded-md px-3 py-2 text-base min-w-full text-left font-medium ${message === 'Quiz' ? 'bg-slate-50 text-[#0F0C2C]': 'text-gray-300 hover:bg-gray-700 hover:text-white'}`} onClick={() => navigate('/auth/quiz', { state: { token }})}>Home</button>
                            <button className={`block rounded-md px-3 py-2 text-base min-w-full text-left font-medium ${message === 'Quizzes' ? 'bg-slate-50 text-[#0F0C2C]': 'text-gray-300 hover:bg-gray-700 hover:text-white'}`} onClick={() => navigate('/auth/published-quiz', { state: { token }})}>Quizzes</button>
                            <button className={`block rounded-md px-3 py-2 text-base min-w-full text-left font-medium ${message === 'Favourite' ? 'bg-slate-50 text-[#0F0C2C]': 'text-gray-300 hover:bg-gray-700 hover:text-white'}`} onClick={() => navigate('/auth/user/fav-ques', { state: { token }})}>Favourite Questions</button>
                            <button className={`block rounded-md px-3 py-2 text-base min-w-full text-left font-medium ${message === 'MyQuiz' ? 'bg-slate-50 text-[#0F0C2C]': 'text-gray-300 hover:bg-gray-700 hover:text-white'}`} onClick={() => navigate('/auth/quiz/myquiz', { state: { token }})}>My Quiz</button>
                        </div>
                    </div>
                }           
            </nav>
            {isLoading && 
                <div className="loading">
                    <div className="loader"></div>
                </div>
            }
        </>
    );
};

export default Navbar;