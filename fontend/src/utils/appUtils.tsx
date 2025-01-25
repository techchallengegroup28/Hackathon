import IConteudo from "@/interface/IConteudo";

export function formatDate(dateString: string): string {
    try {
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit',  timeZone: 'America/Sao_Paulo' };
        const date = new Date(dateString);
        date.setHours(date.getHours() + 3);
        return date.toLocaleDateString('pt-BR', options);

    } catch (error) {
        console.error('Erro ao formatar data: ', error);
        return '';
    }
}

export function sortListPostsById(posts: IConteudo[]): IConteudo[] {
    try {
        return posts.sort((a, b) => b.id - a.id);
      } catch (error) {
        console.error('Erro ao ordenar a lista de posts por ID: ', error);
        return posts;
      }
}

export function processingImgBase64(imgBase64: string): string {
    try{
    return imgBase64.replace('dataimage/jpegbase64', 'data:image/jpeg;base64,')
    .replace('dataimage/jpgbase64', 'data:image/jpg;base64,')
    .replace('dataimage/webpbase64', 'data:image/webp;base64,');
    } catch (error) {
        console.error('Erro ao processar imagem base64: ', error);
        return imgBase64;
    }
}