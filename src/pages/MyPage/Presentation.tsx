import MainFrame from 'pages/MainFrame';
import Button from 'atoms/Button';
import ListView from 'module/ListView';
import styled from 'styled-components';

const Btngrid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px 20px;
    margin-top: 2%;
`;

const None = styled.div`
    text-align: center;
    font-size: 20px;
    color: gray;
    margin-top: 2%;
`;

const UserMessage = styled.div`
    display: flex;
    justify-content: center;
    font-size: 16px;
    font-weight: bold;
    padding: 2% 0% 2% 0%;
`;

const cardstyle = {
    height: '100%',
    mobileheight: '100%',
};



const MyPagePresentation = ({ data, nickname, title, setTitle }: any) => {
    return (
        <MainFrame>
            <UserMessage>{nickname}님 반갑습니다.</UserMessage>
            <Btngrid>
                <Button
                    styled={{
                        border: 'none',
                        fontWeight: title === '방문' ? 'bold' : 'normal',
                        fontSize: title === '방문' ? '15px' : '12px',
                    }}
                    onClick={() => setTitle('방문')}
                >
                    최근 본 작품
                </Button>
                <Button
                    styled={{
                        border: 'none',
                        fontWeight: title === '좋아요' ? 'bold' : 'normal',
                        fontSize: title === '좋아요' ? '15px' : '12px',
                    }}
                    onClick={() => setTitle('좋아요')}
                >
                    좋아요 표시한 작품
                </Button>
                <Button
                    styled={{
                        border: 'none',
                        fontWeight: title === '별점' ? 'bold' : 'normal',
                        fontSize: title === '별점' ? '15px' : '12px',
                    }}
                    onClick={() => setTitle('별점')}
                >
                    별점 표시한 작품
                </Button>
            </Btngrid>
            {data && data.length === 0 && title === '방문' && (
                <None>아직 본 작품이 없습니다.</None>
            )}
            {data && data.length === 0 && title === '좋아요' && (
                <None>아직 좋아요를 표시한 작품이 없습니다.</None>
            )}
            {data && data.length === 0 && title === '별점' && (
                <None>아직 별점을 표시한 작품이 없습니다.</None>
            )}
            {data && (
                <ListView
                    data={data}
                    cardstyle={cardstyle}
                />
            )}
        </MainFrame>
    );
};

export default MyPagePresentation;
