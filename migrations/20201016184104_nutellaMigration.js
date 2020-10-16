exports.up = function (knex) {
  return knex.schema
    .createTableIfNotExists("project", (table) => {
      table.increments("projectId").primary();
      table.string("projectName").notNullable();
      table.text("description");
      table.integer("privacy");
      table.string("apiKey");
      table.string("createdBy");
      table.timestamps(true, true);
    })
    .createTableIfNotExists("run", (table) => {
      table.string("runName").primary();
      table.string("state");
      table.boolean("reinit");
      table.integer("runTime");
      table.string("createdBy");
      table.integer("projectId").unsigned().references("project.projectId");
      table.timestamps(true, true); //?
    })
    .createTableIfNotExists("step", (table) => {
      table.increments("stepId").primary();
      table.integer("stepNumber");
      table.string("indicator");
      table.string("runName").references("run.runName");
    });
};

exports.down = function (knex) {};
