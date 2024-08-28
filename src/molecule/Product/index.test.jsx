import { render, fireEvent, screen } from "@testing-library/react";
import Product from ".";



describe('Product Component Test', () => {


    const product = {
        title : '제목',
        subtitle: '부제목',
        content : '내용',
        likes : 0,
        view : 0,
        link : 'www.naver.com'
    };

    const productstyle = {
        title : {
            marginBottom : '5%'
        },
        text : {
            marginBottom : '5%',
            fontSize : '12px'
        }
    };

    const clicked = [true, true, true, true, true];


    it('product와 styled Props가 있으면 Product 텍스트가 화면에 보인다.', () => {
        render(<Product product={product} styled={productstyle} />);

        const title = screen.getByText(product.title);

        expect(title).toBeInTheDocument();
    });

    it('버튼을 클릭하면 RateToggle, TextToggle 이벤트 핸들러가 동작한다.', async() => {

        const setRateToggle = jest.fn();

        const setTextToggle = jest.fn();

        render(<Product product={product} styled={productstyle} setRateToggle={setRateToggle} setTextToggle={setTextToggle} />);

        const btn1 = screen.getByText('설명 더보기');
        
        fireEvent.click(btn1);

        expect(setTextToggle).toHaveBeenCalled();

        const btn2 = screen.getByText("별점주기");

        fireEvent.click(btn2);

        expect(setRateToggle).toHaveBeenCalled();
    });

    it('clicked Props가 있으면 StarRate Component가 렌더링 되며 init 함수가 마운트시 실행된다.', () => {

        const init = jest.fn();

        render(<Product product={product} styled={productstyle} clicked={clicked} init={init} />);

        const star = screen.getByTestId('star');

        expect(star).toBeInTheDocument();

        expect(init).toHaveBeenCalled();

    });



    
    
})