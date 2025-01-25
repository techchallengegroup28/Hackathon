"use client";

import Cookie from "js-cookie";
import { useState } from "react";
import React from 'react';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import styles from '@/styles/modules/login.module.css'; 
import { useRouter } from 'next/navigation';
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
    tipo_usuario: 'professor' | 'cliente';
}
interface LoginFormValues {
	email: string;
	senha: string;
}

const validationSchema = Yup.object({
	email: Yup.string()
		.email('Email inválido')
		.required('Campo obrigatório'),
	senha: Yup.string()	
		.required('Campo obrigatório'),
});

export default function Login() {

	const [errorMessage] = useState<string | null>(null);
	const router = useRouter()

	const handleSubmit = async (values: LoginFormValues, { resetForm, setStatus  }: FormikHelpers<LoginFormValues>) => {

		try {
			const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/autenticacao/login', {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(values),
			})

			const data = await response.json();
			const decodedToken = jwtDecode<DecodedToken>(data.token_acesso);


			if (!response.ok) {
				setStatus({ error: 'Erro ao fazer login. Verifique suas credenciais e tente novamente.' });
				return;
			}

			Cookie.set('accessToken', data.token_acesso, { expires: 1 })

			if(decodedToken.tipo_usuario === 'professor') {
				router.push('/admin')
			} else {
				router.push('/')
			}
		} catch (err) {
			resetForm();
			setStatus({ error: 'Erro ao fazer login. Verifique suas credenciais e tente novamente.' });
		}
	};

	return (
		<div className={styles.container}>
		  	<div className={styles.card}>
				<h2 className={styles.title}>Login</h2>
				<Formik
			  		initialValues={{ email: "", senha: "" }}
			  		validationSchema={validationSchema}
			  		onSubmit={handleSubmit}
				>			  	
					{({ isSubmitting }) => (
					<Form>
						<div className="mb-4">
							<label htmlFor="email" className={styles.label}>
							Email
							</label>

							<Field
								type="email"
								id="email"
								name="email"
								className={styles.input}
								placeholder="Insira seu email"
							/>
							<ErrorMessage
								name="email"
								component="div"
								className={styles.errorMessage}
							/>
						</div>
	
						<div className="mb-6">
							<label htmlFor="senha" className={styles.label}>
								Senha
							</label>

							<Field
								type="password"
								id="senha"
								name="senha"
								className={styles.input}
								placeholder="Insira sua senha"
							/>					
							<ErrorMessage
								name="senha"
								component="div"
								className={styles.errorMessage}
							/>
						</div>
	
						{errorMessage && (
							<div className={styles.errorText}>
								{errorMessage}
							</div>
						)}
	
						<div className={styles.buttonWrapper}>
							<button
								type="submit"
								className={styles.button}
								disabled={isSubmitting}
							>
								{isSubmitting ? "Entrando..." : "Entrar"}
							</button>
						</div>
					</Form>
					)}
				</Formik>
			</div>			
		</div>
	);
}
