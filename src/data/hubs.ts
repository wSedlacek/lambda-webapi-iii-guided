import { Query, HubDTO, MessageDTO } from '../models';
import { db } from './db';

export const find = async (query: Query) => {
  const { page = 1, limit = 5, sortBy = 'id', sortDir = 'asc' } = query;
  const offset = limit * (page - 1);

  const rows = await db('hubs')
    .orderBy(sortBy, sortDir)
    .limit(limit)
    .offset(offset);

  return rows;
};

export const findByID = async (id: string | number) => {
  return await db<HubDTO>('hubs')
    .where({ id })
    .first();
};

export const add = async (hub: HubDTO) => {
  const [id] = await db('hubs').insert<number[]>(hub);
  return findByID(id);
};

export const remove = async (id: string | number) => {
  const hub = await findByID(id);
  await db<HubDTO>('hubs')
    .where({ id })
    .del();
  return hub;
};

export const update = async (id: number | string, changes: HubDTO) => {
  await db<HubDTO>('hubs')
    .where({ id })
    .update(changes, '*');
  return findByID(id);
};

export const findHubMessages = async (hubId: string | number) => {
  return await db<MessageDTO>('messages as m')
    .join<HubDTO>('hubs as h', 'm.hub_id', 'h.id')
    .select<MessageDTO>('m.id', 'm.text', 'm.sender', 'h.id as hubId', 'h.name as hub')
    .where({ hub_id: hubId });
};
