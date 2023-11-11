import InputFromTo from '@/src/components/common/InputFromTo';

interface AreaFilterProps {
  areaFrom: string;
  areaTo: string;
  onChange: (data: { areaFrom: string; areaTo: string }) => void;
}

const AreaFilter = ({ areaFrom, areaTo, onChange }: AreaFilterProps) => {
  return (
    <InputFromTo
      label="Площадь"
      subLabel={
        <span>
          м <sup>2</sup>
        </span>
      }
      values={{
        from: areaFrom,
        to: areaTo,
      }}
      onChange={({ from, to }) => {
        onChange({
          areaFrom: from,
          areaTo: to,
        });
      }}
    />
  );
};

export default AreaFilter;
