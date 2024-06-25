import React, { useState, useCallback, useEffect } from 'react';
import MainFrame from '../MainFrame';
import styled from 'styled-components';
import Product from '../../molecule/Product';
import Modal from '../../molecule/Modal';
import StarRate from '../../molecule/StarRate';
import Button from '../../atoms/Button';
import Text from '../../atoms/Text';
import Error from '../../module/Error';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { setRecentView } from '../../module/RecentView';
import {
    getWuxiaProduct,
    setWuxiaProductLikes,
    setWuxiaProductRate,
    setWuxiaProductView,
} from '../../api/WuxiaAPI';
import {
    useMutation,
    useQueryClient,
    useSuspenseQuery,
} from '@tanstack/react-query';

const Details = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px 20px;
    width: 50%;
    margin: 0 auto;
    margin-top: 3%;
    margin-bottom: 10%;

    > img {
        width: 100%;
        height: 100%;
        max-width: 280px;
    }

    @media screen and (max-width: 1000px) {
        width: 80%;
        margin-bottom: 50%;
        margin-top: 20%;
    }
`;

const productstyle = {
    title: {
        marginBottom: '5%',
    },
    text: {
        marginBottom: '5%',
        fontSize: '12px',
    },
};

const Detail = ({ loginstate }: any) => {
    const [texttoggle, setTextToggle] = useState(false); //본문용 토글 UI와 관련된 기능이기 때문에 프리젠테이셔널 컴포넌트에 둠
    const queryClient = useQueryClient();
    const { title } = useParams();
    const [ratetoggle, setRateToggle] = useState(false); //별점용 토글
    const [handleclicked, setHandleClicked] = useState([
        false,
        false,
        false,
        false,
        false,
    ]); //별점부여용 State
    const [clicked, setClicked] = useState([false, false, false, false, false]); //상품 별점 State
    const [view, setView] = useState(false);
    const { data, isFetching, error } = useSuspenseQuery({
        queryKey: ['product'],
        queryFn: () => getWuxiaProduct(title),
    });

    const LikeMutation = useMutation({
        mutationFn: () => {
            return setWuxiaProductLikes(data);
        },
        onSettled: async () => {
            return await queryClient.invalidateQueries({
                queryKey: ['product'],
            });
        },
    });
    const RateMutation = useMutation({
        mutationFn: (data: any) => {
            return setWuxiaProductRate(data);
        },
        onSuccess: (data) => {
            handleRate(data?.rate);
        },
        onSettled: async () => {
            return await queryClient.invalidateQueries({
                queryKey: ['product'],
            });
        },
    });
    const ViewMutation = useMutation({
        mutationFn: () => {
            return setWuxiaProductView(data);
        },
        onSettled: async () => {
            return await queryClient.invalidateQueries({
                queryKey: ['product'],
            });
        },
    });

    const navigate = useNavigate();
    const memoizedNavigate = useCallback(navigate, []);

    useEffect(() => {
        if (!view && data) {
            //중복 방문을 방지하기 위함
            ViewMutation.mutate(data); // 컴포넌트가 처음 렌더링될 때만 호출
            setRecentView(data);
            setView(true);
        }
    }, [data, view]);

    const handleStar = useCallback((index: number) => {
        setHandleClicked((prev) => prev.map((_, i) => i <= index));
    }, []);

    const handleClose = useCallback(() => {
        setRateToggle((prev) => !prev);
    }, []);

    const handleSubmit = () => {
        const rate = handleclicked.filter((item) => item === true).length;

        RateMutation.mutate({
            ...data,
            rate,
        });

        handleClose();
    };

    const handleRate = useCallback((rate: number) => {
        setClicked(
            Array(5)
                .fill(false)
                .map((_, i) => i < rate)
        );
    }, []);

    const onLikeClick = () => {
        if (!loginstate) {
            window.alert('로그인이 필요한 기능입니다.');
            memoizedNavigate('/login');
            return;
        }

        LikeMutation.mutate(data);
    };

    const onRateToggle = useCallback(() => {
        if (!loginstate) {
            window.alert('로그인이 필요한 기능입니다.');
            memoizedNavigate('/login');
            return;
        }
        setRateToggle((prev) => !prev);
    }, [setRateToggle]);

    const init = () => {
        setClicked(() => {
            const clickStates = Array(5)
                .fill(false)
                .map((_, index) => index < data.rate);
            return clickStates;
        });
    };

    if (error && !isFetching) {
        return <Error error={error} />;
    }

    if (error) return <Error error={error} />;
    if (!data) return null;

    return (
        <React.Fragment>
            {data && (
                <React.Fragment>
                    <MainFrame>
                        <Details>
                            <Product
                                product={data}
                                styled={productstyle}
                                icon={true}
                                setIcon={onLikeClick}
                                setRateToggle={onRateToggle}
                                setTextToggle={() =>
                                    setTextToggle((prev) => !prev)
                                }
                                clicked={clicked}
                                init={init}
                            />
                        </Details>
                    </MainFrame>
                    <Modal toggle={ratetoggle}>
                        <Text
                            styled={{
                                textAlign: 'center',
                                marginBottom: '5%',
                                marginTop: '20%',
                            }}
                        >
                            별점 주기
                        </Text>
                        <StarRate
                            clicked={handleclicked}
                            handleStar={handleStar}
                            styled={{
                                fontSize: '30px',
                                textAlign: 'center',
                                color: '#FFCF36',
                            }}
                        />
                        <Button
                            onClick={handleSubmit}
                            styled={{
                                width: '100px',
                                borderRadius: '4px',
                                margin: '0 auto',
                                display: 'block',
                                marginBottom: '2%',
                                marginTop: '2%',
                            }}
                        >
                            적용하기
                        </Button>
                        <Button
                            onClick={handleClose}
                            styled={{
                                width: '100px',
                                borderRadius: '4px',
                                margin: '0 auto',
                                display: 'block',
                            }}
                        >
                            닫기
                        </Button>
                    </Modal>
                    <Modal toggle={texttoggle}>
                        <Text
                            styled={{
                                textAlign: 'center',
                                marginBottom: '5%',
                                marginTop: '10%',
                                marginLeft: '5%',
                                marginRight: '5%',
                            }}
                        >
                            {data.content}
                        </Text>
                        <Button
                            onClick={() => setTextToggle((prev) => !prev)}
                            styled={{
                                width: '100px',
                                borderRadius: '4px',
                                margin: '0 auto',
                                display: 'block',
                            }}
                        >
                            닫기
                        </Button>
                    </Modal>
                </React.Fragment>
            )}
        </React.Fragment>
    );
};

export default React.memo(Detail);
