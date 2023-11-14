import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

function NewsFeed() {
  const token = JSON.parse(localStorage.getItem('user'));
  const [abc, setAbc] = useState('');
    const fetchData = async () => {
      console.log(token);
      try {
        const response = await axios.get('https://localhost:7038/api/auth/Test', {
          headers: {
            Authorization: `Bearer ${token.accessToken}`,
          },
        });
        
        // Xử lý dữ liệu từ máy chủ
        console.log(response);
        setAbc(response.data.email);
      } catch (error) {
        // Xử lý lỗi
        console.error(error);
      }
    };
  return (
    <div className='btn-btn-succeed container color-red'>
      <button onClick={fetchData}>Gửi yêu cầu Test</button>
      <h1>{abc}</h1>
    </div>
  )
  
}

export default NewsFeed
