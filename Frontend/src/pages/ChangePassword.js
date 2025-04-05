import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useState, useEffect } from 'react';
import axios from 'axios';

import Navbar from './Navbar';

import 'react-toastify/dist/ReactToastify.css';

function Register() {
    let flag = 1;
    const navigate = useNavigate();
    const location = useLocation();
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState(["Testing"]);
    const token = location?.state?.token;
    const notify = (message) => toast.error(message);
    const success = (message) => toast.success(message);
    const headers = {'Authorization': `Bearer ${token}`};
    function handleCurrentPasswordChange(evt) {
        setCurrentPassword(evt.target.value);
    }
    function handleNewPasswordChange(evt) {
        setNewPassword(evt.target.value);
    }
    function handleConfirmPasswordChange(evt) {
        setConfirmPassword(evt.target.value);
    }
    function handleVerifyClick(evt) {
        evt.preventDefault();
        setIsLoading(true);
        setErrors([]);
        flag = 1;
        if(!currentPassword) {
            setErrors((oldArray) => {
                return [...oldArray, "Please enter current password!"];
            });
        }
        if(!newPassword) {
            setErrors((oldArray) => {
                return [...oldArray, "Please enter new password!"];
            });
        } else {
            if(
                newPassword.indexOf('!') === -1 &&
                newPassword.indexOf("@") === -1 &&
                newPassword.indexOf("#") === -1 &&
                newPassword.indexOf("$") === -1 &&
                newPassword.indexOf("*") === -1
            ) {
                flag = 0;
            }
            if(!flag) {
                setErrors((oldArray) => {
                    return [...oldArray, "Enter the valid new password!"]
                })
            }
            for(let index = 0; index < newPassword.length; index++) {
                if(newPassword.charAt(index) >= 'a' && newPassword.charAt(index) <= 'z') {
                    flag = 1;
                    break;
                }
            }
            if(!flag) {
                setErrors((oldArray) => {
                    return [...oldArray, "Enter the valid new password!"]
                })
            }
            for(let index = 0; index < newPassword.length; index++) {
                if(newPassword.charAt(index) >= 'A' && newPassword.charAt(index) <= 'Z') {
                    flag = 1;
                    break;
                }
            }
            if(!flag) {
                setErrors((oldArray) => {
                    return [...oldArray, "Enter the valid new password!"]
                })
            }
            for(let index = 0; index < newPassword.length; index++) {
                if(newPassword.charAt(index) >= '0' && newPassword.charAt(index) <= '9') {
                    flag = 1;
                    break;
                }
            }
            if(!flag) {
                setErrors((oldArray) => {
                    return [...oldArray, "Enter the valid new password!"]
                })
            }
        }
        if(confirmPassword !== newPassword) {
            setErrors((oldArray) => {
                return [...oldArray, "Confirm password mismatch!"]
            });
        }
    }
    useEffect(() => {
        if(errors.length === 0) {
            axios
                .put(`${process.env.REACT_APP_BACKEND_URL}/user/changepassword`, {currentPassword, newPassword, confirmPassword}, { headers })
                .then((response) => {
                    setIsLoading(false);
                    success("Password successfully changed, redirecting...");
                    setErrors(["Testing"]);
                    setTimeout(() => {
                        navigate('/auth/user/my-account', { state: { token }});
                    }, 1000);
                })
                .catch((error) => {
                    setIsLoading(false);
                    const message = error?.response?.data?.message;
                    if(error?.response?.status === 500) {
                        setErrors(["Try again after some time"])
                    } else if(message.includes("Current Password is incorrect. Please try again.")) {
                        setErrors((oldArray) => {
                            if(oldArray.includes("Current password is incorrect!")) {
                                return [...oldArray];
                            }
                            return [...oldArray, "Current password is incorrect!"];
                        });
                    } else if(message.includes("Same as current password. Try another one")) {
                        setErrors((oldArray) => {
                            if(oldArray.includes("New password is same as current password!")) {
                                return [...oldArray];
                            }
                            return [...oldArray, "New password is same as current password!"];
                        });
                    }
                })
        } else if(errors.length > 0 && !errors.includes("Testing")){
            errors.forEach((message) => {
                notify(message);
            })
            setIsLoading(false);
        }
    }, [errors])
    if(!token) {
        return <Navigate to='/auth/login' />
    }
    return (
        <>
            <Navbar headers={headers} token={token}/> 
            <div className="hero-container">
                <div className="imgDiv">
                    <div className="img"></div>
                </div>
                <div className="content">
                    <h2 className="page-title">Change password!</h2>
                    <form className="form">
                        <div className='inputDiv'>
                            <label htmlFor='currentPassowrd'></label>
                            <input type='password' id='currentPassword' value={currentPassword} className="input" onChange={handleCurrentPasswordChange} placeholder='Current password'></input>
                        </div>
                        <div className='inputDiv'>
                            <label htmlFor='newPassword'></label>
                            <input type='password' id='newPassword' value={newPassword} className="input" onChange={handleNewPasswordChange} placeholder='New password'></input>
                        </div>
                        <div className='inputDiv'>
                            <label htmlFor='Confirm_Password'></label>
                            <input type='text' id='Confirm_Password' value={confirmPassword} className="input" onChange={handleConfirmPasswordChange} placeholder='Confirm Password'></input>
                        </div>
                        <div className="instructionDiv">
                            <p className="instruction">Note: Password must be 8 characters long, including 1 upper case alphabet, 1 lower case alphabet, and 1 special character.</p>
                        </div>
                    </form>
                    <button type='submit' className="button" onClick={handleVerifyClick}>Change</button>
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

export default Register;