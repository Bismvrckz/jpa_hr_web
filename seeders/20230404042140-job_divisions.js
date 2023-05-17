"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    Example: await queryInterface.bulkInsert(
      "job_divisions",
      [
        {
          job_divisions_id: 1682047318678,
          job_division_name: "Division One",
          // summary: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tenetur nemo
          // minus obcaecati facilis, laudantium est et consectetur, vitae officiis
          // pariatur rem magnam quo veniam doloribus voluptatem tempora quas fuga
          // quia.`,
          imageDir: "/jobDivisionsImage/1682047318678.jpg",
          detail: `<p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tenetur nemo minus obcaecati facilis.</p>`,
          postingStatus: "PUBLISH",
        },
        {
          job_divisions_id: 1682047318677,
          job_division_name: "Division Two",
          // summary: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tenetur nemo
          // minus obcaecati facilis, laudantium est et consectetur, vitae officiis
          // pariatur rem magnam quo veniam doloribus voluptatem tempora quas fuga
          // quia.`,
          imageDir: "/jobDivisionsImage/1682047318677.jpg",
          detail: `<p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tenetur nemo minus obcaecati facilis.</p>`,
          postingStatus: "PUBLISH",
        },
        {
          job_divisions_id: 1682047318676,
          job_division_name: "Division Three",
          // summary: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tenetur nemo
          // minus obcaecati facilis, laudantium est et consectetur, vitae officiis
          // pariatur rem magnam quo veniam doloribus voluptatem tempora quas fuga
          // quia.`,
          imageDir: "/jobDivisionsImage/1682047318676.jpg",
          detail: `<p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tenetur nemo minus obcaecati facilis.</p>`,
          postingStatus: "DRAFT",
        },
        {
          job_divisions_id: 1682047318675,
          job_division_name: "Division Four",
          // summary: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tenetur nemo
          // minus obcaecati facilis, laudantium est et consectetur, vitae officiis
          // pariatur rem magnam quo veniam doloribus voluptatem tempora quas fuga
          // quia.`,
          imageDir: "/jobDivisionsImage/1682047318675.jpg",
          detail: `<p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tenetur nemo minus obcaecati facilis.</p>`,
          postingStatus: "ARCHIVE",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("job_divisions", null, {});
  },
};
