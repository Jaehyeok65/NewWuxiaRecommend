import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import StarRate from '.';

describe('StarRate Test', () => {
    const clicked = [true, true, true, true, true];

    const styled = { fontSize: '30px', textAlign: 'center', color: '#FFCF36' };

    it('기본적으로 별 아이콘이 5개가 화면에 보인다.', async () => {
        render(<StarRate clicked={clicked} styled={styled} />);

        const stars = screen.getAllByTestId('stars');

        expect(stars).toHaveLength(5);
    });

    it('rate Props가 있으면 화면에 rate 정보가 보인다.', async () => {
        render(<StarRate clicked={clicked} styled={styled} rate={4.2} />);

        const rate = screen.getByText(/4.2/);

        expect(rate).toBeInTheDocument();
    });

    it('별 아이콘을 클릭하면 handleStar 이벤트가 동작한다.', async () => {
        const handleStar = jest.fn();

        render(
            <StarRate
                clicked={clicked}
                styled={styled}
                rate={4.2}
                handleStar={handleStar}
            />
        );

        const stars = screen.getAllByTestId('stars');

        fireEvent.click(stars[3]); //네번째 별점을 클릭함

        await waitFor(() => expect(handleStar).toBeCalled());
    });
});
