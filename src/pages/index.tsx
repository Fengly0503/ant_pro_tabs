import React, {useEffect, useState} from 'react';
import {querySearch} from '@/utils/common'

const HomePage = () => {
  const [userInfo, setUserInfo] = useState('');
  // eslint-disable-next-line no-restricted-globals
  useEffect(() => {
    const querys = querySearch(decodeURIComponent(location.search))
    setUserInfo(JSON.stringify(querys));
  }, [])

  return (
    <div>
      <h3>获取的用户信息是：</h3>
      <p>{userInfo}</p>
    </div>
  )
}

export default HomePage;
