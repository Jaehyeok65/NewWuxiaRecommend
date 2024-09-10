import React from 'react';
import Title from '../../atoms/Title';
import styled from 'styled-components';
import Card from '../../molecule/Card';

const Main = styled.div`
    margin-bottom: 10%;
`;

const Grid = styled.div`
    margin-bottom: 50px;
    display: grid;
    grid-template-columns: ${(props) =>
        props.styled ? props.styled.pcgrid : 'repeat(2,1fr)'};
    gap: ${(props) => (props.styled ? props.styled.gap : '10px 10px')};

    @media screen and (max-width: 1400px) {
        grid-template-columns: ${(props) =>
            props.styled ? props.styled.tabletgrid : 'repeat(2,1fr)'};
    }

    @media screen and (max-width: 1000px) {
        grid-template-columns: ${(props) =>
            props.styled ? props.styled.mobilegrid : 'repeat(2,1fr)'};
    }
`;

const cardstyle = {
    height: '88%',
    mobileheight: '70%',
};

const MainList = ({ list, title, styled }) => {
    return (
        <Main>
            <Title styled={{ marginBottom: '20px' }}>{title}</Title>
            <Grid styled={styled} data-testid="list">
                {list &&
                    list
                        .slice(0, 12)
                        .map((item, index) => (
                            <Card key={index} product={item} styled={cardstyle} />
                        ))}
            </Grid>
        </Main>
    );
};

export default React.memo(MainList);
