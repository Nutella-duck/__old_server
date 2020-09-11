exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('project').del()
    .then(function () {
      return Promise.all([
        knex('project').insert([
            {projectName: 'pj1'},
            {projectName: 'pj2'},
            {projectName: 'pj3'}
        ])
        .then(project => {
            return knex('run').insert([
                {runName: 'r1', projectId: project[0]},
                {runName: 'r2', projectId: project[0]},
                {runName: 'r3', projectId: project[0]}, // 왜 다른 index 접근이 안되는거지? "project"아니고 project
            ])
        })
        .then(run => {
          return knex('step').insert([
              {stepNumber: 1, runId: run[0], accuracy: 1.2}, 
              {stepNumber: 2, runId: run[0], accuracy: 2.2}, 
              {stepNumber: 3, runId: run[0], accuracy: 3.2}, 
          ])
      })
        .then(() => {
            console.log('Seeding complete!');
        })
        .catch(error => {
            console.log(`Error seeding data: ${error}`);
        })
    ])
  });
};
