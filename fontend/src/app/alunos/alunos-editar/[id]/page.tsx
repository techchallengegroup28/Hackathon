import AlunosForm from '@/components/alunosForm';
import "@/styles/globals.css";

export default function AlunosCriar({ params }: { params: { id: string } }) {
    return (
      <>
        <AlunosForm idAluno={params.id}/>
      </>
    );
  }