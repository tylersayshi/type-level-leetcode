import type { EditorProps as MonacoEditorProps } from "@monaco-editor/react";
import { Editor as MonacoEditor } from "@monaco-editor/react";
import { useEffect, useState } from "react";

export const Editor: React.FC<{
  startValue: string;
  dtsFile: string;
  className?: string;
}> = ({ startValue, className, dtsFile }) => {
  const [theme, setTheme] = useState("vs-dark");

  useEffect(() => {
    const localTheme = localStorage.getItem("theme");
    if (localTheme === "light") {
      setTheme("light");
    } else if (localTheme === "dark") {
      setTheme("vs-dark");
    } else {
      setTheme("vs-dark");
    }
  }, []);

  const handleEditorWillMount: MonacoEditorProps["beforeMount"] = async (
    monaco,
  ) => {
    monaco.languages.typescript.typescriptDefaults.addExtraLib(
      `declare module 'flat-type-samurai' {
         ${dtsFile}
      }`,
      "file:///node_modules/@types/flat-type-samurai/index.d.ts",
    );
  };

  return (
    <MonacoEditor
      className={className}
      height={600}
      defaultLanguage="typescript"
      defaultValue={startValue}
      theme={theme}
      beforeMount={handleEditorWillMount}
    />
  );
};
