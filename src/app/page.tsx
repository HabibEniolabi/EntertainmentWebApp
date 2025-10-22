import { redirect } from 'next/navigation';

const RootPage = (): void => {
  redirect("/login");
};

export default RootPage;
