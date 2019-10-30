import { Query, MessageDTO } from '../models';
import { db } from './db';

export const find = async (query: Query) => {
  let { page = 1, limit = 5, sortBy = 'id', sortDir = 'asc' } = query;
  const offset = limit * (page - 1);

  return await db<MessageDTO>('messages')
    .orderBy(sortBy, sortDir)
    .limit(limit)
    .offset(offset);
};

export const findByID = async (id: string | number) => {
  return await db<MessageDTO>('messages')
    .where({ id })
    .first();
};

export const add = async (message: MessageDTO) => {
  const [id] = await db<MessageDTO>('messages').insert<number[]>(message);
  return findByID(id);
};

export const remove = async (id: string | number) => {
  const message = await findByID(id);
  await db<MessageDTO>('messages')
    .where({ id })
    .del();
  return message;
};

export const update = async (id: string | number, changes: MessageDTO) => {
  const updated = await db<MessageDTO>('messages')
    .where({ id })
    .update(changes, '*');
  return updated ? findByID(id) : null;
};
