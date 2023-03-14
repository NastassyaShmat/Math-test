import { Answer } from "src/answers/entities/answer.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'questions'})
export class Question {
	@PrimaryGeneratedColumn('increment')
	id: number;

	@Column({ name: 'question_body', type: 'varchar'})
	body: string;

	@OneToMany(() => Answer, (answer) => answer.question, {
		onDelete: 'CASCADE',
	  })
	  answers: Answer[];
}
