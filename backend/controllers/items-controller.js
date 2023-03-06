const { validationResult } = require('express-validator');
const mongoose = require('mongoose');
const List = require('../models/list');
const Item = require('../models/item');
const HttpError = require('../models/http-errors');

//Get all items for current list
const getItems = async (req, res, next) => {
    const listId = req.params.lid;
    let listItems;

    try{
        listItems = await Item.find({ creator: listId });
    }catch(err){
        const error = new HttpError(
            'Unable to fetch List items.', 500
          );
          return next(error);
    }

    res.json({ listItems });
}


//Create new Item and add it to list
const createItem = async (req, res, next) => {
    const { itemName, creator } = req.body;
    const errors = validationResult(req);

    //Check for errors
    if (!errors.isEmpty()) {
        return next(
          new HttpError('Invalid data was entered.', 422)
        );
        }


    const createdItem = new Item({
        itemName,
        creator
    })

    //Look for current active list
    let list;
    try{
        list = await List.findById({ creator });
    } catch (err) {
        const error = new HttpError(
            'Unable to create Item -From find list by ID', 500
          );
          return next(error);
    }

    if (!list){
        const error = new HttpError('Could not create Item --Unable to locate list for provided Id.', 404);
        return next(error);
    }

    //Attempt to create Item
    try{
        const session = await mongoose.startSession();
        session.startTransaction();

        await createdItem.save({ session: session });
        list.items.push(createdItem);

        await list.save({ session: session });
        await session.commitTransaction();

    } catch (err){
        console.log(err);
        const error = new HttpError(
          'Unable to create List -From save to user.', 500
        );
        return next(error);
    }

    res.status(201).json(createdItem);
}

//Delete item
const deleteItem = async (req, res, next) => {
    const itemId = req.params.iid;

    let item;
    try{
        item = await Item.findById(itemId);
    }catch(err){
        const error = new HttpError(
            'Unable to delete Item.', 500
          );
          return next(error);
    }

 
}

exports.createItem = createItem;
exports.getItems = getItems;