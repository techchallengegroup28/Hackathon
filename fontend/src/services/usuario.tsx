import IUsuario from "@/interface/IUsuario";

export async function getAllUsers(
  token: string | undefined
): Promise<IUsuario[] | null> {
  try {
    let res;
    if (!token) {
      throw new Error("Erro ao buscar os usuarios.");
    } else {
      res = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/api/usuarios", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });
    }

    if (!res.ok) {
      throw new Error("Erro ao buscar os usuarios.");
    }

    const aluno = await res.json();
    return aluno.usuarios;
  } catch (error) {
    console.error("Erro ao buscar usuarios:", error);
    return null;
    throw error;
  }
}
export async function getUserById( idUser: string, token?: string): Promise<IUsuario | undefined> {
  try {
    if (!idUser) {
      throw new Error("Parâmetro passado é vazio ou nulo.");
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/usuarios/${idUser}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status} ${response.statusText}`);
    }

    const aluno = await response.json();

    return aluno
    
  } catch (error) {
    console.error("Erro ao buscar usuário:", error);
  }
}

export async function deleteUser(
  id: number,
  token: string | undefined
): Promise<boolean> {
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_BASE_URL + "/api/usuarios/" + id,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Erro ao deletar usuario.");
    }

    return true;
  } catch (error) {
    console.error("Erro ao deletar usuario:", error);
    return false;
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function updateUser(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload: any,
  id: string,
  token: string | undefined
): Promise<boolean> {
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_BASE_URL + "/api/usuarios/" + id,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      }
    );

    if (!response.ok) {
      throw new Error("Erro ao atualizar usuario.");
    }

    return true;
  } catch (error) {
    console.error("Erro ao atualizar usuario - id: " + id + ": ", error);
    return false;
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function createUser(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload: any,
  token: string | undefined
): Promise<boolean> {
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_BASE_URL + "/api/usuarios",
      {
        method: "POST",
        headers: {
          "content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      }
    );

    if (!response.ok) {
      throw new Error("Erro ao criar usuario.");
    }

    return true;
  } catch (error) {
    console.error("Erro ao criar usuario: ", error);
    return false;
  }
}
