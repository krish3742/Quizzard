import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

import Navbar from './Navbar';

function ViewQuiz() {
    const location = useLocation();
    const navigate = useNavigate();
    const [users, setUsers] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [questionList, setQuestionList] = useState([{questionNumber: 1, question: '', options: {'1': ''}}]);
    const [answers, setAnswers] = useState({});
    const [passingPercentage, setPassingPercentage] = useState(0);
    const [isPublicQuiz, setIsPublicQuiz] = useState("Choose Option");
    const [allowedUser, setAllowedUser] = useState(['']);
    const token = location?.state?.token;
    const [quizId, setQuizId] = useState(location?.state?.viewQuizId);
    const headers = {'Authorization': `Bearer ${token}`};
    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_BACKEND_URL}/quiz/${quizId}`, { headers })
            .then((response) => {
                setIsLoading(false);
                const quiz = response?.data?.data; 
                setName(quiz?.name);
                setCategory(quiz?.category);
                setQuestionList(quiz?.questionList);
                setAnswers(quiz?.answers);
                setPassingPercentage(quiz?.passingPercentage);
                setIsPublicQuiz(quiz?.isPublicQuiz);
                setAllowedUser(quiz?.allowedUser);
            })
            .catch(() => {
                setIsLoading(false);
                setQuizId("");
                navigate('/auth/login');
            });
        axios
            .get(`${process.env.REACT_APP_BACKEND_URL}/user/all`, { headers })
            .then((response) => {
                setIsLoading(false);
                setUsers(response?.data?.data);
            })
            .catch((error) => {
                setIsLoading(false);
                navigate('/auth/login');
            });
    }, []);
    if(!token && !quizId) {
        return <Navigate to='/auth/login' />
    }
    return (
        <>
            <Navbar headers={headers} token={token} />
            <div className="heroContainer">
                <h2 className="pageTitle">Quiz</h2>
                <div className="heroContainerContent">
                    <h4 className="heroTitle">Quiz Name *</h4>
                    <input className="heroInput" value={name}></input>
                </div>
                <div className="heroContainerContent">
                    <h4 className="heroTitle">Category *</h4>
                    <input className="heroInput" value={category === "exam" ? "Exam" : "Test"}></input>
                </div>
                <div className="heroContainerContent">
                    <h4 className="heroTitle">Passing Percentage *</h4>
                    <input className="heroInput" value={passingPercentage}></input>
                </div>
                <div className="heroContainerContent">
                    <h4 className="heroTitle">Is this is a public quiz? *</h4>
                    <input className="heroInput" value={isPublicQuiz ? "True" : "False"}></input>
                </div>
                {isPublicQuiz === false &&
                    <div className="heroContainerContent">
                        <h4 className="heroTitle">Allowed Users *</h4>
                        {!!allowedUser &&
                            allowedUser.map((value, index) => {
                                return (
                                    <div className="heroOptionDiv" key={index}>
                                        <span id={index}>{index + 1}: </span>
                                        {users?.map((user) => {
                                            if(user?._id === value) {
                                                const result = `${value}: ${user.name}`;
                                                return <input className="heroInput" key={value} value={result}></input>
                                            }
                                        })}
                                    </div>
                                );
                            })
                        }
                    </div>  
                }
                {!!questionList && 
                    questionList.map((list) => {
                        return (
                            <div className="heroContainerContent" key={list.questionNumber}>
                                <h4 className="heroTitle">Question {list.questionNumber}: *</h4>
                                <input className="heroInput" value={list.question}></input>
                                <h4 className="heroTitle">Options</h4>
                                {!!list.options &&
                                    Object.keys(list.options).map(function (key) {
                                        return (
                                            <div className="heroOptionDiv" key={key}>
                                                <span key={key}>{key}: </span>
                                                <input className="heroInput" value={list.options[key]}></input>
                                            </div>
                                        );
                                    })
                                }
                                <div className="heroOptionDiv">
                                    <h4 className="heroTitle">Answer: </h4>
                                    <input className="heroInput" value={answers[list.questionNumber]}></input>
                                </div>
                            </div>
                        );
                    })
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

export default ViewQuiz;