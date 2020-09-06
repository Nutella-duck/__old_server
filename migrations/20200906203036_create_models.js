exports.up = function(knex) {
    return knex.schema
            .createTableIfNotExists('project', (table) => {
                table.increments('project_id').primary();
                table.string('projectName').notNullable();
                table.text('description');
                table.integer('privacy');
                table.string('api_key');
                table.string('created_by');
                //table.timestamps(true, true);
            })
            .createTableIfNotExists('run', (table) => {
                table.increments('run_id').primary().notNullable();
                table.string('run_name').notNullable();
                table.string('state');
                table.integer('run_time');
                table.string('created_by');
                table.integer('project_id').unsigned().references('project.project_id');
            })
};

exports.down = function(knex) {
    // return knex.schema
    //     .dropTable('project')
    //     .dropTable('run')
};
