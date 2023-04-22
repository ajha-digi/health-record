import { NextResponse } from 'next/server';
import { connectToDatabase } from "@/DB";
import { findId } from '@/helper';
import {
    createReport,
    getReports,
    getReportById,
    deleteReportById,
    updateReportById
} from '@/DB/controller/report.controller';

connectToDatabase();

export async function GET(request) {
    const id = await findId(request);

    // http://localhost:3000/api/report
    if (id) {
        const respWithId = await getReportById(id);
        return NextResponse.json({ data: respWithId, status: "success" })
    }

    // http://localhost:3000/api/report
    const resp = await getReports();
    return NextResponse.json({ data: resp, status: "success" })
}

// http://localhost:3000/api/report
export async function POST(request) {
    const req = await request.json();
    const resp = await createReport(req);
    return NextResponse.json({ data: resp, status: "success" })
}

export async function PATCH(request) {

    const req = await request.json();
    const id = await findId(request);
    if (id) {
        const responseWithId = await updateReportById(req, id);
        return NextResponse.json({ data: responseWithId, status: "success" })
    }
    return NextResponse.json({ message: "I am Patch request", status: "failed" })
}

export async function DELETE(request) {
    const id = await findId(request);
    if (id) {
        const resp = await deleteReportById(id);
        return NextResponse.json({ data: `User ${id} is deleted successfully `, status: "success" })
    }

    return NextResponse.json({ message: "I am Delete request", status: "success" })
}