import mongoose from 'mongoose';

enum JobStatus {
    Interview = 'interview',
    Declined = 'declined',
    Pending = 'pending',
}

interface IJob extends Document {
    company: string;
    position: string;
    status: JobStatus,
    createdBy: mongoose.Types.ObjectId,

  }

export const JobScheema = new mongoose.Schema ({
    company : {
        type: String,
        required: [true , "Provide company name"],
        maxlength:  50
    },
    position : {
        type: String,
        required: [true , "Provide company position"],
        maxlength:  100
    },
    status: {
        type: String,
        enum: Object.values(JobStatus),
        default: JobStatus.Pending
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: [ true, "Provide User"]
    }
},
{
    timestamps: true,
});

export const Job = mongoose.model<IJob>('Job', JobScheema)