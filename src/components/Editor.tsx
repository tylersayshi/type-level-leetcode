import type {
  EditorProps as MonacoEditorProps,
  Monaco,
} from "@monaco-editor/react";
import { Editor as MonacoEditor } from "@monaco-editor/react";
import { useEffect, useState, useRef } from "react";
import * as monacoEditor from "monaco-editor";
import type { QuickInfo } from "typescript";

// For debugging where the offset is

// const getTextAtOffset = (
//   model: monacoEditor.editor.ITextModel,
//   offset: number
// ): string => {
//   const position = model.getPositionAt(offset);
//   const wordAtPosition = model.getWordAtPosition(position);
//   return wordAtPosition ? wordAtPosition.word : "";
// };

const getTypeInfoAtPosition = async (
  monaco: Monaco,
  model: monacoEditor.editor.ITextModel,
  offset: number
): Promise<string | undefined> => {
  const worker = await monaco.languages.typescript.getTypeScriptWorker();
  const tsWorker = await worker(model.uri);
  const info: QuickInfo = await tsWorker.getQuickInfoAtPosition(
    model.uri.toString(),
    offset
  );
  if (!info?.displayParts) return;

  return info.displayParts.map((part) => part.text).join("");
};

const displayTypeInfo = ({
  lineNumber,
  line,
  typeInfo,
  editor,
}: {
  editor: monacoEditor.editor.IStandaloneCodeEditor;
  typeInfo: string;
  lineNumber: number;
  line: string;
}) => {
  console.log(lineNumber, line, typeInfo);
  editor.executeEdits("type-preview", [
    {
      range: new monacoEditor.Range(lineNumber + 1, 1, lineNumber + 1, 1),
      text: line + " " + typeInfo,
    },
  ]);
};

export const Editor: React.FC<{
  startValue: string;
  dtsFile: string;
  className?: string;
}> = ({ startValue, className, dtsFile }) => {
  const [theme, setTheme] = useState("vs-dark");
  const editorRef = useRef<monacoEditor.editor.IStandaloneCodeEditor | null>(
    null
  );

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

  const handleEditorDidMount: MonacoEditorProps["onMount"] = (
    editor,
    monaco
  ) => {
    editorRef.current = editor;

    editor.onDidChangeModelContent(async () => {
      const model = editor.getModel();
      if (!model) return;

      const value = model.getValue();
      const lines = value.split("\n");

      await lines.forEach(async (line, index) => {
        const match = line.match(/\/\/\s*\^?/);
        if (match) {
          const lineNumber = index;
          const textUntilComment = line.split("^?")[0];
          const offset = model.getOffsetAt({
            lineNumber,
            column: textUntilComment.length + 1,
          });

          const typeInfo = await getTypeInfoAtPosition(monaco, model, offset);
          console.log(typeInfo);
          if (typeInfo) {
            displayTypeInfo({
              editor,
              typeInfo,
              lineNumber,
              line,
            });
          }
        }
      });
    });
  };

  const handleEditorWillMount: MonacoEditorProps["beforeMount"] = async (m) => {
    m.languages.typescript.typescriptDefaults.addExtraLib(
      `declare module 'flat-type-samurai' {
         ${dtsFile}
      }`,
      "file:///node_modules/@types/flat-type-samurai/index.d.ts"
    );
  };

  return (
    <MonacoEditor
      className={className}
      height="400px"
      defaultLanguage="typescript"
      defaultValue={startValue}
      theme={theme}
      beforeMount={handleEditorWillMount}
      onMount={handleEditorDidMount}
    />
  );
};
