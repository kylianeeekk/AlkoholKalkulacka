export function calculateBAC(drinks, weight, gender) {

  let totalAlcoholGrams = 0;

  drinks.forEach(drink => {
    const grams = drink.volume * (drink.alcohol / 100) * 0.8;
    totalAlcoholGrams += grams;
  });

  const r = gender === "male" ? 0.68 : 0.55;

  const bac = totalAlcoholGrams / (weight * r);

  return bac.toFixed(2);
}

export function soberingTime(bac) {

  const burnRate = 0.15;

  const hours = bac / burnRate;

  return hours.toFixed(1);
}