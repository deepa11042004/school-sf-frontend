'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';
import React from 'react';

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

      {agentId &&
        React.createElement('elevenlabs-convai', {
          'agent-id': agentId,
        })}
    </>
  );
}