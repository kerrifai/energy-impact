const ActionMongoModel = require("../models/action.mongo.model");

async function getAll({ category } = {}) {
  const query = {};
  if (category) query.category = category;
  return ActionMongoModel.find(query).lean().exec();
}

async function getById(id) {
  return ActionMongoModel.findById(id).lean().exec();
}

async function create(data) {
  const doc = await ActionMongoModel.create(data);
  return doc.toObject();
}

async function update(id, data) {
  const doc = await ActionMongoModel.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true
  })
    .lean()
    .exec();
  return doc;
}

async function remove(id) {
  const res = await ActionMongoModel.findByIdAndDelete(id).exec();
  return !!res;
}

async function clearAll() {
  await ActionMongoModel.deleteMany({});
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  clearAll
};
