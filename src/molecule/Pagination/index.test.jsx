import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from '.';

describe('Pagination Component Test', () => {
    it('Props가 없으면 에러 발생 메시지가 화면에 보인다.', () => {
        render(<Pagination />);

        const error = screen.getByText('에러 발생');

        expect(error).toBeInTheDocument();
    });

    it('Props가 있으면 컴포넌트 내용이 정상적으로 화면에 보인다', () => {
        render(<Pagination total={21} page={1} limit={10} />);

        const num = screen.getByText(1); //페이지 초기 번호는 1번부터 시작하므로

        expect(num).toBeInTheDocument();
    });

    it('page 버튼을 클릭하면 setPage 이벤트 핸들러가 작동한다.', async () => {
        const setPage = jest.fn();

        render(<Pagination total={21} page={1} limit={10} setPage={setPage} />);

        const num = screen.getByText(1);

        fireEvent.click(num);

        expect(setPage).toHaveBeenCalled();
    });

    it('> 버튼을 클릭하면 setPage 이벤트 핸들러가 작동한다.', async () => {
        const setPage = jest.fn();

        render(<Pagination total={21} page={1} limit={10} setPage={setPage} />);

        const right = screen.getByText('>');

        fireEvent.click(right);

        expect(setPage).toHaveBeenCalled();
    });

    it('page가 1일 때  < 버튼을 클릭하면 disabled이므로 이벤트 핸들러가 작동하지 않는다.', async () => {
        const setPage = jest.fn();

        render(<Pagination total={21} page={1} limit={10} setPage={setPage} />);

        const left = screen.getByText('<');

        fireEvent.click(left);

        expect(setPage).not.toHaveBeenCalled();
    });

    it('page가 2일 때  < 버튼을 클릭하면 disabled가 아니므로 이벤트 핸들러가 작동한다.', async () => {
        const setPage = jest.fn();

        render(<Pagination total={21} page={2} limit={10} setPage={setPage} />);

        const left = screen.getByText('<');

        fireEvent.click(left);

        expect(setPage).toHaveBeenCalled();
    });
});
