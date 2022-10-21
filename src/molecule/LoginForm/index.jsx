import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../../atoms/Button';
import { Input } from '../../atoms/Input';
import { getLogin } from '../../api/Server';


const LoginForms = styled.div`
   
`


const LoginForm = ( { styled, input, onChange, username, userpassword, init, onClose }) => {

    

    const onSubmit = (e) => {
        e.preventDefault();
        if(input.userEmail === '' || input.userPassword === '') {
            alert('아이디와 비밀번호를 입력해주세요');
            return;
        }
        getLogin(input, onClose);
        init();
        //onClose();
    };

    return(
        <LoginForms>
            <form onSubmit ={onSubmit}>
                <Input type='email' name={username} values={input.userEmail} placeholder='이메일을 입력하세요...' 
                    onChange={onChange} styled={styled.input1}/>
                <br/>
                <Input type='password' name={userpassword} values={input.userPassword} placeholder='비밀번호를 입력하세요...'
                    onChange={onChange} styled={styled.input2} />
                <br/>
                <Button styled={styled.button}>로그인</Button>
                </form>
        </LoginForms>
    )

}


export default React.memo(LoginForm);