const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Student = require('./student');

const Marks = sequelize.define('Marks', {
    marks_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    subject: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    marks: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    student_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Student,
            key: 'student_id',
        },
        onDelete: 'CASCADE',
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    }
}, {
    tableName: 'marks',
    timestamps: false
});

// Define associations
Student.hasMany(Marks, { foreignKey: 'student_id' });
Marks.belongsTo(Student, { foreignKey: 'student_id' });

module.exports = Marks;