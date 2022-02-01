import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Todo } from "./todo";

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: number

    @Column({ type: 'varchar', length: '32', nullable: false, unique: true })
    username: string

    @Column({ type: 'varchar', length: '64', nullable: false })
    password: string

    @OneToMany((type) => Todo, todo => todo.user)
    todos: Todo[]
}