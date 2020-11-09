const mongoose = require("mongoose");
require("mongoose-long")(mongoose);
const SchemaTypes = mongoose.Schema.Types;
const AutoIncrement = require("mongoose-sequence")(mongoose);

// User
const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    name: String,
    email: String,
    gender: String,
    createdDate: Date,
    googleID: String,
    facebookID: String,
}, { collection: "Users" }, { toJSON: { virtuals: true }, toObject: { virtuals: true } });

userSchema.virtual("boards", {
    ref: "Board",
    localField: "userID",
    foreignField: "userID",
    justOne: false,
});

userSchema.index({ coords: "2dsphere" });
userSchema.plugin(AutoIncrement, { inc_field: "userID" });
mongoose.model("User", userSchema);

// Board
const boardSchema = new mongoose.Schema({
    userID: { type: SchemaTypes.Long, min: 0, default: 0 },
    name: String,
    numOfCol: { type: Number, min: 0, default: 0 },
    createdDate: Date,
    lastUpdate: Date,
    isActive: Boolean
}, { collection: "Boards" }, { toJSON: { virtuals: true }, toObject: { virtuals: true } });

boardSchema.virtual("createdBy", {
    ref: "User",
    localField: "userID",
    foreignField: "userID"
});

boardSchema.virtual("columns", {
    ref: "Column",
    localField: "boardID",
    foreignField: "boardID",
    justOne: false
});

boardSchema.index({ coords: "2dsphere" });
boardSchema.plugin(AutoIncrement, { inc_field: "boardID" });
mongoose.model("Board", boardSchema);

// Column
const columnSchema = new mongoose.Schema({
    boardID: { type: SchemaTypes.Long, min: 0, default: 0 },
    columnTypeID: { type: SchemaTypes.Long, min: 0, default: 0 },
    numOfCard: { type: Number, min: 0, default: 0 },
    createdDate: Date,
    isActive: Boolean
}, { collection: "Columns" }, { toJSON: { virtuals: true }, toObject: { virtuals: true } });

columnSchema.virtual("board", {
    ref: "Board",
    localField: "boardID",
    foreignField: "boardID"
});

columnSchema.virtual("cards", {
    ref: "Card",
    localField: "columnID",
    foreignField: "columnID",
    justOne: false
});

columnSchema.virtual("cardNumber", {
    ref: "Card",
    localField: "columnID",
    foreignField: "columnID",
    count: true
});

columnSchema.virtual("columnType", {
    ref: "ColumnType",
    localField: "columnTypeID",
    foreignField: "columnTypeID",
    justOne: true
});

columnSchema.index({ coords: "2dsphere" });
columnSchema.plugin(AutoIncrement, { inc_field: "columnID" });
mongoose.model("Column", columnSchema);

// Card
const cardSchema = new mongoose.Schema({
    columnID: { type: SchemaTypes.Long, min: 0, default: 0 },
    userID: { type: SchemaTypes.Long, min: 0, default: 0 },
    content: String,
    createdDate: Date,
    isActive: Boolean
}, { collection: "Cards" }, { toJSON: { virtuals: true }, toObject: { virtuals: true } });

cardSchema.virtual("column", {
    ref: "Column",
    localField: "columnID",
    foreignField: "columnID"
});

cardSchema.virtual("createdBy", {
    ref: "User",
    localField: "userID",
    foreignField: "userID"
});

cardSchema.index({ coords: "2dsphere" });
cardSchema.plugin(AutoIncrement, { inc_field: "cardID" });
mongoose.model("Card", cardSchema);

// Column Type
const columnTypeSchema = new mongoose.Schema({
    name: String
}, { collection: "ColumnTypes" });

columnTypeSchema.index({ coords: "2dsphere" });
columnTypeSchema.plugin(AutoIncrement, { inc_field: "columnTypeID" });
mongoose.model("ColumnType", columnTypeSchema);