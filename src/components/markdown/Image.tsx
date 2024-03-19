const Image = ({ ...props }) => {
  return <img className="rounded-md" src={props.src} alt={props.alt} />;
};

export default Image;
