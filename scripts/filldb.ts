/* tslint:disable:no-console */
import * as _ from 'lodash';
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { UserEntity } from '../src/models/entities/users.entity';
import * as testData from './mocks/dev';
import * as prodData from './mocks/prod';

createConnection().then(async connection => {
  const data = process.env.argv[0] === '--prod' ? prodData : testData;

  const {
    users,
  } = data.default;

  //////////////////////// <Users> //////////////////////////////////
  console.log('- users:');

  for (const item of users) {
    let entity = new UserEntity();
    entity = _.merge(entity, item);
    await connection.manager.save(entity);

    console.log('\t - saved with id: ' + entity.id);
  }
  //////////////////////// </Users> /////////////////////////////////

}).catch(error => console.log(error));
