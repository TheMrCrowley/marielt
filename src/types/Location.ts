export interface District {
  districtId: string;
  districtName: string;
  microdistricts: Array<{
    microdistrictId: string;
    microdistrictName: string;
  }>;
}

export interface MicroDistrict {
  microDistrictId: string;
  microDistrictName: string;
  districts: {
    districtId: string;
    districtName: string;
  };
}
