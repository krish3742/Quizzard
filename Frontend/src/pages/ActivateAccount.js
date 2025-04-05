import { ToastContainer, toast } from 'react-toastify';
import { AutoTabProvider } from 'react-auto-tab';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

import Style from './ActivateAccount.module.css';
import 'react-toastify/dist/ReactToastify.css';

function ActivateAccount() {
    const navigate = useNavigate();
    const [key, setKey] = useState(1);
    const [key1, setKey1] = useState("");
    const [key2, setKey2] = useState("");
    const [key3, setKey3] = useState("");
    const [key4, setKey4] = useState("");
    const [key5, setKey5] = useState("");
    const [key6, setKey6] = useState("");
    const [key7, setKey7] = useState("");
    const [key8, setKey8] = useState("");
    const [email, setEmail] = useState("");
    const [flag, setFlag] = useState(true);
    const [errors, setErrors] = useState([]);
    const success = (message) => toast.success(message);
    const notify = (message) => toast.error(message);
    const [isLoading, setIsLoading] = useState(false);
    function handleKey1Change(evt) {
        setKey1(evt.target.value);
    }
    function handleKey2Change(evt) {
        setKey2(evt.target.value);
    }
    function handleKey3Change(evt) {
        setKey3(evt.target.value);
    }
    function handleKey4Change(evt) {
        setKey4(evt.target.value);
    }
    function handleKey5Change(evt) {
        setKey5(evt.target.value);
    }
    function handleKey6Change(evt) {
        setKey6(evt.target.value);
    }
    function handleKey7Change(evt) {
        setKey7(evt.target.value);
    }
    function handleKey8Change(evt) {
        setKey8(evt.target.value);
    }
    function handleEmailChange(evt) {
        setEmail(evt.target.value);
    }
    function handleVerifyClick(evt) {
        evt.preventDefault();
        setErrors([]);
        setIsLoading(true);
        setFlag(!flag);
        if(!email) {
            setErrors((oldArray) =>  [...oldArray, "Please enter email"]);
            notify('Please enter email!');
        }
        setKey(key1 + key2 + key3 + key4 + key5 + key6 + key7 + key8);  
    }
    useEffect(() => {
        if(!!key && key.length === 8 && errors.length === 0) {
            axios
                .post(`${process.env.REACT_APP_BACKEND_URL}/auth/activateaccount`, {email, key})
                .then((response) => {
                    setIsLoading(false);
                    success('Account activated, please login');
                })
                .catch((error) => {
                    setIsLoading(false);
                    const message = error?.response?.data?.message;
                    if(error.response.status === 500) {
                        notify('Try again after some time!');
                    } else if(message.includes("Invalid Key")) {
                        notify('Incorrect key!');
                    } else if(message.includes("No user exist")) {
                        notify('Account not registered, please register!');
                    } else if(message.includes("User is already Activated")) {
                        notify('Account already activated!');
                    }
                })
        } else if(key !== 1 && key.length < 8) {
            setIsLoading(false);
            setErrors((oldArray) => {
                if(oldArray.includes("Please enter key")) {
                    return [...oldArray];
                }
                return [...oldArray, "Please enter key"];
            });
            notify('Please enter key!');
        } else {
            setIsLoading(false);
        }
    }, [key, flag]);
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
                    <h2 className="page-title">Activate account!</h2>
                    <div className={Style.contentTitle1}>
                        Enter Email
                    </div>
                    <div className={Style.inputDiv}>
                        <label htmlFor='Email'></label>
                        <input type='text' id='Email' value={email} onChange={handleEmailChange} className={Style.input} placeholder='Email ID'></input>
                    </div>
                    <div className={Style.contentTitle2}>
                        Enter Key
                    </div>
                    <AutoTabProvider settings={{tabOnMax: true}}>
                        <div className={Style.otpInputDiv}>
                            <div>
                                <label htmlFor='Key'></label>
                                <input type='text' id='key1' maxLength={1} value={key1} onChange={handleKey1Change} className={Style.otpInput} tabbable="true" ></input>
                            </div>
                            <div>
                                <label htmlFor='Key'></label>
                                <input type='text' id='key2' maxLength={1} value={key2} onChange={handleKey2Change} className={Style.otpInput} tabbable="true" ></input>
                            </div>
                            <div>
                                <label htmlFor='Key'></label>
                                <input type='text' id='key3' maxLength={1} value={key3} onChange={handleKey3Change} className={Style.otpInput} tabbable="true" ></input>
                            </div>
                            <div>
                                <label htmlFor='Key'></label>
                                <input type='text' id='key4' maxLength={1} value={key4} onChange={handleKey4Change} className={Style.otpInput} tabbable="true" ></input>
                            </div>
                            <div>
                                <label htmlFor='Key'></label>
                                <input type='text' id='key5' maxLength={1} value={key5} onChange={handleKey5Change} className={Style.otpInput} tabbable="true" ></input>
                            </div>
                            <div>
                                <label htmlFor='Key'></label>
                                <input type='text' id='key6' maxLength={1} value={key6} onChange={handleKey6Change} className={Style.otpInput} tabbable="true" ></input>
                            </div>
                            <div>
                                <label htmlFor='Key'></label>
                                <input type='text' id='key7' maxLength={1} value={key7} onChange={handleKey7Change} className={Style.otpInput} tabbable="true" ></input>
                            </div>
                            <div>
                                <label htmlFor='Key'></label>
                                <input type='text' id='key8' maxLength={1} value={key8} onChange={handleKey8Change} className={Style.otpInput} tabbable="true" ></input>
                            </div>
                        </div>
                    </AutoTabProvider>
                    <div className={Style.instructionDiv}>
                        <p className="instruction">Note: You will have only one chance to login after activating successfully. If you fail, your account will be blocked for 24 hours.</p>
                    </div>
                    <button type='submit' onClick={handleVerifyClick} className='button'>Verify</button>
                    <div className='redirectDiv'>
                        <p>Account already activated? <span className='redirectLink' onClick={() => navigate('/auth/login')}>Login Here!</span></p>
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

export default ActivateAccount;