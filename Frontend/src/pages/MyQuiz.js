import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

import Navbar from './Navbar';

import Style from './MyQuiz.module.css';

function MyQuiz() {
    const location = useLocation();
    const navigate = useNavigate();
    const [flag, setFlag] = useState(true);
    const [quizId, setQuizId] = useState();
    const [viewQuizId, setViewQuizId] = useState();
    const [myQuizList, setMyQuizList] = useState([]); 
    const [isLoading, setIsLoading] = useState(true);
    const token = location?.state?.token;
    const headers = {'Authorization': `Bearer ${token}`};
    function handleEditButtonClick(id, e) {
        e.preventDefault();
        setQuizId(id);
        setIsLoading(true);
        setFlag(!flag);
    }
    function handleDeleteQuizClick(id, e) {
        e.preventDefault();
        setIsLoading(true);
        axios
            .delete(`${process.env.REACT_APP_BACKEND_URL}/quiz/${id}`, { headers })
            .then(() => {
                setFlag(!flag);
            })
            .catch(() => {
                setIsLoading(false);
                setFlag(!flag);
                navigate('/auth/login');
            })
    }
    function handleViewQuizClick(id, e) {
        e.preventDefault();
        setViewQuizId(id);
        setIsLoading(true);
        setFlag(!flag);
    }
    useEffect(() => {
        if(!!quizId) {
            axios
                .get(`${process.env.REACT_APP_BACKEND_URL}/quiz/${quizId}`, { headers })
                .then((response) => {
                    setIsLoading(false);
                    navigate('/auth/quiz/update', { state: { token, quizId }});
                })
                .catch((error) => {
                    setIsLoading(false);
                    navigate('/auth/login');
                })
        }
        if(!!viewQuizId) {
            navigate('/auth/quiz/view', { state: { token, viewQuizId}});
        }
        axios
            .get(`${process.env.REACT_APP_BACKEND_URL}/quiz`, { headers })
            .then((response) => {
                setIsLoading(false);
                setMyQuizList(response?.data?.data);
            })
            .catch((error) => {
                setIsLoading(false);
                const message = error?.response?.data?.message;
                if(message.includes('Quiz not found!')) {
                    setMyQuizList(["No quiz found"]);
                }
            })
    }, [quizId, flag]);
    if(!token) {
        return <Navigate to='/auth/login' />
    }
    return (
        <>
            <Navbar headers={headers} message='MyQuiz' token={token} />
            <div className="heroContainer">
                <h2 className="pageTitle">My Quiz</h2>
                {myQuizList.length != 0 ?
                    myQuizList.map((list) => {
                        return (
                            <div className={Style.heroContainerContent} key={list._id}> 
                                <h4 className={Style.title}>{list.name}</h4>
                                <div className={Style.buttonDiv}>
                                    <button className={Style.button} onClick={(e) => handleViewQuizClick(list._id, e)}>View</button>
                                    {list?.isPublished ? 
                                        <button className={Style.buttonDisabled} disabled={true}>Edit</button> :
                                        <button className={Style.button} onClick={(e) => handleEditButtonClick(list._id, e)}>Edit</button>
                                    }
                                    {list?.isPublished ? 
                                        <button className={Style.buttonDisabled} disabled={true}>Delete</button> :
                                        <button className={Style.button} onClick={(e) => handleDeleteQuizClick(list._id, e)}>Delete</button>                                            
                                    }
                                </div>
                            </div>
                        );
                    }) :
                    <div className="heroContainerContent"> 
                        <h4 className={Style.title}>No quiz found!</h4>
                    </div>
                }
            </div>
            {isLoading && 
                <div className="loading">
                    <div className="loader"></div>
                </div>
            }
        </>
    );
};

export default MyQuiz;