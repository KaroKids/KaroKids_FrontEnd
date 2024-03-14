import spinner from '/assets/images/spinner.svg';

export default function Loading() {
  return (
    <div className="flex justify-center items-center h-screen">
    <img src={spinner} alt="Loading..." className="w-16 h-16" />
  </div>
  )
}
