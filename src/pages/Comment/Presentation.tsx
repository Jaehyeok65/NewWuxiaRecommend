import React from 'react';
import MainFrame from '../MainFrame';
import Title from '../../atoms/Title';
import styled from 'styled-components';
import Button from '../../atoms/Button';
import { FaThumbsUp } from 'react-icons/fa';
import { FaTrashAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Icon from '../../atoms/Icon';
import { FaPen } from 'react-icons/fa';

const Content = styled.div`
    margin-bottom: 10%;
`;

const Flex = styled.div`
    display: flex;
    justify-content: center;
`;

const Flex2 = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 7%;
    margin-bottom: 5%;
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    color: inherit;

    &:focus,
    &:hover,
    &:visited,
    &:link,
    &:active {
        text-decoration: none;
    }
`;

const Pre = styled.pre`
    margin-bottom: 10%;
    font-size: 14px;

    @media screen and (max-width: 800px) {
        margin-bottom: 40%;
        margin-top: 10%;
    }
`;

const CommentPresentation = ({
    data,
    nickname,
    onRemoveClick,
    onRecommendClick,
}: any) => {
    return (
        <MainFrame>
            {data && (
                <Content>
                    <Flex2>
                        <Title styled={{ fontSize: '24px' }}>
                            {data.title}
                        </Title>
                        <div style={{ width: '30%', textAlign: 'right' }}>
                            <span style={{ fontSize: '15px', color: 'gray' }}>
                                {data.writer}
                            </span>{' '}
                            &nbsp;
                            {nickname === data.writer ? (
                                <span>
                                    <StyledLink
                                        to={`/commentupdate/${data.id}`}
                                    >
                                        <Icon styled={{ fontSize: '15px' }}>
                                            <FaPen />
                                        </Icon>
                                    </StyledLink>{' '}
                                    &nbsp;
                                    <Icon
                                        styled={{ fontSize: '15px' }}
                                        setIcon={onRemoveClick}
                                    >
                                        <FaTrashAlt />
                                    </Icon>
                                </span>
                            ) : null}
                        </div>
                    </Flex2>
                    <Pre>{data.content}</Pre>
                    <Flex>
                        <Button
                            styled={{
                                width: '100px',
                                padding: '12px',
                                border: '1px solid gray',
                                borderRadius: '3px',
                            }}
                            onClick={onRecommendClick}
                        >
                            <FaThumbsUp /> {data.recommend}
                        </Button>
                    </Flex>
                </Content>
            )}
        </MainFrame>
    );
};

export default React.memo(CommentPresentation);
