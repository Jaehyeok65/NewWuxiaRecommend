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
    Formatting,
    saveWuxiaComment,
    getWuxiaComment,
    deleteWuxiaComment,
} from 'api/CommentAPI';
import {
    useMutation,
    useQueryClient,
    useSuspenseQuery,
} from '@tanstack/react-query';
import Detail from './Presentation';
import useDebounce from 'hook/useDebounceFuntion';
import { getuserId } from 'api/LoginAPI';

const Container = ({ loginstate, nickname }: any) => {
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
    const { data, isPending, error } = useSuspenseQuery({
        queryKey: ['product', title],
        queryFn: () => getWuxiaProduct(title),
    });

    const { data: commentdata } = useSuspenseQuery({
        queryKey: ['productcomment', title],
        queryFn: () => getWuxiaComment(title),
    });

    const [wuxiacomment, setWuxiaComment] = useState<any>({
        wuxia_id: data?.id,
        user_id: getuserId(),
        comment_text: '',
        created_at: Formatting(new Date()),
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

    const WuxiaCommentMutation = useMutation({
        mutationFn: () => {
            return saveWuxiaComment(wuxiacomment);
        },
        onSettled: async () => {
            return await queryClient.invalidateQueries({
                queryKey: ['productcomment'],
            });
        },
        onSuccess: () => {
            setWuxiaComment((prev: any) => ({
                ...prev,
                comment_text: '', // 빈 문자열로 설정
            }));
        },
    });

    const DeleteWuxiaCommentMutation = useMutation({
        mutationFn: (commentId: number) => {
            return deleteWuxiaComment(commentId);
        },
        onSuccess: (data) => {
            queryClient.setQueryData(['productcomment'], data);
        },
        onError: (error) => {
            console.error(error);
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['productcomment'] });
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

    const onWuxiaCommentSubmit = (e: any) => {
        e.preventDefault();
        if (!loginstate) {
            window.alert('로그인이 필요한 기능입니다.');
            memoizedNavigate('/login');
            return;
        }

        WuxiaCommentMutation.mutate(wuxiacomment);
    };

    const onRemoveComment = (commentId: number) => {
        DeleteWuxiaCommentMutation.mutate(commentId);
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

    const onDebounceLikeClick = useDebounce(onLikeClick);

    const onWriteClick = () => {
        if (!loginstate) {
            window.alert('로그인이 필요한 기능입니다.');
            memoizedNavigate('/login');
            return;
        }

        memoizedNavigate(`/commentwrite/${title}`);
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
                onWriteClick={onWriteClick}
                onWuxiaCommentSubmit={onWuxiaCommentSubmit}
                wuxiacomment={wuxiacomment}
                setWuxiaComment={setWuxiaComment}
                commentdata={commentdata}
                loginstate={loginstate}
                nickname={nickname}
                onRemoveComment={onRemoveComment}
            />
        </React.Fragment>
    );
};

export default React.memo(Container);
