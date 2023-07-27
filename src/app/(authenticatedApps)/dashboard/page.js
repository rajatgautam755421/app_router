import Link from "next/link";
import Posts from "./Posts";

export default async function Home({ searchParams }) {
  const res = await fetch(
    !searchParams.search
      ? "https://fakestoreapi.com/products"
      : `https://fakestoreapi.com/products/category/${searchParams.search}`,
    { next: { revalidate: 10 } }
  );

  const data = await res.json();

  return (
    <>
      {data?.length !== 0 ? (
        <Posts data={data} />
      ) : (
        <>
          <div className="d-flex flex-column">
            <h6 className="text-center my-2">
              No Post Found with query &lsquo;{searchParams?.search}&rsquo;
            </h6>
            <Link href={"/dashboard"} className="text-center">
              Visit Home
            </Link>
          </div>
        </>
      )}
    </>
  );
}
