import { NestApplicationContextOptions } from '@nestjs/common/interfaces/nest-application-context-options.interface';
import React, { useEffect, useState } from 'react';
import axios from 'axios'
import {CreateUserDto} from '../../user/dto/createUser.dto'
import '../style.css';

const App = () => {
  const [counter, setCounter] = useState(0);
  const [user, setUser] = useState<CreateUserDto>()

  useEffect(() => {
    (async ()=>{
      const {data} = await axios.get('/auth')
      setUser(data)
    })();
    
  }, []);
  
  return (
    <>
    <header><a href="/auth/log-out">Log-out</a></header>
    <div className="App">
      <h1>Hi, {user && user.name}</h1>
      <h1>{counter}</h1>
      <button onClick={() => setCounter(counter + 1)}>Press me</button>
    </div>
    </>
  );
};
export default App;
