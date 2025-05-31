import "./index.css";
import {useNavigate} from "react-router";
import Header from "../Header";

const Home = () => {

    const navigate = useNavigate();
    const onClickJobs = () => {
        navigate('/jobs');
    }

    return (
        <div className="home-page">
            <Header />
            <div className="home-container">
                <div className="home-content">
                    <h1 className="home-title">
                        Find The Job That Fits Your Life
                    </h1>
                    <p className="home-description">
                        Millions of people are searching for jobs, salary information, company reviews. <br />
                        Find the job that fits your abilities and potential.
                    </p>
                    <button className="find-jobs-button" onClick={onClickJobs}>Find Jobs</button>
                </div>
            </div>
        </div>
    );
};

export default Home;