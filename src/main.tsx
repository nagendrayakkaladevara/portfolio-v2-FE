import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import '@fontsource-variable/geist';
import './styles.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MotionConfig } from 'motion/react';
import { HomePage } from './App';
import { SiteLayout } from './components/layout/site-layout';
import { ErrorBoundary } from './components/layout/error-boundary';
import { ContentError } from './features/writing/repository';
const WritingPage = lazy(() => import('./features/writing/pages').then(module => ({ default: module.WritingPage })));
const ArticlePage = lazy(() => import('./features/writing/pages').then(module => ({ default: module.ArticlePage })));
const NotFoundPage = lazy(() => import('./features/writing/pages').then(module => ({ default: module.NotFoundPage })));

const queryClient = new QueryClient({ defaultOptions: { queries: {
  staleTime: 60_000, gcTime: 300_000, refetchOnWindowFocus: false,
  retry: (count, error) => count < 1 && !(error instanceof ContentError && error.status < 500),
} } });

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode><ErrorBoundary><QueryClientProvider client={queryClient}><MotionConfig reducedMotion="user"><BrowserRouter><Suspense fallback={<main id="main" className="writing-page" tabIndex={-1}><p role="status">Loading…</p></main>}><Routes>
    <Route element={<SiteLayout />}>
      <Route index element={<HomePage />} />
      <Route path="posts" element={<WritingPage />} />
      <Route path="posts/:slug" element={<ArticlePage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  </Routes></Suspense></BrowserRouter></MotionConfig></QueryClientProvider></ErrorBoundary></React.StrictMode>,
);
