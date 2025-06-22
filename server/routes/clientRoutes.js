import express from 'express';
import {
  getAllClients,
  getClient,
  createClient,
  updateClient,
  deleteClient
} from '../controllers/clientController.js';

const router = express.Router();

// Get all clients
router.get('/', getAllClients);

// Get a single client
router.get('/:id', getClient);

// Create a new client
router.post('/', createClient);

// Update a client
router.put('/:id', updateClient);

// Delete a client
router.delete('/:id', deleteClient);

export default router;
