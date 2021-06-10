import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
  BeforeInsert,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import User from '@src/modules/users/entities/User';

import ToolTags from '@src/modules/tools/contracts/ToolTags';
@Entity('tools')
class Tool {
  @PrimaryColumn()
  id: string;

  @Column()
  user_id: string;

  @Column()
  title: string;

  @Column()
  link: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true, type: 'jsonb' })
  tags: ToolTags;

  @ManyToOne(
    () => User,
    user => user.tools,
  )
  @JoinColumn({ name: 'user_id' })
  user: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @BeforeInsert()
  generateUUID(): void {
    this.id = uuidv4();
  }
}

export default Tool;
