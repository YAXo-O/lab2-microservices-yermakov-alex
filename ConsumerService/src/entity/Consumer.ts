import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Consumer {
	@PrimaryGeneratedColumn('uuid')
	public id: string;

	@Column('uuid')
	public sessionId: string;

	@Column('text')
	public firstName: string;

	@Column('text')
	public lastName: string;

	@CreateDateColumn({
		type: 'timestamp',
	})
	public dateCreated: Date;
}
