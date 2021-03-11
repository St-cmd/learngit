/*
 Navicat Premium Data Transfer

 Source Server         : local
 Source Server Type    : MongoDB
 Source Server Version : 40003
 Source Host           : localhost:27017
 Source Schema         : testproject

 Target Server Type    : MongoDB
 Target Server Version : 40003
 File Encoding         : 65001

 Date: 11/03/2021 21:52:08
*/


// ----------------------------
// Collection structure for admininfos
// ----------------------------
db.getCollection("admininfos").drop();
db.createCollection("admininfos");

// ----------------------------
// Collection structure for categories
// ----------------------------
db.getCollection("categories").drop();
db.createCollection("categories");

// ----------------------------
// Collection structure for choicequestions
// ----------------------------
db.getCollection("choicequestions").drop();
db.createCollection("choicequestions");
db.getCollection("choicequestions").createIndex({
    id: NumberInt("1")
}, {
    name: "id_1",
    background: true
});

// ----------------------------
// Collection structure for discussquestions
// ----------------------------
db.getCollection("discussquestions").drop();
db.createCollection("discussquestions");
db.getCollection("discussquestions").createIndex({
    id: NumberInt("1")
}, {
    name: "id_1",
    background: true
});

// ----------------------------
// Collection structure for files
// ----------------------------
db.getCollection("files").drop();
db.createCollection("files");

// ----------------------------
// Collection structure for judgedquestions
// ----------------------------
db.getCollection("judgedquestions").drop();
db.createCollection("judgedquestions");
db.getCollection("judgedquestions").createIndex({
    id: NumberInt("1")
}, {
    name: "id_1",
    background: true
});

// ----------------------------
// Collection structure for multiplechoicequestions
// ----------------------------
db.getCollection("multiplechoicequestions").drop();
db.createCollection("multiplechoicequestions");
db.getCollection("multiplechoicequestions").createIndex({
    id: NumberInt("1")
}, {
    name: "id_1",
    background: true
});

// ----------------------------
// Collection structure for userinfos
// ----------------------------
db.getCollection("userinfos").drop();
db.createCollection("userinfos");

// ----------------------------
// Collection structure for wrongquestions
// ----------------------------
db.getCollection("wrongquestions").drop();
db.createCollection("wrongquestions");
