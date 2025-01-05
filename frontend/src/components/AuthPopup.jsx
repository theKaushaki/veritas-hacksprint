import React, { useEffect, useState } from 'react';
import usePost from '../customHooks/usePost';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function AuthPopup({ showLoginPopup, showRegisterPopup, openLoginPopup, openRegisterPopup }) {
    const [loginType, setLoginType] = useState('student');
    const [registerType, setRegisterType] = useState('student');
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [registerEmail, setRegisterEmail] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const [registerConfirmPassword, setRegisterConfirmPassword] = useState('');
    const [registerName, setRegisterName] = useState('');
    const [registerBranch, setRegisterBranch] = useState('');
    const navigate = useNavigate();

    const { loginUser, token, user } = useAuth();

    const { postData: postLogin, loading: loginLoading, error: loginError, data: loginResponse, } = usePost('/login');
    const { postData: postSignup, loading: signupLoading, error: signupError, data: signupResponse, } = usePost('/signup');

    const handleLogin = async (e) => {
        e.preventDefault();
        const payload = {
            email: loginEmail,
            password: loginPassword,
        };

        await postLogin(payload);
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        if (registerPassword !== registerConfirmPassword) {
            return;
        }

        const payload = {
            email: registerEmail,
            password: registerPassword,
            name: registerName,
            role: registerType,
            branch: registerType === 'student' ? registerBranch : undefined,
        };

        await postSignup(payload);
    };

    useEffect(() => {
        if (loginResponse && loginResponse.token) {
            loginUser(loginResponse.user, loginResponse.token);
            navigate(`/dashboard/${loginType}`);
        }
        if (signupResponse && signupResponse.token) {
            loginUser(signupResponse.user, signupResponse.token);
            openLoginPopup(registerType);
        }
    }, [loginResponse, signupResponse, loginUser, navigate, openLoginPopup, loginType, registerType]);

    useEffect(() => {
        if (token) {
            navigate(`/dashboard/${user.role}`);
        }
    }, [token]);

    return (
        <>
            {showLoginPopup && (
                <div className="login-popup-overlay">
                    <div className="login-popup">
                        <div className="options">
                            <button onClick={() => setLoginType('student')} className={loginType === 'student' ? 'active' : ''}>Student</button>
                            <button onClick={() => setLoginType('department')} className={loginType === 'department' ? 'active' : ''}>Teacher</button>
                            <button onClick={() => setLoginType('university')} className={loginType === 'university' ? 'active' : ''}>University</button>
                        </div>
                        <h2>Login - {loginType.charAt(0).toUpperCase() + loginType.slice(1)}</h2>
                        <form onSubmit={handleLogin}>
                            <input
                                type="email"
                                placeholder={loginType === 'university' ? 'Master Email' : 'University Email'}
                                required
                                value={loginEmail}
                                onChange={(e) => setLoginEmail(e.target.value)}
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                required
                                value={loginPassword}
                                onChange={(e) => setLoginPassword(e.target.value)}
                            />
                            <button type="submit" disabled={loginLoading}>Login</button>
                        </form>
                        {loginError && <div className="error">{loginError}</div>}
                        <div className="register-link">
                            Don't have an account? <a href="#" onClick={() => openRegisterPopup('student')}>Register</a>
                        </div>
                    </div>
                </div>
            )}

            {showRegisterPopup && (
                <div className="register-popup-overlay">
                    <div className="register-popup">
                        <div className="options">
                            <button onClick={() => setRegisterType('student')} className={registerType === 'student' ? 'active' : ''}>Student</button>
                            <button onClick={() => setRegisterType('department')} className={registerType === 'department' ? 'active' : ''}>Teacher</button>
                            <button onClick={() => setRegisterType('university')} className={registerType === 'university' ? 'active' : ''}>University</button>
                        </div>
                        <h2>Register - {registerType.charAt(0).toUpperCase() + registerType.slice(1)}</h2>
                        <form onSubmit={handleSignup}>
                            {registerType !== 'university' && (
                                <input
                                    type="text"
                                    placeholder="Full Name"
                                    required
                                    value={registerName}
                                    onChange={(e) => setRegisterName(e.target.value)}
                                />
                            )}

                            {registerType === 'student' && (
                                <input
                                    type="text"
                                    placeholder="Branch"
                                    required
                                    value={registerBranch}
                                    onChange={(e) => setRegisterBranch(e.target.value)}
                                />
                            )}

                            {registerType === 'university' ? (
                                <>
                                    <input
                                        type="email"
                                        placeholder="Master Email"
                                        required
                                        value={registerEmail}
                                        onChange={(e) => setRegisterEmail(e.target.value)}
                                    />
                                    <input
                                        type="password"
                                        placeholder="Create Password"
                                        required
                                        value={registerPassword}
                                        onChange={(e) => setRegisterPassword(e.target.value)}
                                    />
                                    <input
                                        type="password"
                                        placeholder="Re-write Password"
                                        required
                                        value={registerConfirmPassword}
                                        onChange={(e) => setRegisterConfirmPassword(e.target.value)}
                                    />
                                </>
                            ) : (
                                <>
                                    <input
                                        type="email"
                                        placeholder="University Email"
                                        required
                                        value={registerEmail}
                                        onChange={(e) => setRegisterEmail(e.target.value)}
                                    />
                                    <input
                                        type="password"
                                        placeholder="Password"
                                        required
                                        value={registerPassword}
                                        onChange={(e) => setRegisterPassword(e.target.value)}
                                    />
                                    <input
                                        type="password"
                                        placeholder="Confirm Password"
                                        required
                                        value={registerConfirmPassword}
                                        onChange={(e) => setRegisterConfirmPassword(e.target.value)}
                                    />
                                </>
                            )}

                            <button type="submit" disabled={signupLoading}>Register</button>
                        </form>
                        {signupError && <div className="error">{signupError}</div>}
                        <div className="login-link">
                            Already have an account? <a href="#" onClick={() => openLoginPopup('student')}>Login</a>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
