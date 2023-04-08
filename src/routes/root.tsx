import { createBrowserRouter } from 'react-router-dom'

// layouts
import BaseLayout from '@/layouts/baseLayout'

// pages
import App from '../App'
import Detail from '@/pages/Detail'

const router = createBrowserRouter([
  {
    path: '/',
    element: <BaseLayout />,
    children: [
      { index: true, element: <App /> },
      {
        path: ':id',
        element: <Detail />,
      },
    ],
  },
])

export default router
