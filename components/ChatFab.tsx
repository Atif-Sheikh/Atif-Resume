'use client';

import { useState } from 'react';
import Icon from './Icon';

const WIDGET = 'https://cdn.jsdelivr.net/npm/agent-embed-widget/dist/agent-embed-widget.es.js';

type WidgetModule = {
    embedWidget: (opts: { type: string; url: string; theme: string }) => void;
};

/* The chat widget is ~288 KB. It is only fetched once someone actually asks
   for it, so it costs nothing on load. */
export default function ChatFab() {
    const [state, setState] = useState<'idle' | 'loading' | 'open'>('idle');

    const load = async () => {
        if (state !== 'idle') return;
        setState('loading');
        try {
            const m: WidgetModule = await import(/* webpackIgnore: true */ WIDGET);
            m.embedWidget({
                type: 'tray',
                url: 'https://console.thesys.dev/app/Cjv-fsVdqbHT2JCqC5nJr',
                theme: 'light',
            });
            setState('open');
        } catch {
            setState('idle');
        }
    };

    if (state === 'open') return null;

    return (
        <button
            className={state === 'loading' ? 'chat-fab loading' : 'chat-fab'}
            id="chatFab"
            aria-label="Open chat"
            aria-busy={state === 'loading'}
            onClick={load}
        >
            <Icon name="i-chat" />
        </button>
    );
}
