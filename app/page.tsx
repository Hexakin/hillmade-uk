import Image from "next/image";

export default function Home() {
  return (
    <main className="profile">
      <figure className="portrait">
        <Image
          src="/jonathan-hill.jpg"
          alt="Jonathan Hill"
          width={800}
          height={1000}
          priority
          sizes="(min-width: 880px) 20.5rem, 16.5rem"
          style={{ objectPosition: "20% 50%" }}
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
        <section className="faq">
          <h2>FAQ</h2>
          <h3>What is Hillmade?</h3>
          <p>Hillmade is Jonathan Hill's parent company, not a shop.</p>
          <h3>Is Hillmade a shop or Hillmade LLC?</h3>
          <p>No. Not a shop, not Hillmade LLC, not an Etsy or sewing brand.</p>
          <h3>What sits under Hillmade?</h3>
          <p>
            Hexakin is the public face. Not Our Jurisdiction is a separate door.
          </p>
        </section>
        <ul className="doors">
          <li>
            <a href="https://hexakin.com">Hexakin</a>
          </li>
          <li>
            <a href="https://www.notourjurisdiction.co.uk/">
              Not Our Jurisdiction
            </a>
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
