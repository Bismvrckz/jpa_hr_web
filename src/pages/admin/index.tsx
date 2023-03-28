import Link from "next/link";

export default function admin(props: any) {
  return (
    <div className="w-[100vw] h-[100vh] flex flex-col items-center justify-center">
      <p>Admin</p>
      <Link href={"/"}>
        <p>Go back</p>
      </Link>
    </div>
  );
}
