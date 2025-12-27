import { createBrowserRouter } from 'react-router';
import HomePage from '../pages/HomePage';
import AdventurersPage from '../pages/AdventurersPage';
import CampaignsPage from '../pages/CampaignsPage';
import ProfilePage from '../pages/ProfilePage';
import AppLayout from '../layout/AppLayout';
import TermsOfUse from '../pages/legalPages/TermsOfUse';
import PrivacyNotice from '../pages/legalPages/PrivacyNotice';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/adventurers', element: <AdventurersPage /> },
      { path: '/campaigns', element: <CampaignsPage /> },
      { path: '/profile', element: <ProfilePage /> },
      { path: '/terms', element: <TermsOfUse /> },
      { path: '/privacy', element: <PrivacyNotice /> },
    ],
  },
]);