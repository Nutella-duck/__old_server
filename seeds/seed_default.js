exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("user")
    .del()
    .then(function () {
      return Promise.all([
        knex("user")
          .insert([
            {userName: "nut", password: "qwer"},
            {userName: "ella", password: "asdf"}
          ])
          .then((project) => {
            return knex("project").insert([
              { projectName: "pj1", userId: 1, apiKey: 111 },
              { projectName: "pj2", userId: 2, apiKey: 222 },
              { projectName: "pj3", userId: 1, apiKey: 333 },
            ])
          })
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
              { stepNumber: 1, runId: 1, indicator: JSON.stringify({ accuracy: 0.5136481523513794 })  },
              { stepNumber: 2, runId: 1, indicator: JSON.stringify({ accuracy: 0.6917036771774292 })  },
              { stepNumber: 3, runId: 1, indicator: JSON.stringify({ accuracy: 0.7838888764381409 })  },
              { stepNumber: 4, runId: 1, indicator: JSON.stringify({ accuracy: 0.8411852121353149 })  },
              { stepNumber: 5, runId: 1, indicator: JSON.stringify({ accuracy: 0.8750740885734558 })  },
              { stepNumber: 6, runId: 1, indicator: JSON.stringify({ accuracy: 0.8985000252723694 })  },
              { stepNumber: 7, runId: 1, indicator: JSON.stringify({ accuracy: 0.913777768611908  })  },
              { stepNumber: 8, runId: 1, indicator: JSON.stringify({ accuracy: 0.9248703718185425 })  },
              { stepNumber: 9, runId: 1, indicator: JSON.stringify({ accuracy: 0.9307592511177063 })  },
              { stepNumber: 10, runId: 1, indicator: JSON.stringify({ accuracy: 0.9395370483398438 }) },
              
              { stepNumber: 1, runId: 2, indicator: JSON.stringify({ accuracy: 0.4936481523513794 })  },
              { stepNumber: 2, runId: 2, indicator: JSON.stringify({ accuracy: 0.5217036771774292 })  },
              { stepNumber: 3, runId: 2, indicator: JSON.stringify({ accuracy: 0.6838888764381409 })  },
              { stepNumber: 4, runId: 2, indicator: JSON.stringify({ accuracy: 0.6411852121353149 })  },
              { stepNumber: 5, runId: 2, indicator: JSON.stringify({ accuracy: 0.7750740885734558 })  },
              { stepNumber: 6, runId: 2, indicator: JSON.stringify({ accuracy: 0.7985000252723694 })  },
              { stepNumber: 7, runId: 2, indicator: JSON.stringify({ accuracy: 0.713777768611908  })  },
              { stepNumber: 8, runId: 2, indicator: JSON.stringify({ accuracy: 0.8348703718185425 })  },
              { stepNumber: 9, runId: 2, indicator: JSON.stringify({ accuracy: 0.8507592511177063 })  },
              { stepNumber: 10, runId: 2, indicator: JSON.stringify({ accuracy: 0.8995370483398438 }) },
            ]);
          })
          .then((hpoProject) => {
            return knex("hpoProject").insert([
              { hpoName: "hpo1", apiKey: "asdf", createBy: "Nutella", state: "Finished" },
              { hpoName: "hpo2", apiKey: "qwer", createBy: "Coder", state: "Finished" },              
            ]);
          })
          .then((hpoConfig) => {
            return knex("hpoConfig").insert([
              { hpoProjectId: 1, method: 2, config: JSON.stringify({"epoch": {"scope": [1, 10]}, "learning_rate": {"value": [0.1, 0.05, 0.01]}}), bestParameter: JSON.stringify({"epoch": 1, "learning_rate": 0.05}) },
              { hpoProjectId: 2, method: 2, config: JSON.stringify({"units": {"scope":[64,1024]}, "dropout1": {"scope":[0.25, 0.75]},
               "optimizer": {"value":['rmsprop', 'adadelta', 'adam']}, "batch_size": {"value":[128, 512]}}) },
            ]);
          })
          .then((hpoRun) => {
            return knex("hpoRun").insert([
              { hpoProjectId: 1, target: JSON.stringify({"eval_loss" : "3.8"}) , runName: "hr1-001", config: JSON.stringify({"method": "tpe", "epoch": 1, "learning_rate": 0.1}) },
              { hpoProjectId: 1, target: JSON.stringify({"eval_loss" : "2.8"}) , runName: "hr1-002", config: JSON.stringify({"method": "tpe", "epoch": 1, "learning_rate": 0.05}) },
              { hpoProjectId: 1, target: JSON.stringify({"eval_loss" : "4.8"}) , runName: "hr1-003", config: JSON.stringify({"method": "tpe", "epoch": 1, "learning_rate": 0.01}) },
              { hpoProjectId: 1, target: JSON.stringify({"eval_loss" : "3.2"}) , runName: "hr1-004", config: JSON.stringify({"method": "tpe", "epoch": 10, "learning_rate": 0.1}) },
              { hpoProjectId: 1, target: JSON.stringify({"eval_loss" : "4.1"}) , runName: "hr1-005", config: JSON.stringify({"method": "tpe", "epoch": 10, "learning_rate": 0.05}) },
              { hpoProjectId: 1, target: JSON.stringify({"eval_loss" : "3.0"}) , runName: "hr1-006", config: JSON.stringify({"method": "tpe", "epoch": 10, "learning_rate": 0.01}) },
            ]);
          })
          .then((parameterImportance) => {
            return knex("parameterImportance").insert([
              { hpoProjectId: 1, parameter: "eval_loss", configParameter: "epoch", importance: "10", correlation: "9"},
              { hpoProjectId: 1, parameter: "eval_loss", configParameter: "learning_rate", importance: "8", correlation: "7"},
              { hpoProjectId: 1, parameter: "accuracy", configParameter: "epoch", importance: "5", correlation: "3"},
              { hpoProjectId: 1, parameter: "accuracy", configParameter: "learning_rate", importance: "7", correlation: "4"},
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
