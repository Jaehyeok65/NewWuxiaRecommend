import React from 'react';
import styled from 'styled-components';
import Card from '../molecule/Card';
import CardInfo from '../molecule/CardInfo';

const Grids = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px 20px;
    > div {
        align-self: center;
    }
`;

const Lists = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 40px 40px;
    margin-top: 5%;
    margin-bottom: 10%;
    @media screen and (max-width: 1200px) {
        grid-template-columns: repeat(3, 1fr);
    }
    @media screen and (max-width: 800px) {
        grid-template-columns: repeat(2, 1fr);
    }
`;

const ListView = ({ data, cardstyle, cardinfostyle }) => {
    return (
        <Lists>
            {data ? (
                data.pages.map((page) =>
                    page.map((item) => (
                        <Grids key={item.id}>
                            <Card
                                url={item.url}
                                title={item.title}
                                styled={cardstyle}
                            />
                            <CardInfo product={item} styled={cardinfostyle} />
                        </Grids>
                    ))
                )
            ) : (
                <div style={{ height: '100vh' }} />
            )}
        </Lists>
    );
};

export default React.memo(ListView);
