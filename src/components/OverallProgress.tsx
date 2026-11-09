import React from 'react';
import { ArrowUpRight, Check } from 'lucide-react';

interface OverallProgressProps {
  percentage: number;
  completedSets: number;
  totalSets: number;
  exercisesCount: number;
  onFinishWorkout: () => void;
}

export const OverallProgress: React.FC<OverallProgressProps> = ({
  percentage, completedSets, totalSets, exercisesCount, onFinishWorkout
}) => {
  const isComplete = completedSets === totalSets && totalSets > 0;
  return (
    <section className="session-progress" aria-label="Progresso do treino">
      <div className="session-progress-top">
        <div><span className="eyebrow">{isComplete ? 'SÉRIES CONCLUÍDAS' : 'ANDAMENTO DA SESSÃO'}</span><div className="session-fraction"><strong>{String(completedSets).padStart(2, '0')}</strong><span>/ {String(totalSets).padStart(2, '0')} séries</span></div></div>
        <div className="session-percentage">{isComplete && <Check size={18} />}<span>{percentage}<small>%</small></span></div>
      </div>
      <div className="session-track" role="progressbar" aria-label="Séries concluídas" aria-valuemin={0} aria-valuemax={100} aria-valuenow={percentage}><div style={{ width: `${Math.min(100, Math.max(percentage, 0))}%` }} /></div>
      <div className="session-progress-bottom"><span>{exercisesCount} exercícios na ficha</span>{completedSets > 0 ? <button onClick={onFinishWorkout}>{isComplete ? 'Salvar treino' : 'Finalizar sessão'}<ArrowUpRight size={16} /></button> : <span>Marque cada série ao terminar</span>}</div>
    </section>
  );
};
