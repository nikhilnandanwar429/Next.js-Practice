export default function UserProfile({ params }: any) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile page</h1>
      <p className="text-4xl">
        profile of
        <span className="p-1 mx-2  rounded-md bg-orange-500">{params.id}</span>
      </p>
    </div>
  );
}
