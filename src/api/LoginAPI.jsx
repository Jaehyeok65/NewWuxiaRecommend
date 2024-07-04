import axios from "axios"



export const API = 'http://localhost:8088';


axios.defaults.withCredentials = true;


export const getLogin = async(logininfo) => {

    const data = await axios.post(`${API}/login`, {
        userEmail : logininfo.userEmail,
        userPassword : logininfo.userPassword
    });
    if(data.data === "overlap") { //중복 로그인인지 확인
        const confirm = window.confirm("다른 PC에서 로그인 중입니다. 연결을 끊고 로그인 하시겠습니까?");
        if(confirm) {
            const nickname = await getOverlapLogin(logininfo);
            return nickname;
        }
        else {
        window.alert("취소하셨습니다.");
        }
    }
    else if(data.data === "비밀번호가 다릅니다!") { //비밀번호가 다르므로 로그인 실패
        window.alert(data.data);
        return data.data;
    }
    else if(data.data === "존재하지 않는 아이디입니다!") {
        window.alert(data.data);
        return data.data;
    }
    else {
        window.alert("로그인에 성공하였습니다!"); //최초 로그인 성공
        return data.data;
    }
};

export const getOverlapLogin = async(logininfo) => {
    const data = await axios.post(`${API}/overlap`, {
        userEmail : logininfo.userEmail,
        userPassword : logininfo.userPassword
    });
    window.alert("로그인에 성공하였습니다!");
    if(data) {
        return data.data;
    }
}

export const getSessionCheck = async(setLoginstate, setNickname) => {
    const data = await axios.get(`${API}/sessioncheck`);
    if(data.data === true) { //세션이 만료되었으면
        setLoginstate(); //로그인 상태 변경
    }
    else {
        if(data.data !== false) {
        setNickname(data.data);
        }
    }
};

export const getSignUp = async(logininfo) => {

    const data = await axios.post(`${API}/signup`, {
        userEmail : logininfo.userEmail,
        userPassword : logininfo.userPassword,
        userNickname : logininfo.userNickname
    });
    window.alert(data.data);
    if(data.data === "회원가입을 완료하였습니다!") { //회원가입이 성공했을때만 닫기
        return true;
    }
    return false;
};

export const getLogout = async(setLoginstate) => {
    const confirm = window.confirm("로그아웃을 하시겠습니까?");
    if(!confirm) return;

    const data = await axios.get(`${API}/logout`);
    if(data.data) {
        window.alert("로그아웃을 완료하였습니다!");
        setLoginstate();
    }
    else {
        window.alert("로그아웃에 실패하였습니다");
    }
};

export const getEmailCheck = async(Email) => {

    const data = await axios.post(`${API}/emailcheck`, {
        userEmail : Email
    });

    return data.data;
};

export const getNicknameCheck = async(Nickname) => {
    const data = await axios.post(`${API}/nicknamecheck`, {
        userNickname : Nickname
    });

    return data.data;
};

export const getuserId = () => {
    let name = "login=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let cookieArray = decodedCookie.split(';');

    for (let i = 0; i < cookieArray.length; i++) {
        let cookie = cookieArray[i].trim();
        if (cookie.indexOf(name) === 0) {
            return cookie.substring(name.length, cookie.length);
        }
    }
    return "";
}