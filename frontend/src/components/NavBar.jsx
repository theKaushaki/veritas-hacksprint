import "../styles/navBar.css";
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import toast from "react-hot-toast";

const socket = io('http://localhost:3000');

export default function NavBar() {
    const [notifications, setNotifications] = useState(["New comment on your post",
        "Your profile was viewed",
        "Someone liked your comment",
        "New follower"]);
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token') || '';
        socket.emit('authenticate', token);
        socket.emit('join', { token });
        socket.on('message', (data) => {
            toast.custom(data.text, {
                icon: '👏',
                style: {
                    borderRadius: '10px',
                    color: 'var(--primary-color)',
                    backgroundColor: 'var(----background-color-secondary)',
                },
            });
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
