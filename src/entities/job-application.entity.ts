import { 
  Entity, 
  PrimaryColumn, 
  Column, 
  CreateDateColumn, 
  UpdateDateColumn 
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity('job_applications')
export class JobApplication {
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
  jobPosition!: string;

  @Column({ length: 500 })
  resume!: string;

  @Column({ length: 500, nullable: true })
  applicationLetter!: string;

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
