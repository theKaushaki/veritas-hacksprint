import { Routes, Route } from 'react-router-dom'
import Home from './Home'
import FacultyHome from "./FacultyHome";
import StudentDashboard from './StudentDashboard';
import PrivateRoute from '../components/PrivateRoute';

export default function AllRoutes() {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Home login={true} />} />
            <Route path='*' element={<h1>Not Found</h1>} />
            <Route path='dashboard/teacher' element={
                <PrivateRoute role='teacher'>
                    <FacultyHome />
                </PrivateRoute>
            } />
            <Route path='dashboard/student' role='student' element={
                <PrivateRoute>
                    <StudentDashboard />
                </PrivateRoute>
            } />
        </Routes>
    )
}
