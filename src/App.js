import React, { Component, Suspense } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import './scss/style.scss'
import axios from 'axios'
axios.interceptors.request.use(function (config) {
  const token = `Bearer eyJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJhdmljIiwiaWF0IjoxNjU2NDMzODIwLCJleHAiOjE2NTkwMjU4MjAsInVpIjoxLCJ1bmFtZSI6ImFkbWluIiwibWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImZ1bGxuYW1lIjoiQWRtaW4iLCJzcyI6IjIzNDU3MUE3NTU5M0JGMTJGRDUxOTZBQTNGNDVBQjYwIn0.aYOpEIh8JTwddft0A5cVFkWp6EPXFfQDLT6m3tg7h6-YGviEeahUacU2SL3jNxSg84QyImeAMTt1aDYYCTfCaepj4q5UJmW1Lq5XIWTsBlei2ytzNdy3ev-A4IpLLMvR0QPvCe5D3cUwqpsGujzcEeXeWPljjCodyDQ5AC9kWdTprFLLKBW-TE88nMAZma3HMSFGfHzQ37kOtmQYdTpdhoMPP1SEw_v5A61tGHscJ8ssYHrVc9_zBZcafZ6C9uqTqQe-eC2DC9E2YbGvCIBlhitHfElqLUpTC6JscXlYOVcfSSKVitTddXk0jHBW3Lt08KATacuHU22RPuPdsvz88Q`
  config.headers.Authorization = token

  return config
})
const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))

class App extends Component {
  render() {
    return (
      <HashRouter>
        <Suspense fallback={loading}>
          <Routes>
            <Route exact path="/login" name="Login Page" element={<Login />} />
            <Route exact path="/register" name="Register Page" element={<Register />} />
            <Route exact path="/404" name="Page 404" element={<Page404 />} />
            <Route exact path="/500" name="Page 500" element={<Page500 />} />
            <Route path="*" name="Home" element={<DefaultLayout />} />
          </Routes>
        </Suspense>
      </HashRouter>
    )
  }
}

export default App
