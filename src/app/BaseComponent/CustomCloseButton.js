export default function CustomCloseButton({ onClick , background , border , color }) {
    return (
      <section>
        <button type="button" onClick={onClick} style={{ background: background || "none", border: border || "none" }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            fill={color || "white"}
            viewBox="0 0 26 26"
          >
            <path d="M12 10.585l4.95-4.95.707.707-4.95 4.95 4.95 4.95-.707.707L12 12.414l-4.95 4.95-.707-.707 4.95-4.95-4.95-4.95.707-.707z" />
          </svg>
        </button>
      </section>
    );
  }
  