import Link from "next/link";
import UserButton from "../user-button";

const Header = () => {
  return (
    <div className="flex flex-row justify-between">
      <div>
        <Link href="/" className="px-4">Home</Link>
        <Link href="/dashboard" className="px-4">Dashboard</Link>
      </div>
      <div className="px-4">
        <UserButton />
      </div>
    </div>
  );
};

export default Header;
