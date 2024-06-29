export const getRecentView = () => {
    let recent : any = window.sessionStorage.getItem('view');
    recent = JSON.parse(recent);

    if (!recent) {
        // 방문한 작품이 없다면 빈 배열을 리턴
        return [];
    }

    return recent.reverse(); //역순으로 리턴하여 가장 최근에 방문한 것이 가장 최근에 오도록함
};

export const setRecentView = (product : any) => {
    if (!product) return;

    let recent : any = window.sessionStorage.getItem('view');

    if (recent) {
        //recent 변수는 배열이므로
        recent = JSON.parse(recent);
        let flag = false;
        recent.forEach((item : any) => {
            if (item.title === product.title) {
                flag = true;
            }
        });
        if (flag) return;
        const newarray = [...recent, product];
        window.sessionStorage.setItem('view', JSON.stringify(newarray));
    } else {
        const newarray = [product];
        window.sessionStorage.setItem('view', JSON.stringify(newarray));
    }
};
