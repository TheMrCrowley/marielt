import TelegramApi from 'node-telegram-bot-api';
export interface WebhookRequest {
  event: 'entry.update';
  createdAt: string;
  model: ProductModelNames;
  uid: string;
  entry: Entry;
}

export interface Entry {
  id: number;
  location: Location;
  locality: string | null;
  street: string | null;
  house_number: {
    number: string;
    building: string;
  } | null;
  region: RegionEntry | RegionWebhookEntry | null;
  district_rb: string | null;
}

interface RegionEntry {
  id: number;

  attributes: {
    name: string;
  };
}

interface RegionWebhookEntry {
  count: number;
}

export interface Location {
  address: string;
  geohash: string;
  components: AddressComponent[];
  coordinates: Coordinates;
}

export interface Coordinates {
  lat: number;
  lng: number;
}

interface AddressComponent {
  long_name: string;
  short_name: string;
  types: Array<
    | 'administrative_area_level_1'
    | 'administrative_area_level_2'
    | 'locality'
    | 'route'
    | 'street_number'
  >;
}

const regions = [
  {
    id: 1,
    name: 'Минская область',
  },
  {
    id: 2,
    name: 'Брестская область',
  },
  {
    id: 3,
    name: 'Витебская область',
  },
  {
    id: 4,
    name: 'Гомельская область',
  },
  {
    id: 5,
    name: 'Гродненская область',
  },
  {
    id: 6,
    name: 'Могилевская область',
  },
];

enum ComponentTypeName {
  Locality = 'locality',
  Route = 'route',
  StreetNumber = 'street_number',
  Region = 'administrative_area_level_1', //region
  DistrictRB = 'administrative_area_level_2', //district rb
  Subpremise = 'subpremise', //building
}

enum ProductModelNames {
  ApartmentsItem = 'apartments-item',
  CommercialItem = 'commercial-property-item',
  HouseAndLotsItem = 'houses-and-lots-item',
}

const strapiModelNameMap: Record<ProductModelNames, (id: number) => string> = {
  [ProductModelNames.ApartmentsItem]: (id: number) =>
    `${process.env.API_BASE_URL}/apartments-items/${id}?populate=*`,
  [ProductModelNames.CommercialItem]: (id: number) =>
    `${process.env.API_BASE_URL}/commercial-property-items/${id}?populate=*`,
  [ProductModelNames.HouseAndLotsItem]: (id: number) =>
    `${process.env.API_BASE_URL}/houses-and-lots-items/${id}?populate=*`,
};

const strapiVariableNameMap: Record<
  ComponentTypeName,
  (acc: FormattedComponents, value: string) => {}
> = {
  [ComponentTypeName.Locality]: (acc: FormattedComponents, locality: string) =>
    acc ? { ...acc, locality } : { locality },
  [ComponentTypeName.Route]: (acc: FormattedComponents, street: string) =>
    acc ? { ...acc, street } : { street },
  [ComponentTypeName.Region]: (acc: FormattedComponents, region: string) =>
    acc
      ? { ...acc, region: regions.find((r) => r.name === region)?.id }
      : {
          region: regions.find((r) => r.name === region)?.id,
        },
  [ComponentTypeName.DistrictRB]: (acc: FormattedComponents, district_rb: string) =>
    acc
      ? {
          ...acc,
          district_rb,
        }
      : {
          district_rb,
        },
  [ComponentTypeName.StreetNumber]: (acc: FormattedComponents, number: string) =>
    acc
      ? { ...acc, house_number: { ...acc.house_number, number } }
      : {
          house_number: { number },
        },
  [ComponentTypeName.Subpremise]: (acc: FormattedComponents, building: string) =>
    acc
      ? { ...acc, house_number: { ...acc.house_number, building } }
      : {
          house_number: { building },
        },
};

interface FormattedComponents {
  house_number: { number: string; building: string };
  street: string;
  locality: string;
  district_rb: string;
  region: number;
}

const getItemByModelName = async (modelName: ProductModelNames, id: number) => {
  const response = await fetch(strapiModelNameMap[modelName](id));

  const data = (await response.json()) as Entry;
  return data;
};

const formatResponseToMap = (addressComponents: AddressComponent[]): FormattedComponents => {
  const filtered = addressComponents.filter((component) =>
    component.types.some((type) =>
      Object.values(ComponentTypeName).includes(type as ComponentTypeName),
    ),
  );

  const result = filtered.reduce<FormattedComponents>((acc, component) => {
    const { long_name, types } = component;
    const type = types.find((typeName) =>
      Object.values(ComponentTypeName).includes(typeName as ComponentTypeName),
    ) as ComponentTypeName;

    acc = { ...acc, ...strapiVariableNameMap[type](acc, long_name) };
    return acc;
  }, {} as FormattedComponents);

  return result;
};

export const checkIsUpdateFromStrapi = (data: WebhookRequest) => {
  return !data.entry.region || !!(data.entry.region as RegionWebhookEntry)?.count?.toString();
};

export const checkIsAddressExist = (data: WebhookRequest) => {
  return !!data.entry.location && !!data.entry.location.components.length;
};

export const checkIsNeededEntryUpdate = (entry: WebhookRequest) => {
  return Object.values(ProductModelNames).includes(entry.model);
};

export const isUpdateNeeded = async (
  entry: WebhookRequest,
): Promise<false | FormattedComponents> => {
  const targetItem = await getItemByModelName(entry.model, entry.entry.id);
  const formatted = formatResponseToMap(entry.entry.location.components);

  const isStreetChanged = formatted.street && targetItem.street !== formatted.street;

  const isLocalityChanged = formatted.locality && targetItem.locality !== formatted.locality;

  const isRegionChanged =
    formatted.region && (targetItem.region as RegionEntry)?.id !== formatted.region;

  const isDistrictRBChanged =
    formatted.district_rb && targetItem.district_rb !== formatted.district_rb;

  const isHouseNumberChanged =
    formatted.house_number.number &&
    targetItem?.house_number?.number !== formatted.house_number.number;

  const isBuildingChanged =
    formatted.house_number.building &&
    targetItem?.house_number?.building !== formatted.house_number.building;

  if (
    ![
      isHouseNumberChanged,
      isStreetChanged,
      isLocalityChanged,
      isRegionChanged,
      isDistrictRBChanged,
      isBuildingChanged,
    ].some(Boolean)
  ) {
    return false;
  }

  return formatted;
};

export const updateEntry = async (entry: WebhookRequest, formatted: FormattedComponents) => {
  const response = await fetch(strapiModelNameMap[entry.model](entry.entry.id), {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      data: formatted,
    }),
  });

  return response.json();
};

export const shouldHandleAddressChange = (
  data: WebhookRequest,
): {
  status: boolean;
  reason: null | string;
} => {
  const checks = [
    { check: checkIsNeededEntryUpdate, reason: 'incorrect-entry-updated' },
    { check: checkIsUpdateFromStrapi, reason: 'update-not-from-strapi' },
    { check: checkIsAddressExist, reason: 'address-not-exist' },
  ];

  for (const { check, reason } of checks) {
    const result = check(data);

    if (!result) {
      return {
        status: false,
        reason,
      };
    }
  }

  return {
    status: true,
    reason: null,
  };
};

export const handleAddressUpdate = async (
  data: WebhookRequest,
  // messageToMembers: (message: string) => void,
) => {
  try {
    const shouldChange = shouldHandleAddressChange(data);

    if (shouldChange.status) {
      const formatted = await isUpdateNeeded(data);

      if (formatted) {
        await updateEntry(data, formatted);

        console.log(`Entry ${data.model} with id ${data.entry.id} was updated to:
        ${JSON.stringify(formatted, null, 2)}`);
        // messageToMembers(
        //   `Entry ${data.model} with id ${data.entry.id} was updated to:
        //   ${JSON.stringify(formatted, null, 2)}`,
        // );
      }
    } else {
      console.log(`Entry ${data.model} with id ${data.entry.id} was not updated because:
      ${JSON.stringify(shouldChange, null, 2)}`);
      // messageToMembers(
      // `Entry ${data.model} with id ${data.entry.id} was not updated because:
      // ${JSON.stringify(shouldChange, null, 2)}`,
      // );
    }
  } catch (e) {
    console.log(`handleAddressUpdate error: ${(e as Error).message}`);
    // messageToMembers(`handleAddressUpdate error: ${(e as Error).message}`);
  }
};
