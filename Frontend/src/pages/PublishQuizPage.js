import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

import Navbar from './Navbar';

import Style from './Publishing.module.css';

function PublishQuiz() {
    const location = useLocation();
    const navigate = useNavigate();
    const [flag, setFlag] = useState(true);
    const [quizId, setQuizId] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [myQuizList, setMyQuizList] = useState([]);
    const token = location?.state?.token;
    const headers = {'Authorization': `Bearer ${token}`};
    function handlePublishButtonClick(id, e) {
        e.preventDefault();
        setIsLoading(true);
        setQuizId(id);
    }
    useEffect(() => {
        if(!!quizId) {
            axios
                .patch(`${process.env.REACT_APP_BACKEND_URL}/quiz/publish`, { quizId }, { headers })
                .then((response) => {
                    setQuizId("");
                    setFlag(!flag);
                })
                .catch((error) => {
                    setQuizId("");
                    setFlag(!flag);
                    navigate('/auth/login');
                })
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
            <Navbar headers={headers} token={token} />
            <div className="heroContainer">
                <h2 className="pageTitle">Publish Quiz</h2>
                {myQuizList.length != 0 ?
                    myQuizList.map((list) => {
                        return (
                            <div className={Style.heroContainerContent} key={list._id}> 
                                <h4 className={Style.title}>{list.name}</h4>
                                {list?.isPublished ? 
                                    <button type='button' className={Style.buttonDisabled} disabled={true}>Published</button> :
                                    <button className={Style.button} onClick={(e) => handlePublishButtonClick(list._id, e)}>Publish</button>
                                }
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

export default PublishQuiz;