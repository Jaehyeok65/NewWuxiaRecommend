import { render, screen } from "@testing-library/react";
import Text from "./index";



describe('Text Component Text', () => {


    it('children Props가 정상적으로 화면에 출력된다.', () => {

        render(<Text>내용</Text>);

        const content = screen.getByText('내용');

        expect(content).toBeInTheDocument();

    });
})