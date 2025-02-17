'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('WordGroups', {
      fields: ['wordId'],
      type: 'foreign key',
      name: 'fk_wordId', // Custom name for the constraint
      references: {
        table: 'Words',
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });

    await queryInterface.addConstraint('WordGroups', {
      fields: ['groupId'],
      type: 'foreign key',
      name: 'fk_groupId',
      references: {
        table: 'Groups',
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });

    await queryInterface.addConstraint('WordReviews', {
      fields: ['wordId'],
      type: 'foreign key',
      name: 'fk_wordReview_wordId',
      references: {
        table: 'Words',
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });

    await queryInterface.addConstraint('WordReviews', {
      fields: ['studySessionId'],
      type: 'foreign key',
      name: 'fk_wordReview_studySessionId',
      references: {
        table: 'StudySessions',
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('WordGroups', 'fk_wordId');
    await queryInterface.removeConstraint('WordGroups', 'fk_groupId');
    await queryInterface.removeConstraint('WordReviews', 'fk_wordReview_wordId');
    await queryInterface.removeConstraint('WordReviews', 'fk_wordReview_studySessionId');
  }
};
