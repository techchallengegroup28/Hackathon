'use client';

import iconSair from "@/../../public/assets/img/icon-sair.svg";
import Link from 'next/link';
import Image from 'next/image';
import Cookie from "js-cookie";
import { useRouter, usePathname } from 'next/navigation';

import styles from "@/styles/modules/header.module.css";

export default function Header() {
    const router = useRouter();
    const pathname = usePathname();

    const Logout = () => {
        Cookie.remove('accessToken');
        router.push('/login');
    };

    return (
        <div className={`d-flex align-items-center  ${styles.header} bg-color-primary`}>
            <div className="container d-flex align-items-center justify-content-between">
                {pathname.includes('admin')
                    ?
                    <>
                        <Link href='/admin' className='text-decoration-none'>
                            <h5 className='color-secondary m-0'><strong>Biblioteca Digital</strong></h5>
                        </Link>
                    </>
                    :
                    <>
                        <Link href='/' className='text-decoration-none'>
                            <h5 className='color-secondary m-0'><strong>Biblioteca Digital</strong></h5>
                        </Link>
                    </>
                }

                {!pathname.includes('login') && (
                    <div className="cursor-pointer" onClick={Logout}>
                        <Image src={iconSair} alt='Sair' className="me-2" />
                        <span className="text-white">Sair</span>
                    </div>
                )}
            </div>
        </div>
    );
}