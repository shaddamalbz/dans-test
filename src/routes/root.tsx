import { createBrowserRouter } from 'react-router-dom'

// layouts
import BaseLayout from '@/layouts/baseLayout'

// pages
import PositionPage from '@/pages/Position'
import PositionDetail from '@/pages/Position/Detail'

const router = createBrowserRouter([
  {
    path: '/',
    element: <BaseLayout />,
    children: [
      { index: true, element: <PositionPage /> },
      {
        path: ':id',
        element: <PositionDetail />,
      },
    ],
  },
])

export default router
