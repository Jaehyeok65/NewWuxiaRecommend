import React from 'react';
import styled from 'styled-components';
import Footer from '../organism/Footer';

const Body = styled.div`
    width: 60%;
    margin: 0 auto;
    height: auto;
    min-height: 60vh;

    @media screen and (max-width: 768px) {
        width: 90%;
    }
`;

const MainFrame = ({ children }) => {
    return (
        <React.Fragment>
            <Body>{children}</Body>
            <Footer />
        </React.Fragment>
    );
};

export default React.memo(MainFrame);
