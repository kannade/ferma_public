import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

interface CommentsAttributes {
  commentId: number;
  commentPostId: number;
  commentDate: Date;
  commentContent: string;
  commentStatus: string;
  commentParent?: number;
  commentAuthor?: string;
}

export interface CommentsInput extends Optional<CommentsAttributes, 'commentId'> {}

export interface CommentsOutput extends Required<CommentsAttributes> {}

class comments extends Model<CommentsAttributes, CommentsInput> implements CommentsAttributes {
  public commentId!: number;
  public commentPostId!: number;
  public commentDate!: Date;
  public commentContent!: string;
  public commentStatus!: string;
  public commentParent!: number;
  public commentAuthor!: string;

  public static initialize(sequelize: Sequelize) {
    this.init(
      {
        commentId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        commentPostId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        commentDate: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
        },
        commentContent: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        commentStatus: {
          type: DataTypes.STRING,
          allowNull: false,
          defaultValue: 'ACTIVE',
        },
        commentParent: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
        commentAuthor: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        paranoid: true,
        timestamps: false,
      }
    );
  }
}

export default comments;
