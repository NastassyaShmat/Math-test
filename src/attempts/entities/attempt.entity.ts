import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { User } from 'src/users/entities/user.entity';

@Entity({ name: 'attempts' })
export class Attempt {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'attempt_score', type: 'varchar' })
  score: string;

  @Column({ name: 'attempt_number', type: 'int', default: 0 })
  number: number;

  @CreateDateColumn({ name: 'attempt_date', type: 'date' })
  createdDate: string;

  @Column({ name: 'user_id', type: 'int' })
  userId: number;

  @ManyToOne(() => User, (user) => user.userAttempts, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  // @BeforeInsert()
  // async countAttempts() {
  //   if (this.number > 3) {
  //     throw new BadRequestException('Your number of attempts more than 3');
  //   }

  //   this.number = this.number + 1;
  // }
}
