import { Grid } from "@mui/material";
import Chip from "@mui/material/Chip";
import "./JobCard.css";

export const JobCard = ({ jobData }: any) => {
  return (
    <Grid
      container
      direction="column"
      justifyContent="space-between"
      alignItems="flex-start"
      // bgcolor={"aliceblue"}
      width={500}
      maxWidth={400}
      padding={2}
      borderRadius={2}
      className="job-card"
    >
      <Chip label="posted 10 days ago" />
      <div className="details-panel">
        <img alt="Remy Sharp" src={jobData.logoUrl} className="company-logo" />
        <div className="details-panel-text">
          <span className="company-name">{jobData.companyName}</span>
          <span className="job-profile">{jobData.jobRole}</span>
          <span id="location">{jobData.location}</span>
        </div>
      </div>
      <div className="salary-container">
        <span id="salary">
          Estimated Salary:
          {jobData.minJdSalary === null
            ? "Not Specified"
            : "$" + jobData.minJdSalary}{" "}
          - ${jobData.maxJdSalary}K
        </span>
      </div>
      <div className="about-company">
        <h3 id="about-company">About Company</h3>
      </div>
      <div className="details-container">
        <div className="details">
          <h4 id="about-us">About us</h4>
          <p id="details">{jobData.jobDetailsFromCompany}</p>
        </div>
        <div className="btn-holder">
          <span>View Job</span>
        </div>
      </div>
      <div className="exp-container">
        <h3 id="min-exp">Minimum Experience</h3>
        <h3 id="exp">
          {jobData.minExp === null ? "Not Specified" : jobData.minExp} years
        </h3>
      </div>
      <button className="btn-apply">
        <img src="/lightning.svg" alt="" />
        <span>Apply Now</span>
      </button>
      <button className="btn-unlock">
        <img src="/unlock_image_1.jpeg" alt="unlock image 1" />
        <img src="/unlock_image_2.jpeg" alt="unlock image 2" />
        <span>Unlock referal ask</span>
      </button>
    </Grid>
  );
};
