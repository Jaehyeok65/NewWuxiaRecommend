import React, { useState } from 'react';
import MainFrame from '../MainFrame';
import styled from 'styled-components';
import Product from '../../molecule/Product';
import Modal from '../../molecule/Modal';
import StarRate from '../../molecule/StarRate';
import Button from '../../atoms/Button';
import Text from '../../atoms/Text';
import Error from '../../module/Error';
import CommentBox from 'molecule/CommentBox';
import WuxiaComment from 'molecule/WuxiaComment';

interface DetailProps {
    data: any;
    onLikeClick: () => void;
    onRateToggle: () => void;
    clicked: boolean[];
    init: () => void;
    handleclicked: boolean[];
    ratetoggle: boolean;
    handleStar: (index: number) => void;
    handleSubmit: () => void;
    handleClose: () => void;
    error: any;
    isPending: boolean;
    onWriteClick: () => void;
    wuxiacomment: any;
    setWuxiaComment: any;
    onWuxiaCommentSubmit: any;
    commentdata: any;
    loginstate: boolean;
    nickname: string;
    onRemoveComment: (key: number) => void;
    onRecommendComment: (key: number) => void;
}

const Details = styled.div`
    display: grid;
    grid-template-columns: 1fr 3fr;
    gap: 60px;
    margin-top: 3%;
    margin-bottom: 5%;

    > img {
        width: 100%;
        height: 100%;
        max-width: 300px;
        max-height: 400px;
        border-radius: 8px;
    }

    @media screen and (max-width: 1000px) {
        grid-template-columns: 1fr 1fr;
        gap: 20px;
        margin-bottom: 10%;
        margin-top: 20%;
    }
`;

const productstyle = {
    title: {
        marginBottom: '5%',
    },
    text: {
        marginBottom: '2%',
        fontSize: '12px',
    },
};

const Detail = ({
    data,
    onLikeClick,
    onRateToggle,
    clicked,
    init,
    ratetoggle,
    handleclicked,
    handleStar,
    handleSubmit,
    handleClose,
    isPending,
    error,
    onWriteClick,
    wuxiacomment,
    setWuxiaComment,
    onWuxiaCommentSubmit,
    commentdata,
    loginstate,
    nickname,
    onRemoveComment,
    onRecommendComment,
}: DetailProps) => {
    const [texttoggle, setTextToggle] = useState(false); //본문용 토글 UI와 관련된 기능이기 때문에 프리젠테이셔널 컴포넌트에 둠

    if (error && !isPending) {
        return <Error error={error} />;
    }

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
                                onWriteClick={onWriteClick}
                            />
                        </Details>
                        <CommentBox
                            wuxiacomment={wuxiacomment}
                            setWuxiaComment={setWuxiaComment}
                            onWuxiaCommentSubmit={onWuxiaCommentSubmit}
                            loginstate={loginstate}
                        />
                        <WuxiaComment
                            data={commentdata}
                            nickname={nickname}
                            onRemoveComment={onRemoveComment}
                            onRecommendComment={onRecommendComment}
                        />
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
