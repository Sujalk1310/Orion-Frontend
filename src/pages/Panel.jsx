import { useState, useEffect, useContext } from 'react';
import { useNavigate, Navigate, useRoutes } from 'react-router-dom';
import { AuthContext } from '../contexts/Auth';
import Sidebar from '../components/Sidebar';
import Dashboard from './Dashboard';
import toast from 'react-hot-toast';
import FullPageLoader from '../components/FullPageLoader';
import Projects from './Projects';

const Panel = () => {
    const [isTokenVerified, setIsTokenVerified] = useState(false);
    
    const navigate = useNavigate();

    const { token, loading } = useContext(AuthContext);

    const routes = [
        {
            path: '',
            element: <Navigate to='/panel/dashboard' />,
        }, 
        {
            path: 'dashboard',    
            element: <Dashboard />
        },
        {
            path: 'projects',    
            element: <Projects />
        },
        {
            path: "*",
            element: <Navigate to='/panel/dashboard' />
        }
    ];

    const verifyToken = async () => {
        try {
            setIsTokenVerified(true);
        } catch (error) {
            setIsTokenVerified(false);
            toast.error(error.message);
        } 
    }

    useEffect(() => {
        verifyToken();
    }, []);

    useEffect(() => {
        if (loading) return;
        if (!token) navigate('/login');
    }, [loading, token]);

    const element = useRoutes(routes);
    
    return (    
        <>
            {(loading || !isTokenVerified) && <FullPageLoader />}
            {token && 
            <div className="w-screen h-screen flex relative">
                <Sidebar />
                <div className="flex flex-col grow overflow-x-hidden">
                    {element}
                </div>
            </div>}
        </>
    );
};

export default Panel;