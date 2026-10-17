"use client";
import { LoaderCircle, Play } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
export function RunAuditButton(){const [running,setRunning]=useState(false);const [error,setError]=useState("");const router=useRouter();async function run(){setRunning(true);setError("");const response=await fetch("/api/admin/audit",{method:"POST"});if(!response.ok){const body=await response.json().catch(()=>({})) as {message?:string};setError(body.message??"Audit failed.");setRunning(false);return}router.refresh();setRunning(false)}return <div><button className="button" onClick={run} disabled={running}>{running?<LoaderCircle className="animate-spin" size={15}/>:<Play size={15}/>}Run audit</button>{error&&<p className="mt-2 text-xs text-red-700">{error}</p>}</div>}
