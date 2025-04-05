import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

import 'react-toastify/dist/ReactToastify.css';
import Style from './ActivateUser.module.css';

function ActivateUser() {
    const navigate = useNavigate();
    const [flag, setFlag] = useState(true);
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState(["Testing"]);
    const notify = (message) => toast.error(message);
    const success = (message) => toast.success(message);
    function handleEmailChange(evt) { 
        setEmail(evt.target.value);
    }
    function handleActivateClick(evt) {
        evt.preventDefault();
        setErrors([]);
        setIsLoading(true);
        setFlag(!flag);
        if(!email) {
            setErrors((oldArray) => {
                if(oldArray.includes("Please enter email")) {
                    return [...oldArray];
                }
                return [...oldArray, "Please enter email"]
            });
        }
    }
    useEffect(() => {
        if(errors.length === 0) {
            axios
                .post(`${process.env.REACT_APP_BACKEND_URL}/auth/activate`, { email })
                .then((response) => {
                    setIsLoading(false);
                    success('A mail has been sent on your email!');
                })
                .catch((error) => {
                    setIsLoading(false);
                    const message = error?.response?.data?.message;
                    if(error?.response?.status === 500) {
                        notify('Try again after some time!');
                    } else if(message.includes("No user exist")) {
                        notify('User not registered, please register!');
                    } else if(message.includes("User is already activated!")) {
                        notify('Account already activated!');
                    }
                })
        } else if(errors.length > 0 && !errors.includes("Testing")){
            errors.forEach((message) => {
                notify(message);
            })
            setIsLoading(false);
        }
    }, [flag])
    return (
        <>
            <div className="navbar">
                <h2 className="app-title">Quizzard</h2>
            </div>
            <div className="hero-container">
                <div className="imgDiv">
                    <div className="img"></div>
                </div>
                <div className="content">
                    <h2 className="page-title">Activate User!</h2>
                    <div className={Style.contentTitle}>
                        Email
                    </div>
                    <div className={Style.inputDiv}>
                        <label htmlFor='Email'></label>
                        <input type='text' id='Email' value={email} onChange={handleEmailChange} className={Style.input} placeholder='Email ID'></input>
                    </div>
                    <button type='submit' onClick={handleActivateClick} className="button">Activate</button>
                    <div className='redirectDiv'>
                        <p>User already activated? <span className='redirectLink' onClick={() => navigate('/auth/login')}>Login Here!</span></p>
                    </div>
                </div>
            </div>
            <ToastContainer />
            {isLoading && 
                <div className="loading">
                    <div className="loader"></div>
                </div>
            }
        </>
    );
};

export default ActivateUser;