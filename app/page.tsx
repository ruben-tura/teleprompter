import { dbConnectionStatus } from "@/db/connection-status";

export default async function Home() {
  const result = await dbConnectionStatus();
  return (
    <div>
      <h1 className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
        HOME PAGE ROBE
      </h1>
      <p>Result: {result}</p>
    </div>
  );
}
