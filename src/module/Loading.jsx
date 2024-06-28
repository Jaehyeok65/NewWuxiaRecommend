import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ReactLoading from 'react-loading';

const Spinner = styled.div`
    display: flex;
    justify-content: center;
    margin-top: ${(props) => props.marginTop};
    margin-bottom: ${(props) => props.marginBottom};
`;

const Loading = ({ height, width, marginTop, marginBottom }) => {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setLoading(true);
        }, 500);
        return () => clearTimeout(timeoutId);
    }, []);

    if (!loading) {
        return null;
    }
    return (
        <Spinner marginTop={marginTop} marginBottom={marginBottom}>
            <ReactLoading
                type="spin"
                color="black"
                height={height}
                width={width}
            />
        </Spinner>
    );
};

export default React.memo(Loading);
