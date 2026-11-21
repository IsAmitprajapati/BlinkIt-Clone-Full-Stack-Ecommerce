export const SIMDEGA_LOCALITIES = [
    { name: "Agharma", pincode: "835211" },
    { name: "Bagdega", pincode: "835223" },
    { name: "Bano", pincode: "835201" },
    { name: "Bansjor", pincode: "835226" },
    { name: "Basain", pincode: "835223" },
    { name: "Bolba", pincode: "835226" },
    { name: "Gariajore", pincode: "835212" },
    { name: "Jaldega", pincode: "835211" },
    { name: "Kersai", pincode: "835223" },
    { name: "Khuntitoli", pincode: "835223" },
    { name: "Kolebira", pincode: "835211" },
    { name: "Kurdeg", pincode: "835212" },
    { name: "Lachragarh", pincode: "835201" },
    { name: "Simdega", pincode: "835223" },
    { name: "Thethaitangar", pincode: "835226" },
];

export const getSimdegaLocality = (name) =>
    SIMDEGA_LOCALITIES.find(
        (locality) => locality.name.toLowerCase() === name.trim().toLowerCase()
    );
