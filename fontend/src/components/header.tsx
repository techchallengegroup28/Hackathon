"use client";

import Link from "next/link";
import Cookie from "js-cookie";
import { useRouter, usePathname } from "next/navigation";
import Dropdown from "react-bootstrap/Dropdown";

import styles from "@/styles/modules/header.module.css";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();

  const Logout = () => {
    Cookie.remove("accessToken");
    router.push("/login");
  };

  return (
    <div
      className={`d-flex align-items-center ${styles.header} bg-color-primary`}
    >
      <div className="container d-flex align-items-center justify-content-between">
        <Link
          href={pathname.includes("admin") ? "/admin" : "/"}
          className="text-decoration-none"
        >
          <h5 className="color-secondary m-0">
            <strong>Biblioteca Digital</strong>
          </h5>
        </Link>

        <div className="d-flex align-items-center">
        {(pathname.includes("admin") || pathname.includes("alunos"))  && (
          <Dropdown>
            <Dropdown.Toggle
              variant="link"
              className="text-white text-decoration-none dropdown-toggle-no-caret"
            >
              Menu
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="/admin">Conteúdos</Dropdown.Item>
              <Dropdown.Item href="/alunos">Alunos</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          )}

          {!pathname.includes("login") && (
            <div className="cursor-pointer text-white" onClick={Logout}>
              <span>Sair</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
