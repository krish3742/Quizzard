"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const quiz_1 = require("../controllers/quiz");
const validateRequest_1 = require("../helper/validateRequest");
const isAuth_1 = require("../middlewares/isAuth");
const router = express_1.default.Router();
// create
// POST /quiz/
router.post("/", isAuth_1.isAuthenticated, [
    (0, express_validator_1.body)("name")
        .trim()
        .not()
        .isEmpty()
        .isLength({ min: 10 })
        .withMessage("Please enter a valid name, minimum 10 character long")
        .custom((name) => {
        return (0, quiz_1.isValidQuizName)(name)
            .then((status) => {
            if (!status) {
                return Promise.reject("Plaase enter an unique quiz name.");
            }
        })
            .catch((err) => {
            return Promise.reject(err);
        });
    }),
    (0, express_validator_1.body)("category")
        .trim()
        .not()
        .isEmpty()
        .toLowerCase()
        .isIn(['test', 'exam'])
        .withMessage("category can only be 'test' or 'exam'"),
    (0, express_validator_1.body)("questionList").custom((questionList, { req }) => {
        return (0, quiz_1.isValidQuiz)(questionList, req.body["answers"])
            .then((status) => {
            if (!status) {
                return Promise.reject("Please enter a valid quiz having atleast one question, and answers with correct options!");
            }
        })
            .catch((err) => {
            return Promise.reject(err);
        });
    }),
    (0, express_validator_1.body)("passingPercentage").custom((passingPercentage) => {
        if (passingPercentage == 0) {
            return Promise.reject("Passing percentage can not be zero..");
        }
        return true;
    }),
    (0, express_validator_1.body)("difficultyLevel").custom((difficultyLevel) => {
        if (!difficultyLevel || !["easy", "medium", "hard"].includes(difficultyLevel)) {
            return Promise.reject("Difficulty level must be easy, medium and hard");
        }
        return true;
    }),
], validateRequest_1.validateRequest, quiz_1.createQuiz);
//Get  quiz/allpublished quiz
router.get("/allpublishedquiz", isAuth_1.isAuthenticated, quiz_1.getAllQuiz);
//Get  quiz/allpublished quiz/exam
router.get("/allpublishedquiz/exam", isAuth_1.isAuthenticated, quiz_1.getAllQuizExam);
//Get  quiz/allpublished quiz/test
router.get("/allpublishedquiz/test", isAuth_1.isAuthenticated, quiz_1.getAllQuizTest);
// get
// GET /quiz/:quizId
router.get("/:quizId?", isAuth_1.isAuthenticated, quiz_1.getQuiz);
router.get("/name/:quizId?", isAuth_1.isAuthenticated, quiz_1.getQuizName);
//
//update
//PUT /quiz
router.put("/", isAuth_1.isAuthenticated, [
    (0, express_validator_1.body)("name")
        .trim()
        .not()
        .isEmpty()
        .isLength({ min: 10 })
        .withMessage("Please enter a valid name, minimum 10 character long"),
    (0, express_validator_1.body)("questionList").custom((questionList, { req }) => {
        return (0, quiz_1.isValidQuiz)(questionList, req.body["answers"])
            .then((status) => {
            if (!status) {
                return Promise.reject("Please enter a valid quiz having atleast one question, and answers with correct option!");
            }
        })
            .catch((err) => {
            return Promise.reject(err);
        });
    }),
    (0, express_validator_1.body)("passingPercentage").custom((passingPercentage) => {
        if (passingPercentage == 0) {
            return Promise.reject("Passing percentage can not be zero..");
        }
        return true;
    }),
    (0, express_validator_1.body)("difficultyLevel").custom((difficultyLevel) => {
        if (!difficultyLevel || !["easy", "medium", "hard"].includes(difficultyLevel)) {
            return Promise.reject("Difficulty level must be easy, medium and hard");
        }
        return true;
    }),
], validateRequest_1.validateRequest, quiz_1.updateQuiz);
//Delete
//DELETE quiz/:quizId
router.delete("/:quizId", isAuth_1.isAuthenticated, quiz_1.deleteQuiz);
//Publish
// PATCH quiz/publish
router.patch("/publish", isAuth_1.isAuthenticated, quiz_1.publishQuiz);
exports.default = router;
