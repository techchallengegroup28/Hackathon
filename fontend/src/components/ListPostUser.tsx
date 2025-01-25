import React, { useEffect, useState } from 'react';
import ConteudoCard from './conteudoCard';
import IConteudo from '@/interface/IConteudo';
import { getAllPosts } from '@/services/conteudo';
import { sortListPostsById } from '@/utils/appUtils';

const ListPostUser = ({ searchQuery }: { searchQuery: string }) => {
  const [posts, setPosts] = useState<IConteudo[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<IConteudo[]>([]);

  useEffect(() => {
    getAllPosts('').then((data: IConteudo[] | null) => {
      if (data) {
        setPosts(data);
      } else {
        setPosts([]);
      }
    });
  }, []);

  useEffect(() => {
    if (searchQuery !== '') {
      setFilteredPosts(posts.filter(post =>
        post.titulo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.descricao.toLowerCase().includes(searchQuery.toLowerCase())
      ).sort((a, b) => b.id - a.id));
    } else {
      setFilteredPosts(sortListPostsById(posts));
    }
  }, [searchQuery, posts]);

  return (
    <div>
      {filteredPosts?.map(post => (
        <ConteudoCard key={post.id} post={post} />
      ))}
    </div>
  )
};

export default ListPostUser;