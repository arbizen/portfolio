import { codeToHtml } from 'shiki';
import ClientSandpack from '../client-sandpack';
import Editor from '../client-sandpack';

function removeNewline(string: string) {
  // Remove newline character from the start and end of the string
  string = string.replace(/^\n+/, ''); // Remove newline character from the start
  string = string.replace(/\n+$/, ''); // Remove newline character from the end
  return string;
}

const CodeBlock: any = async ({ ...props }) => {
  const code = props.children;
  // check if code has the string '// editor' to render the editor
  const isEditor = code.includes('// editor');
  if (isEditor) {
    const splitted =
      code.split('// file: ') ??
      code.split('// file:') ??
      code.split('//file :') ??
      code.split('//file:');
    // get all the file names and codes except the // editor

    const editorFiles: any = {};

    const files = splitted.map((file: string, index: number) => {
      if (index !== 0) {
        const [filename, ...code] = file.split('\n');
        const data = { filename, code: code.join('\n') };
        editorFiles[`/${filename}`] = removeNewline(code.join('\n'));
      }
    });

    return <Editor editorFiles={editorFiles} />;
  }
  const html = await codeToHtml(code, {
    lang: props.className?.replace(/(?:lang(?:uage)?-)/, ''),
    theme: 'github-dark', // theme
    transformers: [
      {
        pre(node) {
          this.addClassToHast(
            node,
            'p-6 rounded-md sm:w-full overflow-x-scroll sm:text-sm',
          );
        },
      },
    ],
  });
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: html,
      }}
      className="not-prose rounded-md p-4 overflow-x-scroll w-full sm:py-4 sm:px-0"
    ></div>
  );
};

export default CodeBlock;
