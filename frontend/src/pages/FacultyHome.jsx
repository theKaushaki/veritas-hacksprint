import { useEffect } from "react";
import NavBar from "../components/NavBar";
import "../styles/facultyHome.css";
// import useFetch from "../customHooks/useFetch";

export default function FacultyHome() {
  // const [data, loading, error] = useFetch('/faculty/home');

  useEffect(() => {
  }, []);


  return (
    <>
      <NavBar />
      <div className="faculty_home">
      </div>
    </>
  )
}
