import React from 'react'
import Create from './realtime/CRUD/Create'
import 'bootstrap/dist/css/bootstrap.css'
import { BrowserRouter as Routers, Routes, Route } from 'react-router-dom'
import SingleUser from './realtime/CRUD/SingleUser'
import Update from './realtime/CRUD/Update'
import CreateFire from './FireStore/Crud/CreateFire'
import UpdateFire from './FireStore/Crud/UpdateFire'
import SingleUserFire from './FireStore/Crud/SingleUserFire'
import Header from './layouts/Header'
import './assets/style.css'
const App = () => {
  return (
    <div>
      <Routers>
        <Header />
        <Routes>
          <Route path='/' element={<Create />}></Route>
          <Route path='/single/:id' element={<SingleUser />}></Route>
          <Route path='/update/:id' element={<Update />}></Route>
          <Route path='/createfire' element={<CreateFire />}></Route>
          <Route path='/singleuserfire/:id' element={<SingleUserFire />}></Route>
          <Route path='/updatefire/:id' element={<UpdateFire />}></Route>
        </Routes>
      </Routers>
    </div>
  )
}

export default App
