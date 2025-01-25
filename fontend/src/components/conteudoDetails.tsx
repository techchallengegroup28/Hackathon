"use client";
import React, { useEffect, useState } from 'react';
import '@/styles/globals.css'
import styles from '@/styles/modules/ConteudoDetails.module.css';
import { getPostById } from '@/services/conteudo';
import IConteudo from "@/interface/IConteudo";
import Image from 'next/image';
import { formatDate, processingImgBase64 } from '@/utils/appUtils';

const ConteudoDetails = ({ idConteudo }: { idConteudo: number }) => {
  const [post, setPostt] = useState<IConteudo | null>(null);
  const [loading, setLoading] = useState(true);
  let imgPost = '';

  // console.log('ConteudoDetails - idConteudo: ' + idConteudo);

  useEffect(() => {
    getPostById(idConteudo)
      .then((post) => {
        setPostt(post);
      })
      .catch((error) => {
        console.error('Erro ao buscar o post:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [idConteudo]);

  if (loading) {
    return (
      <div className='container'>
        <h1 className={styles.ConteudoDetailstitle}>Carregado...</h1>
      </div>
    );
  }

  if (post && post.imagem) {
    imgPost = processingImgBase64(post.imagem);
  }

  function extractYoutubeId(url: string) {
    const regex = /[?&]v=([^&#]*)/;
    const match = url.match(regex);
    return match ? match[1] : null; 
  }

  const videoId = post ? extractYoutubeId(post.link_youtube) : null;

  return (
    <div className='container'>
      {post &&
        <>
          <div>
            {post.imagem ? (
              <div className={styles.videoContainer}>
                <iframe
                  src={`https://www.youtube.com/embed/${videoId}`}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share">
                </iframe>
              </div>
            ) : <div className={styles.placeholderimage}></div>}
          </div>

          <div className={`${styles.card} p-md-4 mt-3 p-3 my-md-4 `}>
            <div className="row justify-content-center">
              {post.descricao &&
                <div className="col-md-6">
                  <h5><strong>Descrição: </strong></h5>
                  <p>{post.descricao}</p>
                </div>
              }
              <div className="col-md-6">
                {post.saiba_mais &&
                  <>
                    <h5><strong>Saiba Mais: </strong></h5>
                    <a href={post.saiba_mais} target='_blank'>{post.saiba_mais}</a>
                  </>
                }
                {post.nome_documento &&
                  <>
                    <h5 className='mt-3'><strong>Confira mais a respeito em: </strong></h5>
                    <a href={process.env.NEXT_PUBLIC_BASE_URL+ '/uploads/' + post.nome_documento} target='_blank'>Documento</a>
                  </>
                }
              </div>
            </div>
          </div>


          <h2 className={`${styles.ConteudoDetailstitle} my-3 my-md-5`}>{post.titulo}</h2>

          <p>
            Postado dia {formatDate(post.data_postagem)} - Última atualização: {formatDate(post.data_atualizacao)}
          </p>
          <div className={styles.ConteudoDetailsbody}>
            <div dangerouslySetInnerHTML={{ __html: post.texto_conteudo }}></div>
          </div>


          <div className={`${styles.photo} mt-3`}>
            {post.imagem ? (
              <Image src={imgPost} alt="Post Image" fill />
            ) : <div className={styles.placeholderimage}></div>}
          </div>
        </>
      }
    </div>
  );
};

export default ConteudoDetails;