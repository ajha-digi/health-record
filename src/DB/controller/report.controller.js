import { Report } from '../model/report.model';

// create a new report
export const createReport = async (req) => {
    try {
        const report = new Report(req);
        await report.save();
        return report;
    } catch (error) {
        return error.message;
    }
};

// get all reports
export const getReports = async () => {
    try {
        const reports = await Report.find({});
        return reports;
    } catch (error) {
        return error.message;
    }
};

// get a single report by ID
export const getReportById = async (id) => {
    try {
        const report = await Report.findById(id);
        if (!report) {
            return 'Report not found';
        }
        return (report);
    } catch (error) {
        return error.message;
    }
};

// update a report by ID
export const updateReportById = async (req, id) => {
    const filter = { _id: id };
    try {
        const report = await Report.findOneAndUpdate(filter, req);
    if (!report) {
            return 'Report not found';
        }
        return report;
    } catch (error) {
        return error.message;
    }
};

// delete a report by ID
export const deleteReportById = async (id) => {
    try {
        await Report.findByIdAndRemove(id);
        return 'Report deleted successfully';
    } catch (error) {
        return error.message;
    }
};
