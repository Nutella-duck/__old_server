exports.up = function (knex) {
  return knex.schema
    .createTableIfNotExists("hpoProject", (table) => {
      table.increments("hpoProjectId").primary();
      table.string("hpoName").notNullable();
      table.string("description");
      table.string("apiKey");
      table.string("createBy");
      table.string("state");
      table.string("bestParmeter");
    })
    .createTableIfNotExists("hpoConfig", (table) => {
      table.increments("hpoConfigId").primary();
      table.integer("method");
      table.string("config");
      table.integer("hpoProjectId").unsigned().notNullable();
      table.foreign("hpoProjectId").references("hpoProject.hpoProjectId");
    })
    .createTableIfNotExists("hpoRun", (table) => {
      table.increments("runId").primary();
      table.string("target");
      table.string("runName");
      table.string("config");
      table.datetime("time");
      table.integer("hpoProjectId").unsigned().notNullable();
      table.foreign("hpoProjectId").references("hpoProject.hpoProjectId");
    })
    .createTableIfNotExists("parameterImportance", (table) => {
      table.increments("importanceId").primary();
      table.string("parmeter");
      table.string("configParmeter");
      table.float("importance");
      table.float("Correlation");
      table.integer("hpoProjectId").unsigned().notNullable();
      table.foreign("hpoProjectId").references("hpoProject.hpoProjectId");
    });
};

exports.down = function (knex) {};
