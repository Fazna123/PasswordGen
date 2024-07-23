import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import CreatePassword from './pages/CreatePassword'
import SavedPasswords from './pages/SavedPasswords'
import Header from './components/Header'
import PrivateRoute from './components/PrivateRoute'

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route element={<PrivateRoute />}>
          <Route path='/create-password' element={<CreatePassword />} />
          <Route path='/saved-passwords' element={<SavedPasswords />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App