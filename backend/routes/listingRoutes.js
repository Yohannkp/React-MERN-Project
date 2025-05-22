const express = require('express');
const router = express.Router();
const {
  getAllListings,
  getListingById,
  createListing,
  updateListing,
  deleteListing
} = require('../controllers/listingController');

const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .get(getAllListings)
  .post(protect, createListing); // ✅ ici


router.route('/:id')
  .get(getListingById)
  .put(protect, updateListing)
  .delete(protect, deleteListing);

module.exports = router;
