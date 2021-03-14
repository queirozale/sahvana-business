import { NextPage } from 'next';
import Link from 'next/link';

const links = [
  { href: 'https://github.com/vercel/next.js', label: 'Github' },
  { href: 'https://nextjs.org/docs', label: 'Docs' }
]

const Nav: NextPage = () => {
    return (
      <nav>
        <ul className="flex justify-between item-center p-8">
            <li>
              <Link href="/">
                  <a className="text-blut-500 no-underline">Home</a>
              </Link>
            </li>
          <ul className="flex justify-between item-center space-x-4">
            {links.map(({ href, label }) => (
              <li key={`${href}${label}`}>
                <a href={href} className="btn-blue no-underline">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </ul>
      </nav>
    );
};

export default Nav;