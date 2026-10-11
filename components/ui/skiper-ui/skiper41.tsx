"use client";

import React from "react";

const Skiper41 = () => {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-[40] h-28 overflow-hidden sm:h-36" aria-hidden="true">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#090909]/10 to-[#090909]/65" />
      <div className="absolute inset-x-0 bottom-0 h-[72%] backdrop-blur-[2px] [mask-image:linear-gradient(to_bottom,transparent,black)]" />
      <div className="absolute inset-x-0 bottom-0 h-[45%] backdrop-blur-[6px] [mask-image:linear-gradient(to_bottom,transparent,black)]" />
      <div className="absolute inset-x-0 bottom-0 h-[22%] backdrop-blur-[14px] [mask-image:linear-gradient(to_bottom,transparent,black)]" />
    </div>
  );
};

export { Skiper41 };
