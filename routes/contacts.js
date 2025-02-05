const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

// GET all contacts
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET a single contact by ID
router.get('/:id', async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.json(contact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

router.post('/', async (req, res) => {
    try {
      const { firstName, lastName, email, favoriteColor, birthday } = req.body;
      const newContact = new Contact({ firstName, lastName, email, favoriteColor, birthday });
      await newContact.save();
      res.status(201).json({ id: newContact._id });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  router.put('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const updatedContact = await Contact.findByIdAndUpdate(id, req.body, { new: true });
      if (!updatedContact) {
        return res.status(404).json({ message: 'Contact not found' });
      }
      res.status(200).json(updatedContact);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });


  router.delete('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const deletedContact = await Contact.findByIdAndDelete(id);
      if (!deletedContact) {
        return res.status(404).json({ message: 'Contact not found' });
      }
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });


  /**
 * @swagger
 * /contacts:
 *   post:
 *     summary: Create a new contact
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               favoriteColor:
 *                 type: string
 *               birthday:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Contact created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 */
router.post('/', async (req, res) => {
    // Your POST route logic
  });