'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    return queryInterface.addColumn('Rsvps', 'EventId', Sequelize.INTEGER).then(() => {
      return queryInterface.addConstraint('Rsvps', ['EventId'], {
        type: 'foreign key',
        name: 'event_rsvps',
        references: { //Required field
          table: 'Events',
          field: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
    });
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    return queryInterface.removeColumn('Rsvps', 'EventId');  
  }
};
