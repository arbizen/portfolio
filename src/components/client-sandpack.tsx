'use client';
import {
  SandpackProvider,
  SandpackCodeEditor,
  SandpackPreview,
  SandpackLayout,
} from '@codesandbox/sandpack-react';
import { nightOwl } from '@codesandbox/sandpack-themes';

interface Props {
  editorFiles: any;
}

export default function Editor({ editorFiles }: Props) {
  return (
    <SandpackProvider
      files={{
        ...editorFiles,
      }}
      customSetup={{
        dependencies: { 'framer-motion': 'latest' },
      }}
      template="react"
      options={{ autorun: true, autoReload: true }}
      theme="dark"
    >
      <SandpackLayout>
        <SandpackCodeEditor />
        <SandpackPreview
          showOpenInCodeSandbox={false}
          showNavigator={false}
          showRefreshButton={false}
          showRestartButton={false}
        />
      </SandpackLayout>
    </SandpackProvider>
  );
}
