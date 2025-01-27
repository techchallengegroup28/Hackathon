"use client";

import iconSair from "@/../../public/assets/img/icon-sair.svg";
import Link from "next/link";
import Image from "next/image";
import Cookie from "js-cookie";
import { useRouter, usePathname } from "next/navigation";
import Dropdown from "react-bootstrap/Dropdown"; // Importe o componente Dropdown do React-Bootstrap

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

          {!pathname.includes("login") && (
            <button className="cursor-pointer" onClick={Logout}>
              <Image
                src={iconSair}
                alt="Sair da Biblioteca Digital"
                className="me-2"
              />
              <span>Sair</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
