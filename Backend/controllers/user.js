"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUsers = exports.verifyDeactivateAccountOTP = exports.changePassword = exports.updateUser = exports.isActiveUser = exports.getUser = exports.deactivateUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const error_1 = __importDefault(require("../helper/error"));
const user_1 = __importDefault(require("../models/user"));
const otp_1 = __importDefault(require("../models/otp"));
const otp_2 = require("./otp");
const getUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let resp;
    try {
        const userId = req.userId;
        if (!userId) {
            const err = new error_1.default("You are not authorized!");
            err.statusCode = 401;
            throw err;
        }
        const user = yield user_1.default.findById(userId, { name: 1, email: 1 });
        if (!user) {
            const err = new error_1.default("No user exist");
            err.statusCode = 401;
            throw err;
        }
        else {
            resp = { status: "success", message: "User found", data: user };
            res.status(200).send(resp);
        }
    }
    catch (error) {
        next(error);
    }
});
exports.getUser = getUser;
const updateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let resp;
    const userId = req.userId;
    try {
        if (!userId) {
            const err = new error_1.default("You are not authorized!");
            err.statusCode = 401;
            throw err;
        }
        const user = yield user_1.default.findById(userId);
        if (!user) {
            const err = new error_1.default("No user exist");
            err.statusCode = 401;
            throw err;
        }
        user.name = req.body.name;
        yield user.save();
        resp = { status: "success", message: "User Updated", data: {} };
        res.send(resp);
    }
    catch (error) {
        next(error);
    }
});
exports.updateUser = updateUser;
const changePassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let resp;
    const userId = req.userId;
    try {
        if (!userId) {
            const err = new error_1.default("You are not authorized!");
            err.statusCode = 401;
            throw err;
        }
        const user = yield user_1.default.findById(userId);
        if (!user) {
            const err = new error_1.default("User does not exist");
            err.statusCode = 401;
            throw err;
        }
        const currentPassword = req.body.currentPassword;
        let newPassword = yield bcryptjs_1.default.hash(req.body.newPassword, 12);
        const confirmPassword = req.body.confirmPassword;
        // checking if current password is same as user password
        const status = yield bcryptjs_1.default.compare(currentPassword, user.password);
        if (!status) {
            const err = new error_1.default("Current Password is incorrect. Please try again.");
            err.statusCode = 401;
            throw err;
        }
        // checking if new password is same as confirm password
        const isPasswordMatching = yield bcryptjs_1.default.compare(confirmPassword, newPassword);
        if (!isPasswordMatching) {
            const err = new error_1.default("New password does not match. Enter new password again ");
            err.statusCode = 401;
            throw err;
        }
        // checking if current password and new password are same
        const prevPasswordSame = yield bcryptjs_1.default.compare(currentPassword, newPassword);
        if (prevPasswordSame) {
            const err = new error_1.default("Same as current password. Try another one");
            err.statusCode = 401;
            throw err;
        }
        user.password = newPassword;
        yield user.save();
        resp = { status: "success", message: "Password updated", data: {} };
        res.send(resp);
    }
    catch (error) {
        next(error);
    }
});
exports.changePassword = changePassword;
// Send otp for deactivate user account
const deactivateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let resp;
    // get userId from authorization token
    const userId = req.userId;
    try {
        // if userId not found then throw a not authorized error
        if (!userId) {
            const err = new error_1.default("You are not authorized!");
            err.statusCode = 401;
            throw err;
        }
        // find user in User DataBase
        const user = yield user_1.default.findById(userId);
        //if user does not exist then throw a Error User not exist
        if (!user) {
            const err = new error_1.default("No user exist");
            err.statusCode = 401;
            throw err;
        }
        // find OTP for same email if already present then resend otp take time
        const otpExist = yield otp_1.default.findOne({ email: user.email });
        // otp found then throw an error as resend otp after some time
        if (otpExist) {
            // find Create otp time
            const otpExistCreatedAt = new Date(otpExist.createdAt); // Assuming otpExist.createdAt is a Date object
            // find current time
            const currentTime = new Date();
            // change time into milliseconds and find difference between them
            const timeDifferenceInMilliseconds = (otpExistCreatedAt.getTime() + 120000) - currentTime.getTime();
            // convert milliseconds to minutes
            const timeDifferenceInMinutes = Math.floor(timeDifferenceInMilliseconds / (1000 * 60));
            // get rest expire time
            const timeExpire = timeDifferenceInMinutes;
            const err = new error_1.default(`Resend OTP after ${timeExpire + 1} minutes`);
            err.statusCode = 401;
            throw err;
        }
        // Send a deactivate email OTP
        const sendDeactivateOTP = (0, otp_2.sendDeactivateEmailOTP)(user.email);
        // if otp not send then throw an error OTP not send
        if (!sendDeactivateOTP) {
            const err = new error_1.default("Email OTP has not sent..");
            err.statusCode = 401;
            throw err;
        }
        // if OTP send sucessfully then return a response otp send
        resp = {
            status: "success",
            message: "An Email OTP has been sent to your account please verify!",
            data: {},
        };
        res.status(200).send(resp);
    }
    catch (error) {
        next(error);
    }
});
exports.deactivateUser = deactivateUser;
//Verify Deactivate Email OTP
const verifyDeactivateAccountOTP = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let resp;
        // take otp from body
        const otp = req.body.otp;
        // take userid from authorization token
        const userId = req.userId;
        // find user exits or not
        const user = yield user_1.default.findById({ _id: userId });
        // if user does not exist then throw an error User not found
        if (!user) {
            const err = new error_1.default("User Not Fount..");
            err.statusCode = 401;
            throw err;
        }
        // Check user already deactivate or not
        if (user && user.isDeactivated) {
            const err = new error_1.default("User already Deactivaated");
            err.statusCode = 401;
            throw err;
        }
        const email = user.email;
        //find last send otp of same email
        const matchOTP = yield otp_1.default.find({ email }).sort({ createdAt: -1 }).limit(1);
        console.log("Match OTP : ", matchOTP);
        // if otp not found for this email then throw an error
        if (matchOTP.length === 0) {
            // OTP not found for the email
            const err = new error_1.default("OTP has not send on this email ");
            err.statusCode = 400;
            throw err;
        }
        // Check OTP match or not, if not match then throw an error Incorrect OTP
        else if (otp != matchOTP[0].otp) {
            // The otp is not Correct
            const err = new error_1.default("Incorrect OTP");
            err.statusCode = 400;
            throw err;
        }
        // Deactivate Account
        user.isDeactivated = true;
        // Save result into database
        const result = yield user.save();
        resp = { status: "success", message: "Deactivate Account Successfull !!", data: { userId: user._id, email: email } };
        res.status(200).send(resp);
    }
    catch (error) {
        next(error);
    }
});
exports.verifyDeactivateAccountOTP = verifyDeactivateAccountOTP;
const isActiveUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.default.findById(userId);
    if (!user) {
        const err = new error_1.default("User not found!");
        err.statusCode = 404;
        throw err;
    }
    return !user.isDeactivated;
});
exports.isActiveUser = isActiveUser;
const getAllUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let resp;
        let users = yield user_1.default.find({ isVerified: true, isDeactivated: false }, { name: 1 });
        users = users.filter((user) => {
            return user._id.toString() !== req.userId;
        });
        if (!users) {
            const err = new error_1.default("User Not Found..");
            err.statusCode = 401;
            throw err;
        }
        resp = {
            status: "success",
            message: "All Users",
            data: users,
        };
        res.status(200).send(resp);
    }
    catch (error) {
        next(error);
    }
});
exports.getAllUsers = getAllUsers;
