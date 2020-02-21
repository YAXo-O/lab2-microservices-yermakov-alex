import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AuthSession {
	@PrimaryGeneratedColumn('uuid')
	public id: string;

	@Column()
	public token: string;

	@Column()
	public refreshToken: string;

	@Column({
		unique: true,
	})
	public accessCode: string;

	@CreateDateColumn({
		type: 'timestamp',
	})
	public lastActionTime: Date;
}
