import { getConnection, EntityManager } from 'typeorm';
import faker from 'faker';
import Tool from '@src/modules/tools/entities/Tool';

interface Attributes {
  user_id: string;
  tags?: string[];
}

export default async ({ user_id, tags }: Attributes): Promise<Tool> => {
  const entityManager: EntityManager = getConnection().manager;

  let tagString = faker.lorem
    .words()
    .split(' ')
    .join(',');

  if (tags) {
    tagString = tags.join(',');
  }

  const data = {
    user_id,
    title: faker.company.companyName(),
    link: faker.internet.url(),
    description: faker.lorem.sentence(),
    tags: tagString,
  };

  return entityManager.save(entityManager.create(Tool, data));
};
