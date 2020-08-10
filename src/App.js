import React, { useContext, useEffect} from 'react';
import {TaskContext} from './context/task/TaskContext'
import Layout from './hoc/Layout/Layout'
import './App.css';
import Loader from './components/UI/Loader/Loader'

function App() {

  const tContext = useContext(TaskContext)

  useEffect( () => {
    tContext.init()
  }, [])


  return (
    tContext.loading ? <Loader/> : tContext.error ? <h1>Ошибка сервера</h1> : <Layout/>
  );

}

export default App;
