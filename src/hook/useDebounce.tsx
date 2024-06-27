import { useEffect, useState } from 'react';

const useDebounce = (value : any, delay = 500) => {
    const [debounceValue, setDebounceValue] = useState(value); 

    //디바운스의 원리 == 값이 들어오면 처음 요청들을 무시하고 마지막 요청만 리턴한다.
    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        const timer = setTimeout(() => {
            setDebounceValue(value);
        }, delay);
        return () => {
            clearTimeout(timer);
        };
    }, [value, delay]);

    return debounceValue;
};

export default useDebounce;
