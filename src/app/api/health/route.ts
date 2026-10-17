import { NextResponse } from "next/server";
export function GET(){return NextResponse.json({status:"ok",service:"vision-commercial-advisors"},{headers:{"cache-control":"no-store"}});}
