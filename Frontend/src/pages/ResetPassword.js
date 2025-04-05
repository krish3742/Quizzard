import { useLocation, Navigate, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import axios from 'axios';

import 'react-toastify/dist/ReactToastify.css';

function ResetPassword() {
    let passwordCheck = 1;
    const location = useLocation();
    const navigate = useNavigate();
    const [flag, setFlag] = useState(true);
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState(["Testing"]);
    const userId = location?.state?.userId;
    const notify = (message) => toast.error(message);
    const success = (message) => toast.success(message);
    function handlePasswordChange(evt) {
        setPassword(evt.target.value);
    }
    function handleConfirmPasswordChange(evt) {
        setConfirmPassword(evt.target.value);
    }
    function handleVerifyClick(evt) {
        evt.preventDefault();
        setErrors([]);
        setIsLoading(true);
        passwordCheck = 1;
        if(!password) {
            setErrors((oldArray) => [...oldArray, "Please enter password!"]);
        } else {
            if(
                password.indexOf('!') === -1 &&
                password.indexOf("@") === -1 &&
                password.indexOf("#") === -1 &&
                password.indexOf("$") === -1 &&
                password.indexOf("*") === -1
            ) {
                passwordCheck = 0;
            }
            if(!passwordCheck) {
                setErrors((oldArray) => {
                    return [...oldArray, "Enter the valid password!"]
                })
            }
            for(let index = 0; index < password.length; index++) {
                if(password.charAt(index) >= 'a' && password.charAt(index) <= 'z') {
                    passwordCheck = 1;
                    break;
                }
            }
            if(!passwordCheck) {
                setErrors((oldArray) => {
                    return [...oldArray, "Enter the valid password!"]
                })
            }
            for(let index = 0; index < password.length; index++) {
                if(password.charAt(index) >= 'A' && password.charAt(index) <= 'Z') {
                    passwordCheck = 1;
                    break;
                }
            }
            if(!passwordCheck) {
                setErrors((oldArray) => {
                    return [...oldArray, "Enter the valid password!"]
                })
            }
            for(let index = 0; index < password.length; index++) {
                if(password.charAt(index) >= '0' && password.charAt(index) <= '9') {
                    passwordCheck = 1;
                    break;
                }
            }
            if(!passwordCheck) {
                setErrors((oldArray) => {
                    return [...oldArray, "Enter the valid password!"]
                })
            }
        }
        if(!confirmPassword) {
            setErrors((oldArray) => [...oldArray, "Please enter confirm password!"]); 
        }
        if(password !== confirmPassword) {
            setErrors((oldArray) => [...oldArray, "Confirm password mismatch!"]);
        }
        setFlag(!flag);
    }
    useEffect(() => {
        if(!!errors && errors.length === 0) {
            axios
                .post(`${process.env.REACT_APP_BACKEND_URL}/auth/forgotpassword/${userId}`, { password, confirmPassword})
                .then((response) => {
                    setIsLoading(false);
                    success('Password successfully reset');
                })
                .catch((error) => {
                    setIsLoading(false);
                    notify('Try again after some time!');
                })
        } else if(errors.length > 0 && !errors.includes("Testing")){
            errors.forEach((message) => {
                notify(message);
            })
            setIsLoading(false);
        }
    }, [flag]);
    if(!userId) {
        return <Navigate to='/auth/login' />;
    }
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
                    <h2 className="page-title">Reset your password!</h2>
                    <form className="form">
                        <div className='inputDiv'>
                            <label htmlFor='Password'></label>
                            <input type='password' id='Password' value={password} onChange={handlePasswordChange} className="input" placeholder='Password'></input>
                        </div>
                        <div className='inputDiv'>
                            <label htmlFor='ConfirmPassword'></label>
                            <input type='text' id='ConfirmPassword' value={confirmPassword} onChange={handleConfirmPasswordChange} className="input" placeholder='Confirm Password'></input>
                        </div>
                        <div className="instructionDiv">
                            <p className="instruction">Note: Password must be 8 characters long, including 1 upper case alphabet, 1 lower case alphabet, and 1 special character.</p>
                        </div>
                    </form>
                    <button type='submit' onClick={handleVerifyClick} className="button">Reset</button>
                    <div className='redirectDiv'>
                        <p>Already have an account? <span className='redirectLink' onClick={() => navigate('/auth/login')}>Login Here!</span></p>
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

export default ResetPassword;