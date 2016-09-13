import { all, resolve, fromNode } from 'bluebird';
import mapValues from 'lodash/mapValues';
import forEach from 'lodash/forEach';
import knex from 'knex';

export default {
  name: 'knex',

  initialize({ container, config, logger }) {
    let adapter = container.lookup('orm-adapter:knex');

    if (config.ormAdapter === 'knex') {
      container.register('orm-adapter:application', adapter);
    }

    return resolve(() => {
      return knex(config.knex);
    }).then((db) => {
      adapter.db = db;

      let models = container.lookupAll('model');
      let adapterModels = mapValues(models, (Model) => {
        if (Model.hasOwnProperty('abstract') && Model.abstract) {
          return;
        }
        return adapter.define(Model);
      });

      adapter.adapterModels = adapterModels;
      adapter.models = models;

      // Create tables for each model if they don't exist
      return createTables(db, adapterModels);
    }).catch((error) => {
      logger.error('Error initializing the knex adapter or database connection:');
      logger.error(error.stack);
    });
  }
};

function createTables(db, models) {
  return all(models.map(model => {
    return db.schema.table(model.type, function (table) {
      table.integer('column');
      table.text('column2');
    });
  }));
}
