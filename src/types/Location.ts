export interface District {
  districtId: string;
  districtName: string;
  microdistricts: Array<{
    microdistrictId: string;
    microdistrictName: string;
  }>;
  metros: Array<{
    metroId: string;
    metroName: string;
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

export interface Metro {
  metroId: string;
  metroName: string;
  districts: Array<{
    districtId: string;
    districtName: string;
  }>;
}
