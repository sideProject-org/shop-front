import Link from "next/link";
import React from "react";

// 미정!
const Logo: React.FC = () => (
  <h1 className="text-5xl font-bold gap-4  my-auto tracking-tighter leading-tight text-slate-950">
    <Link href={"/"}> The Mall</Link>
  </h1>
);

export default Logo;
