import spinner from "/assets/images/spinner.svg";
const IsLoading = () => {
  return (
    <>
      <img
        src={spinner}
        alt="Loading..."
        className=" bg-transparent rounded-lg mx-auto inset-1 flex items-center justify-center   w-11 h-11"
      />
    </>
  );
};

export default IsLoading;
