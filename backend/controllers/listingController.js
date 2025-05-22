const Listing = require('../models/adModel'); // (ou listingModel si tu renomme aussi le model)

exports.getAllListings = async (req, res) => {
  const listings = await Listing.find().populate('author', 'username');
  res.json(listings);
};

exports.getListingById = async (req, res) => {
  const listing = await Listing.findById(req.params.id).populate('author', 'username');
  if (!listing) return res.status(404).json({ message: "Annonce introuvable" });
  res.json(listing);
};

exports.createListing = async (req, res) => {
  const { title, description, price, category } = req.body;

  try {
    const listing = new Listing({
      title,
      description,
      price,
      category,
      author: req.user._id // ⚠️ Nécessite le middleware `protect`
    });

    await listing.save();
    res.status(201).json(listing);
  } catch (err) {
    console.error("Erreur création listing:", err);
    res.status(500).json({ message: "Erreur serveur." });
  }
};


exports.updateListing = async (req, res) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) return res.status(404).json({ message: "Annonce introuvable" });

  if (listing.author.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: "Action non autorisée." });
  }

  const updated = await Listing.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

exports.deleteListing = async (req, res) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) return res.status(404).json({ message: "Annonce introuvable" });

  if (listing.author.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: "Action non autorisée." });
  }

  await listing.deleteOne();
  res.json({ message: "Annonce supprimée" });
};



