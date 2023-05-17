"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("jobLists", [
      {
        job_list_id: 1683426733470,
        job_name: "Job One",
        sort_desc: "Sort Desc One",
        full_desc: "Full Desc One",
        job_divisions_id: 1682047318678,
        min_salary: 7000000,
        max_salary: 12000000,
        postingStatus: "DRAFT",
        level: "Middle",
        imageDir: "/jobImages/1683426733470.jpg",
        batasPengiriman: new Date("2023-08-07T23:59:00.000Z"),
      },
      {
        job_list_id: 1683426733471,
        job_name: "Job Two",
        sort_desc: "Sort Desc Two",
        full_desc: "Full Desc Two",
        job_divisions_id: 1682047318678,
        min_salary: 8000000,
        max_salary: 15000000,
        postingStatus: "PUBLISH",
        level: "Middle",
        imageDir: "/jobImages/1683426733471.jpg",
        batasPengiriman: new Date("2023-08-07T23:59:00.000Z"),
      },
      {
        job_list_id: 1683426733472,
        job_name: "Job Three",
        sort_desc: "Sort Desc Three",
        full_desc: "Full Desc Three",
        job_divisions_id: 1682047318677,
        min_salary: 8000000,
        max_salary: 15000000,
        postingStatus: "PUBLISH",
        level: "Fresh Graduate",
        imageDir: "/jobImages/1683426733471.jpg",
        batasPengiriman: new Date("2023-08-07T23:59:00.000Z"),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("jobLists", null, {});
  },
};
