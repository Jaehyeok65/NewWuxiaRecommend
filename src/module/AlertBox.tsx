import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { hideAlert } from 'redux/action';
import styled from 'styled-components';

const NotificationBox = styled.div`
    position: fixed;
    bottom: 10%;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 8px;
    border: 1px solid gray;
    padding: 15px;
    background-color: #787878;
    color: white;
    z-index: 1000;
    transition: opacity 0.3s ease-in-out;
`;

const AlertBox = ({
    title,
    message,
    duration,
}: {
    title: string;
    message: string;
    duration: number;
}) => {
    const dispatch = useDispatch();
    console.log(title);

    useEffect(() => {
        const timer = setTimeout(() => {
            dispatch(hideAlert(title));
        }, duration || 3000);

        return () => clearTimeout(timer);
    }, [dispatch, title, duration]);

    return <NotificationBox>{message}</NotificationBox>;
};

export default AlertBox;
