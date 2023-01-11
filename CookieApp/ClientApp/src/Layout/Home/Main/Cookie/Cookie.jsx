import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCookie, getClick } from 'redux/gameAcc';
import { CookieButton, CookieContainer, CookieQuantity } from './Cookie.styled';

export const Cookie = () => {
    const dispatch = useDispatch();
    const [cookies, setCookies] = useState(0);
    const [shake, setShake] = useState(false);
    const [perClick, setPerClick] = useState(1);
    const clickUpgrade = useSelector(getClick);

    
    useEffect(() => {
        const { baseTick, amount } = clickUpgrade;
        setPerClick(baseTick * amount);
    }, [clickUpgrade])
    

    const handleClicker = () => {
        setCookies(p => p + perClick);
        dispatch(addCookie(perClick));
        //Animation
         setShake(true);
        setTimeout(() => setShake(false), 50);
    };

    return (
        <>
            <CookieContainer>
                <CookieQuantity>{cookies} Cookies</CookieQuantity>
                <CookieButton onClick={handleClicker} className = {shake ? `shake` : null}>Cookie</CookieButton>
            </CookieContainer>
        </>
    )
}
