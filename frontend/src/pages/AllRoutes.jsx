import { Routes, Route } from 'react-router-dom'
import Home from './Home'
import FacultyHome from "./FacultyHome";
import StudentDashboard from './StudentDashboard';

export default function AllRoutes() {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='*' element={<h1>Not Found</h1>} />
            <Route path='dashboard/teacher' element={<FacultyHome />} />
            <Route path='dashboard/student' element={<StudentDashboard />} />
        </Routes>
    )
}
