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
                {runName: 'r1', projectId: 1},
                {runName: 'r2', projectId: 1},
                {runName: 'r3', projectId: 1},
                {runName: 'r4', projectId: 2}, 
            ])
        })
        .then(run => {
          return knex('step').insert([
              {stepNumber: 1, runId: 1, accuracy: 0.80, loss: 3.8}, 
              {stepNumber: 2, runId: 1, accuracy: 0.85, loss: 3.5}, 
              {stepNumber: 3, runId: 1, accuracy: 0.88, loss: 3.1},
              {stepNumber: 1, runId: 2, accuracy: 0.70, loss: 2.8}, 
              {stepNumber: 2, runId: 2, accuracy: 0.75, loss: 2.5}, 
              {stepNumber: 3, runId: 2, accuracy: 0.78, loss: 2.1}, 
              {stepNumber: 1, runId: 2, accuracy: 0.90, loss: 1.8}, 
              {stepNumber: 2, runId: 3, accuracy: 0.95, loss: 1.5}, 
              {stepNumber: 3, runId: 3, accuracy: 0.98, loss:1.1}, 
              {stepNumber: 1, runId: 3, accuracy: 0.90, loss: 1.8}, 
              {stepNumber: 2, runId: 4, accuracy: 0.95, loss: 1.5},  
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
