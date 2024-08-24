import { render, screen, fireEvent } from "@testing-library/react";
import Input from "./index";



describe('Input Component Test', () => {


    const onChange = jest.fn();

    it('value Props가 주어진다면 Input에 value Props가 정상적으로 채워진다.', () => {

        const value = '테스트';

        render(<Input values={value} onChange={onChange} />);

        const valuetest = screen.getByDisplayValue(value);

        expect(valuetest).toBeInTheDocument();
        
    });

    it('Input 값이 변경되면 onChange 이벤트 핸들러가 정상적으로 작동한다.', () => {

        const value = '테스트';

        render(<Input values={value} onChange={onChange} />);

        const valuetest = screen.getByDisplayValue(value);

        expect(valuetest).toBeInTheDocument();

        fireEvent.change(valuetest, { target : { value : '테스트 완료'}});

        expect(onChange).toBeCalled();

    });
})