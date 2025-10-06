import {InferAttributes,DataTypes} from 'sequelize'
import{Model,Column,Table,CreatedAt,HasMany, AutoIncrement, PrimaryKey, NotNull, BelongsTo, ForeignKey} from 'sequelize-typescript'
import { User } from 'src/users/users.models';
import { Task } from 'src/tasks/tasks.model';

@Table({tableName:'projects'})
export class Project extends Model{

    @AutoIncrement
    @PrimaryKey
    @NotNull
    @Column({type:DataTypes.INTEGER, allowNull:false})
    declare id:number;

    @Column(DataTypes.STRING)
    declare name:string;
    
    @Column(DataTypes.STRING)
    declare description:string;

    @HasMany(() => Task)
    declare tasks: Task[];

    @CreatedAt
    @Column(DataTypes.DATE)
    declare createdAt:Date;

    @ForeignKey(() => User)
    @Column(DataTypes.INTEGER)
    declare userId: number; 

    @BelongsTo(()=> User)
    declare user:User
}
