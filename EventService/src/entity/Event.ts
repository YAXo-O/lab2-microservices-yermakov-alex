import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Event {
	@PrimaryGeneratedColumn('uuid')
	public id: string;

	@Column()
	public title: string;

	@Column('uuid')
	public investorId: string;

	@Column('uuid')
	public sessionId: string;

	@CreateDateColumn({
		type: 'timestamp',
	})
	public dateCreated: Date;
}
