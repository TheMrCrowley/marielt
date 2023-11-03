import { NextResponse } from 'next/server';
export async function POST(req: Request) {
  // const data = await req.json();
  // console.log(data.entry.test.components.filter();
  // const filtered = data.entry.test.components.filter((item) => {
  //   return item.types.some((type) => Object.values(Components).includes(type));
  // });
  // console.log(filtered);
  return NextResponse.json({});
}

// const street = [
//   {
//     types: ['street_number'],
//     long_name: '24',
//     short_name: '24',
//   },
//   {
//     types: ['route'],
//     long_name: 'улица Кульман',
//     short_name: 'ул. Кульман',
//   },
//   {
//     types: ['sublocality_level_1', 'sublocality', 'political'],
//     long_name: 'Советский район',
//     short_name: 'Советский район',
//   },
//   {
//     types: ['locality', 'political'],
//     long_name: 'Минск',
//     short_name: 'Минск',
//   },
//   {
//     types: ['administrative_area_level_2', 'political'],
//     long_name: 'Минский район',
//     short_name: 'Минский район',
//   },
//   {
//     types: ['administrative_area_level_1', 'political'],
//     long_name: 'Минская область',
//     short_name: 'Минская область',
//   },
//   {
//     types: ['country', 'political'],
//     long_name: 'Беларусь',
//     short_name: 'BY',
//   },
// ];

// const prospekt = [
//   {
//     types: ['street_number'],
//     long_name: '6',
//     short_name: '6',
//   },
//   {
//     types: ['route'],
//     long_name: 'проспект Независимости',
//     short_name: 'пр. Независимости',
//   },
//   {
//     types: ['sublocality_level_1', 'sublocality', 'political'],
//     long_name: 'Московский район',
//     short_name: 'Московский район',
//   },
//   {
//     types: ['locality', 'political'],
//     long_name: 'Минск',
//     short_name: 'Минск',
//   },
//   {
//     types: ['administrative_area_level_2', 'political'],
//     long_name: 'Минский район',
//     short_name: 'Минский район',
//   },
//   {
//     types: ['administrative_area_level_1', 'political'],
//     long_name: 'Минская область',
//     short_name: 'Минская область',
//   },
//   {
//     types: ['country', 'political'],
//     long_name: 'Беларусь',
//     short_name: 'BY',
//   },
// ];

// const pereulok = [
//   {
//     types: ['street_number'],
//     long_name: '3',
//     short_name: '3',
//   },
//   {
//     types: ['route'],
//     long_name: 'переулок Козлова',
//     short_name: 'переулок Козлова',
//   },
//   {
//     types: ['sublocality_level_1', 'sublocality', 'political'],
//     long_name: 'Партизанский район',
//     short_name: 'Партизанский район',
//   },
//   {
//     types: ['locality', 'political'],
//     long_name: 'Минск',
//     short_name: 'Минск',
//   },
//   {
//     types: ['administrative_area_level_2', 'political'],
//     long_name: 'Минский район',
//     short_name: 'Минский район',
//   },
//   {
//     types: ['administrative_area_level_1', 'political'],
//     long_name: 'Минская область',
//     short_name: 'Минская область',
//   },
//   {
//     types: ['country', 'political'],
//     long_name: 'Беларусь',
//     short_name: 'BY',
//   },
// ];

// const notMinsk = [
//   {
//     types: ['street_number'],
//     long_name: '26',
//     short_name: '26',
//   },
//   {
//     types: ['route'],
//     long_name: 'улица Гагарина',
//     short_name: 'ул. Гагарина',
//   },
//   {
//     types: ['locality', 'political'],
//     long_name: 'Жодино',
//     short_name: 'Жодино',
//   },
//   {
//     types: ['administrative_area_level_2', 'political'],
//     long_name: 'Смолевичский район',
//     short_name: 'Смолевичский район',
//   },
//   {
//     types: ['administrative_area_level_1', 'political'],
//     long_name: 'Минская область',
//     short_name: 'Минская область',
//   },
//   {
//     types: ['country', 'political'],
//     long_name: 'Беларусь',
//     short_name: 'BY',
//   },
// ];

// enum Components {
//   Locality = 'locality',
//   Route = 'route',
//   StreetNumber = 'street_number',
//   DistrictRB = 'administrative_area_level_1',
// }
