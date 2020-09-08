exports.up = function(knex) {
    return knex.schema
            .createTableIfNotExists('project', (table) => {
                table.increments('projectId').primary();
                table.string('projectName').notNullable();
                table.text('description');
                table.integer('privacy');
                table.string('apiKey');
                table.string('createdBy');
                table.timestamps(true, true);
            })
            .createTableIfNotExists('run', (table) => {
                table.increments('runId').primary().notNullable();
                table.string('runName').notNullable();
                table.string('state');
                table.integer('runTime');
                table.string('createdBy');
                table.integer('projectId').unsigned().references('project.projectId');
            })
            // .createTableIfNotExists('modelInfo', (table) => {
            //     table.increments('runId').primary();
            //     table.string('runName').notNullable();
            //     table.boolean('reinit');
            //     table.float('accuracy');
            //     table.float('loss');
            //     table.float('precision');
            //     table.float('recall');
            //     table.float('cpu');
            //     table.float('net');
            //     table.float('net');
            //     table.string('disk');
            //     table.integer('runId').unsigned().references('run.runId');
            // })
};


    // project 정보들, run 개수 
exports.down = function(knex) {
    // return knex.schema
    //     .dropTable('project')
    //     .dropTable('run')
};
