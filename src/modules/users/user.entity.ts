import * as bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { bcryptSaltRounds } from '../../../config/db.config';
import { CreateUserDto } from './dto';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Exclude()
  @Column()
  password: string;

  @BeforeUpdate()
  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, bcryptSaltRounds);
  }

  constructor(userDto?: CreateUserDto) {
    if (!!userDto) {
      this.username = userDto.username;
      this.password = userDto.password;
    }
  }
}
