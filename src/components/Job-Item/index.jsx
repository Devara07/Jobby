import "./index.css";
import {Link} from "react-router"

const JobItem = ({ job }) => {
  const {
    title,
    company,
    location,
    employmentType,
    rating,
    jobDescription,
    companyLogoUrl,
    id
  } = job;
  

  return (
    <Link to={`/jobs/${id}`} className="jobitem-container">
     
      <div className="jobitem-header">
        <img
          src={companyLogoUrl}
          alt={company}
          className="jobitem-logo"
        />
        <div className="jobitem-title-rating">
          <h2 className="jobitem-title">{title}</h2>
          <p className="jobitem-rating">Rating: {rating}</p>
        </div>
      </div>
      <hr />
      <div className="jobitem-info">
        <p className="jobitem-location">{location}</p>
        <p className="jobitem-type">{employmentType}</p>
      </div>
      <p className="jobitem-desc-label">Description</p>
      <p className="jobitem-desc">{jobDescription}</p>
      <button className="jobitem-apply-btn">Apply Now</button>
    </Link>
  );
};

export default JobItem;