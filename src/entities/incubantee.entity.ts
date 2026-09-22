import { 
  Entity, 
  PrimaryColumn, 
  Column, 
  CreateDateColumn, 
  UpdateDateColumn 
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity('incubantees')
export class Incubantee {
  @PrimaryColumn('uuid')
  id!: string;

  @Column({ length: 100 })
  firstName!: string;

  @Column({ length: 100 })
  lastName!: string;

  @Column({ length: 255 })
  email!: string;

  @Column({ length: 20 })
  phone!: string;

  @Column({ length: 100 })
  incubationCategory!: string;

  @Column({ length: 255 })
  startupProduct!: string;

  @Column({ length: 100 })
  designation!: string;

  @Column({ type: 'nvarchar', nullable: true })
  researchInterests!: string;

  @Column({ type: 'nvarchar', nullable: true })
  biography!: string;

  @Column({ length: 500, nullable: true })
  headshot!: string;

  @Column({ length: 500, nullable: true })
  pitchDeck!: string;

  @Column({ length: 20, default: 'active' })
  status!: string;

  @CreateDateColumn({ type: 'datetime' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updatedAt!: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}
