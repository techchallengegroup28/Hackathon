'use client';
import React, { useState } from 'react';
import iconPesquisar from "@/../../public/assets/img/icon-pesquisar.svg";
import Image from 'next/image';
import styles from '../styles/modules/barUser.module.css';

const Bar = ({ onSearch }: { onSearch: (query: string) => void }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  return (
    <div className={styles.header}>
      <h1 className='color-primary'>Últimos conteúdos</h1>
      <div className='d-flex align-items-center flex-wrap justify-content-center'>
        <small>Pesquise por titulo ou descrição: </small>
        <input
          className={`input ${styles.input} ms-3`}
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
        />
        <Image src={iconPesquisar} alt='Pesquisar' className={styles.img} onClick={handleSearch} />
        <div />
      </div>
    </div>
  );
};

export default Bar;