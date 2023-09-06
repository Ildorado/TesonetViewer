import { Loader as LoaderSvg } from "@/assets";

export const sizeClassMapping = {
  small: "h-6 w-6",
  medium: "h-12 w-12",
};

export const colorMapping = {
  medium: "h-12 w-12",
};

interface ILoader {
  size?: keyof typeof sizeClassMapping;
}

export const Loader = ({ size = "medium" }: ILoader) => {
  const sizeClassName = sizeClassMapping[size];

  return (
    <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
      <LoaderSvg className={`animate-spin ${sizeClassName}`} />
    </div>
  );
};
