import {Link} from 'react-router'
import Cookies from "js-cookie";
import { useNavigate } from "react-router";
import "./index.css";

const Header = () => {

    const navigate = useNavigate();
    const onClickLogout = () => {
        Cookies.remove('jwt_token');
        navigate('/login',{replace: true});
    }

    const Jobspage = () => {
        navigate('/jobs');
    }

    return (
        <div className="header-container">
            <div className="header-logo-container">
                <img
                    src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
                    alt="website logo"
                    className="header-logo"
                />
                
            </div>
            <ul className="header-nav">
                <Link to="/" className="header-nav-item">
                    <li>
                            Home
                    </li>
                </Link>
                
                <Link to='/jobs' className="header-nav-item">
                    <li>
                        Jobs
                    </li>
                </Link>
                
            </ul>
            <button className="logout-button" onClick={onClickLogout}>Logout</button>
        </div>
    );
};

export default Header;