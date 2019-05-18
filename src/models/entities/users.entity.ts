import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiModelPropertyOptional, ApiModelProperty } from '@nestjs/swagger';

@Entity({ name: 'users' })
export class UserEntity {
	@PrimaryGeneratedColumn()
	@ApiModelPropertyOptional()
	id?: number;

	@Column()
	@ApiModelProperty()
	username: string;

	@Column()
	@ApiModelProperty()
	email: string;

  @Column()
	token?: string;
}
