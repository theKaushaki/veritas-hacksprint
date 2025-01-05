import { Routes, Route } from 'react-router-dom'
import Home from './Home'
import FacultyHome from "./FacultyHome";
import StudentDashboard from './StudentDashboard';

export default function AllRoutes() {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='*' element={<h1>Not Found</h1>} />
            <Route path='/faculty' element={<FacultyHome />} />
            <Route path='/student' element={<StudentDashboard />} />
        </Routes>
    )
}
