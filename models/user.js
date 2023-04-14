import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const ItemSchema = new Schema({
  text: {type: String, required: true},
  likes: {type: [String], required: false},
  completed: {type: Boolean, required: false}
});


const AccountSummarySchema = new Schema({
  account_summary_name: {type: String, required: true},
  account_summary_status: {type: String, required: true},
  account_identifier: {type: String, required: true}
}, {
  timestamps: true,
});


const ThoughtSchema = new Schema({
  text: {type: String, required: true},
}, {
  timestamps: true,
});


const UserSchema = new Schema({
    profile_name: { type: String, required: true },
    bucket_list: { type: [ItemSchema], required: false },
    friends_list: { type: [AccountSummarySchema], default: [], required: true},
    liked_items: { type: [String], required: false },
    status: { type: String, default: "", required: false},
    deep_thoughts: { type: [ThoughtSchema], default: [], required: true},
    user_identifier: { type: String, required: false},
    google_verified: {type: Boolean, default: false, required: true},
    logged_in: {type: Boolean, default: false, required: false},
    password: {type: String, required: false}
  }, {
    timestamps: true,
  });


const User = model('User', UserSchema);
const Item = model('Item', ItemSchema);
const AccountSummary = model('AccountSummary', AccountSummarySchema);
const Thought = model('Thought', ThoughtSchema);

export { User, Item, AccountSummary, Thought }