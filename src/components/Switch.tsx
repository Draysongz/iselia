// Switch.tsx
import React from "react";

interface SwitchProps {
  isChecked: boolean;
  onChange: () => void;
  label?: string;
  size?: "small" | "medium" | "large";
}

const Switch: React.FC<SwitchProps> = ({
  isChecked,
  onChange,
  label,
  size = "medium",
}) => {
  const sizes = {
    small: { width: "40px", height: "20px", thumb: "16px" },
    medium: { width: "60px", height: "30px", thumb: "26px" },
    large: { width: "112px", height: "35px", thumb: "37px" },
  };

  const selectedSize = sizes[size];

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        cursor: "pointer",
      }}
      onClick={onChange}
    >
      {label && (
        <label
          style={{
            fontSize: "16px",
            fontWeight: "bold",
          }}
        >
          {label}
        </label>
      )}

      <div
        style={{
          position: "relative",
          width: selectedSize.width,
          height: selectedSize.height,
          backgroundColor: isChecked ? "#ccc" : "#ccc",
          borderRadius: "10px",
          transition: "background-color 0.3s ease",
          boxShadow: "0px 0px 10px 5px #59173E",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: isChecked
              ? `calc(100% - ${selectedSize.thumb} - 0px)`
              : "0px",
            transform: "translateY(-50%)",
            width: "45px",
            height: selectedSize.thumb,
            backgroundColor: "#ffca2b",
            borderRadius: "10px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
            transition: "left 0.3s ease",
          }}
        />
      </div>
    </div>
  );
};

export default Switch;
