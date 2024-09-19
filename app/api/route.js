import { NextResponse } from "next/server";
import { faker, fakerES, fakerFR, fakerFA } from "@faker-js/faker";

const getHash = (seed) => {
  return Array.from(seed).reduce((acc, char) => acc + char.charCodeAt(0), 0);
};

const fakers = {
  es: fakerES,
  fr: fakerFR,
  ir: fakerFA,
};

const getFakeUser = (faker_locale) => {
  return {
    name: faker_locale.person.fullName(),
    location: {
      street: {
        name: faker_locale.location.street(),
      },
      city: faker_locale.location.city(),
      state: faker_locale.location.state(),
      country: faker_locale.location.country(),
    },
    login: {
      uuid: faker_locale.string.uuid(),
    },
    phone: faker_locale.phone.number(),
  };
};

const getFakeUsers = (count, nat) => {
  return Array.from({ length: count }, () => getFakeUser(fakers[nat]));
};

export async function GET(request) {
  const urlParams = new URLSearchParams(request.url.split("?")[1]);
  const seed = urlParams.get("seed");
  const nat = urlParams.get("nat");
  const page = parseInt(urlParams.get("page"));
  if (seed) {
    const hash = getHash(seed);
    console.log(hash);
    // faker.seed(hash);
    fakerES.seed(hash);
    fakerFR.seed(hash);
    fakerFA.seed(hash);
  }
  return NextResponse.json(
    getFakeUsers(10 + page * 10 + 10, nat).slice(
      10 * !!page + page * 10,
      10 + page * 10 + 10
    )
  );
}
