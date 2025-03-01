import { Link } from 'react-router';
export function meta() {
  return [{ title: 'Scrappy' }, { name: 'Scrappy', content: 'Welcome to Scrappy!' }];
}

export default function Home() {
  return (
    <main className="flex flex-col justify-center items-center w-svw h-svh">
      <img src="/public/logo.png" />
      <Link
        to="/matheus"
        className="bg-[#9ACD32] text-black font-bold py-2 px-4 rounded-lg shadow-inner flex items-center justify-center transition-colors duration-300 hover:bg-[#AEE14B] hover:shadow-[0_0_10px_#AEE14B] cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
          />
        </svg>
        LOGIN
      </Link>
    </main>
  );
}
