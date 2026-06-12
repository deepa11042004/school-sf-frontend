// app/api/agent/route.ts
//only for agent
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    agentId: process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID,
  });
}