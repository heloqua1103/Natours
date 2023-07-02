const catchAsync = require('../utils/catchAsync')
const AppError = require('./../utils/appErr')
const factory = require('./handlerController')
const Review = require('./../models/reviewModel')

exports.getAllReivews = factory.getAll(Review)

exports.getReivew = factory.getOne(Review)

exports.setTourUserIds = (req, res, next) => {
    // Allow nested routers
    if (!req.body.tour) req.body.tour = req.params.tourId
    if (!req.body.user) req.body.user = req.user.id
    next()
}

exports.createReview = factory.createOne(Review)
exports.updateReview = factory.updateOne(Review)
exports.deleteReview = factory.deleteOne(Review)