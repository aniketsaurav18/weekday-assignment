import "./App.css";
import { JobCard } from "./components/JobCard";
import { useEffect, useState } from "react";
import SingleSelect from "./components/singleSelect";
import SearchBox from "./components/SearchBox";

const API_URL = "https://api.weekday.technology/adhoc/getSampleJdJSON";

function App() {
  const [data, setData] = useState<any>([]);
  const [page, setPage] = useState<number>(0);
  const [filteredData, setFilteredData] = useState<any>([]);
  const [totolData, setTotalData] = useState();
  const [minExp, _setMinExp] = useState<string[]>(["All"]);
  const [minPay, _setMinPay] = useState<string[]>([
    "All",
    "10",
    "20",
    "50",
    "70",
    "100",
  ]);
  const [techStack, _setTechStack] = useState<string[]>(["All"]);
  const [role, _setRole] = useState<string[]>(["All"]);
  const [jobLocation, _setJobLocation] = useState<string[]>(["All"]);
  const [company, _setCompany] = useState<string[]>(["All"]);
  const [selectedminExp, setSelectedMinExp] = useState<string>("All");
  const [selectedtechStack, setSelectedTechStack] = useState<string>("All");
  const [selectedrole, setSelectedRole] = useState<string>("All");
  const [selectedjobLocation, setSelectedJobLocation] = useState<string>("All");
  const [selectedminPay, setSelectedMinPay] = useState<string>("All");
  const [selectedcompany, setSelectedCompany] = useState<string>("All");
  const [selectedremote, setSelectedRemote] = useState<
    "On Site" | "Remote" | "All"
  >("All");

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
      ) {
        setPage((p) => p + 1);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const getData = async (limit: number = 10, offset: number = 0) => {
      const myHeader = new Headers();
      myHeader.append("Content-Type", "application/json");
      const body = JSON.stringify({
        limit: limit,
        offset: offset,
      });
      const requestOptions = {
        method: "POST",
        headers: myHeader,
        body,
      };
      try {
        const fetchedData = await fetch(API_URL, requestOptions);
        const jsonData = await fetchedData.json();
        setData((d: any) => [...d, ...jsonData.jdList]);
        setTotalData(jsonData.totalCount);
        setFilteredData((d: any) => [...d, ...jsonData.jdList]);
      } catch (e) {
        console.log(e);
      }
    };
    getData(10, page);
  }, [page]);
  useEffect(() => {
    console.log(data);
    console.log(totolData);
    data.forEach((d: any) => {
      if (!company.includes(d.companyName)) {
        company.push(d.companyName);
      }
      if (d.minExp !== null && !minExp.includes(d.minExp)) {
        minExp.push(d.minExp);
      }
      if (d.jobRole !== null && !role.includes(d.jobRole)) {
        role.push(d.jobRole);
      }
      if (!techStack.includes(d.jobRole)) {
        techStack.push(d.jobRole);
      }
      if (!jobLocation.includes(d.location)) {
        jobLocation.push(d.location);
      }
    });
  }, [data]);

  useEffect(() => {
    const newFilteredData = data.filter((d: any) => {
      let result: boolean = true;
      if (selectedminExp !== "All" && selectedminExp != null) {
        result = result && d.minExp <= selectedminExp;
      }
      if (selectedtechStack !== "All" && selectedtechStack != null) {
        result = result && selectedtechStack === d.jobRole;
      }
      if (selectedrole !== "All" && selectedrole != null) {
        result = result && selectedrole === d.jobRole;
      }
      if (selectedjobLocation !== "All" && selectedjobLocation != null) {
        console.log("selectedjoblocation", selectedjobLocation);
        result = result && selectedjobLocation === d.location;
      }
      if (selectedminPay !== "All" && selectedminPay != null) {
        if (d.minJdSalary === null) {
          result = result && true;
        }
        result = result && d.minJdSalary >= Number(selectedminPay);
      }
      if (selectedremote !== "All" && selectedremote != null) {
        if (selectedremote === "Remote") {
          result = result && d.location === "remote";
        } else {
          result = result && d.location !== "remote";
        }
      }
      if (selectedcompany !== "All" && selectedcompany != null) {
        console.log("selected company", selectedcompany);
        result = result && selectedcompany === d.companyName;
      }
      return result;
    });
    console.log("selected tech", selectedtechStack);
    console.log("filtered data", filteredData);
    setFilteredData(newFilteredData);
  }, [
    selectedminExp,
    selectedtechStack,
    selectedrole,
    selectedjobLocation,
    selectedminPay,
    selectedcompany,
    selectedremote,
    data,
  ]);

  return (
    <div className="header-container">
      <div className="filter-container">
        <SingleSelect
          options={techStack}
          setSelectedOption={setSelectedTechStack}
          selectedOption={selectedtechStack}
          label="Tech Stack"
        />
        <SingleSelect
          options={jobLocation}
          setSelectedOption={setSelectedJobLocation}
          selectedOption={selectedjobLocation}
          label="Location"
        />
        <SingleSelect
          options={minExp}
          setSelectedOption={setSelectedMinExp}
          selectedOption={selectedminExp}
          label="Experience"
        />
        <SingleSelect
          options={minPay}
          setSelectedOption={setSelectedMinPay}
          selectedOption={selectedminPay}
          label="Min Pay"
        />
        <SingleSelect
          options={role}
          setSelectedOption={setSelectedRole}
          selectedOption={selectedrole}
          label="Role"
        />
        <SingleSelect
          options={["On Site", "Remote", "All"]}
          setSelectedOption={setSelectedRemote}
          selectedOption={selectedremote}
          label="Remote"
        />
        <SearchBox
          options={company}
          setSelectedOption={setSelectedCompany}
          label="Company"
        />
      </div>
      <div className="jobcard-container">
        {filteredData.map((d: any) => (
          <JobCard jobData={d} />
        ))}
      </div>
    </div>
  );
}

export default App;
