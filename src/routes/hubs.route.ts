import { Router } from 'express';

import { find, findByID, add, remove, update, findHubMessages } from '../data/hubs';
import { add as addMessage } from '../data/messages';
import { MessageDTO } from '../models';

const hubsRouter = Router();

hubsRouter.get('/', async (req, res) => {
  try {
    const hubs = await find(req.query);
    res.status(200).json(hubs);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Error retrieving the hubs',
    });
  }
});

hubsRouter.get('/:id', async (req, res) => {
  try {
    const hub = await findByID(req.params.id);
    if (hub) {
      res.status(200).json(hub);
    } else {
      res.status(404).json({ message: 'Hub not found' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Error retrieving the hub',
    });
  }
});

hubsRouter.post('/', async (req, res) => {
  try {
    const hub = await add(req.body);
    res.status(201).json(hub);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Error adding the hub',
    });
  }
});

hubsRouter.delete('/:id', async (req, res) => {
  try {
    const hub = await remove(req.params.id);
    if (hub) {
      res.status(200).json({ message: 'The hub has been nuked' });
    } else {
      res.status(404).json({ message: 'The hub could not be found' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Error removing the hub',
    });
  }
});

hubsRouter.put('/:id', async (req, res) => {
  try {
    const hub = await update(req.params.id, req.body);
    if (hub) {
      res.status(200).json(hub);
    } else {
      res.status(404).json({ message: 'The hub could not be found' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Error updating the hub',
    });
  }
});

// add an endpoint that returns all the messages for a hub
// this is a sub-route or sub-resource
hubsRouter.get('/:id/messages', async (req, res) => {
  try {
    const messages = await findHubMessages(req.params.id);
    res.status(200).json(messages);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Error getting the messages for the hub',
    });
  }
});

// add an endpoint for adding new message to a hub
hubsRouter.post('/:id/messages', async (req, res) => {
  try {
    const messageInfo: MessageDTO = { ...req.body, hub_id: req.params.id };
    const message = await addMessage(messageInfo);
    res.status(210).json(message);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Error getting the messages for the hub',
    });
  }
});

export { hubsRouter };
