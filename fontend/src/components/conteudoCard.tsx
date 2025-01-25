import React from 'react';
import Link from 'next/link';
import IConteudo from '@/interface/IConteudo'
import styles from '../styles/modules/listPostUser.module.css';
import Image from 'next/image';
import { processingImgBase64 } from '@/utils/appUtils';

const ConteudoCard = ({ post }: { post: IConteudo }) => {
  let imgPost = '';
  try {
    // console.log('ConteudoCard - id: ' + post.id);
    // console.log('ConteudoCard - titulo: ' + post.titulo);
    // console.log('ConteudoCard - img: ' + post.imagem);
    if (post.imagem) {
      imgPost = processingImgBase64(post.imagem);
      // console.log('ConteudoCard - imgPost: ' + imgPost);
    }

  } catch (error) {
    console.log('Erro ao renderizar imagem:' + error)
    post.imagem = null
  }

  return (
    <Link href={'/conteudo-detalhes/' + post.id} className={`d-flex gap-md-4 text-decoration-none mt-3 flex-wrap flex-md-nowrap ${styles.post_card}`} >
      <div className={styles.post_image}>
        {post.imagem ? (
          <Image src={imgPost} alt="Post Image" fill />
        ) : <div className={styles.placeholderimage}></div>}
      </div>
      <div className='mt-md-3'>
        <h2 className='color-black text-decoration-none'>{post.titulo}</h2>
        <p className='color-black text-decoration-none'>{post.descricao}</p>
      </div>
    </Link>
  );
};

export default ConteudoCard;
