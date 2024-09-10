import { render, screen } from '@testing-library/react';
import { RenderWithProvidersNoRoutes } from 'utill/RenderWtihQuery';
import Banner from '.';

describe('Banner Component Test', () => {
    it('product Props가 주어지면 Banner 컴포넌트가 정상적으로 렌더링된다.', () => {
        const product = {
            title: 'Test Product',
            url: 'https://example.com/image.jpg',
        };

        render(
            <RenderWithProvidersNoRoutes>
                <Banner product={product} />
            </RenderWithProvidersNoRoutes>
        );

        // 이미지가 올바르게 렌더링되었는지 확인
        const image = screen.getByAltText('Test Product');
        expect(image).toBeInTheDocument();
        expect(image).toHaveAttribute('src', 'https://example.com/image.jpg');

        // Link가 올바른 경로로 설정되었는지 확인
        const link = screen.getByRole('link');
        expect(link).toHaveAttribute('href', '/detail/Test Product');
    });

    it('product Props가 주어지지 않으면 에러 화면이 렌더링된다.', () => {
        render(
            <RenderWithProvidersNoRoutes>
                <Banner />
            </RenderWithProvidersNoRoutes>
        );

        // 에러 메시지가 표시되는지 확인
        expect(screen.getByText('에러 발생')).toBeInTheDocument();
    });
});
