import {memo} from 'react';

const MemoizedItem =  memo(({ item }) => {
  console.log(`Rendering MemoizedItem ${item}`);
  return <li>{item}</li>;
});

MemoizedItem.displayName = "MemoizedItem";

export default MemoizedItem;