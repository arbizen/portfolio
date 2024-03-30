import { codeToHtml } from 'shiki';

const CodeBlock: any = async ({ ...props }) => {
  const code = props.children;
  const html = await codeToHtml(code, {
    lang: props.className?.replace(/(?:lang(?:uage)?-)/, ''),
    theme: 'github-dark', // theme
    transformers: [
      {
        pre(node) {
          this.addClassToHast(
            node,
            'p-6 rounded-md sm:w-full sm:overflow-x-scroll sm:text-sm',
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
