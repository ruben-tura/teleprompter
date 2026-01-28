import Link from "next/link";
import UserButton from "../user-button";

const Header = () => {
  return (
    <div className="sticky top-0 flex flex-row justify-between bg-gray-800 h-auto items-center">
      <div>
        <Link href="/" className="px-4 py-1">Home</Link>
        <Link href="/dashboard" className="px-4">Dashboard</Link>
      </div>
      <div className="px-4 my-2">
        <UserButton />
      </div>
    </div>
  );
};

export default Header;
