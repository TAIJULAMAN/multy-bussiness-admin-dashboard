export default function Button({ style, text, icon, classNames, type, handler }) {
  return (
    <button
      onClick={() => {
        handler && handler();
      }}
      type={type}
      style={style}
      className={classNames}
    >
      {icon} {text}
    </button>
  );
};
    