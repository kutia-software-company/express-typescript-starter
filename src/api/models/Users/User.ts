import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { EntityBase } from '../../../abstracts/EntityBase'
import { Exclude, Expose } from 'class-transformer'
import bcrypt from 'bcrypt'

@Entity({ name: 'users' })
export class User extends EntityBase {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column()
    first_name: string

    @Column()
    last_name: string

    @Column()
    email: string

    @Column()
    @Exclude()
    password: string

    @Expose({ name: 'full_name' })
    get fullName() {
        return this.first_name + ' ' + this.last_name
    }

    @BeforeInsert()
    async setPassword() {
        this.password = await bcrypt.hash(this.password, 10)
    }
}