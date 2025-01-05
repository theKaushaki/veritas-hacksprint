import { Routes, Route } from 'react-router-dom'
import Home from './Home'
import FacultyHome from "./FacultyHome";
import StudentDashboard from './StudentDashboard';
import PrivateRoute from '../components/PrivateRoute';
import TeacherDashboard from './TeacherDashboard';
import AdminDashBoard from './AdminDashboard';
import Formbuilder from '../components/FormBuilder';

export default function AllRoutes() {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Home login={true} />} />
            <Route path='*' element={<h1>Not Found</h1>} />
            <Route path='dashboard/department' element={
                <PrivateRoute role='teacher'>
                    <TeacherDashboard />
                </PrivateRoute>
            } />
            <Route path='dashboard/student' role='student' element={
                <PrivateRoute>
                    <StudentDashboard />
                </PrivateRoute>
            } />
            <Route path='dashboard/university' role='university' element={
                <PrivateRoute>
                    <AdminDashBoard />
                </PrivateRoute>
            } />
            <Route path='form/create' role='faculty' element={
                // <PrivateRoute>
                    <Formbuilder />
                // </PrivateRoute>
            } />
        </Routes>
    )
}
