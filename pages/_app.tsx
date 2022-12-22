import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';
import { AuthContextProvider } from '../context/AuthContext';
import React, { useEffect, useState } from 'react';
import { ModalContextProvider } from '../context/ModalContext';
import ProtectedRoute from '../components/User/ProtectedRoute';
import Footer from '../components/Footer/Footer';
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }: AppProps) {
  const [mounted, setMounted] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <AuthContextProvider>
        <ModalContextProvider>
          <ProtectedRoute>
            <>
              <Component {...pageProps} />
              {router.pathname !== '/member' && router.pathname !== '/' && <Footer />}
            </>
          </ProtectedRoute>
        </ModalContextProvider>
      </AuthContextProvider>
    </ThemeProvider>
  );
}
