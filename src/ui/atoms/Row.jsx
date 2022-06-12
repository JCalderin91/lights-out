export const Row = ({ position, active, toogleCol }) => {
  const handleClick = () => {
    toogleCol(position);
  };
  return <td className={active ? "col active" : "col"} onClick={handleClick} />;
};
