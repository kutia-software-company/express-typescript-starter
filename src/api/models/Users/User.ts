import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'users' })
export class User extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({})
    first_name: string

    @Column({})
    last_name: string
    
    @Column({})
    email: string

    @Column({ select: false })
    password: string
}