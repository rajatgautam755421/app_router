"use client";

import { AuthContext } from "@/context/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { Button, Navbar } from "react-bootstrap";

const Header = () => {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const { logout, user } = useContext(AuthContext);

  const handleSearch = () => {
    if (query) {
      router.push(`/dashboard?search=${query}`);
    } else {
      router.push(`/dashboard`);
    }
  };

  return (
    <Navbar
      expand="lg"
      className="bg-body-tertiary px-2"
      style={{ position: "sticky", top: 0, zIndex: 999 }}
    >
      <Navbar.Brand>My Shop</Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <div className="d-flex justify-content-between align-items-between w-100">
          <Link
            href="/dashboard"
            className="mx-3"
            style={{ textDecoration: "none", color: "black" }}
          >
            Home
          </Link>

          <div className="d-flex justify-content-between">
            <input
              type="text"
              name=""
              id=""
              placeholder="Search By Category..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyUp={(e) => e.key === "Enter" && handleSearch()}
            />

            <Button size="sm" className="p-1 me-3 ms-1" onClick={handleSearch}>
              Search
            </Button>
            {user && (
              <span
                style={{ cursor: "pointer" }}
                className="mr-4"
                title="Logout"
                onClick={() => {
                  logout();
                  router.push("/login");
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  fill="currentColor"
                  class="bi bi-box-arrow-right mx-2"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"
                  />
                  <path
                    fill-rule="evenodd"
                    d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"
                  />
                </svg>
              </span>
            )}
          </div>
        </div>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
