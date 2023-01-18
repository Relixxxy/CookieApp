import { seriousNumbers } from 'common/ConvertFunc/convertFunc';
import { useEffect, useState } from 'react';
import { ClickedComponent } from './ClickEffect.styled';

export const ClickEffect = ({ obj, value }) => {
  const [unmountMe, setUnmountMe] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setUnmountMe(false);
    }, 1000);
  }, []);
  
  return (<>
   {unmountMe && <ClickedComponent unselectable='on' onmousedown="return false" onselectstart="return false" obj={obj}>+{seriousNumbers(value)}</ClickedComponent>}
  </>
  )
}