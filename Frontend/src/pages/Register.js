import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

import 'react-toastify/dist/ReactToastify.css';

function Register(props) {
    let flag = 1;
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState(["Testing"]);
    const [isLoading, setIsLoading] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState("");
    const notify = (message) => toast.error(message);
    function handleNameChange(evt) {
        setName(evt.target.value);
    }
    function handleEmailChange(evt) {
        setEmail(evt.target.value);
    }
    function handlePasswordChange(evt) {
        setPassword(evt.target.value);
    }
    function handleConfirmPasswordChange(evt) {
        setConfirmPassword(evt.target.value);
    }
    function handleRegisterClick(evt) {
        evt.preventDefault();
        setIsLoading(true);
        setErrors([]);
        flag = 1;
        if(name.length < 5) {
            setErrors((oldArray) => {
                return [...oldArray, "Name must be 5 characters long!"]
            });
        }
        if(!email) {
            setErrors((oldArray) => {
                return [...oldArray, "Please enter email!"]
            });
        }
        if(!password) {
            setErrors((oldArray) => {
                return [...oldArray, "Please enter password!"]
            });
        } else {
            if(
                password.indexOf('!') === -1 &&
                password.indexOf("@") === -1 &&
                password.indexOf("#") === -1 &&
                password.indexOf("$") === -1 &&
                password.indexOf("*") === -1
            ) {
                flag = 0;
            }
            if(!flag) {
                setErrors((oldArray) => {
                    return [...oldArray, "Enter the valid password!"]
                })
            }
            for(let index = 0; index < password.length; index++) {
                if(password.charAt(index) >= 'a' && password.charAt(index) <= 'z') {
                    flag = 1;
                    break;
                }
            }
            if(!flag) {
                setErrors((oldArray) => {
                    return [...oldArray, "Enter the valid password!"]
                })
            }
            for(let index = 0; index < password.length; index++) {
                if(password.charAt(index) >= 'A' && password.charAt(index) <= 'Z') {
                    flag = 1;
                    break;
                }
            }
            if(!flag) {
                setErrors((oldArray) => {
                    return [...oldArray, "Enter the valid password!"]
                })
            }
            for(let index = 0; index < password.length; index++) {
                if(password.charAt(index) >= '0' && password.charAt(index) <= '9') {
                    flag = 1;
                    break;
                }
            }
            if(!flag) {
                setErrors((oldArray) => {
                    return [...oldArray, "Enter the valid password!"]
                })
            }
        }
        if(confirmPassword !== password) {
            setErrors((oldArray) => {
                return [...oldArray, "Confirm password mismatch!"]
            });
        }
    }
    const data = {
        name, 
        email,
        password,
        confirmPassword
    };
    useEffect(() => {
        if(errors.length === 0) {
            axios
                .post(`${process.env.REACT_APP_BACKEND_URL}/auth`, data)
                .then((response) => {
                    setIsLoading(false);
                    if(response.data.message === "OTP has sent on your email. Please Verify") {
                        navigate('/auth/verifyaccount', { state: { token: response.data.data.token }});
                    }
                })
                .catch((error) => {
                    setIsLoading(false);
                    const message = error?.response?.data?.message;
                    if(error?.response?.status === 500) {
                        setErrors(["Try again after some time!"])
                    } else if(message.includes("Validation failed!")) {
                        const path = error?.response?.data?.data[0]?.msg;
                        if(path.includes("User already exist!")) {
                            setErrors((oldArray) => {
                                if(oldArray.includes("Account already registered, login!")) {
                                    return [...oldArray];
                                }
                                return [...oldArray, "Account already registered, login!"];
                            });
                        } else {
                            setErrors((oldArray) => {
                                if(oldArray.includes("Invalid email!")) {
                                    return [...oldArray];
                                }
                                return [...oldArray, "Invalid email!"];
                            });
                        }
                    }
                })
        } else if(errors.length > 0 && !errors.includes("Testing")){
            errors.forEach((message) => {
                notify(message);
            })
            setIsLoading(false);
        }
    }, [errors])
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
                    <h1 className="page-title">Register yourself!</h1>
                    <form className="form">
                        <div className='inputDiv'>
                            <label htmlFor='Name'></label>
                            <input type='text' id='Name' value={name} className="input" onChange={handleNameChange} placeholder='Name'></input>
                        </div>
                        <div className='inputDiv'>
                            <label htmlFor='Email'></label>
                            <input type='text' id='Email' value={email} className="input" onChange={handleEmailChange} placeholder='Email ID'></input>
                        </div>
                        <div className='inputDiv'>
                            <label htmlFor='Password'></label>
                            <input type='password' id='Password' value={password} className="input" onChange={handlePasswordChange} placeholder='Password'></input>
                        </div>
                        <div className='inputDiv'>
                            <label htmlFor='Confirm_Password'></label>
                            <input type='password' id='Confirm_Password' value={confirmPassword} className="input" onChange={handleConfirmPasswordChange} placeholder='Confirm Password'></input>
                        </div>
                        <div className="instructionDiv">
                            <p className="instruction">Note: Password must be 8 characters long, including 1 upper case alphabet, 1 lower case alphabet, and 1 special character.</p>
                        </div>
                    </form>
                    <button type='submit' className="button" onClick={handleRegisterClick}>Register</button>
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

export default Register;