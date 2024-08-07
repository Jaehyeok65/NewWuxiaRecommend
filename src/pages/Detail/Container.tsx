import React, { useState, useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { setRecentView } from 'module/RecentView';
import {
    getWuxiaProduct,
    setWuxiaProductLikes,
    setWuxiaProductRate,
    setWuxiaProductView,
} from 'api/WuxiaAPI';
import {
    useMutation,
    useQueryClient,
    useSuspenseQuery,
} from '@tanstack/react-query';
import Detail from './Presentation';
import useDebounce from 'hook/useDebounceFuntion';
import { showAlert } from 'redux/action';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { Wuxia } from 'type/type';

const Container = ({
    loginstate,
    nickname,
}: {
    loginstate: boolean;
    nickname: string;
}) => {
    const queryClient = useQueryClient();
    const { title } = useParams();
    const dispatch = useDispatch();
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
    const { data, isPending, error } = useSuspenseQuery({
        queryKey: ['product', title],
        queryFn: () => getWuxiaProduct(title),
        staleTime: 600000,
    });

    const LikeMutation = useMutation({
        mutationFn: (data: Wuxia) => {
            return setWuxiaProductLikes(data);
        },
        onSuccess: (data) => {
            queryClient.setQueryData(['product', title], data);
            dispatch(showAlert('좋아요 표시 완료!', uuidv4(), 4000));
        },
    });
    const RateMutation = useMutation({
        mutationFn: (data: Wuxia) => {
            return setWuxiaProductRate(data);
        },
        onSuccess: (data) => {
            queryClient.setQueryData(['product', title], data);
            handleRate(data?.rate);
            dispatch(showAlert('별점 표시 완료!', uuidv4(), 4000));
        },
    });
    const ViewMutation = useMutation({
        mutationFn: (data: Wuxia) => {
            return setWuxiaProductView(data);
        },
        onSuccess: (data) => {
            queryClient.setQueryData(['product', title], data);
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
    }, [data]);

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

    const handleRate = useCallback((rate: number | undefined) => {
        if (!rate) {
            return;
        }
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

    const onDebounceLikeClick = useDebounce(onLikeClick);

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
                .map((_, index) => index < (data?.rate ?? 0));
            return clickStates;
        });
    };

    return (
        <React.Fragment>
            <Detail
                data={data}
                init={init}
                onRateToggle={onRateToggle}
                onLikeClick={onDebounceLikeClick}
                handleClose={handleClose}
                handleSubmit={handleSubmit}
                handleStar={handleStar}
                handleclicked={handleclicked}
                clicked={clicked}
                ratetoggle={ratetoggle}
                isPending={isPending}
                error={error}
                loginstate={loginstate}
                nickname={nickname}
                title={title}
            />
        </React.Fragment>
    );
};

export default React.memo(Container);
