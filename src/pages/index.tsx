import { useUser } from '@auth0/nextjs-auth0/client';

export default function Home() {
  //TODO create CollectorContext  and depending on user state and route to auth0 login / admin home / dashboard / account creation/ normal site

  return (
    <div className="flex flex-col gap-16">
      <a href="/api/auth/login?returnTo=/admin/cards">Login</a>
      <a href="/api/auth/logout">Logout</a>
    </div>
  );
}
