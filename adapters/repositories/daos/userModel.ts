import { Model, Table, Column, DataType } from "sequelize-typescript";

@Table({
  tableName: "users",
  createdAt: true,
  updatedAt: true,
})
export default class UserModel extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: "id"
  })
  id?: number;

  @Column({
    type: DataType.STRING(255),
    field: "firstName"
  })
  firstName?: string;

  @Column({
    type: DataType.STRING(255),
    field: "lastName"
  })
  lastName?: string;

  @Column({
    type: DataType.STRING(255),
    field: "email"
  })
  email?: string;

  @Column({
    type: DataType.STRING(255),
    field: "username"
  })
  username?: string;

  @Column({
    type: DataType.STRING(255),
    field: "password"
  })
  password?: string;

  @Column({
    type: DataType.STRING(255),
    field: "refreshToken"
  })
  refreshToken?: string;
}
