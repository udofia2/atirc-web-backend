import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity('resources')
export class Resource {
  @PrimaryColumn('uuid')
  id!: string;

  @Column({ length: 200 })
  title!: string;

  @Column({ type: 'nvarchar' })
  description!: string;

  @Column({ length: 100 })
  category!: string;

  @Column({ length: 500 })
  fileUrl!: string;

  @Column({ length: 20 })
  fileType!: string;

  @Column({ length: 20, nullable: true })
  fileSize!: string;

  @Column({ default: 0 })
  downloadCount!: number;

  @Column({ length: 500, nullable: true })
  coverImage!: string;

  @Column({ length: 10, default: 'active' })
  status!: string;

  @CreateDateColumn({ type: 'datetime' })
  created_at!: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updated_at!: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}
