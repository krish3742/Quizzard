import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import axios from 'axios';

import 'react-toastify/dist/ReactToastify.css';
import Style from './Question.module.css';

function ExamPage() {
    const params = useParams();
    const location = useLocation();
    const navigate = useNavigate(); 
    const [quiz, setQuiz] = useState();
    const [flag, setFlag] = useState(false);
    const [quizId, setQuizId] = useState(params?.id);
    const [isLoading, setIsLoading] = useState(true);
    const [errors, setErrors] = useState(["Testing"]);
    const [favQues, setFavQues] = useState();
    const [attemptedQuestion, setAttemptedQuestion] = useState({});
    const token = location?.state?.token;
    const notify = (message) => toast.error(message);
    const headers = {'Authorization': `Bearer ${token}`};
    function handleOptionChangeClick(questionNumber, key) {
        setAttemptedQuestion((oldObject) => {
            return {...oldObject, [questionNumber]: key};
        })
    }
    function handleClearButtonClick(questionNumber, e) {
        e.preventDefault();
        setAttemptedQuestion((oldObject) => {
            let object = {};
            for(let i in oldObject) {
                if(i == questionNumber) {
                    object = {...object};
                } else {
                    object = {...object, [i]: oldObject[i]};
                }
            }
            return object;
        })
    }
    function handleSubmitClick(evt) {
        evt.preventDefault();
        setErrors([]);
        setIsLoading(true);
        if(quiz.questionList.length !== Object.keys(attemptedQuestion).length) {
            notify('Attempt all the questions!');
            setErrors(["Attempt all the questions"]);
        }
    }
    function handleToggleFavouriteClick(questionList, e) {
        e.preventDefault();
        setIsLoading(true);
        if(!!favQues && favQues.length !== 0) {
            let id = "";
            const result = favQues.some((list) => {
                id = list._id;
                return list.question === questionList.question;
            })
            if(!result) {
                axios
                    .post(`${process.env.REACT_APP_BACKEND_URL}/favquestion`, { question: questionList.question, options: questionList.options}, { headers })
                    .then(() => {
                        setIsLoading(false);
                        setFlag(!flag);
                    })
                    .catch(() => {
                        setIsLoading(false);
                        navigate('/auth/login');
                    })
            } else {
                axios
                    .delete(`${process.env.REACT_APP_BACKEND_URL}/favquestion/${id}`, { headers })
                    .then(() => {
                        setIsLoading(false);
                        setFlag(!flag);
                    })
                    .catch(() => {
                        setIsLoading(false);
                        navigate('/auth/login')
                    })
            }
        } else {
            axios
                .post(`${process.env.REACT_APP_BACKEND_URL}/favquestion`, { question: questionList.question, options: questionList.options}, { headers })
                .then(() => {
                    setIsLoading(false);
                    setFlag(!flag); 
                })
                .catch(() => {
                    setIsLoading(false);
                    navigate('/auth/login');
                })
        }
    }
    useEffect(() => {
        if(!!errors && errors.length === 0) {
            axios
                .post(`${process.env.REACT_APP_BACKEND_URL}/exam`, {quizId: params?.id, attemptedQuestion}, { headers })
                .then((response) => {
                    setIsLoading(false);
                    navigate(`/auth/report/${response?.data?.data?.reportId}`, { state: { token }});
                })
                .catch((error) => {
                    setIsLoading(false);
                    navigate('/auth/login');
                })
        }
        if(!!quizId) {
            axios
                .get(`${process.env.REACT_APP_BACKEND_URL}/exam/${quizId}`, { headers })
                .then((response) => {
                    setIsLoading(false);
                    setQuizId();
                    setQuiz(response?.data?.data);
                })
                .catch((error) => {
                    setIsLoading(false);
                    setQuizId();
                    const message = error?.response?.data?.message;
                    if(message.includes("You have zero attempts left!")) {
                        navigate('/auth/published-quiz', { state: { token, message: true }});
                    } else {
                        navigate('/auth/login');
                    }
                })
        }
        axios
            .get(`${process.env.REACT_APP_BACKEND_URL}/favquestion`, { headers })
            .then((response) => {
                setIsLoading(false);
                setFavQues(response?.data?.data?.favQues);
            })
            .catch(() => {
                setIsLoading(false);
                navigate('/auth/login');
            })
    }, [errors, flag]);
    if(!token) {
        return <Navigate to='/auth/login' />
    }
    return (
        <>
            <div className="navbar">
                <h2 className="app-title">Quizzard</h2>
            </div>
            <div className="heroContainer">
                <h2 className="pageTitle">{quiz?.name}</h2>
                {!!quiz && quiz?.questionList.map((list) => {
                    return (
                        <div className="heroContainerContent" key={list.questionNumber}>
                            <div className={Style.between}>
                                <div className={Style.quesDiv}>
                                    <p className="heroTitle">Question {list.questionNumber}: <span className={Style.para}>{list.question} *</span></p>
                                </div>
                                <div>
                                    <button  className={!!favQues && favQues.some((favList) => {
                                        return list.question === favList.question;
                                    }) ? Style.favItem : Style.unfavItem
                                    } onClick={(e) => handleToggleFavouriteClick(list, e)}></button>
                                </div>
                            </div>
                            <h4 className="heroTitle">Options</h4>
                            {!!list.options &&
                                Object.keys(list.options).map(function (key) {
                                    return (
                                        <div className="heroOptionDiv" key={key}>
                                            <input type='radio' name={'question' + list.questionNumber} onChange={(e) => handleOptionChangeClick(list.questionNumber, key)} value={key} 
                                                checked={!!attemptedQuestion && 
                                                    Object.keys(attemptedQuestion).some((index) => {
                                                        if(index == list.questionNumber && attemptedQuestion[index] == key) {
                                                            return true;
                                                        }
                                                        return false;
                                                    })
                                            }></input>
                                            <p className={Style.title}>{key}: <span className={Style.para}>{list.options[key]}</span></p>
                                        </div>
                                    );    
                                })
                            }
                            <button className={Style.clearButton} onClick={(e) => handleClearButtonClick(list.questionNumber, e)}>Clear choice</button>
                        </div>
                    );
                })}
                <button className="heroButton" onClick={(e) => handleSubmitClick(e)}>Submit</button>
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

export default ExamPage;