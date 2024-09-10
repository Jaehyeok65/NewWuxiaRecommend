import React from 'react';
import styled from 'styled-components';
import Card from '../molecule/Card';

const Lists = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 15px 15px;
    margin-top: 5%;
    margin-bottom: 10%;
    @media screen and (max-width: 1200px) {
        grid-template-columns: repeat(3, 1fr);
    }
    @media screen and (max-width: 800px) {
        grid-template-columns: repeat(2, 1fr);
    }
`;

const ListView = ({ data, cardstyle }) => {
    return (
        <Lists>
            {data ? (
                data.pages ? (
                    data.pages.map((page) =>
                        page.map((item) => (
                            <Card
                                key={item.id}
                                styled={cardstyle}
                                product={item}
                            />
                        ))
                    )
                ) : (
                    data.map((item) => (
                        <Card key={item.id} styled={cardstyle} product={item} />
                    ))
                )
            ) : (
                <div style={{ height: '100vh' }} />
            )}
        </Lists>
    );
};

export default React.memo(ListView);
