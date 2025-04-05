import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

import Style from './Question.module.css';
import Navbar from './Navbar';

function FavoriteQuestion() {
    const location = useLocation();
    const navigate = useNavigate(); 
    const [flag, setFlag] = useState(false);
    const [favQues, setFavQues] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const token = location?.state?.token;
    const headers = {'Authorization': `Bearer ${token}`};
    function handleRemoveFavouriteClick(id, e) {
        setIsLoading(true);
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
    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_BACKEND_URL}/favquestion`, { headers })
            .then((response) => {
                setIsLoading(false);
                setFavQues(response?.data?.data?.favQues);
            })
            .catch((error) => {
                setIsLoading(false);
                navigate('/auth/login');
            })
    }, [flag]);
    if(!token) {
        return <Navigate to='/auth/login' />
    }
    return (
        <>
            <Navbar headers={headers} message='Favourite' token={token} />
            <div className="heroContainer">
                {!!favQues && favQues.length !== 0 ? 
                    favQues.map((list) => {
                        return (
                            <div className="heroContainerContent" key={list.question}>
                                <div className={Style.between}>
                                    <div className={Style.quesDiv}>
                                        <p className="heroTitle">Question: <span className={Style.para}>{list.question}</span></p>
                                    </div>
                                    <div>
                                        <button className={Style.favItem} onClick={(e) => handleRemoveFavouriteClick(list._id, e)}></button>
                                    </div>
                                </div>
                                <p className="heroTitle">Options:</p>
                                {!!list.options &&
                                    Object.keys(list.options).map(function (key) {
                                        return (
                                            <div className="heroOptionDiv" key={key}>
                                                <p className={Style.title}>{key}: <span className={Style.para}>{list.options[key]}</span></p>
                                            </div>
                                        );
                                    })
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
                <div className='loading'>
                    <div className='loader'></div>
                </div>
            }
        </>
    );
};

export default FavoriteQuestion;