import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

import Style from './Reports.module.css';
import Navbar from './Navbar';

function Reports() {
    const params = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const [report, setReport] = useState();
    const [quizId, setQuizId] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const reportId = params?.reportId;
    const token = location?.state?.token;
    const headers = {'Authorization': `Bearer ${token}`};
    function handleAllReportsClick(evt) {
        evt.preventDefault();
        navigate('/auth/reports', { state: { token }});
    }
    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_BACKEND_URL}/report/${reportId}`, { headers })
            .then((response) => {
                setIsLoading(false);
                setReport(response?.data?.data);
                setQuizId(response?.data?.data?.quizId);
            })
            .catch((error) => {
                setIsLoading(false);
                navigate('/auth/login');
            })
    }, [quizId]);
    if(!token) {
        return <Navigate to='/auth/login' />
    }
    return (
        <>
            <Navbar headers={headers} token={token} />
            <div className="heroContainer">
                <h2 className="pageTitle">Report</h2>
                {!!report &&
                    <div className="heroContainerContent"> 
                        <div>
                            <label className="heroTitle">Status: <span className={Style.para}>{report?.result}</span></label>
                        </div>
                        <div>
                            <label className="heroTitle">Marks: <span className={Style.para}>{report?.score}/{report?.total}</span></label>
                        </div>
                        <div>
                            <label className="heroTitle">Percentage: <span className={Style.para}>{report?.percentage}%</span></label>
                        </div>
                    </div>
                }
                <button onClick={handleAllReportsClick} className={Style.button}>All Reports</button>
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