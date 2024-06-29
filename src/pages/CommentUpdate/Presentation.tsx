import React from 'react';
import MainFrame from '../MainFrame';
import styled from 'styled-components';

const WriteArea = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
`;

const TitleInput = styled.input`
    width: 100%;
    max-width: 600px;
    height: 40px;
    font-size: 16px;
    margin-bottom: 20px;
    margin-top: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
`;

const ContentTextArea = styled.textarea`
    width: 100%;
    max-width: 600px;
    height: 300px;
    font-size: 16px;
    margin-bottom: 20px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
`;

const SubmitButton = styled.input`
    width: 100px;
    height: 40px;
    background-color: #0077ff;
    color: #fff;
    font-size: 16px;
    font-weight: bold;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
        background-color: #0055cc;
    }

    &:active {
        transform: translateY(2px);
    }
`;

const CommentUpdatePresentation = ({ comment, onSubmit, onChange }: any) => {
    return (
        <React.Fragment>
            {comment && (
                <MainFrame>
                    <form onSubmit={onSubmit}>
                        <WriteArea>
                            <TitleInput
                                name="title"
                                value={comment.title}
                                onChange={onChange}
                            />
                            <ContentTextArea
                                name="content"
                                value={comment.content}
                                onChange={onChange}
                            />
                            <SubmitButton type="submit" value="전송" />
                        </WriteArea>
                    </form>
                </MainFrame>
            )}
        </React.Fragment>
    );
};

export default React.memo(CommentUpdatePresentation);
