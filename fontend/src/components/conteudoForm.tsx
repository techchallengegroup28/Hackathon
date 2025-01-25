"use client";
import Cookie from "js-cookie";
import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import '@/styles/globals.css';
import styles from '@/styles/modules/ConteudoForm.module.css';
import { useRouter } from 'next/navigation';
import { getPostById, updatePost, createPost } from "@/services/conteudo";

interface ConteudoFormValues {
    titulo: string;
    descricao: string;
    data_postagem: string;
    data_atualizacao: string;
    texto_conteudo: string;
    link_youtube: string,
    saiba_mais?: string,
    arquivo?: null | string,
    imagem?: string | null | File;
}

interface ConteudoFormProps {
    idConteudo?: string;
}

const getPost = async (id: string) => {
    const post = await getPostById(Number(id));
    return post;
}

const dataURLtoFile = (dataurl: string, filename: string): File => {
    try{
    dataurl = dataurl.replace('dataimage/jpegbase64', 'data:image/jpeg;base64,').replace('dataimage/jpgbase64', 'data:image/jpg;base64,').replace('dataimage/webpbase64', 'data:image/webp;base64,');
    const arr = dataurl.split(',');
    const mimeMatch = arr[0].match(/:(.*?);/);
    const mime = mimeMatch ? mimeMatch[1] : '';
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
} catch (error) {
    console.error(error);
    return new File([], '');
  }
}

const ConteudoForm: React.FC<ConteudoFormProps> = ({ idConteudo }) => {
    const router = useRouter();
    const cookie = Cookie.get('accessToken')
    
    // console.log('ConteudoForm: ' + idConteudo);

    const [serverError, setServerError] = useState<string | null>(null);
    const [serverSuccess, setServerSuccess] = useState<string | null>(null);
    const [initialValues, setInitialValues] = useState<ConteudoFormValues>({
        titulo: '',
        descricao: '',
        data_postagem: '',
        data_atualizacao: '',
        texto_conteudo: '',
        link_youtube: '',
        saiba_mais: '',
        arquivo: null,
        imagem: null,
    });

    useEffect(() => {
        if (idConteudo) {
            getPost(idConteudo).then(post => {
                // console.log('ConteudoForm - post:titulo ' + post?.titulo);
                // console.log('ConteudoForm - post:descricao ' + post?.descricao);
                // console.log('ConteudoForm - post:conteudo ' + post?.conteudo);
                // console.log('ConteudoForm - post:imagem ' + post?.imagem);
                if (post) {
                    setInitialValues({
                        titulo: post.titulo,
                        descricao: post.descricao,
                        data_postagem: post.data_postagem || '',
                        data_atualizacao: post.data_atualizacao || '',
                        texto_conteudo: post.texto_conteudo,
                        link_youtube: post.link_youtube,
                        saiba_mais: post.saiba_mais || '',
                        arquivo: post.arquivo || null,
                        imagem: post.imagem ? dataURLtoFile(post.imagem, 'imagem.png') : null
                    });
                }
            }).catch(error => {
                setServerError('Erro ao carregar o post' + error);
            });
        }
    }, [idConteudo]);

    const validationSchema = Yup.object({  
        titulo: Yup.string().required('O título é obrigatório'),
        descricao: Yup.string().required('A descrição é obrigatória'),
        texto_conteudo: Yup.string().required('O conteúdo é obrigatório'),
        link_youtube: Yup.string().required('Insira o link do youtube'),
       // imagem: Yup.mixed().nullable().required('A imagem é obrigatória'),      
    });

    const convertImageToBase64 = (file: File): Promise<string | ArrayBuffer | null> => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = (error) => reject(error);
        });
    };  

    const handleSubmit = async (values: ConteudoFormValues) => {
        console.log(values);
        try {
            const base64Image = values.imagem instanceof File ? await convertImageToBase64(values.imagem) : null; 

            const payload = {
                titulo: values.titulo,
                descricao: values.descricao,
                texto_conteudo: values.texto_conteudo,
                link_youtube: values.link_youtube,
                saiba_mais: values.saiba_mais,
                arquivo: values.arquivo,
                imagem: base64Image,
            }; 
            
            console.log('aqui', payload);
            
            let response: Promise<boolean>;
            if (idConteudo){
                response = updatePost(payload, idConteudo, cookie);
            }else {
                response = createPost(payload, cookie);
            }

            if (!response) {
                throw new Error("Erro ao enviar os dados.");
            }
            
            setServerSuccess("Post enviado com sucesso!");

            setTimeout(() => {
              router.push("/admin"); 
            }, 2000);
          } catch (error) {
            console.error(error);
            setServerError("Ocorreu um erro ao enviar o post. Tente novamente.");
          }
    };  

    return (
        <div className="container">
            <h1 className={styles.title}>Criação/edição de conteúdo</h1>
            <Formik
                enableReinitialize
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ setFieldValue }) => (
                 <Form>   
                    <div>
                        <label className={styles.label} htmlFor="titulo">Título</label>
                        <Field
                            className={styles.input}
                            id="titulo"
                            name="titulo"
                            placeholder="Insira um título"
                            type="text"
                        />
                        <ErrorMessage name="titulo" component="div" className={styles.errormessage} />
                    </div>

                    <div>
                        <label className={styles.label} htmlFor="descricao">Descrição</label>
                        <Field
                            className={styles.input}
                            id="descricao"
                            name="descricao"
                            placeholder="Insira uma descrição"
                            type="text"
                        />
                        <ErrorMessage name="descricao" component="div" className={styles.errormessage} />
                    </div>

                    <div>
                        <label className={styles.label} htmlFor="link_youtube">Link do Youtube</label>
                        <Field
                            className={styles.input}
                            id="link_youtube"
                            name="link_youtube"
                            placeholder="Insira um link do youtube"
                            type="text"
                        />
                        <ErrorMessage name="link_youtube" component="div" className={styles.errormessage} />
                    </div>

                    <div>
                        <label className={styles.label} htmlFor="link_youtube">Link do saiba mais</label>
                        <Field
                            className={styles.input}
                            id="saiba_mais"
                            name="saiba_mais"
                            placeholder="Insira um link para um conteúdo adicional"
                            type="text"
                        />
                        <ErrorMessage name="saiba_mais" component="div" className={styles.errormessage} />
                    </div>

                    <div>
                        <label className={styles.label} htmlFor="texto_conteudo">Conteúdo</label>
                        <Field
                            className={styles.textarea}
                            as="textarea"
                            id="texto_conteudo"
                            name="texto_conteudo"
                            placeholder="Insira um conteúdo"
                        />
                        <ErrorMessage name="texto_conteudo" component="div" className={styles.errormessage} />
                    </div>

                    <div>
                        <label htmlFor="imagem">Selecione uma imagem</label>
                        <input
                            id="imagem"
                            name="imagem"
                            type="file"
                            onChange={(event) => {
                            if (event.currentTarget.files) {
                                setFieldValue("imagem", event.currentTarget.files[0]);
                            }
                            }}
                            className={styles.input}
                        />
                        <ErrorMessage name="imagem" component="div" className={styles.error} />
					</div>

                    <div>
                        <label htmlFor="arquivo">Selecione uma documento (somente PDF)</label>
                        <input
                            id="arquivo"
                            name="arquivo"
                            type="file"
                             accept=".pdf"
                             onChange={(event) => {
                                const file = event.currentTarget.files ? event.currentTarget.files[0] : null;
                                if (file) {
                                    if (file.type !== "application/pdf") {
                                        alert("Por favor, selecione um arquivo no formato PDF.");
                                        return;
                                    }
                                    setFieldValue("arquivo", file);
                                }
                            }}
                            className={styles.input}
                        />
                        <ErrorMessage name="arquivo" component="div" className={styles.error} />
					</div>		

                    <div>                       
                        <button className={styles.button} type="submit">Salvar</button>
                    </div>
                 </Form>
                )}
            </Formik>
            
             {/* Exibe mensagem de sucesso ou erro */}
            {serverError && <div className={styles.error}>{serverError}</div>}
            {serverSuccess && <div className={styles.success}>{serverSuccess}</div>}            
        </div>
      );
    };
    
export default ConteudoForm;