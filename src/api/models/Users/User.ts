import { BaseEntity, BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import bcrypt from 'bcrypt'

@Entity({ name: 'users' })
export class User extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column()
    first_name: string

    @Column()
    last_name: string

    @Column()
    email: string

    @Column()
    password: string

    @BeforeInsert()
    async setPassword() {
        this.password = await bcrypt.hash(this.password, 10)
    }
}