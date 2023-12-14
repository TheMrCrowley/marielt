import { getCommercialCharacteristics } from '@/src/helpers/characteristics';
import { DetailedCommercialItem } from '@/src/types/Commercial';

import Logo from './logo.jpg';

export const getPDFTemplate = (item: DetailedCommercialItem) => {
  const { name, address, rootType, type, detailedDescription } = item;

  const chars = getCommercialCharacteristics(item);

  return `
    <section  style="font-family: PTSans; display: flex; width: 100vw; height: 100%; background-color:#343434;">
      <div style="padding: 1rem; width: 100%">
        <img src="${Logo.src}" alt="logo" width="100px" height="100px"/>
        ${
          name
            ? `<div style="display: flex; align-items-center; gap: 10px; color: white; width: 100%;">
                <p style="font-size: 10px;">${name}</p>
              </div>`
            : ''
        }
        ${
          rootType
            ? `<div style="display: flex; align-items-center; gap: 10px; color: white; width: 100%;">
                <p style="font-size: 10px;">Тип: </p>
                <p style="font-size: 10px;">${rootType}</p>
              </div>`
            : ''
        }
        ${
          type
            ? `<div style="display: flex; align-items-center; gap: 10px; color: white; width: 100%;">
                <p style="font-size: 10px;">Вид: </p>
                <p style="font-size: 10px;">${type}</p>
              </div>`
            : ''
        }
        ${
          address
            ? `<div style="display: flex; align-items-center; gap: 10px; color: white; width: 100%;">
                <p style="font-size: 10px;">Адрес: </p>
                <p style="font-size: 10px; ">${address}</p>
              </div>`
            : ''
        }
        <div style="display: flex; flex-direction: column;">
          <p style="font-size: 10px; color: white;">Характеристики: </p>
          <div style="display: flex; flex-direction: column; gap: 4px; padding-left: 10px;">
          ${chars
            .map(
              (
                char,
              ) => `<div style="display: flex; align-items-center; gap: 10px; color: white; width: 100%;">
                      <p style="font-size: 10px; text-transform: capitalize;">${char.name}: </p>
                      <p style="font-size: 10px; text-transform: capitalize;">${char.value}</p>
                  </div>`,
            )
            .join('')}</div>
        </div>
        ${
          detailedDescription
            ? `<div style="display: flex; align-items-center; gap: 10px; color: white; width: 400px;">
                <p style="font-size: 10px;">${detailedDescription}</p>
              </div>`
            : ''
        }
      </div>
    </section>
  `;
};
