import { DefaultCommercialItem } from '@/src/types/Commercial';

interface CommercialProducPageProps {
  commercialItem: DefaultCommercialItem;
}

const CommercialProductPage = ({}: CommercialProducPageProps) => {
  // <>
  //   <ImagesSwiper images={images} type="flats" />
  //   <ProductPageContent
  //     locationField={<LocationField location={location} />}
  //     note={<NoteField note={note} />}
  //     characteristics={<Characteristics characteristics={flatCharacteristics} />}
  //     creditCalculator={
  //       <CreditCalculator rate={rate} initialCurrency={initialCurrency} price={+price!} />
  //     }
  //     similarObjectsField={
  //       <SimilarProducts
  //         product={'квартиры'}
  //         productSlider={<ProductSlider products={similar} type="flats" />}
  //       />
  //     }
  //     productHeader={
  //       <FlatPageHeader
  //         address={address}
  //         title={name}
  //         roominess={getRoominessByStrapiValue(roominess!)}
  //         floor={floor}
  //         maxFloor={maxFloor}
  //         constructionYear={constructionYear}
  //         totalArea={totalArea}
  //         livingArea={livingArea}
  //         kitchenArea={kitchenArea}
  //         initialCurrency={initialCurrency}
  //         price={+price!}
  //       />
  //     }
  //   />
  //   <ApplicationField />
  // </>;
};

export default CommercialProductPage;
