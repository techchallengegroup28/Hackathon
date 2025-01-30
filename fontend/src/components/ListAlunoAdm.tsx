import React, { useEffect, useState } from "react";
import { getAllUsers, deleteUser } from "@/services/usuario";
import IUsuario from "@/interface/IUsuario";
import iconEditar from "@/../../public/assets/img/icon-editar.svg";
import iconExcluir from "@/../../public/assets/img/icon-sair.svg";

import Image from "next/image";
import styles from "@/styles/modules/listAlunoAdm.module.css";
import Link from "next/link";
import Cookie from "js-cookie";

export default function ListAlunosAdmin() {
  const [alunos, setAlunos] = useState<IUsuario[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [alertShown, setAlertShown] = useState(false);

  const delAluno = async (id: number) => {
    const cookie = Cookie.get("accessToken");

    const wasDeleted = await deleteUser(id, cookie);

    if (wasDeleted && alunos !== null) {
      setAlunos(alunos.filter((aluno) => aluno.id !== id));
    } else {
      alert("Erro ao deletar aluno");
    }
  };

  useEffect(() => {
    const cookie = Cookie.get("accessToken");

    getAllUsers(cookie).then((data: IUsuario[] | null) => {
      if (data === null) {
        if (!alertShown) {
          setAlertShown(true);
          alert("usuarios retornou 403");
        }
        setError("Token expirado, favor realizar novo login - Error 403");
      } else {
        const alunosFiltrados = data.filter(
          (user) => user.tipo_usuario === "aluno"
        );
        setAlunos(alunosFiltrados);
      }
      setLoading(false);
    });
  }, [alertShown]);

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className={styles.post_grid}>
      <div className={styles.post_grid_header}>
        <span>Id</span>
        <span>Nome</span>
        <span>Email</span>
        <span>Ações</span>
      </div>
      {alunos?.map((aluno) => (
        <div className={styles.post_grid_row} key={aluno.id}>
          <span>{aluno.id}</span>
          <span>{aluno.nome}</span>
          <span>{aluno.email}</span>
          <span className={styles.actions}>
            <Link href={`/alunos/alunos-editar/${aluno.id}`}>
              <Image src={iconEditar} alt="Editar" className="me-1" />
            </Link>
            <div onClick={() => delAluno(aluno.id)}>
              <Image src={iconExcluir} alt="Excluir" />
            </div>
          </span>
        </div>
      ))}
    </div>
  );
}
