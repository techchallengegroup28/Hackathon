export default interface IConteudo {
    id: number;
    titulo: string;
    descricao: string;
    data_postagem: string;
    data_atualizacao: string;
    texto_conteudo: string;
    link_youtube: string,
    saiba_mais?: string,
    nome_documento?: null | string,
    arquivo: null;
    imagem?: string | null;
}