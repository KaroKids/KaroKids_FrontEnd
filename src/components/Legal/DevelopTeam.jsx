import React from "react";

const DevelopTeam = () => {
  const teamMembers = [
    {
      name: "Dillmann, Enzo",
      role: "Frontend",
      github: "EFDillmann",
      linkedin: "efdillmann",
      image:
        "https://media.licdn.com/dms/image/C5603AQGqMtHhbZWcKg/profile-displayphoto-shrink_800_800/0/1558626747302?e=1716422400&v=beta&t=sajas7Tlv6s9sgfxxqqTyXi8RoRK9Y0WMXw0UHf7vXA",
    },
    {
      name: "Fariñez, Howard",
      role: "Backend",
      github: "hfarinez05",
      linkedin: "howard-fariñez-4631a2240",
      image:
        "https://media.licdn.com/dms/image/D4E03AQGS4uU2jc_FAw/profile-displayphoto-shrink_800_800/0/1706187227410?e=1716422400&v=beta&t=gFp1RHTnqyj5H8mFxNhaBdy-P0cslG0m18J3dYaHg8A",
    },
    {
      name: "Fuentes, José Germán",
      role: "Backend",
      github: "jgerfuentes",
      linkedin: "jgerfuentes",
      image:
        "https://media.licdn.com/dms/image/D4D35AQGx23bVG6O5EA/profile-framedphoto-shrink_800_800/0/1705808638661?e=1711339200&v=beta&t=knEsaXeLFu80-KLC6ijDkQ6O3vvw3HYbBYCrqE9b2lI",
    },
    {
      name: "Kaufmann, Lautaro",
      role: "Frontend",
      github: "lgkaufmann",
      linkedin: "lgkaufmann",
      image:
        "https://media.licdn.com/dms/image/D4D03AQECkp9pXQLp6Q/profile-displayphoto-shrink_800_800/0/1698887318558?e=1716422400&v=beta&t=Zi1BL3a1hkz4ftG29c7poTo6uE52Up-ALJ5CSezmBgg",
    },
    {
      name: "Martins, Thiago",
      role: "Frontend",
      github: "thiagojmartins",
      linkedin: "thiago-javier-martins",
      image: "https://thiagomartins.vercel.app/Photo.webp",
    },
    {
      name: "Oviedo, Lisandro",
      role: "Backend",
      github: "lisandroviedo",
      linkedin: "lisandroviedo",
      image:
        "https://media.licdn.com/dms/image/D4E35AQHM8G5eQsZLdQ/profile-framedphoto-shrink_800_800/0/1698881392705?e=1711339200&v=beta&t=zwuntAEgKATFf2GPW5zW0CCSMHJ_3Eb2gsRL2jioGyY",
    },
    {
      name: "Puertas, Sebastian",
      role: "Backend",
      github: "sfpuertas",
      linkedin: "sebastian-puertas-0336a0283",
      image:
        "https://media.licdn.com/dms/image/D4D35AQGuCkTCJ8KrTg/profile-framedphoto-shrink_800_800/0/1710733018538?e=1711339200&v=beta&t=2XxvaLh9gMd1WHD1PSRdxVZID6vRLwnXmDn87jzh2vQ",
    },
    {
      name: "Sanchez, Edson",
      role: "Frontend",
      github: "edsonnaza",
      linkedin: "edsonnaza",
      image:
        "https://media.licdn.com/dms/image/D4D03AQGiVuU26uv8ng/profile-displayphoto-shrink_800_800/0/1675283170824?e=1716422400&v=beta&t=yV9vJlilMWDcp9TSzfKt3oWPeF8sMu9foVL3r6i0ERA",
    },
    // Add more team members as needed
  ];

  return (
    <>
      <h1 className=" mt-28  text-center text-xl font-bold text-slate-800">
        EQUIPO DE DESARROLLADORES
      </h1>
      <div className=" min-h-screen container pt-10 gap-x-4  gap-y-4 xl:gap-y-0 grid-cols-1 sm:grid-cols-2 sm:grid md:grid lg:grid-cols-4 place-items-start">
        {teamMembers.map((member, index) => (
          <div
            className=" bg-gradient-to-tl from-sky-100 to-white my-4 lg:my-0 py-4 rounded-sm flex flex-col items-center h-auto w-full"
            key={index}
          >
            <div className=" rounded-full w-fit border-4 mb-2 border-sky-200">
              {" "}
              <img
                src={member.image}
                className="w-40 rounded-full h-40"
                alt={member.name}
              />
            </div>

            <h2 className="text-xl font-semibold text-slate-500">
              {member.name}
            </h2>
            <h3 className="text-sm my-2 font-medium">{member.role}</h3>
            <div className="flex flex-row gap-2">
              <a href={`https://github.com/${member.github}`}>
                {" "}
                <img
                  src="/assets/navbar-icons/github.svg"
                  alt="Logo github"
                  className="w-8 h-8"
                />
              </a>
              <a href={`https://linkedin.com/in/${member.linkedin}`}>
                <img
                  src="/assets/navbar-icons/linkedin.svg"
                  alt="Logo linkedin"
                  className="w-8 h-8"
                />
              </a>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default DevelopTeam;
