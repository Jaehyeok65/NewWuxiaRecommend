import { render, screen } from '@testing-library/react';
import { RenderWithProvidersNoRoutes } from 'utill/RenderWtihQuery';
import Card from '.';

describe('Card Component Test', () => {
    const product = {
        title: '검술명가 막내아들',
        url: '/image/img1.jpg',
        writer: '황제펭귄',
        view: 10,
    };

    it('Title Props 확인', () => {
        render(
            <RenderWithProvidersNoRoutes>
                <Card product={product} />
            </RenderWithProvidersNoRoutes>
        );
        const title = screen.getByText('검술명가 막내아들');
        expect(title).toBeInTheDocument();
    });

    it('Writer Props 확인', () => {
        render(
            <RenderWithProvidersNoRoutes>
                <Card product={product} />
            </RenderWithProvidersNoRoutes>
        );
        const writer = screen.getByText('황제펭귄');
        expect(writer).toBeInTheDocument();
    });

    it('Url Props 확인', () => {
        render(
            <RenderWithProvidersNoRoutes>
                <Card product={product} />
            </RenderWithProvidersNoRoutes>
        );

        const image = screen.getByRole('img');
        image.getAttribute('/image/img1.jpg');
    });

    it('View Props 확인', () => {
        render(
            <RenderWithProvidersNoRoutes>
                <Card product={product} />
            </RenderWithProvidersNoRoutes>
        );

        const view = screen.getByText('조회수 : 10');
        expect(view).toBeInTheDocument();
    });
});
