import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Banner from '../Banner';
import styled from 'styled-components';
import { BsCaretRight } from 'react-icons/bs';
import { BsCaretLeft } from 'react-icons/bs';

export const StyledSlider = styled(Slider)`
    height: 100%; //슬라이드 컨테이너 영역
    overflow: hidden;
    position: relative;

    .slick-prev::before,
    .slick-next::before {
        opacity: 0;
        display: none;
    }
    .slick-slide div {
        cursor: pointer;
    }

    .slick-list {
        //슬라이드 스크린
        width: 100%;
        height: 100%;
        margin: 0 auto;
        overflow-x: hidden;
        z-index: 0;
    }

    .slick-slide img {
        object-fit: contain;
        height: 330px;
        width: 100%;
        box-sizing: border-box;
    }

    .slick-dots {
        //슬라이드의 위치
        bottom: 20px;
    }
`;

function SampleNextArrow(props) {
    const { onClick } = props;

    return (
        <BsCaretRight
            style={{
                position: 'absolute',
                width: '30px',
                height: '30px',
                right: '1px',
                top: '50%',
                zIndex: '2000',
            }}
            onClick={onClick}
        />
    );
}

function SamplePrevArrow(props) {
    const { onClick } = props;

    return (
        <BsCaretLeft
            style={{
                position: 'absolute',
                width: '30px',
                height: '30px',
                left: '1px',
                top: '50%',
                zIndex: '2000',
            }}
            onClick={onClick}
        />
    );
}

const Carusel = ({ list }) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 2,
        initialSlide: 0,
        autoplay: true,
        autoplaySpeed: 5000,
        arrows: true,
        prevArrow: <SamplePrevArrow />,
        nextArrow: <SampleNextArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    initialSlide: 0,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 0,
                    intfinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 550,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 0,
                    dots: true,
                    infinite: true,
                },
            },
        ],
    };

    if (!list) return <div>에러 발생</div>;

    return (
        <StyledSlider {...settings}>
            {list &&
                list.map((item) => <Banner key={item.id} product={item} />)}
        </StyledSlider>
    );
};

export default Carusel;
