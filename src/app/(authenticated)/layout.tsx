'use client';
import type { ReactNode } from 'react';
import styles from './styles.module.scss';
import Sidebar from '@/src/components/Navigations/Sidebar';
import Header from '@/src/components/Navigations/Header';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps):React.ReactNode => {
  return (
    <div className={styles.dashboard}>
      <div className=''>
        <Sidebar />
      </div>
      <div className={styles.dashboard_header}>
        <div>
          <Header />
        </div>
        <div className='overflow-y-auto no-scrollbar h-full'>
        <main className='overflow-y-auto no-scrollbar'>{children}</main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
