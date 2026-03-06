import { NextResponse } from "next/server";
import { MongoClient, GridFSBucket, ObjectId } from "mongodb";
import { Readable } from "stream";
import { connectDB } from "@/lib/mongodb";
import Registration from "@/models/Registration";

let bucket: GridFSBucket | null = null;

async function getBucket() {
  if (!bucket) {
    const client = new MongoClient(process.env.MONGODB_URI!);
    await client.connect();
    const db = client.db();
    bucket = new GridFSBucket(db, { bucketName: "uploads" });
  }
  return bucket;
}

interface RegistrationBody {
  fullName?: string;
  email?: string;
  phoneNumber?: string;
  dob?: Date;
  experience?: string;
  institution?: string;
  callDateTime?: string;
  hearAboutUs?: string;
  currentProfession?: string;
  specialization?: string;
  learningGoals?: string;
  trainingPrograms?: string[];
  additionalPrograms?: string[];
  termsAgree?: boolean;
}

export async function POST(req: Request) {
  try {
    await connectDB();

    let body: RegistrationBody = {};
    let uploadId: ObjectId | null = null;
    let uploadName: string | null = null;

    const contentType = req.headers.get("content-type") || "";

    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();

      body.fullName = formData.get("fullName")?.toString();
      body.email = formData.get("email")?.toString();
      body.phoneNumber = formData.get("phoneNumber")?.toString();
      body.dob = formData.get("dob") ? new Date(formData.get("dob")!.toString()) : undefined;
      body.experience = formData.get("experience")?.toString();
      body.institution = formData.get("institution")?.toString();
      body.callDateTime = formData.get("callDateTime")?.toString();
      body.hearAboutUs = formData.get("hearAboutUs")?.toString();
      body.currentProfession = formData.get("currentProfession")?.toString();
      body.specialization = formData.get("specialization")?.toString();
      body.learningGoals = formData.get("learningGoals")?.toString();
      body.trainingPrograms = formData.getAll("trainingPrograms").map(v => v.toString());
      body.additionalPrograms = formData.getAll("additionalPrograms").map(v => v.toString());

      // Properly handle boolean checkbox
      const termsAgreeRaw = formData.get("termsAgree");
      body.termsAgree = termsAgreeRaw === "on" || termsAgreeRaw === "true";

      // File upload
      const uploadFile = formData.get("uploadId") as File | null;
      if (uploadFile) {
        uploadName = uploadFile.name;
        const buffer = Buffer.from(await uploadFile.arrayBuffer());
        const readable = Readable.from(buffer);
        const bucket = await getBucket();
        const uploadStream = bucket.openUploadStream(uploadName);
        readable.pipe(uploadStream);

        await new Promise<void>((resolve, reject) => {
          uploadStream.on("finish", () => {
            uploadId = uploadStream.id as ObjectId;
            resolve();
          });
          uploadStream.on("error", reject);
        });
      }
    } else if (contentType.includes("application/json")) {
      const json = await req.json();
      body = {
        ...json,
        termsAgree: !!json.termsAgree,
      };
    } else {
      return NextResponse.json(
        { success: false, error: "Unsupported Content-Type" },
        { status: 400 }
      );
    }

    if (!body.fullName || !body.email) {
      return NextResponse.json(
        { success: false, error: "Full Name and Email are required" },
        { status: 400 }
      );
    }

    const ticketNo = await Registration.getNextTicketNo();

    const newRegistration = new Registration({
      ticketNo,
      ...body,
      uploadId,
      uploadName,
    });

    await newRegistration.save();

    return NextResponse.json({ success: true, ticketNo, data: newRegistration });
  } catch (err: unknown) {
    console.error("❌ Registration error:", err);
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  }
}
