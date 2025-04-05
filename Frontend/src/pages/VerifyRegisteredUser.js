import { useLocation, Navigate, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { AutoTabProvider } from 'react-auto-tab';
import { useEffect, useState } from 'react';
import axios from 'axios';

import Style from './Verify.module.css';
import 'react-toastify/dist/ReactToastify.css';

function VerifyRegisteredUser() {
    const location = useLocation();
    const navigate = useNavigate();
    const [otp, setOtp] = useState();
    const [otp1, setOtp1] = useState("");
    const [otp2, setOtp2] = useState("");
    const [otp3, setOtp3] = useState("");
    const [otp4, setOtp4] = useState("");
    const [otp5, setOtp5] = useState("");
    const [otp6, setOtp6] = useState("");
    const token = location?.state?.token;
    const [flag, setFlag] = useState(true);
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading]= useState(false);
    const notify = (message) => toast.error(message);
    const success = (message) => toast.success(message);
    function handleOtp1Change(evt) {
        setOtp1(evt.target.value);
    }
    function handleOtp2Change(evt) {
        setOtp2(evt.target.value);
    }
    function handleOtp3Change(evt) {
        setOtp3(evt.target.value);
    }
    function handleOtp4Change(evt) {
        setOtp4(evt.target.value);
    }
    function handleOtp5Change(evt) {
        setOtp5(evt.target.value);
    }
    function handleOtp6Change(evt) {
        setOtp6(evt.target.value);
    }
    function handleResendClick(evt) {
        evt.preventDefault();
        setErrors([]);
        setIsLoading(true);
        axios
            .get(`${process.env.REACT_APP_BACKEND_URL}/auth/resend-registration-otp/${token}`)
            .then((response) => { 
                setIsLoading(false);
                success('OTP has been send successfully!') 
            })
            .catch((error) => {
                const message = error.response.data.message;
                setIsLoading(false);
                if(error.response.status === 500) {
                    notify('Try again after some time!');
                } else if(message.includes("Resend OTP")) {
                    notify(`${message}!`);
                } else if(message.includes("Already Verified your Account")) {
                    notify('Account already registered, login!');
                }
            })
    }
    function handleVerifyClick(evt) {
        evt.preventDefault();
        setErrors([]);
        setIsLoading(true);
        if(!otp1 || otp1 === undefined) {
            setErrors((oldArray) =>  {
                if(oldArray.includes("Please enter OTP!")) {
                    return [...oldArray];
                }
                return [...oldArray, "Please enter OTP!"];
            });
        }
        if(!otp2 || otp2 === undefined) {
            setErrors((oldArray) =>  {
                if(oldArray.includes("Please enter OTP!")) {
                    return [...oldArray];
                }
                return [...oldArray, "Please enter OTP!"];
            });
        }
        if(!otp3 || otp3 === undefined) {
            setErrors((oldArray) =>  {
                if(oldArray.includes("Please enter OTP!")) {
                    return [...oldArray];
                }
                return [...oldArray, "Please enter OTP!"];
            });
        }
        if(!otp4 || otp4 === undefined) {
            setErrors((oldArray) =>  {
                if(oldArray.includes("Please enter OTP!")) {
                    return [...oldArray];
                }
                return [...oldArray, "Please enter OTP!"];
            });
        }
        if(!otp5 || otp5 === undefined) {
            setErrors((oldArray) =>  {
                if(oldArray.includes("Please enter OTP!")) {
                    return [...oldArray];
                }
                return [...oldArray, "Please enter OTP!"];
            });
        }
        if(!otp6 || otp6 === undefined) {
            setErrors((oldArray) =>  {
                if(oldArray.includes("Please enter OTP!")) {
                    return [...oldArray];
                }
                return [...oldArray, "Please enter OTP!"];
            });
        }
        setOtp(otp1 + otp2 + otp3 + otp4 + otp5 + otp6);
        setFlag(!flag);
    }
    useEffect(() => {
        if(!errors.includes("Please enter OTP!")) {
            const otpToNumber = parseInt(otp);
            if(otpToNumber) {
                axios
                    .post(`${process.env.REACT_APP_BACKEND_URL}/auth/verify-registration-otp/${token}`, { otp })
                    .then((response) => {
                        setIsLoading(false);
                        success('Account registered, please login!');
                    })
                    .catch((error) => {
                        const message = error.response.data.message;
                        setIsLoading(false);
                        if(error.response.status === 500) {
                            notify("Try again after some time!");
                        } else if(message.includes("OTP has not send on this email or Invalid OTP")) {
                            notify("OTP expired, please resend!");
                        } else if(message.includes("Incorrect OTP")) {
                            notify("Incorrect OTP!");
                        } else if(message.includes("User already exist")) {
                            notify("Account already registered, login!");
                        }
                    })
            } else if(!isNaN(otpToNumber)){
                notify("Please enter OTP!");
            }
        } else if(errors.length > 0) {
            errors.forEach((message) => {
                notify(message);
            })
            setIsLoading(false);
        }
    }, [otp, flag]);
    if(!token) {
        return <Navigate to='/auth/register' /> ; 
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
                    <h2 className="page-title">Verify yourself!</h2>
                    <div className={Style.contentTitle}>
                        Enter OTP
                    </div>
                    <AutoTabProvider settings={{tabOnMax: true}}>
                        <div className={Style.otpInputDiv}>
                            <div>
                                <label htmlFor='OTP'></label>
                                <input type='text' id='otp1' value={otp1} maxLength={1} onChange={handleOtp1Change} className={Style.otpInput} tabbable="true" ></input>
                            </div>
                            <div>
                                <label htmlFor='OTP'></label>
                                <input type='text' id='otp2' value={otp2} maxLength={1} onChange={handleOtp2Change} className={Style.otpInput} tabbable="true" ></input>
                            </div>
                            <div>
                                <label htmlFor='OTP'></label>
                                <input type='text' id='otp3' value={otp3} maxLength={1} onChange={handleOtp3Change} className={Style.otpInput} tabbable="true" ></input>
                            </div>
                            <div>
                                <label htmlFor='OTP'></label>
                                <input type='text' id='otp4' value={otp4} maxLength={1} onChange={handleOtp4Change} className={Style.otpInput} tabbable="true" ></input>
                            </div>
                            <div>
                                <label htmlFor='OTP'></label>
                                <input type='text' id='otp5' value={otp5} maxLength={1} onChange={handleOtp5Change} className={Style.otpInput} tabbable="true" ></input>
                            </div>
                            <div>
                                <label htmlFor='OTP'></label>
                                <input type='text' id='otp6' value={otp6} maxLength={1} onChange={handleOtp6Change} className={Style.otpInput} tabbable="true" ></input>
                            </div>
                        </div>
                    </AutoTabProvider>
                    <div className={Style.contentResendDiv}>
                        <p className='redirectLink' onClick={handleResendClick}>Resend</p>
                    </div>
                    <div className={Style.instructionDiv}>
                        <p className="instruction">Note: An OTP has been sent on your email. Please verify.</p>
                    </div>
                    <button type='submit' onClick={handleVerifyClick} className='button'>Verify</button>
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

export default VerifyRegisteredUser;