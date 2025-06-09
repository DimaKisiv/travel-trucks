const Icon = ({ name, width = 24, height = 24, ...props }) => (
  <svg width={width} height={height} {...props}>
    <use href={`/assets/svg/sprite.svg#${name}`} />
  </svg>
);

export default Icon;
