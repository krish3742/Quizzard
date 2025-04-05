import { Navigate, useLocation, useNavigate } from 'react-router-dom';

import Navbar from './Navbar';

import Style from './Quiz.module.css';

function Quiz() {
    const location = useLocation();
    const navigate = useNavigate();
    const token = location?.state?.token;
    const headers = {'Authorization': `Bearer ${token}`};
    function handleCreateQuizClick(evt) {
        evt.preventDefault();
        navigate('/auth/quiz/create', { state: { token }});
    }
    function handlePublishQuizClick(evt) {
        evt.preventDefault();
        navigate('/auth/quiz/publish', { state: { token }});
    }
    if(!token) {
        return <Navigate to='/auth/login' />
    }
    return (
        <>
            <Navbar headers={headers} message='Quiz' token={token}/>
            <div className="heroContainer">
                <div className={Style.heroContainerContent} >
                    <h2 className="text-2xl font-bold mt-1">Create Quiz</h2>
                    <span className={Style.para}>Create you own customized quiz.</span>
                    <button className={Style.button} onClick={handleCreateQuizClick}>Create Quiz</button>
                </div>
                <div className={Style.heroContainerContent}>
                    <h2 className="text-2xl font-bold mt-1">Publish Quiz</h2>
                    <span className={Style.para}>Users can attempt only published quizzes.</span>
                    <button className={Style.button} onClick={handlePublishQuizClick}>Publish Quiz</button>
                </div>
            </div>  
        </>
    );
};

export default Quiz;