import React, { useEffect, useState, useCallback, lazy } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { setRecentView } from '../../module/RecentView';
import Error from '../../module/Error.jsx';
import { Suspense } from 'react';
import {
    getWuxiaProduct,
    setWuxiaProductLikes,
    setWuxiaProductRate,
    setWuxiaProductView,
} from '../../api/WuxiaAPI';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const Detail = lazy(() => import('./index.jsx'));

const Container = ({ loginstate }) => {
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
    const { data, isError, error } = useQuery({
        queryKey: ['product', title],
        queryFn: () => getWuxiaProduct(title),
        option : {
            suspense : true
        }
    });

    const LikeMutation = useMutation({
        mutationFn: () => {
            return setWuxiaProductLikes(data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries('product');
        },
    });
    const RateMutation = useMutation({
        mutationFn: () => {
            return setWuxiaProductRate(data);
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries('product');
            handleRate(data?.rate);
        },
    });
    const ViewMutation = useMutation({
        mutationFn: () => {
            return setWuxiaProductView(data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries('product');
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

    const handleStar = useCallback((index) => {
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

    const handleRate = useCallback((rate) => {
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

    if (isError) {
        return <Error error={error} />;
    }

    //console.log(window.sessionStorage.getItem('view'));

    return (
        <React.Fragment>
            <Suspense fallback={<div>로딩...</div>}>
                <Detail
                    data={data}
                    error={error}
                    ratetoggle={ratetoggle}
                    handleStar={handleStar}
                    handleSubmit={handleSubmit}
                    handleClose={handleClose}
                    onLikeClick={onLikeClick}
                    onRateToggle={onRateToggle}
                    init={init}
                    clicked={clicked}
                    handleclicked={handleclicked}
                />
            </Suspense>
        </React.Fragment>
    );
};

export default React.memo(Container);
