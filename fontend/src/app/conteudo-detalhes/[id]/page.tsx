import ConteudoDetails from "@/components/conteudoDetails";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function PostDetalhes({params}: {params: any}) {
  
    return (
       <>
         <ConteudoDetails idConteudo={params.id}/>
       </>
    );
}