import styled from "styled-components";

const NavButton3D = ({ children, icon: Icon, onClick }) => {
  return (
    <StyledWrapper>
      <button onClick={onClick}>
        {Icon && <Icon size={15} className="icon" />}
        <span>{children}</span>
      </button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  button {
    display: inline-flex; /* ✅ better than flex */
    align-items: center;
    justify-content: center;
    gap: 6px;

    font-size: 13px;
    padding: 6px 14px;
    border-radius: 999px;
    font-weight: 500;
    line-height: 1; /* ✅ fixes vertical misalignment */

    color: #4c1d95;
    background: linear-gradient(135deg, #ede9fe, #dbeafe);

    border: none;
    cursor: pointer;

    box-shadow:
      inset 0 1px 0 rgba(255,255,255,0.8),
      0 1px 0 rgba(0,0,0,0.05),
      0 2px 4px rgba(139,92,246,0.15);

    transition: all 0.18s ease;
  }

  .icon {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  span {
    display: flex;
    align-items: center;
  }

  button:hover {
    background: linear-gradient(135deg, #ddd6fe, #bfdbfe);
    transform: translateY(-1px); /* ✅ subtle lift */
  }

  button:active {
    transform: translateY(1px) scale(0.98); /* ✅ better press feel */
    box-shadow:
      inset 0 2px 4px rgba(0,0,0,0.1);
  }
`;

export default NavButton3D;