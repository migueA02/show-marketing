import Image from "next/image";
import React from "react";

const BeerSection = () => {
  return (
    <div
      className="w-full h-fit bg-center bg-cover bg-no-repeat flex flex-col items-start gap-16 pb-32"
      style={{ backgroundImage: "url('/img/misael/cerveza.png')" }}
    >
      <div className="flex justify-center items-center w-full">
        <Image src={"/img/misael/cervezaLogo.png"} width={250} height={250} />
      </div>

      <iframe
        height="450"
        src="https://www.youtube.com/embed/PWlqcNWSqwA?si=NJv-UtrF6Avl_bCd&amp;controls=0"
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        className="w-full"
      ></iframe>
    </div>
  );
};

export default BeerSection;
