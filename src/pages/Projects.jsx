import { useState, useEffect } from "react";
import Loader from '../components/Loader';
import { getAPI } from '../caller/axiosUrls';

const Projects = () => {
    const [repos, setRepos] = useState([]);
    const [sender, setSender] = useState(false);

    const fetchRepos = async () => {
        setSender(true);
        
        try {
            const response = await getAPI('/github/repos?access_token=' + localStorage.getItem('access_token'));
            console.log("Fetched Repositories:", response);
            setRepos(response);
        } catch (error) {
            console.error("Error checking repository access:", error);
        } finally {
            setSender(false);
        }
    }

    useEffect(() => {
        fetchRepos();
    }, []);

    return (
        <>      
            <div className="container p-5">
                <h1 className="text-3xl font-semibold mb-6 ml-5">Projects</h1>
                {sender ? <Loader text={"Fetching Repos..."} /> :
                <>
                    <div className="projects-list">
                        {repos.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {repos.map((repo, index) => (
                                <div
                                    key={index}
                                    className="bg-white rounded-2xl shadow-md p-5 transition hover:shadow-xl border border-gray-200"
                                >
                                    <h2 className="text-xl font-semibold text-gray-800 mb-2">
                                    {repo.name}
                                    </h2>
                                    <p className="text-gray-600 mb-4">
                                    {repo.description || "No description available."}
                                    </p>
                                    <a
                                    href={repo.html_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                                    >
                                    View Repository
                                    </a>
                                </div>
                                ))}
                            </div>
                            ) : (
                            <p className="text-gray-500 text-center mt-8">No repositories found.</p>
                        )}
                    </div>
                </>}
            </div>
        </>
    )
}

export default Projects;