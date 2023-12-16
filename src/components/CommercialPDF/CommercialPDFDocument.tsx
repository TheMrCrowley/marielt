import { Document, Page, View, Text, Image, Font } from '@react-pdf/renderer';
import React from 'react';

import Logo from '@/public/logo.jpg';
import {
  getCommercialCharacteristics,
  getCommercialPriceValues,
} from '@/src/helpers/characteristics';
import { CurrencyState } from '@/src/store/currency';
import { DetailedCommercialItem } from '@/src/types/Commercial';

const CommercialPDFDocument = ({
  commercialItem,
  rates,
}: {
  commercialItem: DetailedCommercialItem;
  rates: CurrencyState['rates'];
}) => {
  Font.register({
    family: 'Roboto',
    src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-medium-webfont.ttf',
  });

  const {
    name,
    transactionType,
    rootType,
    type,
    detailedDescription,
    note,
    initialCurrency,
    pricePerMeter,
    totalPrice,
    images,
  } = commercialItem;

  const {
    main: [currency, formatted],
    additional,
  } = getCommercialPriceValues({
    initialCurrency: initialCurrency || 'USD',
    priceMeter: pricePerMeter,
    rates,
    totalPrice,
  });

  const chars = getCommercialCharacteristics(commercialItem);

  return (
    <Document
      style={{
        fontFamily: 'Roboto',
        color: '#ffffff',
      }}
    >
      <Page
        style={{
          backgroundColor: '#343434',
          display: 'flex',
          flexDirection: 'column',
          padding: '16px',
          gap: '10px',
        }}
      >
        <View
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            borderBottom: '1px solid #E3C496',
            flexDirection: 'row',
            gap: '16px',
            paddingBottom: '16px',
          }}
        >
          <Image
            src={Logo.src}
            style={{
              width: '150px',
            }}
          />
          <View>
            <Text style={{ fontSize: '10px' }}>2019 «Группа Компаний Мариэлт»</Text>
            <Text style={{ fontSize: '10px' }}>УНП: 193601325</Text>
            <Text style={{ fontSize: '10px' }}>Лицензия: 02240/431, МЮ РБ</Text>
          </View>
          <View>
            <Text style={{ fontSize: '10px' }}>+375 17 322 73 22</Text>
            <Text style={{ fontSize: '10px' }}>+375 29 710-20-20</Text>
            <Text style={{ fontSize: '10px' }}>ул. Кальварийская 42, оф. 72 ст.м.Молодёжная</Text>
          </View>
        </View>
        {name && (
          <View>
            <Text style={{ fontSize: '16px' }}>{name}</Text>
          </View>
        )}
        <View style={{ display: 'flex', flexDirection: 'row', gap: '8px', alignItems: 'center' }}>
          <Text style={{ fontSize: '16px', color: '#E3C496' }}>Стоимость: </Text>
          <Text
            style={{
              padding: '4px 8px',
              backgroundColor: '#E3C496',
              color: '#343434',
              fontSize: '16px',
            }}
          >
            {currency}
          </Text>
          <Text style={{ fontSize: '16px' }}>{formatted}</Text>
        </View>
        {additional && (
          <View style={{ display: 'flex', flexDirection: 'row', gap: '8px', alignItems: 'center' }}>
            <Text style={{ fontSize: '16px', color: '#E3C496' }}>Стоимость за м²: </Text>
            <Text
              style={{
                padding: '4px 8px',
                backgroundColor: '#E3C496',
                color: '#343434',
                fontSize: '16px',
              }}
            >
              {additional[0]}
            </Text>
            <Text style={{ fontSize: '16px' }}>{additional[1]}</Text>
          </View>
        )}
        {transactionType && (
          <View style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
            <Text style={{ fontSize: '16px', color: '#E3C496' }}>Тип Сделки:</Text>
            <Text style={{ fontSize: '16px' }}>{transactionType}</Text>
          </View>
        )}
        {rootType && (
          <View style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
            <Text style={{ fontSize: '16px', color: '#E3C496' }}>Тип:</Text>
            <Text style={{ fontSize: '16px' }}>{rootType}</Text>
          </View>
        )}
        {type && (
          <View style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
            <Text style={{ fontSize: '16px', color: '#E3C496' }}>Вид:</Text>
            <Text style={{ fontSize: '16px' }}>{type}</Text>
          </View>
        )}
        {chars && !!chars.length && (
          <>
            <Text style={{ fontSize: '16px', color: '#E3C496' }}>Параметры:</Text>
            <View
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
              }}
            >
              {chars.map((char, i) => (
                <View
                  key={`commercial-pdf-char-item-${i}-${char.name}`}
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '10px',
                    alignItems: 'center',
                    paddingLeft: '8px',
                  }}
                >
                  <Text style={{ fontSize: '12px', color: '#E3C496', textTransform: 'capitalize' }}>
                    {char.name}:
                  </Text>
                  <Text style={{ fontSize: '12px', textTransform: 'capitalize' }}>
                    {char.value}
                  </Text>
                </View>
              ))}
            </View>
          </>
        )}
        {detailedDescription && (
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
            }}
          >
            <Text style={{ fontSize: '16px', color: '#E3C496' }}>Описание:</Text>
            <Text style={{ fontSize: '12px', paddingLeft: '8px', maxWidth: '80%' }}>
              {detailedDescription}
            </Text>
          </View>
        )}
        {note && (
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
            }}
          >
            <Text style={{ fontSize: '16px', color: '#E3C496' }}>Примечание:</Text>
            <Text style={{ fontSize: '12px', paddingLeft: '8px', maxWidth: '80%' }}>{note}</Text>
          </View>
        )}
        {images && images.length && (
          <View style={{ display: 'flex', flexDirection: 'row', gap: '10px', flexWrap: 'wrap' }}>
            {images.map((image, i) => (
              <Image
                src={image.url}
                key={`presentation-image-item-${i}-${image.url}`}
                style={{ width: '250px' }}
              />
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
};

export default CommercialPDFDocument;
