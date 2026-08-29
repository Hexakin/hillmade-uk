import Image from "next/image";

export default function Home() {
  return (
    <main className="profile">
      <figure className="portrait">
        <Image
          src="/jonathan-hill.jpg"
          alt="Jonathan Hill"
          fill
          priority
          sizes="(min-width: 880px) 20.5rem, 16.5rem"
        />
      </figure>
      <div>
        <h1 className="name">Jonathan Hill</h1>
        <p className="line">
          Hillmade is the parent company of everything I make.
        </p>
        <div className="bio">
          <p>
            After a career in regulated work — compliance, insurance,
            healthcare, finance — I started Hillmade to explore new
            possibilities and to learn how business and modern technology
            actually work.
          </p>
          <p>
            I still work in that world. Hillmade is where I build in the open.
          </p>
          <p>Hexakin is the public face of that work.</p>
        </div>
        <ul className="doors">
          <li>
            <a href="https://hexakin.com">Hexakin</a>
          </li>
          <li>
            <a href="mailto:jonathan.hill@hillmade.uk">
              jonathan.hill@hillmade.uk
            </a>
          </li>
        </ul>
      </div>
    </main>
  );
}
