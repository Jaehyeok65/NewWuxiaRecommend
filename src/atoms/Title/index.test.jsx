import { render, screen, fireEvent } from '@testing-library/react';
import Title from './index';

describe('Title Component Test', () => {
    const styled = {
        marginBottom: '4px',
        textAlign: 'center',
        marginTop: '4px',
        color: 'red',
        fontSize: '16px',
    };

    it('children Props가 정상적으로 화면에 보인다.', () => {
        render(<Title styled={styled}>제목</Title>);

        const title = screen.getByText('제목');

        expect(title).toBeInTheDocument();
    });

    it('children Props를 클릭하면 onClick 이벤트 핸들러가 호출된다.', () => {
        const onClick = jest.fn();

        render(
            <Title onClick={onClick} styled={styled}>
                제목
            </Title>
        );

        const title = screen.getByText('제목');

        expect(title).toBeInTheDocument();

        fireEvent.click(title);

        expect(onClick).toBeCalled();
    });

    it('stlye Props를 넘겨주면 CSS가 정상적으로 적용이 된다.', () => {
        render(<Title styled={styled}>제목</Title>);

        const titleElement = screen.getByText('제목');

        // 스타일 속성이 제대로 적용되었는지 확인합니다.
        expect(titleElement).toHaveStyle('margin-bottom: 4px');
        expect(titleElement).toHaveStyle('text-align: center');
        expect(titleElement).toHaveStyle('margin-top: 4px');
        expect(titleElement).toHaveStyle('color: red');
    });
});
