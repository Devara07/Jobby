import Home from './components/Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import Jobs from './components/Jobs';
import ProtectedRoute from './components/ProtectedRoute';
import JobDetails from './components/JobDetails'
import NotFoundjobs from './components/NotFoundjobs/index.jsx';
import JobsLayout from './components/JobsLayout/index.jsx';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={
        <ProtectedRoute><Home /></ProtectedRoute>
      } />
      <Route path="/login" element={<LoginForm />} />

      <Route path="/jobs" element={<JobsLayout />}>
        <Route index element={<ProtectedRoute><Jobs /></ProtectedRoute>} />
        <Route path=":id" element={<ProtectedRoute><JobDetails /></ProtectedRoute>} />
        <Route path="*" element={<NotFoundjobs />} />
      </Route>

      <Route path="*" element={<NotFoundjobs />} />
    </Routes>
  </BrowserRouter>
)

export default App;