import Link from "next/link";

export default function Home() {
  return (
    <main>
      쇼핑몰 홈
      <br />
      <Link href={"/login"}>로그인으로 이동</Link>
    </main>
  );
}
