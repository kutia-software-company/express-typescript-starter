import { IsNotEmpty } from 'class-validator'
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { User } from '../Users/User'

@Entity({ name: 'pets' })
export class Pet {
    @PrimaryGeneratedColumn('increment')
    id: number

    @IsNotEmpty()
    @Column()
    public name: string

    @IsNotEmpty()
    @Column()
    public age: number

    @Column({
        name: 'user_id'
    })
    public userId: string

    @ManyToOne(type => User, user => user.pets)
    @JoinColumn({ name: 'user_id' })
    public user: User
}