import "./index.css";


const SimilarJobs = ({ job }) => {
    const {
        id,
        title,
        company,
        location,
        employmentType,
        rating,
        jobDescription,
        companyLogoUrl
    } = job;
    
    return (
        <div className="similar-job-item">
        <img src={companyLogoUrl} alt={company} className="similar-job-logo" />
        <h2 className="similar-job-title">{title}</h2>
        <p className="similar-job-company">{company}</p>
        <p className="similar-job-location">{location}</p>
        <p className="similar-job-type">{employmentType}</p>
        <p className="similar-job-rating">Rating: {rating}</p>
        <p className="similar-job-description">{jobDescription}</p>
        </div>
    );
    }
export default SimilarJobs;