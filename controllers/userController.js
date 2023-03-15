const AppError = require('../utils/appErr');
const User = require('./../models/usersModel')
const APIFeatures = require('./../utils/apifeatures')
const catchAsync = require('./../utils/catchAsync')

const filterObj = (obj, ...allowedfields) => {
    const newObj = {}
    Object.keys(obj).forEach(el => {
        if (allowedfields.includes(el)) newObj[el] = obj[el]
    })
    return newObj
}

exports.getAllUsers = catchAsync(async (req, res, next) => {
    const users = await User.find();

    // SEND REPONSE
    res.status(200).json({
        status: 'sucess',
        results: users.length,
        data: {
            users,
        },
    });
})

exports.updateMe = catchAsync(async (req, res, next) => {
    // 1) Create error if user POSTs password data
    if (req.body.password || req.body.passwordConfirm) {
        return next(new AppError('This route is not for password updates. Please use /updateMyPassword', 400))
    }
    // 2) Filtered out unwanted fields names that are not allowed to be updated
    const filteredBody = filterObj(req.body, 'name', 'email')

    // 3) Update user document
    const updateUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
        new: true,
        runValidators: true
    })

    res.status(200).json({
        status: 'success',
        data: {
            user: updateUser
        }
    })
})

exports.deleteMe = catchAsync(async (req, res, next) => {
    const user = await User.findByIdAndUpdate(req.user.id, { active: false })
    console.log(user)
    res.status(204).json({
        status: 'success',
        data: null
    })
})

exports.getUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet definded!'
    })
}

exports.createUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet definded!'
    })
}

exports.updateUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet definded!'
    })
}

exports.deleteUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet definded!'
    })
}