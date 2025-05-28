import { useEffect, useState, useContext } from "react";
import toast from "react-hot-toast";
import { getAPI } from "../caller/axiosUrls";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/Auth";
import Loader from "../components/Loader";
import { generateStars } from "../utils/starGenerator";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

const Authorize = () => {
    const [fetching, setFetching] = useState(false);
    const { setToken } = useContext(AuthContext);
    
    const navigate = useNavigate();
    const { executeRecaptcha } = useGoogleReCaptcha();

    const getAccessToken = async (code) => {
        if (!executeRecaptcha) {
            toast("Recaptcha not yet available. Try again later.", {
              icon: "⚠️",
            });
            return;
        }

        try {
            const response = await getAPI('/github/getAccessToken?code=' + code + '&captcha=' + await executeRecaptcha('authorize'));
            const params = new URLSearchParams(response);
            const access_token = params.get('access_token');
            if (access_token) {
                localStorage.setItem('access_token', access_token);
                setToken(access_token);
                await getUserData();
            } else {
                toast.error('Failed to get access token. Please try again.');
                console.error('Access token not found in response!');
                navigate('/login');
            }
        } catch (error) {
            toast.error('Failed to get access token. Please try again.');
            console.error('Error getting access token:', error);
            navigate('/login'); 
        }
    }

    const getUserData = async () => {
        if (!executeRecaptcha) {
            toast("Recaptcha not yet available. Try again later.", {
              icon: "⚠️",
            });
            return;
        }

        setFetching(true);
        
        try {
            const response = await getAPI('/github/getUserData?captcha=' + await executeRecaptcha('authorize'));
            localStorage.setItem('user_data', JSON.stringify(response));
            navigate('/panel');
        } catch (error) {
            toast.error('Failed to get user data. Please try again.');
            console.error('Error getting user data:', error);
            navigate('/login');
        }
    }

    useEffect(() => {
        if (executeRecaptcha) {
            const params = new URLSearchParams(window.location.search);
            const code = params.get('code');
            if (code) {
                getAccessToken(code);
            } else {
                toast.error('Authorization failed. Please try again.');
                console.error('Authorization code not found!');
            }
        }
    }, [executeRecaptcha]);

    useEffect(() => {
        generateStars('auth-stars');
    }, [])
    
    return (
        <div className="flex flex-col items-center justify-center w-full h-screen bg-[#1b1b2b]">
            <div className="stars" id="auth-stars" />
            <div className="bg-[#30363D] text-white flex flex-col justify-center items-center border-2 z-10 p-8 rounded-xl shadow-md w-96">
                <Loader color={"white"} />
                <h1 className="text-2xl font-medium mb-4">{!fetching ? "Authorizing..." : "Authorized"}</h1>
                <p className="mb-6 text-sm text-center">{!fetching ? "Please wait while we authorize your account." : "Fetching user details..."}</p>
            </div>
        </div>
    );
};

export default Authorize;