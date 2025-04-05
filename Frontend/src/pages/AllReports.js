import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

import Style from './Publishing.module.css';
import Navbar from './Navbar';

function Reports() {
    const location = useLocation();
    const navigate = useNavigate();
    const [flag, setFlag] = useState(0);
    const [reports, setReports] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [tempReports, setTempReports] = useState();
    const token = location?.state?.token;
    const headers = {'Authorization': `Bearer ${token}`};
    function handleViewButtonClick(id, evt) {
        evt.preventDefault();
        navigate(`/auth/report/${id}`, { state: { token }});
    }
    useEffect(() => {
        if(!tempReports) {
            axios
                .get(`${process.env.REACT_APP_BACKEND_URL}/report`, { headers })
                .then((response) => {
                    setFlag(!flag);
                    setTempReports(response?.data?.data);
                })
                .catch(() => {
                    setIsLoading(false);
                    navigate('/auth/login');
                });
        } else if(!!tempReports) {
            tempReports.map((report) => {
                axios
                    .get(`${process.env.REACT_APP_BACKEND_URL}/quiz/name/${report?.quizId}`, { headers })
                    .then((response) => {
                        setIsLoading(false);
                        setReports((oldArray) => [...oldArray, {...report, quizName: response?.data?.data?.name}]);
                    })
                    .catch(() => {
                        setIsLoading(false);
                        navigate('/auth/login');
                    })
            });
        }
    }, [flag]);
    if(!token) {
        return <Navigate to='/auth/login' />
    }
    return (
        <>
            <Navbar headers={headers} token={token} />
            <div className="heroContainer">
                <h2 className="pageTitle">All Reports</h2>
                {!!reports &&
                    reports.map((report) => {
                        return (
                            <div className={Style.heroContainerContent} key={report?._id}>
                                <h4 className={Style.title}>{report?.quizName}</h4>
                                <button className={Style.button} onClick={(evt) => handleViewButtonClick(report?._id, evt)}>View</button>
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

export default Reports;