type Props = {
  title: string;
  description: string;
};

export const EmptySearch = ({ title, description }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center gap-6 flex-1 h-full text-center pt-20 px-4">
      <h1 className="text-2xl font-semibold text-primary">{title}</h1>
      <p className="text-base text-secondary">{description}</p>
    </div>
  );
};
