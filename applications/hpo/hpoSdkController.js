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
    .insert({ runName: name, projectId: projectId })
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

    projectId = projectId[0].projectId;

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
    .from("hpoProject")
    .where({ hpoName: hpoName })
    .then((result) => {
      return result;
    })
    .catch(function (err) {
      console.error(err);
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
    .from("hpoConfig")
    .where({ hpoProjectId: hpoProjectId })
    .then((result) => {
      return result;
    });
};

const trialResultSave = async (target, config, id) => {
  return knex
    .insert({ target: target, config: config, hpoProjectId: id })
    .into("hpoRun");
};

const hpoRunSave = async (trial_result, trial_hp, hpoProjectId) => {
  let resultList = [];
  for (key in trial_result) {
    delete trial_result[key].status;
    resultList.push(trial_result[key]);
  }

  let list = [];
  let listName = [];

  for (key in trial_hp) {
    list.push(trial_hp[key]);
    listName.push(key);
  }

  for (let i = 0; i < list[0].length; i++) {
    let jsonVal = {};
    for (let j = 0; j < list.length; j++) {
      let key = listName[j];
      jsonVal[key] = list[j][i];
    }

    trialResultSave(
      JSON.stringify(resultList[i]),
      JSON.stringify(jsonVal),
      hpoProjectId
    );
  }
};

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

    if (hpoProjectId.length == 0) {
      res.status(401).end("관련된 프로젝트가 없습니다.");
    }

    hpoProjectId = hpoProjectId[0].hpoProjectId;

    await hpoConfigSave(space, best_result, best_hp, hpoProjectId);

    await hpoRunSave(trial_result, trial_hp, hpoProjectId);

    res.end("완료");
  } catch (e) {
    res.status(401).end(e);
  }

  res.end("test");
};

hpoSdkController.getHpo = async (req, res) => {
  knex
    .select("method", "config", "hpoProjectId")
    .from("hpoConfig")
    .then((result) => {
      res.json(result);
    });
};

module.exports = hpoSdkController;
