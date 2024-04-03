const express = require('express');
const { getHospitals, getHospital, createHospital, updateHospital, deleteHospital, getVacCenters } = require("../controllers/hospitals");

// Include other resource routers
const appointmentRouter = require('./appointments')

const router = express.Router();

const { protect, authorize } = require('../middleware/auth');

/**
 * @swagger
 * components:
 *   schemas:
 *     Hospital:
 *       type: object
 *       required:
 *         - name
 *         - address
 *         - district
 *         - province
 *         - postalcode
 *         - tel
 *         - region
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: The auto-generated id of the hospital
 *           example: 609bda561452242d88d36e37
 *         name:
 *           type: string
 *           description: Hospital name
 *           example: Happy Hospital
 *         address:
 *           type: string
 *           description: House No., Street, Road
 *           example: 121 ถนนสุขุมวิท
 *         district:
 *           type: string
 *           description: District
 *           example: บางนา
 *         province:
 *           type: string
 *           description: Province
 *           example: กรุงเทพมหานคร
 *         postalcode:
 *           type: string
 *           description: 5-digit postal code
 *           example: 10110
 *         tel:
 *           type: string
 *           description: Telephone number
 *           example: 02-2187000
 *         region:
 *           type: string
 *           description: Region
 *           example: กรุงเทพมหานคร (Bangkok)  
 */


/**
* @swagger
* tags:
*   name: Hospitals
*   description: The hospitals managing API
*/

/**
* @swagger
* /hospitals:
*   get:
*     summary: Returns the list of all the hospitals
*     tags: [Hospitals]
*     responses:
*       200:
*         description: The list of the hospitals
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*               $ref: '#/components/schemas/Hospital'
*/

/**
* @swagger
* /hospitals/{id}:
*   get:
*     summary: Get the hospital by id
*     tags: [Hospitals]
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: string
*         required: true
*         description: The hospital id
*     responses:
*       200:
*         description: The hospital description by id
*         contents:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Hospital'
*       404:
*         description: The hospital was not found
*/

/**
* @swagger
* /hospitals:
*   post:
*     summary: Create a new hospital
*     tags: [Hospitals]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Hospital'
*     responses:
*       201:
*         description: The hospital was successfully created
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Hospital'
*       500:
*         description: Some server error
*/

/**
* @swagger
* /hospitals/{id}:
*   put:
*     summary: Update the hospital by id
*     tags: [Hospitals]
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: string
*         required: true
*         description: The hospital id
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Hospital'
*     responses:
*       200:
*         description: The hospital was updated
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Hospital'
*       404:
*         description: The hospital was not found
*       500:
*         description: Some server error
*/

/**
* @swagger
* /hospitals/{id}:
*   delete:
*     summary: Remove the hospital by id
*     tags: [Hospitals]
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: string
*         required: true
*         description: The hospital id
*     responses:
*       200:
*         description: The hospital was deleted
*       404:
*         description: The hospital was not found
*/

// Re-route into other resource routers
router.use('/:hospitalId/appointments/', appointmentRouter);

router.route('/vacCenters').get(getVacCenters);

router.route('/').get(getHospitals).post(protect, authorize('admin'), createHospital);
router.route("/:id").get(getHospital).put(protect, authorize('admin'),updateHospital).delete(protect, authorize('admin'), deleteHospital);

module.exports = router; // don't forget to export