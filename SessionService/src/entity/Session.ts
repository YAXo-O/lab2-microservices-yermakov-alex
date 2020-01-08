import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Session {
	@PrimaryGeneratedColumn('uuid')
	public id: string;

	@Column('uuid')
	public adminId: string;

	@CreateDateColumn({
		type: 'timestamp',
	})
	public dateCreated: Date;

	@Column()
	public title: string;

	@Column({
		nullable: true,
	})
	public description: string;
}
