import React from 'react';
import MainFrame from '../MainFrame';
import CommentLists from '../../molecule/CommentLists';
import styled from 'styled-components';
import Icon from '../../atoms/Icon';
import { FaPen } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Pagination from '../../molecule/Pagination';

const Navi = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 2%;
    margin-top: 5%;
`;

const Page = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 5%;
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

const CommunityPresentation = ({
    data,
    loginstate,
    selectList,
    Selected,
    handleSelect,
    isLoginToggle,
    offset,
    limit,
    page,
    setPage,
}: any) => {
    if (!data) return null;

    return (
        <MainFrame>
            <Navi>
                <select onChange={handleSelect} value={Selected}>
                    {selectList &&
                        selectList.map((item: any) => (
                            <option value={item} key={item}>
                                {item}
                            </option>
                        ))}
                </select>
                {loginstate ? (
                    <StyledLink to="/commentwrite">
                        <Icon styled={{ fontSize: '18px' }}>
                            <FaPen data-testid='loginwrite'/>
                        </Icon>
                    </StyledLink>
                ) : (
                    <Icon styled={{ fontSize: '18px' }} setIcon={isLoginToggle}>
                        <FaPen data-testid="nologinwrite" />
                    </Icon>
                )}
            </Navi>
            {data &&
                data.slice(offset, offset + limit).map((item: any) => (
                    <StyledLink to={`/comment/${item.id}`} key={item.id}>
                        <CommentLists
                            title={item.title}
                            id={item.id}
                            writer={item.writer}
                            date={item.date}
                            recommend={item.recommend}
                        />
                    </StyledLink>
                ))}
            <Page>
                {page && (
                    <Pagination
                        total={data.length}
                        limit={limit}
                        page={page}
                        setPage={setPage}
                    />
                )}
            </Page>
        </MainFrame>
    );
};

export default React.memo(CommunityPresentation);
