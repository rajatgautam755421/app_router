import Link from "next/link";

export default function NotFound() {
  return (
    <div className="d-flex flex-column align-items-center">
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <p>
        View <Link href="/dashboard">Dashboard</Link>
      </p>
    </div>
  );
}
