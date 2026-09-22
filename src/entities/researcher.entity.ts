import { 
  Entity, 
  PrimaryColumn, 
  Column, 
  CreateDateColumn, 
  UpdateDateColumn 
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity('researchers')
export class Researcher {
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

  @Column({ length: 255 })
  institution!: string;

  @Column({ length: 100 })
  designation!: string;

  @Column({ length: 100 })
  researchArea!: string;

  @Column({ length: 100 })
  academicQualification!: string;

  @Column({ type: 'nvarchar' })
  researchAbstract!: string;

  @Column({ type: 'nvarchar', nullable: true })
  biography!: string;

  @Column({ length: 500, nullable: true })
  headshot!: string;

  @Column({ length: 500, nullable: true })
  cv!: string;

  @Column({ length: 500, nullable: true })
  researchProposal!: string;

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
