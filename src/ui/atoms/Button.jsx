export const Button = ({ ...attrs }) => {
  const className = attrs.className || "";
  delete attrs.className;
  return (
    <button {...attrs} className={`${className} custom-button`}>
      {attrs.children}
    </button>
  );
};
