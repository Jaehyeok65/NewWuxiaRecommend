import styled from 'styled-components';
import MainFrame from '../MainFrame';
import ListView from 'module/ListView';

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

const SearchListPresentation = ({
    data,
    input,
    title,
}: {
    data: any;
    input: string | undefined;
    title: string | undefined;
}) => {
    if (!input || !title) {
        return <h2>검색 중 오류가 발생했습니다. 다시 검색해주세요!</h2>;
    }

    console.log(data);
    if (data && data.length === 0)
        return (
            <MainFrame>
                <h2
                    style={{
                        fontSize: '20px',
                        marginTop: '2%',
                        marginBottom: '30%',
                    }}
                >
                    {`"${input}" `}검색 결과가 없습니다.
                </h2>
            </MainFrame>
        );

    return (
        <MainFrame>
            {data && (
                <h2 style={{ fontSize: '20px', marginTop: '2%' }}>
                    {input ? `"${input}" ` : null}
                    {title + ' ' + data.length + '개'}
                </h2>
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

export default SearchListPresentation;
