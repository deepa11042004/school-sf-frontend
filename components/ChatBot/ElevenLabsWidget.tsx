'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';

export default function ElevenLabsWidget() {
  const [agentId, setAgentId] = useState('');

  useEffect(() => {
    fetch('/api/agent')
      .then((res) => res.json())
      .then((data) => setAgentId(data.agentId));
  }, []);

  return (
    <>
      <Script
        src="https://unpkg.com/@elevenlabs/convai-widget-embed"
        strategy="afterInteractive"
      />

      {agentId && (
        <elevenlabs-convai agent-id={agentId} />
      )}
    </>
  );
}