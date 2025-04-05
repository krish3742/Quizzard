import axios from "axios";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function ForgotPasword() {
    const params = useParams();
    const token = params.token;
    const navigate = useNavigate();
    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_BACKEND_URL}/auth/forgotpassword/${token}`)
            .then((response) => {
                const message = response?.data?.message;
                const messageArray = message.split('/');
                const userId = messageArray[5];
                navigate(`/auth/resetpassword`, { state: { userId }});
            })
            .catch((error) => {
                const message = error?.response?.data?.message;
                navigate('/auth/login');
            })
    }, [])
}

export default ForgotPasword;