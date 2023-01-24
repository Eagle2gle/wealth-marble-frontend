import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Appstate } from '@/store';

import { increment, decrement } from '../store/modules/counter';

export default function Test() {
  const dispatch = useDispatch();
  const count = useSelector(({ counter }: Appstate) => counter.number);

  const plus = useCallback(() => {
    dispatch(increment());
  }, [dispatch]);

  const minus = useCallback(() => {
    dispatch(decrement());
  }, [dispatch]);

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <h1>Counter</h1>
      <div className="space-x-4">
        <button onClick={() => minus()}>-</button>
        <span>{count}</span>
        <button onClick={() => plus()}>+</button>
      </div>
    </div>
  );
}
