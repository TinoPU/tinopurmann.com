
export default function Home() {
    const r = [1, 2, 3];
  return (
    <div className="h-[100vh] w-full bg-black items-center justify-center flex flex-col">
      <div className="flex flex-row gap-6">
          {r.map((i) => (
              <div key={i} className="w-[30px] h-[30px] bg-white"></div>
          ))}
      </div>
    </div>
  );
}
