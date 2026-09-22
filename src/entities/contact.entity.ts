import { Entity, PrimaryColumn, Column, CreateDateColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity('contacts')
export class Contact {
  @PrimaryColumn('uuid')
  id!: string;

  @Column({ length: 100 })
  firstname!: string;

  @Column({ length: 100 })
  lastname!: string;

  @Column({ length: 255 })
  email!: string;

  @Column({ type: 'nvarchar' })
  message!: string;

  @CreateDateColumn({ type: 'datetime' })
  created_at!: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}
