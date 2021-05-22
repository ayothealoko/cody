interface Props {
  selected: boolean;
  toggleSelected: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

function Toggle(props: Props) {
  const { selected, toggleSelected } = props;

  return (
    <div className="toggle-container">
      <div className="toggle" onClick={toggleSelected}>
        <div
          className={`toggle__button ${selected ? "" : "toggle--off"}`}
        ></div>
      </div>
    </div>
  );
}

export default Toggle;
