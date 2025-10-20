import { Column, CreatedAt, Model, Table, UpdatedAt, Unique, DataType, HasMany } from "sequelize-typescript";   
import {Project} from 'src/projects/projects.model'
@Table({ tableName: 'users' })
export class User extends Model {
    @Column(DataType.STRING)
    declare lastName: string;

    @Column(DataType.STRING)
    declare firstName: string;

    @Unique
    @Column(DataType.STRING)
    declare email: string;

    @Unique
    @Column(DataType.STRING)
    declare phoneNumber: string;

    @Column(DataType.STRING)
    declare password: string;

    @HasMany(()=>Project,{ onDelete:'CASCADE', hooks:true})
    declare projects: Project[];

    @Column({ type: DataType.BOOLEAN, defaultValue: true })
    declare isActive: boolean;

    @CreatedAt
    @Column
    declare creationDate: Date;

    @UpdatedAt
    @Column
    declare updateDate: Date;
}
