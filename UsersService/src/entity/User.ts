import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class User {
	@PrimaryColumn("uuid")
	public id: string;

	@Column()
	public login: string;

	@Column()
	public passwordHash: string;

	@Column("timestamp")
	public dateCreated: Date;
}
