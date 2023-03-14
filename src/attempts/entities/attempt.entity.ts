import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { User } from "src/users/entities/user.entity";

@Entity({name: 'attempts'})
export class Attempt {
	@PrimaryGeneratedColumn('increment')
	id: number;

	@Column({name: 'attempt_score', type: 'int'})
	score: number;

	@Column({ name: 'user_id', type: 'int' })
	userId: number;

	@ManyToOne(() => User, (user) => user.userAttempts, {
		onDelete: 'CASCADE',
	  })
	  @JoinColumn({ name: 'user_id' })
	  user: User;
}
