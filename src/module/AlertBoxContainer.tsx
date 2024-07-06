import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import AlertBox from './AlertBox'; // AlertBox 컴포넌트 경로에 맞게 수정

const Container = styled.div`
    position: fixed;
    bottom: 10%;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1000;
`;

const AlertBoxContainer = () => {
    const alerts = useSelector((state : any) => state.alerts); // Redux 상태에서 alerts 가져오기
    
    return (
        <Container>
            {alerts?.map((alert : any, index : number) => (
                <AlertBox
                    key={index}
                    title={alert.title}
                    message={alert.message}
                    duration={alert.duration}
                />
            ))}
        </Container>
    );
};

export default React.memo(AlertBoxContainer);
