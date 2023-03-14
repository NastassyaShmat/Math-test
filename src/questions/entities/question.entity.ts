import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Answer } from 'src/answers/entities/answer.entity';

@Entity({ name: 'questions' })
export class Question {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'question_body', type: 'text' })
  body: string;

  @OneToMany(() => Answer, (answer) => answer.question, {
    onDelete: 'CASCADE',
  })
  answers: Answer[];
}
