import { render, screen, fireEvent } from '@testing-library/react';
import SearchInput from '.';
import SearchList from '../../pages/SearchList';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';

describe('SearchInput Test', () => {
    const SearchInputstyle = {
        //SearchInput의 스타일 지정
        input: {
            padding: '12px',
            margin: '4px 8px',
        },
        btn: {
            padding: '0px',
            margin: '0px',
            border: 'none',
            width: '80px',
            height: '100px',
        },
        div: {
            pcwidth: '50%',
            mobilewidth: '30%',
            textAlign: 'right',
        },
    };

    it('렌더링이 되면 화면에 검색 아이콘이 보인다.', async () => {
        render(
            <Router initialEntries={['/search']}>
                <Routes>
                    <Route
                        path="/search"
                        element={<SearchInput styled={SearchInputstyle} />}
                    >
                        <Route path=":title/:input" element={<SearchList />} />
                    </Route>
                </Routes>
            </Router>
        );

        const searchinput = screen.getByTestId('searchinput');

        expect(searchinput).toBeInTheDocument();
    });

    it('검색 아이콘을 클릭하면 입력창이 화면에 나타난다.', async () => {
        let value = '검색';
        const onChange = jest.fn();

        render(
            <Router initialEntries={['/search']}>
                <Routes>
                    <Route
                        path="/search"
                        element={
                            <SearchInput
                                styled={SearchInputstyle}
                                values={value}
                                onChange={onChange}
                            />
                        }
                    >
                        <Route path=":title/:input" element={<SearchList />} />
                    </Route>
                </Routes>
            </Router>
        );

        const searchinput = screen.getByTestId('searchinput');

        fireEvent.click(searchinput);

        const input = await screen.findByDisplayValue(value);

        expect(input).toBeInTheDocument();
    });

    it('입력창에서 데이터를 변경하면 onChange 이벤트 핸들러가 동작한다.', async () => {
        let value = '검색';
        const onChange = jest.fn();

        render(
            <Router initialEntries={['/search']}>
                <Routes>
                    <Route
                        path="/search"
                        element={
                            <SearchInput
                                styled={SearchInputstyle}
                                values={value}
                                onChange={onChange}
                            />
                        }
                    >
                        <Route path=":title/:input" element={<SearchList />} />
                    </Route>
                </Routes>
            </Router>
        );

        const searchinput = screen.getByTestId('searchinput');

        fireEvent.click(searchinput);

        const input = await screen.findByDisplayValue(value);

        fireEvent.change(input, { target: { value: '검색변경' } });

        expect(onChange).toBeCalled();
    });
});
