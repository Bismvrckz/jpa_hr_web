"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    Example: await queryInterface.bulkInsert(
      "job_divisions",
      [
        {
          image: "/jobDivisionsImage/bussines-technology.jpg",
          job_division_name: "Division One",
          description: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tenetur nemo
          minus obcaecati facilis, laudantium est et consectetur, vitae officiis
          pariatur rem magnam quo veniam doloribus voluptatem tempora quas fuga
          quia.`,
        },
        {
          image: "/jobDivisionsImage/creative.jpg",
          job_division_name: "Division Two",
          description: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tenetur nemo
          minus obcaecati facilis, laudantium est et consectetur, vitae officiis
          pariatur rem magnam quo veniam doloribus voluptatem tempora quas fuga
          quia.`,
        },
        {
          image: "/jobDivisionsImage/production.jpg",
          job_division_name: "Division Three",
          description: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tenetur nemo
          minus obcaecati facilis, laudantium est et consectetur, vitae officiis
          pariatur rem magnam quo veniam doloribus voluptatem tempora quas fuga
          quia.`,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("job_divisions", null, {});
  },
};
