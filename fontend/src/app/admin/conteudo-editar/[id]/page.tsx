import ConteudoForm from '@/components/conteudoForm';
import "@/styles/globals.css";

export default function AlunoEdit({ params }: { params: { id: string } }) {
    return (
      <>
        <ConteudoForm idConteudo={params.id}/>
      </>
    );
  }