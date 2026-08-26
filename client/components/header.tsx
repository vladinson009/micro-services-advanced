import { CurrentUser } from '@/services/user-service';
import Link from 'next/link';

export default function HeaderComponent({
  currentUser,
}: {
  currentUser: CurrentUser;
}) {
  const links = [
    !currentUser && { label: 'Sign Up', href: '/auth/signup' },
    !currentUser && { label: 'Sign In', href: '/auth/signin' },
    currentUser && { label: 'Sign Out', href: '/auth/signout' },
  ]
    .filter((el): el is { label: string; href: string } => Boolean(el))
    .map(({ href, label }) => {
      return (
        <li key={href}>
          <Link href={href}>{label}</Link>
        </li>
      );
    });

  return (
    <nav className="flex justify-between p-4">
      <Link href="/">GitTix</Link>

      <div>
        <ul>{links}</ul>
      </div>
    </nav>
  );
}
