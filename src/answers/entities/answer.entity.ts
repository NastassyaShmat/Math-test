import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { IsBoolean } from "class-validator";

import { Question } from "src/questions/entities/question.entity";
@Entity({name: 'answers'})
export class Answer {
	@PrimaryGeneratedColumn('increment')
	id: number;

	@Column({name: 'answers_value', type: 'varchar', length: 255})
	value: string;

	@Column({name: 'is_correct', type: 'boolean'})
	@IsBoolean()
	isCorrect: boolean;

	@Column({ name: 'question_id', type: 'int' })
	questionId: number;

	@ManyToOne(() => Question, (question) => question.answers, {
		onDelete: 'CASCADE',
	  })
	  @JoinColumn({ name: 'question_id' })
	  question: Question;
	
}
