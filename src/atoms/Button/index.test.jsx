import { fireEvent, render, screen } from "@testing-library/react";
import Button from ".";



describe('Button Component Test', () => {



    it('children Props가 정상적으로 화면에 보인다.', () => {

        render(<Button>버튼</Button>);

        const btn = screen.getByText('버튼');

        expect(btn).toBeInTheDocument();

    });

    it('버튼을 클릭하면 onClicks 이벤트 핸들러가 정상적으로 호출된다', () => {

        const onClick = jest.fn();

        render(<Button onClick={onClick}>버튼</Button>);

        const btn = screen.getByText('버튼');

        expect(btn).toBeInTheDocument();
        
        fireEvent.click(btn);

        expect(onClick).toBeCalled();

    });
    
})