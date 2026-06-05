// app/api/agent/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    agentId: process.env.ELEVENLABS_AGENT_ID,
  });
}