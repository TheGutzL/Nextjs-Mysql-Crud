import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-zinc-950 text-white">
      <div className="container mx-auto flex justify-between items-center py-4 mb-2">
        <Link
          href="/"
          className="text-sky-500 hover:text-sky-400"
        >
          <h3 className="text-3xl">NextMysql</h3>
        </Link>
        <ul>
          <li>
            <Link
              href="/new"
              className="text-sky-500 hover:text-sky-400"
            >
              New
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
