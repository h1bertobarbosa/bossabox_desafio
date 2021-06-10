import { getConnection } from 'typeorm';
import {
  BAD_REQUEST,
  CREATED,
  NO_CONTENT,
  OK,
} from '@src/utils/HttpStatusCode.utils';
import User from '@src/modules/users/entities/User';
import UserAuthFactory from '@test/utils/factory/UserAuthFactory';
import ToolFactory from '@test/utils/factory/ToolFactory';
import { v4 as uuidv4 } from 'uuid';
beforeEach(async () => {
  await getConnection()
    .createQueryBuilder()
    .delete()
    .from(User)
    .execute();
});

describe('Tools Tests', () => {
  it('POST /tools - should create a new user', async () => {
    const { token } = await UserAuthFactory();
    const data = {
      title: 'Notion',
      link: 'https://notion.so',
      description:
        'All in one tool to organize teams and ideas. Write, plan, collaborate, and get organized',
      tags: [
        'organization',
        'planning',
        'collaboration',
        'writing',
        'calendar',
      ],
    };

    const result = await global.testRequest
      .post('/tools')
      .set('Authorization', `bearer ${token}`)
      .send(data)
      .expect(CREATED);

    expect(result.body.data).toHaveProperty('id');
  });

  it('GET /tools - should list tools', async () => {
    const { token, user } = await UserAuthFactory();
    await ToolFactory({ user_id: user.id });
    await ToolFactory({ user_id: user.id });
    await ToolFactory({ user_id: user.id });

    const result = await global.testRequest
      .get('/tools')
      .set('Authorization', `bearer ${token}`)
      .expect(OK);

    expect(result.body.data).toHaveLength(3);
  });

  it('GET /tools?tag=node must be possible to filter tools using a tag search', async () => {
    const { token, user } = await UserAuthFactory();
    await ToolFactory({ user_id: user.id, tags: ['node', 'mysql'] });
    await ToolFactory({ user_id: user.id });
    await ToolFactory({ user_id: user.id });

    const result = await global.testRequest
      .get('/tools?tag=node')
      .set('Authorization', `bearer ${token}`);

    expect(result.body.data).toHaveLength(1);
  });

  it('DELETE /tools/:id - should delete a tool', async () => {
    const { token, user } = await UserAuthFactory();
    const tool = await ToolFactory({
      user_id: user.id,
      tags: ['node', 'mysql'],
    });

    await global.testRequest
      .delete(`/tools/${tool.id}`)
      .set('Authorization', `bearer ${token}`)
      .expect(NO_CONTENT);
  });

  it('DELETE /tools/:id - should not delete a tool if user not owner', async () => {
    const { token, user } = await UserAuthFactory();
    const { user: user2 } = await UserAuthFactory();
    const tool = await ToolFactory({
      user_id: user2.id,
      tags: ['node', 'mysql'],
    });

    await global.testRequest
      .delete(`/tools/${tool.id}`)
      .set('Authorization', `bearer ${token}`)
      .expect(BAD_REQUEST);
  });

  it('DELETE /tools/:id - should not delete a tool if not exists', async () => {
    const { token, user } = await UserAuthFactory();
    const tool = await ToolFactory({
      user_id: user.id,
      tags: ['node', 'mysql'],
    });

    await global.testRequest
      .delete(`/tools/${uuidv4()}`)
      .set('Authorization', `bearer ${token}`)
      .expect(BAD_REQUEST);
  });
});
