import React, { useEffect, useState, useRef, useCallback } from 'react';
import MainFrame from '../MainFrame';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { FaArrowUp } from 'react-icons/fa';
import Loading from '../../module/Loading';
import Error from '../../module/Error';
import ListView from '../../module/ListView';
import useThrottling from '../../hook/useThrottling';
import { SubmitList } from '../../api/WuxiaAPI';

const Btn = styled.button`
    position: fixed;
    border: none;
    text-align: center;
    z-index: 9999999;
    background-color: white;
    &:hover {
        transform: translateY(-4px);
        cursor: pointer;
    }
    @media screen and (max-width: 2000px) {
        right: 20px;
        bottom: 50%;
        font-size: 22px;
    }
    @media screen and (max-width: 800px) {
        bottom: 20px;
        right: 50%;
        font-size: 16px;
    }
`;

const cardstyle = {
    height: '100%',
    mobileheight: '100%',
};

const cardinfostyle = {
    title: {
        marginBottom: '5%',
        fontSize: '14px',
    },
    subtext: {
        marginBottom: '5%',
        fontSize: '12px',
        color: 'gray',
    },
    icon: {
        fontSize: '15px',
        color: 'red',
    },
    span: {
        fontSize: '14px',
        verticalAlign: 'top',
        marginLeft: '8px',
    },
    text: {
        fontSize: '12px',
        marginTop: '5%',
    },
};

const List = () => {
    const { title } = useParams(); //title에 맞게 서버에 데이터 요청할 것


    useEffect(() => {
        
    }, [])
   

    //const scroll = useThrottling();
    const [bottom, setBottom] = useState(null);




    const option = { threshold: 0.25, rootMargin: '80px' };

    /*useEffect(() => {
        //const observer = new IntersectionObserver(observerCallback, option);
        if (bottom) {
            //observer.observe(bottom);
        }
        return () => {
            if (bottom) {
                //observer.unobserve(bottom);
            }
        };
    }, [bottom]);*/

    /*useEffect(() => {
        //쓰로틀링 훅으로 스크롤 위치 저장함
        window.sessionStorage.setItem(
            `${callbacktitle.current}_scroll`,
            scroll
        );
    }, [scroll]);*/


    /*const handleScroll = useCallback((title) => {
        window.scrollTo({
            top: window.sessionStorage.getItem(`${title}_scroll`),
        });
    }, []);*/

   const data = undefined;
   const error = undefined;
   const loading = undefined;

    if (error) return <Error error={error} />;
    if (!data) return null;

    return (
        <MainFrame>
            <h2 id={'viewPort'} style={{ fontSize: '20px', marginTop: '2%' }}>
                {title}
            </h2>
            <ListView
                data={data}
                cardstyle={cardstyle}
                cardinfostyle={cardinfostyle}
            />
            <div ref={setBottom} />
            <Btn>
                <FaArrowUp />
            </Btn>
        </MainFrame>
    );
};

export default React.memo(List);
