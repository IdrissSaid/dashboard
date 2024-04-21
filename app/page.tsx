import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>Bienvenue</h1>
      <Link href={'/services'}>Voir les services</Link>
    </div>
  );
}
