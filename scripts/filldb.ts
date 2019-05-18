/* tslint:disable:no-console */
import * as _ from 'lodash';
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { UserEntity } from '../src/models/entities/users.entity';
import * as testData from './mocks/dev';
import * as prodData from './mocks/prod';

function getEntityClass(key) {
  switch (key) {
    case 'users': {
      return UserEntity;
    }
  }
}

createConnection().then(async connection => {
  const data = (process.env.argv || []).includes('--prod') ? prodData.default : testData.default;
  const keys = Object.keys(data);

  for (const key in keys) {
    const table = keys[key];
    const Entity = getEntityClass(table);

    console.log(`- ${table}`);
    for (const item of data[table]) {
      let entity = new Entity();
      entity = _.merge(entity, item);

      await connection.manager.save(entity);
      console.log(' --> saved with id: ' + entity.id);
    }

    console.log();
  }
}).catch(error => console.log(error));
