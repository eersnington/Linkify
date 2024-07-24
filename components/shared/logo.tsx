import React from "react";
import Image from "next/image";

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <Image
      src={`/logo.svg`}
      objectFit="contain"
      width={48}
      height={48}
      alt="Logo"
      priority
      className={className}
    />
  );
};

export default Logo;
