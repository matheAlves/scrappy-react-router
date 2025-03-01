import { Outlet } from 'react-router';

export default function Header() {
  return (
    <>
      <header>
        <img src="/logo.png" className="w-25" />
      </header>
      <Outlet />
    </>
  );
}
