/**
 * useCallback
 * 缓存函数
 */
import React, { useState, useCallback,useMemo } from 'react';
import { Button } from'antd';
const UseActionStateHook=()=>{
    const [count, setCount] = useState(0);
  const [text, setText] = useState('Hello');

  // 不传依赖数组
  const callback1 = useCallback(() => {
    console.log('Callback 1:', count, text);
  });

  // 传空数组
  const callback2 = useCallback(() => {
    console.log('Callback 2:', count, text);
  }, []);

  const callback3 = useCallback(() => {
    console.log('Callback 1:', count, text);
  },[count,text]);

   // 创建一个对象作为依赖项
//    const obj = { value: count };

//    // 创建一个数组作为依赖项  虽然值没改变 但还是会重新创建，引用地址改变
//    const arr = [count];

 // 使用 useMemo 缓存对象
 const obj = useMemo(() => ({ value: count }), [count]);

 // 使用 useMemo 缓存数组
 const arr = useMemo(() => [count], [count]);

  // 使用 useCallback，依赖项是对象
  const callbackWithObject = useCallback(() => {
    console.log('Callback with Object:', obj.value);
  }, [obj]);

  // 使用 useCallback，依赖项是数组
  const callbackWithArray = useCallback(() => {
    console.log('Callback with Array:', arr[0]);
  }, [arr]);

  return (
    <div>
      <p>Count: {count}</p>
      <p>Text: {text}</p>
      <Button type="primary" onClick={() => setCount(count + 1)}>Increment Count</Button>
      <Button onClick={() => setText('World')}>Change Text</Button>
      <Button type="primary" onClick={callback1}>Call Callback 1</Button>
      <Button onClick={callback2}>Call Callback 2</Button>
      <Button type="primary" onClick={callback2}>Call Callback 3</Button>
      <Button onClick={callbackWithObject}>Call Callback with Object</Button>
      <Button onClick={callbackWithArray}>Call Callback with Array</Button>
    </div>
  );
}
export default UseActionStateHook;