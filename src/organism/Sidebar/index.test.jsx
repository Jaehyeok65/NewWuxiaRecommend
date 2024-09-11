import { render, screen, fireEvent } from '@testing-library/react';
import Sidebar from '.';

describe('Sidebar Component Test', () => {

    it('Close 버튼을 누르면 onClick Props가 호출된다.', async () => {
        const onClick = jest.fn();
        render(<Sidebar toggle={true} onClick={onClick} />);

        const close = screen.getByTestId('close');

        fireEvent.click(close);

        expect(onClick).toBeCalled();
    });
});
