import { useLocation, Navigate, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { AutoTabProvider } from 'react-auto-tab';
import { useEffect, useState } from 'react';
import axios from 'axios';

import Navbar from './Navbar';

import Style from './Verify.module.css';
import 'react-toastify/dist/ReactToastify.css';

function VerifyDeactivateOtpPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const [otp, setOtp] = useState();
    const [otp1, setOtp1] = useState("");
    const [otp2, setOtp2] = useState("");
    const [otp3, setOtp3] = useState("");
    const [otp4, setOtp4] = useState("");
    const [otp5, setOtp5] = useState("");
    const [otp6, setOtp6] = useState("");
    const [flag, setFlag] = useState(true);
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const token = location?.state?.token;
    const notify = (message) => toast.error(message);
    const success = (message) => toast.success(message);
    const headers = {'Authorization': `Bearer ${token}`};
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
                    .post(`${process.env.REACT_APP_BACKEND_URL}/user/deactivate/verify-deactivate-account-otp`, { otp }, { headers })
                    .then((response) => {
                        setIsLoading(false);
                        success('Account deactivated, redirecting...');
                        setTimeout(() => {
                            navigate('/auth/login');
                        }, 1000)
                    })
                    .catch((error) => {
                        const message = error?.response?.data?.message;
                        setIsLoading(false);
                        if(error?.response?.status === 500) {
                            notify("Try again after some time!");
                        } else if(message.includes("Incorrect OTP")) {
                            notify("Incorrect OTP!");
                        } else if(message.includes("OTP has not send on this email ")) {
                            notify("OTP expired, redirecting...");
                            setTimeout(() => {
                                navigate('/auth/user/my-account', { state: { token }});
                            }, 1000)
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
        return <Navigate to='/auth/login' /> ; 
    }
    return (
        <>
            <Navbar headers={headers} token={token} />
            <div className="hero-container">
                <div className="imgDiv">
                    <div className="img"></div>
                </div>
                <div className="content">
                    <h2 className="page-title">Deactivate account!</h2>
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
                    <div className={Style.instructionDiv}>
                        <p className="instruction">Note: An OTP has been sent on your email. Please verify.</p>
                    </div>
                    <button type='submit' onClick={handleVerifyClick} className="button">Verify</button>
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

export default VerifyDeactivateOtpPage;