const knex = require("../../db/knex");

let hpoSdkController = {};

const getStepNumber = async (runId) => {
  return knex
    .max("stepNumber as stepNumber")
    .from("step")
    .where({ runId: runId });
};

hpoSdkController.log = async (req, res) => {
  let { runId, metrics } = req.body;
  metrics = JSON.stringify(metrics);

  let stepNumber = await getStepNumber(runId);
  stepNumber = stepNumber[0].stepNumber + 1;

  return knex
    .insert({ runId: runId, stepNumber: stepNumber, indicator: metrics })
    .into("step")
    .then((result) => {
      res.end("log Success");
    });
};

const getProjectId = async (id) => {
  return knex.select("projectId").from("project").where({ apiKey: id });
};

const creatRunModel = async (name, projectId) => {
  return knex
    .insert({ runName: name, hpoProjectId: projectId })
    .from("run")
    .then((result) => {
      return result;
    });
};

hpoSdkController.init = async (req, res) => {
  let { id, name } = req.query;

  let projectId = await getProjectId(id);

  try {
    if (projectId.length == 0) {
      res.status(401).end("관련된 프로젝트가 없습니다.");
    }

    projectId = projectId[0].hpoProjectId;

    const runId = await creatRunModel(name, projectId);

    let result = {};
    result["runId"] = runId[0];
    result["projectId"] = projectId;

    res.json(result);
  } catch (e) {
    res.status(401).end(e);
  }
};

const getHpoProjectId = async (hpoName) => {
  return knex
    .select("hpoProjectId")
    .from("hpoproject")
    .where({ hpoName: hpoName })
    .then((result) => {
      return result;
    });
};

const hpoConfigSave = async (space, best_result, best_hp, hpoProjectId) => {
  delete best_result.status;

  return knex
    .update({
      config: JSON.stringify(space),
      bestParmeter: JSON.stringify(best_result),
      bestResult: JSON.stringify(best_hp),
    })
    .from("hpoconfig")
    .where({ hpoProjectId: hpoProjectId })
    .then((result) => {
      return result;
    });
};

const hpoRunSave = async (trial_result, trial_hp, hpoProjectId) => {};

hpoSdkController.hpo = async (req, res) => {
  let {
    hpo_name,
    method,
    space,
    best_result,
    best_hp,
    trial_result,
    trial_hp,
  } = req.body;

  try {
    let hpoProjectId = await getHpoProjectId(hpo_name);
    console.log(hpoProjectId);
    if (hpoProjectId.length == 0) {
      res.status(401).end("관련된 프로젝트가 없습니다.");
    }

    hpoProjectId = hpoProjectId[0].hpoProjectId;

    await hpoConfigSave(space, best_result, best_hp, hpoProjectId);

    res.end("완료");
  } catch (e) {
    res.status(401).end(e);
  }
};

hpoSdkController.getHpo = async (req, res) => {
  return knex.select("method", "config", "hpoProjectId").from("hpoconfig");
};

module.exports = hpoSdkController;
