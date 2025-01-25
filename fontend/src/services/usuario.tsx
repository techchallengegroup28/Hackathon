import IConteudo from "@/interface/IConteudo";

export async function getAllUsers(token: string | undefined): Promise<IConteudo[] | null> {
    try {
        let res;
        if (!token) {
            res = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/usuarios');
        } else {
            res = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/usuarios/admin', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json',
                },
            });
        }

        if (!res.ok) {
            throw new Error('Erro ao buscar os conteudos.');
        }

        const conteudos = await res.json();
        return conteudos;

    } catch (error) {
        console.error('Erro ao buscar conteudos:', error);
        return null;
    }
}

export async function getUserById(idUser: number): Promise<IConteudo | null> {
    try {
        let res;
        if (idUser) {
            res = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/usuarios/' + idUser);
        } else {
            throw new Error('Parâmetro passado é vazio ou nulo.');
        }

        if (!res.ok) {
            throw new Error('Erro ao buscar o conteudo.');
        }

        const conteudo = await res.json();
        return conteudo;

    } catch (error) {
        console.error('Erro ao buscar conteudo:', error);
        return null;
    }
}

export async function deleteUser(id: number, token: string | undefined): Promise<boolean> {
    try {
        
        const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/usuarios/' + id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error('Erro ao deletar conteudo.');
        }

        return true;

    } catch (error) {
        console.error('Erro ao deletar conteudo:', error);
        return false;
    }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function updateUser(payload: any, id: string, token: string | undefined): Promise<boolean> {
    try {
        
        const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/usuarios/' + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            throw new Error('Erro ao atualizar conteudo.');
        }

        return true;

    } catch (error) {
        console.error('Erro ao atualizar conteudo - id: '+ id +': ', error);
        return false;
    }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function createUser(payload: any, token: string | undefined): Promise<boolean> {
    try {
        
        const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/usuarios', {
            method: "POST",
            headers: {
                'content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,            
            },
            body: JSON.stringify(payload),
 
        });

        if (!response.ok) {
            throw new Error('Erro ao criar conteudo.');
        }

        return true;

    } catch (error) {
        console.error('Erro ao criar conteudo: ', error);
        return false;
    }
}
