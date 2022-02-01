import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user";

@Entity('todo')
export class Todo {
    @PrimaryGeneratedColumn('uuid')
    id: number

    @Column({ type: 'varchar', length: 64 })
    name: string

    @Column({ type: 'varchar', length: 256 })
    description: string

    @ManyToOne((type) => User, user => user.todos)
    user: User

    @Column({ type: 'datetime' })
    dateOfCompletion: Date

    @Column({
        type: 'enum',
        enum: ['new', 'complete'],
        default: 'new'
    })
    status: string

    @Column({ type: 'datetime' })
    dateOfCreation: Date

    @Column({ type: 'datetime' })
    dateOfModification: Date
}

export type todoStatus = 'new' | 'complete'