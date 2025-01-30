"use client";
import Cookie from "js-cookie";
import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import '@/styles/globals.css';
import styles from '@/styles/modules/ConteudoForm.module.css';
import { useRouter } from 'next/navigation';
import { createUser, getUserById, updateUser } from "@/services/usuario";

interface AlunoFormValues {
    nome: string;
    email: string;
    senha: string;
    tipo_usuario: string;
}

const getAluno = async (id: string, token?: string) => {
    try {
        const aluno = await getUserById(id, token);
        console.log(aluno)
        return aluno || null;
    } catch (error) {
        console.error("Erro ao buscar aluno:", error);
        return null;
    }
};

const AlunosForm = ({ idAluno }: {idAluno?: string}) => {
    const router = useRouter();
    const cookie = Cookie.get("accessToken");

    const [serverError, setServerError] = useState<string | null>(null);
    const [serverSuccess, setServerSuccess] = useState<string | null>(null);
    const [initialValues, setInitialValues] = useState<AlunoFormValues>({
        nome: "",
        email: "",
        senha: "",
        tipo_usuario: "",
    });

    useEffect(() => {
        if (!idAluno) return;

        getAluno(idAluno, cookie)
            .then((aluno) => {
                if (aluno) {
                    setInitialValues({
                        nome: aluno.nome || "",
                        email: aluno.email || "",
                        senha: aluno.senha || "",
                        tipo_usuario: aluno.tipo_usuario || "",
                    });
                } else {
                    setServerError("Aluno não encontrado.");
                }
            })
            .catch((error) => {
                setServerError("Erro ao carregar o aluno: " + error.message);
            });
    }, [idAluno, cookie]);

    const validationSchema = Yup.object({  
        nome: Yup.string().required('O nome é obrigatório'),
        email: Yup.string().required('A email é obrigatória'),
        senha: Yup.string(),
        tipo_usuario: Yup.string(),      
    });

    const handleSubmit = async (values: AlunoFormValues) => {
        try {
            const payload: { nome: string; email: string; tipo_usuario: string; senha?: string } = {
                nome: values.nome,
                email: values.email,
                tipo_usuario: "aluno",
            };
            
            if (values.senha) {
                payload.senha = values.senha;
            }
            
            let response: Promise<boolean>;
            if (idAluno){
                response = updateUser(payload, idAluno, cookie);
            }else {
                response = createUser(payload, cookie);
            }

            if (!response) {
                throw new Error("Erro ao enviar os dados.");
            }
            
            setServerSuccess("aluno enviado com sucesso!");

            setTimeout(() => {
              router.push("/alunos"); 
            }, 2000);
          } catch (error) {
            console.error(error);
            setServerError("Ocorreu um erro ao enviar o aluno. Tente novamente.");
          }
    };  

    return (
        <div className="container">
            <h1 className={styles.title}>Criação/edição de Aluno</h1>
            <Formik
                enableReinitialize
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                 <Form>   
                    <div>
                        <label className={styles.label} htmlFor="nome">Nome</label>
                        <Field
                            className={styles.input}
                            id="nome"
                            name="nome"
                            placeholder="Insira um nome"
                            type="text"
                        />
                        <ErrorMessage name="nome" component="div" className={styles.errormessage} />
                    </div>

                    <div>
                        <label className={styles.label} htmlFor="email">Email</label>
                        <Field
                            className={styles.input}
                            id="email"
                            name="email"
                            placeholder="Insira uma email"
                            type="email"
                        />
                        <ErrorMessage name="email" component="div" className={styles.errormessage} />
                    </div>

                    <div>
                        <label className={styles.label} htmlFor="senha">Senha</label>
                        <small>{idAluno && 'Preencha para mudar a senha'}</small>
                        <Field
                            className={styles.input}
                            id="senha"
                            name="senha"
                            placeholder="Insira uma senha"
                            type="password"
                        />
                        <ErrorMessage name="senha" component="div" className={styles.errormessage} />
                    </div>

                    <div>                       
                        <button className={styles.button} type="submit">Salvar</button>
                    </div>
                 </Form>
            </Formik>
            
             {/* Exibe mensagem de sucesso ou erro */}
            {serverError && <div className={styles.error}>{serverError}</div>}
            {serverSuccess && <div className={styles.success}>{serverSuccess}</div>}            
        </div>
      );
    };
    
export default AlunosForm;