import React from "react";

const SobreNosotros = () => {
  return (
    <div className="flex flex-col 2xl:flex-row justify-evenly items-center py-36 px-10 gap-x-10 gap-y-6">
      <img
        src="/assets/images/local.jpg"
        alt="Tienda KaroKids"
        className="w-[45rem] rounded-md"
      />
      <div>
        <h1 className="font-semibold text-3xl border-b-4">Sobre KaroKids</h1>
        <p className="pt-16">
          Somos una tienda especializada en moda <b>junior, infantil y bebé</b>.
          Nos caracterizamos por la asesoría personalizada ya que no solo
          vendemos ropa sino que vendemos looks, tendencia y estilo. El ADN de
          la marca está basado en el servicio al cliente, en la cercanía, en la
          familiaridad y el respeto.
        </p>
        <p className="pt-10">
          Nuestras prendas son exclusivas , elaboradas por fábricas calificadas
          donde el diseño, la calidad, la creatividad y el buen gusto se unen
          para crear <b>MODA KAROKIDS</b>.
        </p>
        <p className="pt-10">
          En la tienda manejamos dos líneas de vestuario que son{" "}
          <b>LINEA CASUAL y LÍNEA INFORMAL</b>. Ambas líneas están disponibles
          tanto para <b>CHICAS</b> como para <b>CHICOS</b> en categoría{" "}
          <b>bebé-infantil y junior</b>.
        </p>
        <p className="pt-10">
          Si tienes un evento social y necesitas lucir <b>WOW</b>, si va a
          llegar un bebé a la familia y quieres darle algo <b>ÚNICO</b> o si
          necesitas algo para estar cómodo y verte{" "}
          <b>ESPECIAL... KAROKIDS ES TU TIENDA!!</b>
        </p>
      </div>
    </div>
  );
};

export default SobreNosotros;
