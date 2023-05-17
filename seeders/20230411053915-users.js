"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "users",
      [
        {
          username: "user1",
          role: "user",
          password:
            "$2b$10$HybCx.VXMebs4QnF5c8U2.VEjyAOEXUkppWuTMyDTTqySj1nQrDxu",
        },
        {
          username: "hrofficer",
          role: "admin",
          password:
            "$2b$10$FG.Q93VurVvN6koOhBg1SeldwfHI9gm7iw9tq9iD9mnNbWXJ/ZIVq",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
  },
};
