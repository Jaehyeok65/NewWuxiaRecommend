import React from 'react';
import Container from './Container';

const CommentWriteIndex = ({ loginstate, nickname }: any) => {
    return <Container loginstate={loginstate} nickname={nickname} />;
};

export default React.memo(CommentWriteIndex);
