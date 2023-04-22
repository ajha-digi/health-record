import mongoose from 'mongoose';
const { Schema } = mongoose;
mongoose.Promise = global.Promise;

const reportSchema = new Schema({
    createdAt: {
        type: Date, 
        default: Date.now,
        required:true
    },
    bp: {
        type: String,
        required: true
    },
    weight:{
        type: String,
    },
    pulse: {
        type: String,
        required: true
    },
    spo2: {
        type: String
    }

})

// add a virtual property to format the createdAt field
reportSchema.virtual('formattedCreatedAt').get(function() {
    return new Intl.DateTimeFormat('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true
    }).format(this.createdAt);
  });

export const Report = mongoose.models.Report || mongoose.model('Report', reportSchema);
