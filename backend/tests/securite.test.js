// Ce que l'API promet : pas de route protégée sans jeton valide, et personne ne modifie
// ni ne supprime l'annonce d'un autre. Aucune base n'est nécessaire : les accès au modèle
// sont remplacés par des doublures.
const { test } = require('node:test');
const assert = require('node:assert');
const jwt = require('jsonwebtoken');

const Listing = require('../models/adModel');
const User = require('../models/userModel');
const { protect } = require('../middleware/authMiddleware');
const { updateListing, deleteListing } = require('../controllers/listingController');

process.env.JWT_SECRET = 'secret-de-test';

function reponse() {
  return {
    statut: 200,
    corps: null,
    status(code) { this.statut = code; return this; },
    json(corps) { this.corps = corps; return this; },
  };
}

test('sans jeton, une route protégée répond 401', async () => {
  const res = reponse();
  let suite = false;
  await protect({ headers: {} }, res, () => { suite = true; });
  assert.strictEqual(res.statut, 401);
  assert.strictEqual(suite, false);
});

test('un jeton signé avec un autre secret répond 401', async () => {
  const falsifie = jwt.sign({ id: 'u1' }, 'autre-secret');
  const res = reponse();
  let suite = false;
  await protect({ headers: { authorization: `Bearer ${falsifie}` } }, res, () => { suite = true; });
  assert.strictEqual(res.statut, 401);
  assert.strictEqual(suite, false);
});

test("un jeton valide laisse passer et attache l'utilisateur, sans son mot de passe", async (t) => {
  let champs = null;
  t.mock.method(User, 'findById', () => ({
    select: async (s) => { champs = s; return { _id: 'u1', username: 'yohann' }; },
  }));
  const req = { headers: { authorization: `Bearer ${jwt.sign({ id: 'u1' }, process.env.JWT_SECRET)}` } };
  let suite = false;
  await protect(req, reponse(), () => { suite = true; });
  assert.strictEqual(suite, true);
  assert.strictEqual(req.user.username, 'yohann');
  assert.strictEqual(champs, '-password');
});

for (const [verbe, action] of [['modifier', updateListing], ['supprimer', deleteListing]]) {
  test(`${verbe} l'annonce d'un autre utilisateur répond 403, sans rien toucher`, async (t) => {
    t.mock.method(Listing, 'findById', async () => ({
      author: 'auteur-1',
      deleteOne: async () => assert.fail("l'annonce ne doit pas être supprimée"),
    }));
    const maj = t.mock.method(Listing, 'findByIdAndUpdate', async () => assert.fail("l'annonce ne doit pas être modifiée"));
    const res = reponse();
    await action({ params: { id: 'a1' }, body: { title: 'piratée' }, user: { _id: 'intrus' } }, res);
    assert.strictEqual(res.statut, 403);
    assert.strictEqual(maj.mock.callCount(), 0);
  });
}

test("l'auteur peut modifier sa propre annonce", async (t) => {
  t.mock.method(Listing, 'findById', async () => ({ author: 'auteur-1' }));
  t.mock.method(Listing, 'findByIdAndUpdate', async (id, body) => ({ _id: id, ...body }));
  const res = reponse();
  await updateListing({ params: { id: 'a1' }, body: { title: 'Nouveau titre' }, user: { _id: 'auteur-1' } }, res);
  assert.strictEqual(res.statut, 200);
  assert.strictEqual(res.corps.title, 'Nouveau titre');
});

test('une annonce inexistante répond 404', async (t) => {
  t.mock.method(Listing, 'findById', async () => null);
  const res = reponse();
  await deleteListing({ params: { id: 'inconnue' }, user: { _id: 'u1' } }, res);
  assert.strictEqual(res.statut, 404);
});
