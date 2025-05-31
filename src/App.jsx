import Home from './components/Home'
import { BrowserRouter, Route, Routes } from 'react-router';
import LoginForm from './components/LoginForm';
import Jobs from './components/Jobs';
import './App.css'
import ProtectedRoute from './components/ProtectedRoute';
import JobDetails from './components/jobdetails'

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={
        <ProtectedRoute><Home /></ProtectedRoute>
      } />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/jobs" element={
        <ProtectedRoute><Jobs /></ProtectedRoute>
      } />
      <Route path="/jobs/:id" element={
        <ProtectedRoute><JobDetails /></ProtectedRoute>
      } />
    </Routes>
  </BrowserRouter>
)

export default App;