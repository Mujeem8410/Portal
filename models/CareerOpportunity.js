
const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
    name: String,
    url: String
});

const careerSchema = new mongoose.Schema({
    title: String,
    roadmap: String,
    freeResources: [resourceSchema],
    paidResources: [resourceSchema]
});

const branchSchema = new mongoose.Schema({
    name: String,
    careers: [careerSchema]
});

const courseSchema = new mongoose.Schema({
    name: String,
    branches: [branchSchema]
});

module.exports = mongoose.model('Course', courseSchema);
