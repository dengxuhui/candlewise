import { HashRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import Module from './pages/Module.jsx'
import Lesson from './pages/Lesson.jsx'
import Practice from './pages/Practice.jsx'
import Predict from './pages/Predict.jsx'

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="module/:moduleId" element={<Module />} />
          <Route path="module/:moduleId/lesson/:lessonId" element={<Lesson />} />
          <Route path="module/:moduleId/practice" element={<Practice />} />
          <Route path="predict" element={<Predict />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}
