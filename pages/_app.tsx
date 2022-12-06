import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';
import { AuthContextProvider } from '../context/AuthContext';
import React, { useEffect, useState } from 'react';
import { ModalContextProvider } from '../context/ModalContext';
import CreateTask from '../components/Tasks/CreateTask';

export default function App({ Component, pageProps }: AppProps) {
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <AuthContextProvider>
        <ModalContextProvider>
          <>
            <Component {...pageProps} />
          </>
        </ModalContextProvider>
      </AuthContextProvider>
    </ThemeProvider>
  );
}
