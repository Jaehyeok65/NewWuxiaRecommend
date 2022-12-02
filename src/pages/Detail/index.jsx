import React from 'react';
import MainFrame from '../MainFrame';
import styled from 'styled-components';
import Product from '../../molecule/Product';
import Modal from '../../molecule/Modal';
import StarRate from '../../molecule/StarRate';
import Button from '../../atoms/Button';
import { Text } from '../../atoms/Text';



const Details = styled.div`
    display : grid;
    grid-template-columns: repeat(2,1fr);
    gap : 20px 20px;
    width : 50%;
    margin : 0 auto;
    margin-top : 3%;
    margin-bottom : 10%;

    > img {
        width : 100%;
        height : 100%;
        max-width : 280px;
    }

    @media screen and (max-width: 1000px) {
        width : 80%;
        margin-bottom : 50%;
        margin-top : 20%;
    }
`;

const productstyle = {
    title : {
        marginBottom : '5%'
    },
    text : {
        marginBottom : '5%',
        fontSize : '12px'
    }
}


const Detail = ( { data, error, onLikeClick, onRateToggle, clicked, init, setTextToggle, ratetoggle,
                   handleclicked, handleStar, handleSubmit, handleClose, texttoggle }) => {

    
    if (error) return <div>에러 발생!</div>;
    if (!data) return null;


    return(
        <React.Fragment>
            { data && 
            <React.Fragment>
                <MainFrame>
                    <Details>
                        <Product product={data} styled={productstyle} icon={true} setIcon={onLikeClick}
                        setRateToggle={onRateToggle} setTextToggle={()=>setTextToggle(prev => !prev)}
                        clicked={clicked} init={init} />
                    </Details>
                </MainFrame>
                    <Modal toggle={ratetoggle}>
                        <Text styled={{textAlign : 'center', marginBottom : '5%', marginTop : '20%'}}>별점 주기</Text>
                        <StarRate clicked={handleclicked} handleStar={handleStar} styled={{fontSize : '30px', textAlign : 'center', color : '#FFCF36'}} />
                        <Button onClicks={handleSubmit} styled={{width : '100px', borderRadius : '4px', margin : '0 auto', display : 'block', marginBottom : '2%', marginTop : '2%'}}>적용하기</Button>
                        <Button onClicks={handleClose} styled={{width : '100px', borderRadius : '4px', margin : '0 auto', display : 'block'}}>닫기</Button>
                    </Modal>
                    <Modal toggle={texttoggle}>
                        <Text styled={{textAlign : 'center', marginBottom : '5%', marginTop : '10%', marginLeft : '5%', marginRight : '5%'}}>{data.content}</Text>
                        <Button onClicks={() => setTextToggle(prev => !prev)} styled={{width : '100px', borderRadius : '4px', margin : '0 auto', display : 'block'}}>닫기</Button>
                    </Modal>
            </React.Fragment>}
        </React.Fragment>
    )

}


export default React.memo(Detail);