import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { Exclude } from "class-transformer";
import { IsEmail } from "class-validator";
 
import { Attempt } from "src/attempts/entities/attempt.entity";
@Entity({name: 'users'})
export class User {
	@PrimaryGeneratedColumn('increment')
	id: number;

	@Column({ name: 'user_email', type: 'varchar', length: 20, unique: true })
	@IsEmail()
	email: string;

	@Column({ name: 'first_name', type: 'varchar', length: 20 })
	firstName: string;

	@Column({ name: 'last_name', type: 'varchar', length: 20 })
	lastName: string;

	@Column({ name: 'user_pass', type: 'varchar', length: 161 })
	@Exclude()
	password: string;

	@OneToMany(() => Attempt, (attempt) => attempt.user, {
		onDelete: 'CASCADE',
	  })
	  userAttempts: Attempt[];

}
