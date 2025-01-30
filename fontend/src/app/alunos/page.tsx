"use client";
import React from "react";
import ListAlunoAdm from "../../components/ListAlunoAdm";
import styles from "../../styles/modules/pageDashAdmin.module.css";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const newAluno = () => {
    router.push("/alunos/alunos-criar");
  };

  return (
    <div className="container">
      <main>
        <div className={styles.header}>
          <h1 className="color-primary">Listagem de Alunos</h1>
          <button className={styles["button-submit"]} onClick={newAluno}>
            Criar novo aluno
          </button>
        </div>
        <ListAlunoAdm />
      </main>
    </div>
  );
}
