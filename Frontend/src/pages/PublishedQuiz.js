import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

import Style from './Publishing.module.css';
import Navbar from './Navbar';

function PublishedQuiz() {
    const location = useLocation();
    const navigate = useNavigate(); 
    const [quizId, setQuizId] = useState();
    const [quizExam, setQuizExam] = useState([]);
    const [quizTest, setQuizTest] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isAttempt, setIsAttempt] = useState(false);
    const token = location?.state?.token;
    const [isMessage, setIsAMessage] =  useState(location?.state?.message);
    const headers = {'Authorization': `Bearer ${token}`};
    function handleAttemptClick(evt) {
        evt.preventDefault();
        navigate(`/auth/exam/${quizId}`, { state: { token }});
    }
    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_BACKEND_URL}/quiz/allpublishedquiz/exam`, { headers })
            .then((response) => {
                setIsLoading(false);
                setQuizExam(response?.data?.data);
            })
            .catch((error) => {
                setIsLoading(false);
                navigate('/auth/login');
            })
        axios
            .get(`${process.env.REACT_APP_BACKEND_URL}/quiz/allpublishedquiz/test`, { headers })
            .then((response) => {
                setIsLoading(false);
                setQuizTest(response?.data?.data);
            })
            .catch(() => {
                setIsLoading(false);
                navigate('/auth/login');
            })
    }, []);
    if(!token) {
        return <Navigate to='/auth/login' />
    }
    return (
        <>
            <Navbar headers={headers} message='Quizzes' token={token} />
            <div className="heroContainer">
                <h2 className="pageTitle">Exam</h2>
                {quizExam.length !== 0 ?
                    quizExam.map((list) => {
                        return (
                            <div className={Style.heroContainerContent} key={list._id}> 
                                <h4 className={Style.title}>{list.name}</h4>
                                <button className={Style.button} onClick={() => {setIsAttempt(true); setQuizId(list._id)}}>Attempt</button>
                            </div>
                        );
                    }) :
                    <div className="heroContainerContent"> 
                        <h4 className={Style.title}>No quiz found!</h4>
                    </div>
                }
                <br />
                <h2 className="pageTitle">Test</h2>
                {quizTest.length !== 0 ?
                    quizTest.map((list) => {
                        return (
                            <div className={Style.heroContainerContent} key={list._id}> 
                                <h4 className={Style.title}>{list.name}</h4>
                                <button className={Style.button} onClick={() => {setIsAttempt(true); setQuizId(list._id)}}>Attempt</button>
                            </div>
                        );
                    }) :
                    <div className="heroContainerContent"> 
                        <h4 className={Style.title}>No quiz found!</h4>
                    </div>
                }
            </div>
            {isAttempt && 
                <div className="loading">
                    <div className={Style.confirmationDiv}>
                        <label className='text-2xl'>Are you sure?</label>
                        <div className={Style.buttonDiv}>
                            <button className={Style.confirmationButton} onClick={(e) => handleAttemptClick(e)}>Attempt</button>
                            <button className={Style.confirmationButton} onClick={(e) => setIsAttempt(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            }
            {!!isMessage && 
                <div className='loading'>
                    <div className={Style.confirmationDiv}>
                        <label className='text-lg'>You have zero attempts left!</label>
                        <div className={Style.buttonDiv}>
                            <button className={Style.confirmationButton} onClick={(e) => setIsAMessage(false)}>Okay</button>
                        </div>
                    </div>
                </div>
            }
            {isLoading && 
                <div className="loading">
                    <div className="loader"></div>
                </div>
            }
        </>
    );
};

export default PublishedQuiz;