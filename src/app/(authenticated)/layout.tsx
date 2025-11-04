'use client';
import { useEffect, type ReactNode } from 'react';
import styles from './styles.module.scss';
import Sidebar from '@/src/components/Navigations/Sidebar';
import Header from '@/src/components/Navigations/Header';
import { useAppDispatch } from '@/src/lib/store';
import { fetchMedia, syncBookmarks } from '@/src/lib/store/slices/mediaSlice';


interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps):React.ReactNode => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchMedia()).then(() => dispatch(syncBookmarks()));
  }, [dispatch]);
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
