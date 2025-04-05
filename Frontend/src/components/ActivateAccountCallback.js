import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

function ActivateAccountCallback() {
    const params = useParams();
    const navigate = useNavigate();
    const key = params.key;
    useEffect(() => {
        if(!key || key.length < 8) {
            navigate('/auth/register');
        } else {
            navigate('/auth/activateaccount');
        }
    }, []);
};

export default ActivateAccountCallback;