import { useEffect, useState } from "react"
import {useParams} from "react-router"
import Cookies from 'js-cookie'
import "./index.css"
import { FaStar } from "react-icons/fa6";
import { FaExternalLinkAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { BsSuitcaseLgFill } from "react-icons/bs";
import Skills from "../Skills"
import SimilarJobs from "../SimilarJobs"
import { BeatLoader } from "react-spinners";

const JobDetails=()=>{
    const [isLoading,setisLoading]=useState(true)
    const [jobdetail,setjobdetails]=useState({})
   const {id} = useParams()
    console.log(id)
    useEffect(()=>{
        const details= async ()=>{
            const api=`https://apis.ccbp.in/jobs/${id}`
            const options = {
        headers: {
          Authorization: `Bearer ${Cookies.get('jwt_token')}`,
          'Content-Type': 'application/json',
        },
        method: 'GET',
    }
            const response=await fetch(api,options)
            if(response.ok)
            {
                const data=await response.json()
                console.log(data)
                const formattedData = {
                    companyLogoUrl: data.job_details.company_logo_url,
                    companyWebsiteUrl: data.job_details.company_website_url,
                    employmentType: data.job_details.employment_type,
                    id: data.job_details.id,
                    jobDescription: data.job_details.job_description,
                    lifeAtCompany: data.job_details.life_at_company,
                    description: data.job_details.description,
                    imageUrl: data.job_details.image_url,
                    location: data.job_details.location,    
                    packagePerAnnum: data.job_details.package_per_annum,
                    rating: data.job_details.rating,
                    skills: data.job_details.skills.map(skill => ({
                        name: skill.name,
                        imageUrl: skill.image_url
                    })),
                    similarJobs: data.similar_jobs.map(job => ({
                        id: job.id,
                        title: job.title,
                        company: job.company,
                        location: job.location,
                        employmentType: job.employment_type,
                        rating: job.rating,
                        jobDescription: job.job_description,
                        companyLogoUrl: job.company_logo_url
                    })),
                    title: data.job_details.title,
                    company: data.job_details.company,
                }
                setjobdetails(formattedData)
                setisLoading(false)
            }
            else{
                console.log("Fail")
                setisLoading(false)
            }
        }
        details()
    },[])
    return(
        <div className="job-details-container">
            {isLoading ? (
                <div className="loader-container">
                    <BeatLoader color="white"/>
                </div>
            ) : (
                <>
                    <div className="job-details-header">
                        <div className="job-details-logo-container">
                            <img src={jobdetail.companyLogoUrl} alt={jobdetail.company} className="job-details-logo" />
                            <div className="job-details-title-rating">
                                <h1 className="job-details-title">{jobdetail.title}</h1>
                                <div className="job-details-rating"><FaStar className="rating-logo"/>{jobdetail.rating}</div>
                            </div>
                        </div>
                        <div className="job-details-info">
                            <div className="job-details-company">
                                <FaLocationDot className="location-logo" />
                                <p className="job-details-location">{jobdetail.location}</p>
                                <BsSuitcaseLgFill className="suitcase-logo" />
                                <p className="job-details-type">{jobdetail.employmentType}</p>
                            </div>
                            <p className="job-details-package">Package: {jobdetail.packagePerAnnum}</p>
                        </div>
                        <hr className="line"/>
                        <div className="job-details-description-container">
                            <h2 className="job-details-description-label">Description</h2>
                            <a href={jobdetail.companyWebsiteUrl}  className="website-link" target="_blank" rel="noopener noreferrer">Visit <FaExternalLinkAlt className="visit-logo"/></a>
                        </div>
                        <p className="job-details-description">{jobdetail.jobDescription}</p>
                        <h2 className="job-details-skills-label">Skills </h2>
                        <ul className="skills-list">
                            {(jobdetail.skills || []).map((skill,index) => (
                                <Skills key={index} skill={skill} />
                            ))}
                        </ul>
                        <h2 className="life-at-company-label">Life at Company</h2>
                        {jobdetail.lifeAtCompany && (
                            <div className="life-at-company">
                                <p className="lifeatcompany-description">{jobdetail.lifeAtCompany.description}</p>
                                <img src={jobdetail.lifeAtCompany.image_url} alt="Life at Company" className="life-at-company-image" />
                            </div>
                        )}
                    </div>
                    <h2 className="similar-jobs-label">Similar Jobs</h2>
                    <div className="similar-jobs-container">
                        <ul className="similar-jobs-list">
                            {(jobdetail.similarJobs || []).map((job) => (
                                <SimilarJobs key={job.id} job={job} />
                            ))}
                        </ul>
                    </div>
                </>
            )}
        </div>
    )
}
export default JobDetails