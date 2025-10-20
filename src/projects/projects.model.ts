import {InferAttributes,DataTypes} from 'sequelize'
import{Model,Column,Table,CreatedAt,HasMany, AutoIncrement, PrimaryKey, NotNull, BelongsTo, ForeignKey} from 'sequelize-typescript'
import { User } from 'src/users/users.models';
import { Task } from 'src/tasks/tasks.model';
import { on } from 'events';
import { Hooks } from 'sequelize/lib/hooks';

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

    @HasMany(() => Task,{ onDelete:'CASCADE', hooks:true})
    declare tasks: Task[];

    @CreatedAt
    @Column(DataTypes.DATE)
    declare createdAt:Date;

    @ForeignKey(() => User)
    @Column({type:DataTypes.INTEGER,allowNull:false, onDelete:'CASCADE'})
    declare userId: number; 

    @BelongsTo(()=> User)
    declare user:User
}
