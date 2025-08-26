import React from "react";

export const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
  ...rest
}) => {
  return <button className="button" {...rest} />;
};