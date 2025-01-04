"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Job = exports.JobScheema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
var JobStatus;
(function (JobStatus) {
    JobStatus["Interview"] = "interview";
    JobStatus["Declined"] = "declined";
    JobStatus["Pending"] = "pending";
})(JobStatus || (JobStatus = {}));
exports.JobScheema = new mongoose_1.default.Schema({
    company: {
        type: String,
        required: [true, "Provide company name"],
        maxlength: 50
    },
    position: {
        type: String,
        required: [true, "Provide company position"],
        maxlength: 100
    },
    status: {
        type: String,
        enum: Object.values(JobStatus),
        default: JobStatus.Pending
    },
    createdBy: {
        type: mongoose_1.default.Types.ObjectId,
        ref: "User",
        required: [true, "Provide User"]
    }
}, {
    timestamps: true,
});
exports.Job = mongoose_1.default.model('Job', exports.JobScheema);
//# sourceMappingURL=Job.js.map