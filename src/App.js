import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './pages/Main';
import Detail from './pages/Detail/Container';
import List from './pages/List';
import SearchList from './pages/SearchList';
import { getSessionCheck } from './api/LoginAPI';
import Community from './pages/Community/Container';
import CommentWrite from './pages/CommentWrite/WriteContainer';
import Comment from './pages/Comment/CommentContainer';
import CommentUpdate from './pages/CommentUpdate';
import Navigate from './pages/Navigate';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import MyPage from './pages/MyPage';

function App() {
    const [loginstate, setLoginstate] = useState(
        () => document.cookie.split('=')[1] || false
    ); //false라면 login이 필요한 상태 true라면 유저 닉네임
    const [nickname, setNickname] = useState(null);

    useEffect(() => {
        getSessionCheck(() => setLoginstate((prev) => !prev), setNickname); //상태 변경
    }, []);

    return (
        <Router>
            <Navigate
                loginstate={loginstate}
                setNickname={setNickname}
                setLoginstate={setLoginstate}
            />
            <Routes>
                <Route exact path="/" element={<Main />} />
                <Route
                    exact
                    path="/detail/:title"
                    element={<Detail loginstate={loginstate} />}
                />
                <Route exact path="/menu/:title" element={<List />} />
                <Route
                    exact
                    path="/search/:title/:input"
                    element={<SearchList />}
                />
                <Route
                    exact
                    path="/community"
                    element={<Community loginstate={loginstate} />}
                />
                <Route
                    exact
                    path="/commentwrite"
                    element={
                        <CommentWrite
                            loginstate={loginstate}
                            nickname={nickname}
                        />
                    }
                />
                <Route
                    exact
                    path="/comment/:id"
                    element={
                        <Comment loginstate={loginstate} nickname={nickname} />
                    }
                />
                <Route
                    exact
                    path="/commentupdate/:id"
                    element={<CommentUpdate loginstate={loginstate} />}
                />
                <Route
                    exact
                    path="/login"
                    element={
                        <Login
                            setLoginstate={() => setLoginstate((prev) => !prev)}
                            setNickname={setNickname}
                        />
                    }
                />
                <Route exact path="/signup" element={<SignUp />} />
                <Route exact path="/mypage" element={<MyPage loginstate={loginstate} />} />
            </Routes>
        </Router>
    );
}

export default App;
