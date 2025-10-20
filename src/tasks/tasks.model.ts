import {Table,Column,Model,DataType,CreatedAt,UpdatedAt,ForeignKey,BelongsTo,} from 'sequelize-typescript';
import { Project } from 'src/projects/projects.model';

@Table({ tableName: 'tasks' })
export class Task extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  declare id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare title: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  declare description: string;

  @Column({
    type: DataType.ENUM('todo', 'in-progress', 'done'),
    defaultValue: 'todo',
  })
  declare status: 'todo' | 'in-progress' | 'done';

  @ForeignKey(() => Project)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    onDelete: 'CASCADE',
  })
  declare projectId: number;

  @BelongsTo(() => Project, { onDelete: 'CASCADE' })
  declare project: Project;

  @CreatedAt
  @Column({
    type: DataType.DATE,
  })
  declare createdAt: Date;

  @UpdatedAt
  @Column({
    type: DataType.DATE,
  })
  declare updatedAt: Date;
}
