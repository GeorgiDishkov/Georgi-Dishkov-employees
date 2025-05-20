import React from "react";
import "./AnimatedButton.scss";

interface AnimatedButtonProps {
  buttonState: "default" | "loading" | "success" | "abort" | "selected";
  onClick: () => void;
  customSuccessText?: string;
  customAbortText?: string;
  customDefaultText?: string;
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  onClick,
  buttonState,
  customSuccessText,
  customAbortText,
  customDefaultText,
}) => {
  const getButtonText = () => {
    const textMap: Record<string, string> = {
      default: customDefaultText ?? "UPLOAD",
      selected: customDefaultText ?? "UPLOAD",
      success: customSuccessText ?? "UPLOADED",
      abort: customAbortText ?? "CANCEL",
    };
    return textMap[buttonState];
  };
  const buttonClass = `button 
        ${buttonState === "loading" ? "onclick" : ""} 
        ${buttonState === "success" ? "validate" : ""} 
        ${buttonState === "abort" ? "abort" : ""}
        ${buttonState === "selected" ? "selected" : ""}`;

  return (
    <button className={buttonClass} onClick={onClick}>
      {getButtonText()}
    </button>
  );
};

export default AnimatedButton;
