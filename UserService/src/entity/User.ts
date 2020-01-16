import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
	@PrimaryGeneratedColumn('uuid')
	public id: string;

	@Column({
		type: 'timestamp',
		unique: true,
	})
	public login: string;

	@Column('text')
	public hash: string;

	@CreateDateColumn({
		type: 'timestamp',
	})
	public dateCreated: Date;
}
