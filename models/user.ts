'use strict';
//import { stringify } from 'querystring';
import {
  Model, UUIDV4
} from 'sequelize'
interface UserAttributes {
  id: string;
  email: string;
  name: string;
  username: string;
}

module.exports = (sequelize: any, DataTypes:any) => {
  class User extends Model<UserAttributes>
  implements UserAttributes {
    id!: string;
  email!: string;
  name!: string;
  username!: string;
  
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {
      // define association here
      this.hasMany(models.Post, { foreignKey: 'userId', as: 'posts' });
    }
  }
  User.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      allowNull: false,
      primaryKey:true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull:{msg: 'email is required'},
        notEmpty:{msg: 'email must be not empty'},
        isEmail:{msg: 'email must be valid'}
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull:{msg: 'name is required'},
        notEmpty:{msg: 'name must be not empty'}

      }
    },
    username:{
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull:{msg: 'username is required'},
        notEmpty:{msg: 'username must be not empty'}
      }
    }

    
  }, {
    sequelize,
    //tableName: 'users',
    modelName: 'User',
  });
  return User;
};