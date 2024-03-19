const Paragraph = ({ ...props }) => {
  return <p className="text-slate-800 text-base">{props.children}</p>;
};

export default Paragraph;
