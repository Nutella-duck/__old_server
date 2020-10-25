exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("project")
    .del()
    .then(function () {
      return Promise.all([
        knex("project")
          .insert([
            { projectName: "pj1" },
            { projectName: "pj2" },
            { projectName: "pj3" },
          ])
          .then((project) => {
            return knex("run").insert([
              { runName: "r1", projectId: 1 },
              { runName: "r2", projectId: 1 },
              { runName: "r3", projectId: 1 },
              { runName: "r4", projectId: 2 },
            ]);
          })
          .then((run) => {
            return knex("step").insert([
              {
                stepNumber: 1,
                runId: 1,
                indicator: { accuracy: 0.8, loss: 3.8 },
              },
              {
                stepNumber: 2,
                runId: 1,
                indicator: { accuracy: 0.85, loss: 3.5 },
              },
              {
                stepNumber: 3,
                runId: 1,
                indicator: { accuracy: 0.88, loss: 3.1 },
              },
              {
                stepNumber: 1,
                runId: 2,
                indicator: { accuracy: 0.7, loss: 2.8 },
              },
              {
                stepNumber: 2,
                runId: 2,
                indicator: { accuracy: 0.75, loss: 2.5 },
              },
            ]);
          })
          .then(() => {
            console.log("Seeding complete!");
          })
          .catch((error) => {
            console.log(`Error seeding data: ${error}`);
          }),
      ]);
    });
};
