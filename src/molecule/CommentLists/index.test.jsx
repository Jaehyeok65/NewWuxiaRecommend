import { render, screen } from "@testing-library/react";
import CommentLists from ".";



describe('CommentLists Component Test', () => {


    it('Props가 있으면 화면에 Props 내용이 출력된다.', () => {

        const writer = '작가';

        const title = '제목';

        const date='2024-08-26';

        const recommend='10';

        render(<CommentLists writer={writer} title={title} date={date} recommend={recommend}/>);

        const writertest = screen.getByText(writer);

        expect(writertest).toBeInTheDocument();

        const titletest = screen.getByText(title);

        expect(titletest).toBeInTheDocument();

        const datetest = screen.getByText(date);

        expect(datetest).toBeInTheDocument();

        const recommendtest = screen.getByText(recommend);

        expect(recommendtest).toBeInTheDocument();

    });
})