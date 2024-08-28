import { render, screen } from "@testing-library/react";
import Modal from ".";


describe('Modal Component Test', () => {


    it('toggle Props가 True라면 chilrdren 내용이 보인다.', () => {

        render(<Modal toggle={true}>내용</Modal>);

        const content = screen.getByText('내용');

        expect(content).toBeInTheDocument();
    });

    it('toggle Props가 False라면 chilrdren 내용이 보이지 않는다', () => {

        render(<Modal toggle={false}>내용</Modal>);

        const content = screen.queryByText('내용');

        expect(content).not.toBeInTheDocument();
    });

});