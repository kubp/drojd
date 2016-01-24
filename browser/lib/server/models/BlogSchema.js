"use strict";

var mongoose = require('mongoose');
var BlogSchema = new mongoose.Schema({
    title: String,
    description: String,
    headline: String,
    perex: String,
    md_content: String,
    raw_content: String,
    tags: [String],
    author: String,
    date: Date,
    section: String,
    url: String

}, { versionKey: false });

module.exports = mongoose.model("Blog", BlogSchema);