import * as React from 'react';
import { createParam } from 'solito';
import UseAlertService from 'application/store/services/UseAlertService';

type ScreenParams = { id: string }

const { useParam } = createParam<ScreenParams>()

const Detail = () => {
    const [_id] = useParam('id');
    
  return (
      <></>
  );
};

export default Detail;