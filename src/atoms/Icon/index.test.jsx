import { render, screen } from "@testing-library/react";
import Icon from "./index";



describe('Icon Component Test', () => {

    
    it('children Props가 화면에 정상적으로 보인다.', () => {

        render(<Icon>아이콘</Icon>);

        const icon = screen.getByText('아이콘');

        expect(icon).toBeInTheDocument();

    });
})