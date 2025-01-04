import "../styles/navBar.css";
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import toast from "react-hot-toast";
import useFetch from "../customHooks/useFetch";

const socket = io('http://localhost:3000');

const notify = (message) => toast.info(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
});;

export default function NavBar() {
    const [notifications, setNotifications] = useState([]);
    const [isActive, setIsActive] = useState(false);
    const { data, loading, error } = useFetch('/notifications');
    console.log(data, loading, error);

    useEffect(() => {
        const token = localStorage.getItem('token') || '';
        socket.emit('authenticate', token);
        socket.emit('join', { token });
        socket.on('message', (data) => {
            notify(data.text);
            setNotifications((prevNotifications) => [
                ...prevNotifications,
                data.text
            ]);
        });

        return () => {
            socket.off('message');
        };
    }, []);

    const toggleNotifications = () => {
        setIsActive(!isActive);
    };

    return (
        <div className="nav_bar">
            <div className="logo">Veritas</div>
            <div className="notification-icon" onClick={toggleNotifications}>
                {isActive ? (
                    <NotificationsIcon className="active" />
                ) : (
                    <NotificationsActiveIcon className="inactive" />
                )}
            </div>

            {isActive && (
                <div className="notifications-dropdown">
                    <ul>
                        {notifications.length === 0 ? (
                            <li>No notifications</li>
                        ) : (
                            notifications.map((notification, index) => (
                                <li key={index}>{notification}</li>
                            ))
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
}
