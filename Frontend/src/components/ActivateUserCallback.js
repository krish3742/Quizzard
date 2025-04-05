import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

function ActivateUserCallback() {
    const params = useParams();
    const navigate = useNavigate();
    const token = params.token;
    useEffect(() => {
        if(!token) {
            navigate('/auth/register');
        } else if(!!token) {
            axios
                .get(`${process.env.REACT_APP_BACKEND_URL}/auth/activate/${token}`)
                .then((response) => {
                    navigate('/auth/login', { state: { message: "Account activated, login!" }});
                })
                .catch((error) => {
                    navigate('/auth/register');
                })
        }
    }, [])
}

export default ActivateUserCallback;