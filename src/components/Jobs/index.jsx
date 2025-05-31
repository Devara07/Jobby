import "./index.css";
import Header from "../Header";
import { useState, useEffect } from "react";
import JobItem from '../Job-Item';
import Cookies from 'js-cookie';
import BeatLoader from "react-spinners/BeatLoader"
import Profile from "../Profile"
import TypeEmployment from "../Type-Employment"
import SalaryRanges from "../SalaryRanges"
import NotFoundJobs from "../NotFoundjobs";
const employmenttypes=[
    {
    "id":1,
    "label":"FullTime"
},
 {
    "id":2,
    "label":"PartTime"
},
 {
    "id":3,
    "label":"FreeLance"
},
 {
    "id":4,
    "label":"InternShip"
},


]
const SalaryRange=[
    {
    "id":100000,
    "label":"10LPA and above"
},
 {
    "id":200000,
    "label":"20LPA and above"
},
 {
    "id":300000,
    "label":"30LPA and above"
},
 {
    "id":400000,
    "label":"40LPA and above"
},


]

const Jobs = () => {
    const [searchinput, setSearchInput] = useState("");
    const [jobs, setJobs] = useState([]);
    const [isLoading,setisloading]=useState(true)
    const [salaryfilters, setSalaryFilter]=useState("")
    const [employmentfilters, setEmploymentFilter]=useState([]);
    const employmentfilter = (type) => {
        setEmploymentFilter(prevFilters => {
            
            if (prevFilters.includes(type)) return prevFilters;
            return [...prevFilters, type];
        });
    }
   
    useEffect(() => {
        console.log("Updated employmentfilters:", employmentfilters);
    }, [employmentfilters]);
    const salaryfilter=(salary)=>{
        console.log(salary)
        setSalaryFilter(salary)

    }
    useEffect(() => {
        const fetchJobs = async () => {
            let apiurl=`https://apis.ccbp.in/jobs`
            const options = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${Cookies.get('jwt_token')}`,
                }
            }
            if (employmentfilters === "") {
                apiurl = `https://apis.ccbp.in/jobs?minimum_package=${salaryfilters}&search=${searchinput}`;
            } else if (salaryfilters === "") {
                apiurl = `https://apis.ccbp.in/jobs?employment_type=${employmentfilters}&search=${searchinput}`;
            }
            else if(searchinput==="" )
            {
                apiurl = `https://apis.ccbp.in/jobs?employment_type=${employmentfilters}&minimum_package=${salaryfilters}`;
            }
             else {
                let filters=employmentfilters.join(",")
                apiurl = `https://apis.ccbp.in/jobs?employment_type=${filters}&minimum_package=${salaryfilters}&search=${searchinput}`;
            }
            const response = await fetch(apiurl, options)
            const data = await response.json();
            const formattedJobs = data.jobs.map(job => ({
                id: job.id,
                title: job.title,
                company: job.company,
                location: job.location,
                employmentType: job.employment_type,
                rating: job.rating,
                jobDescription: job.job_description,
                companyLogoUrl: job.company_logo_url,
                salary: job.package_per_annum,
            }));
            setJobs(formattedJobs);

            setisloading(false) 
        }
        fetchJobs();
    }, [searchinput, salaryfilters, employmentfilters]);
    const serachiputsetter = (event) => {
        setSearchInput(event.target.value);
    };
    const renderSearchBar = () => (
        <div className="jobs-searchbar-container">
            <input
                type="text"
                placeholder="Search Jobs"
                className="jobs-searchbar-input"
                value={searchinput}
                onChange={serachiputsetter}
            />
            <button className="jobs-searchbar-btn">Search</button>
        </div>
    );
    const renderLoader=()=>{
        return(
            <div className="loader-container">
                <BeatLoader color="white"/>
                </div>
        )
    }
   
    
    return(
        <>

       <Header/>

       <div className="jobs-main-container">
        <div className="profile-container">

            <Profile/>
            <hr className="horizantal-line"/>
            <h1 className="type">
                Types of employment
            </h1>
            {employmenttypes.map((type)=>
<TypeEmployment key={type.id} type={type} employmentfilter={employmentfilter} />
            )}
            <hr className="horizantal-linesalary"/>
            <h1 className="type">
                Salary Ranges
            </h1>
            {
                SalaryRange.map((salary)=>
<SalaryRanges key={salary.id} salary={salary} salaryfilter={salaryfilter} />
                )
            }
        </div>
        <div className="jobs-list-container">
            {renderSearchBar()}
                {isLoading ? (
                renderLoader()
                ) : jobs.length === 0 ? (
                    <NotFoundJobs />
                ) : (
                    jobs
                        .filter(job => job.title.toLowerCase().includes(searchinput.toLowerCase()))
                        .map(job => (
                            <JobItem key={job.id} job={job} />
                        ))
                )}
            </div>
       </div>
       </>
    )
}

export default Jobs;