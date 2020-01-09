import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Consumption {
	@PrimaryGeneratedColumn('uuid')
	public id: string;

	@Column('uuid')
	public eventId: string;

	@Column('uuid')
	public consumerId: string;

	@Column('text')
	public description: string;

	@Column('int4')
	public cost: number;

	@CreateDateColumn({
		type: 'timestamp',
	})
	public dateCreated: Date;
}
