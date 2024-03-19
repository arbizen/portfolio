import { codeToHtml } from 'shiki';

const CodeBlock: any = async ({ ...props }) => {
  const code = props.children;
  const html = await codeToHtml(code, {
    lang: props.className?.replace(/(?:lang(?:uage)?-)/, ''),
    theme: 'github-dark', // theme
    transformers: [
      {
        pre(node) {
          this.addClassToHast(node, 'p-6 rounded-md');
        },
      },
    ],
  });
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: html,
      }}
      className="not-prose rounded-md p-4"
    ></div>
  );
};

export default CodeBlock;
