import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import { AppLayout } from './app/AppLayout'
import { RequireAuth } from './auth/RequireAuth'
import { LoginPage } from './pages/LoginPage'
import { PlansPage } from './pages/PlansPage'
import { RegisterPage } from './pages/RegisterPage'
import { LandingPage } from './pages/LandingPage'
import { DashboardHome } from './app/DashboardHome'
import { CourseIndex } from './app/CourseIndex'
import { LessonPage } from './app/LessonPage'
import { CommunityPage } from './app/CommunityPage'
import { MaterialsPage } from './app/MaterialsPage'
import { ProfilePage } from './app/ProfilePage'
import { NotFoundPage } from './pages/NotFoundPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/planes" element={<PlansPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/registro" element={<RegisterPage />} />

      <Route
        path="/app"
        element={
          <RequireAuth>
            <AppLayout />
          </RequireAuth>
        }
      >
        <Route index element={<DashboardHome />} />
        <Route path="curso" element={<CourseIndex />} />
        <Route path="curso/modulo/:moduleId/leccion/:lessonId" element={<LessonPage />} />
        <Route path="comunidad" element={<CommunityPage />} />
        <Route path="materiales" element={<MaterialsPage />} />
        <Route path="perfil" element={<ProfilePage />} />
      </Route>

      <Route path="/portal" element={<Navigate to="/app" replace />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default App
