import {CalciteCard} from '@esri/calcite-components-react';

type CardProps = {
  title: string;
  content: React.ReactNode;
};
export const Card: React.FC<CardProps> = ({title, content}) => {
  return (
    <CalciteCard className="custom-calcite-card" id={title}>
      <div slot="content">{content}</div>
    </CalciteCard>
  );
};

Card.displayName = 'Card';
