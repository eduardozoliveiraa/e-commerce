interface ContainerProps {
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div className="max-w-[1920px] mx-auto xl:pg-20 md:px-2 px-4">
      {children}
    </div>
  );
};

export default Container;
